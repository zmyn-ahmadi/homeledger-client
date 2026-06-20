"use client";

import { useState } from "react";

const Zee = () => {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi 👋 I’m zee. Your HomeLedger AI assistant." },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Analyzing your finances 💰 ... " },
      ]);
    }, 600);
  };

  return (
    <div>
      <div className="flex flex-col items-left gap-4">
        <div className="flex items-center gap-2">
          {/* LOGO */}
          <div className="flex flex-col">
            <h2>zee AI</h2>
            <p>ACTIVE INSIGHT ENGINE</p>
          </div>
        </div>
        <p>
          Financial sovereignty through technical precision. Ask zee for
          real-time portfolio analysis, automated budget optimization, or
          transaction forensics.
        </p>
      </div>

      <div>
        {messages.map((msg, i) => (
          <div key={i} className={``}>
            {msg.text}
          </div>
        ))}
      </div>

      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message..."
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default Zee;
