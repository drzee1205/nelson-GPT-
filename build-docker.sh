#!/bin/bash

echo "🐳 Building Nelson GPT Docker Image..."
echo "=================================="

# Check if requirements-cpu.txt exists
if [ ! -f "nelson-gpt-backend/requirements-cpu.txt" ]; then
    echo "❌ Error: requirements-cpu.txt not found!"
    echo "Please make sure you're in the project root directory."
    exit 1
fi

echo "✅ Found requirements-cpu.txt"

# Clear Docker cache
echo "🧹 Clearing Docker cache..."
docker system prune -f
docker builder prune -f

# Build with no cache
echo "🔨 Building Docker image (this may take a few minutes)..."
docker build --no-cache --progress=plain -t nelson-gpt .

if [ $? -eq 0 ]; then
    echo "🎉 Build successful!"
    echo "🚀 You can now run: docker run -p 8000:8000 nelson-gpt"
else
    echo "❌ Build failed!"
    exit 1
fi
