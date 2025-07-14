FROM node:20-slim

# Set working directory
WORKDIR /app

# Install system dependencies for Python and build tools
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    python3-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy all source code first
COPY . .

# Install pnpm globally and verify installation
RUN npm install -g pnpm && \
    which pnpm && \
    pnpm --version

# Install frontend dependencies
WORKDIR /app/nelson-gpt-frontend
RUN pnpm install

# Install backend dependencies (using CPU-only requirements)
WORKDIR /app/nelson-gpt-backend
RUN echo "=== Files in current directory ===" && \
    ls -la && \
    echo "=== Creating virtual environment ===" && \
    python3 -m venv venv && \
    . venv/bin/activate && \
    pip install --upgrade pip && \
    echo "=== Installing from requirements-cpu.txt ===" && \
    pip install -r requirements-cpu.txt

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
# Note: This uses CPU-only PyTorch. For GPU support, use requirements.txt instead of requirements-cpu.txt
# and consider using nvidia/cuda base image
CMD ["sh", "-c", ". venv/bin/activate && python src/main.py"]
