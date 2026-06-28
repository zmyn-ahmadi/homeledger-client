import { useState, useEffect, useRef, KeyboardEvent } from "react";

interface Message {
  role: "system" | "assistant" | "user";
  content: string;
}

export function useChatStream() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // GET stream response - API
  const getStreamResponse = async (history: Message[]) => {
    // text decoder: stream is bytes -> read able string
    const decoder = new TextDecoder("utf-8");

    // buffer -> acts like a queue -> stores { stream block } ??
    let buffer: string = "";

    // API call:
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_LLM_URL}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: `${process.env.NEXT_PUBLIC_MODEL}`,
          messages: history,
          max_tokens: `${Number(process.env.NEXT_PUBLIC_MAX_TOKENS)}`,
          stream: true,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ERROR: ${res.status}`);

      // stream reader
      const reader: ReadableStreamDefaultReader<any> = res.body!.getReader();

      let streamDone = false;
      while (streamDone) {
        const { value, done } = await reader.read();
        if (done) break;

        // decode the stream and append it into buffer
        buffer += decoder.decode(value, { stream: true });

        // array of each line from stream buffer
        const lines = buffer.split("\n");

        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const cleanedLine = line.trim();
          if (!cleanedLine || !cleanedLine.startsWith("data: ")) continue;

          const dataPayload = cleanedLine.slice(6);

          if (dataPayload === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(dataPayload);

            const token = parsed.choices?.[0]?.delta?.content;
            if (token) {
              setMessages((prev) => {
                const updated = [...prev];
                const lastMsg = updated[updated.length - 1];
                updated[updated.length - 1] = {
                  ...lastMsg,
                  content: lastMsg.content + token,
                };
                return updated;
              });
            }
          } catch (error) {
            console.error(
              "Failed to parse chunk JSON: ",
              error,
              "line was: ",
              cleanedLine,
            );
          }
        }
      }
    } catch (error: any) {
      console.error(error.message);
      setMessages((prev) => {
        const updated = [...prev];
        const lastMsg = updated[updated.length - 1];
        if (lastMsg.role === "assistant" && !lastMsg.content) {
          updated[updated.length - 1] = {
            ...lastMsg,
            content:
              "Oops! Something went wrong.Our team is aware of the issue and working to fix it.",
          };
        }
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  // SEND
  const sendMessage = async () => {
    // 1. trim whitespaces from user's input
    const cleanInput = input.trim();
    if (!cleanInput || isLoading) return;

    // 2. build a Message object, containing user's input
    const userMessage: Message = { role: "user", content: cleanInput };

    // 3. insert into messages array
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // 4. create chat history
    const history = [...messages, userMessage];

    // 5. add an empty 'assistant' message block into Messages
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    // 6. LLM server api
    await getStreamResponse(history);
  };

  const visibleMessages = messages.filter((msg) => msg.role !== "system");

  return {
    messages,
    input,
    setMessages,
    setInput,
    sendMessage,
    visibleMessages,
    messagesEndRef,
    isLoading,
  };
}
