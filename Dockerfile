# ---- build ----
FROM node:26-slim AS build
WORKDIR /app
RUN npm install -g pnpm@11

# Install deps first (better layer caching)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Build the app
COPY . .

# NEXT_PUBLIC_* values are inlined into the bundle at build time,
# so they must be provided here (via compose build.args), not at runtime.
ARG NEXT_PUBLIC_BASE_LLM_URL
ARG NEXT_PUBLIC_MODEL
ARG NEXT_PUBLIC_MAX_TOKENS
ENV NEXT_PUBLIC_BASE_LLM_URL=$NEXT_PUBLIC_BASE_LLM_URL \
    NEXT_PUBLIC_MODEL=$NEXT_PUBLIC_MODEL \
    NEXT_PUBLIC_MAX_TOKENS=$NEXT_PUBLIC_MAX_TOKENS

RUN pnpm build

# ---- runtime ----
FROM node:26-slim AS runtime
WORKDIR /app
RUN npm install -g pnpm@11
ENV NODE_ENV=production

# next.config.ts has no `output: "standalone"`, so ship the built app + deps
COPY --from=build /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.ts ./

EXPOSE 3000
CMD ["pnpm", "start", "-H", "0.0.0.0", "-p", "3000"]
