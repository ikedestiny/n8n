FROM n8nio/n8n:latest

# Needed only if using Python nodes in internal mode
USER root
RUN apk add --no-cache python3 py3-pip
USER node

WORKDIR /data
EXPOSE 5678
# Default entrypoint is fine
