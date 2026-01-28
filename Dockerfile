FROM n8nio/n8n:latest

# Switch to root to install packages
USER root

# Install Python 3 and pip
RUN apt-get update && apt-get install -y python3 python3-pip && rm -rf /var/lib/apt/lists/*

# Switch back to n8n user
USER node

WORKDIR /data
EXPOSE 5678

# Default entrypoint is fine, no CMD needed

