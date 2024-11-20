# Start with a minimal Debian image
FROM debian:bookworm-slim

# Install base dependencies
RUN apt-get update && apt-get install -y curl ca-certificates && rm -rf /var/lib/apt/lists/*

# Create the runtime environment for the app
RUN useradd -ms /bin/bash app
RUN mkdir -p /app && chown app:app /app

# Create data directory
RUN mkdir -p /data && chown app:app /data

USER app
WORKDIR /app

# Fetch the Oso Dev Server
RUN curl https://oso-local-development-binary.s3.amazonaws.com/latest/oso-local-development-binary-linux-x86_64.tar.gz --output oso-dev-server.tar.gz \
    && tar -xzf oso-dev-server.tar.gz && rm oso-dev-server.tar.gz

RUN chmod +x ./standalone

# Install the Oso CLI
#RUN curl -L https://cloud.osohq.com/install.sh | bash

# Set environment variables for Oso Dev Server
ENV OSO_DIRECTORY=/data
ENV OSO_PORT=8080

# Copy policy files
COPY oso-policy/ /app/oso-policy/

# Expose the default port
EXPOSE 8080

# Start the Oso Dev Server with policies and watch for changes
ENTRYPOINT ["/app/standalone", "/app/oso-policy/app.polar"]