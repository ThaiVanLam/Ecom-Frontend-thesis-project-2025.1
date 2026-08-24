# =====================================================================
# Stage 1 — build the Vite bundle
# =====================================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Dependencies first so the layer is cached while only sources change.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vite inlines VITE_* variables at BUILD time, so they arrive as build args.
#   VITE_BACK_END_URL empty  -> the SPA calls its own origin and nginx
#                               reverse-proxies to the API Gateway (no CORS).
#   VITE_BACK_END_URL set    -> the browser calls that gateway URL directly.
ARG VITE_BACK_END_URL=""
ARG VITE_FRONTEND_URL="http://localhost:5173"
ARG VITE_STRIPE_PUBLISHABLE_KEY=""

RUN printf 'VITE_BACK_END_URL=%s\nVITE_FRONTEND_URL=%s\nVITE_STRIPE_PUBLISHABLE_KEY=%s\n' \
      "$VITE_BACK_END_URL" "$VITE_FRONTEND_URL" "$VITE_STRIPE_PUBLISHABLE_KEY" \
      > .env.production \
 && npm run build

# =====================================================================
# Stage 2 — serve the static bundle
# =====================================================================
FROM nginx:1.27-alpine

# Defaults for the config template; override with -e / compose environment.
ENV API_GATEWAY_URL=http://api-gateway:8080 \
    NGINX_RESOLVER=127.0.0.11

# Files under /etc/nginx/templates are envsubst-ed into /etc/nginx/conf.d
# by the base image entrypoint on every container start.
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# 127.0.0.1, not localhost: that resolves to ::1 first and nginx listens on IPv4.
HEALTHCHECK --interval=10s --timeout=3s --retries=5 --start-period=5s \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/healthz || exit 1
