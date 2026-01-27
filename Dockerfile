# Use the official n8n image
FROM n8nio/n8n:latest

# Set user to root if you need to install stuff (not needed here)
# USER root

# Set working directory
WORKDIR /data

# Expose the default n8n port
EXPOSE 5678

# Start n8n
CMD ["n8n"]

