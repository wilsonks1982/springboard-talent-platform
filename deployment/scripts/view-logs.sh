#!/bin/bash

EC2_IP=${1:-}

if [ -z "$EC2_IP" ]; then
  echo "Usage: ./view-logs.sh <ec2-ip>"
  exit 1
fi

SSH_KEY=~/.ssh/springboard-talent

if [ ! -f "$SSH_KEY" ]; then
  echo "❌ SSH key not found at $SSH_KEY"
  exit 1
fi

echo "=== Docker Compose Logs (Live) ==="
echo "Press Ctrl+C to exit"

ssh -i $SSH_KEY ubuntu@$EC2_IP "cd /home/ubuntu/springboard-talent/backend && docker-compose logs -f"