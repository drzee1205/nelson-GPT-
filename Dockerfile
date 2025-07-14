FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install Python and pip for backend
RUN apk add --no-cache python3 py3-pip python3-dev build-base

# Copy package files first for better caching
COPY nelson-gpt-frontend/package*.json ./nelson-gpt-frontend/
COPY nelson-gpt-backend/requirements.txt ./nelson-gpt-backend/

# Install pnpm globally and verify installation
RUN npm install -g pnpm && \
    which pnpm && \
    pnpm --version

# Install frontend dependencies
WORKDIR /app/nelson-gpt-frontend
RUN pnpm install

# Install backend dependencies
WORKDIR /app/nelson-gpt-backend
RUN python3 -m venv venv && \
    . venv/bin/activate && \
    pip install -r requirements.txt

# Copy all source code
WORKDIR /app
COPY . .

# Build frontend
WORKDIR /app/nelson-gpt-frontend
RUN pnpm run build

# Copy built frontend to backend static directory
RUN mkdir -p /app/nelson-gpt-backend/src/static && \
    cp -r dist/* /app/nelson-gpt-backend/src/static/

# Set final working directory
WORKDIR /app/nelson-gpt-backend

# Expose port (adjust if needed)
EXPOSE 8000

# Start command
CMD ["sh", "-c", ". venv/bin/activate && python src/main.py"]
