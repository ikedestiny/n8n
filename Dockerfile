FROM n8nio/n8n:latest

USER root
# Use Alpine package manager
RUN apk add --no-cache curl jq
USER node

