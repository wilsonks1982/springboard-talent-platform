#!/bin/bash
set -e

EC2_IP=${1:-}

if [ -z "$EC2_IP" ]; then
  echo "Usage: ./deploy-backend.sh <ec2-ip>"
  exit 1
fi

echo "=== Deploying Backend to EC2 ==="
echo "EC2 IP: $EC2_IP"
echo ""

# Get the SSH key
if [ ! -f ~/.ssh/springboard-talent ]; then
  echo "❌ SSH key not found at ~/.ssh/springboard-talent"
  echo "Generate it with: ssh-keygen -f ~/.ssh/springboard-talent"
  exit 1
fi

SSH_KEY=~/.ssh/springboard-talent

# Wait for EC2 to be ready
echo "Waiting for EC2 to be ready..."
for i in {1..30}; do
  if ssh -o StrictHostKeyChecking=no -o ConnectTimeout=2 -i $SSH_KEY ubuntu@$EC2_IP "docker --version" &> /dev/null; then
    echo "✓ EC2 is ready"
    break
  fi
  echo "Attempt $i/30..."
  sleep 5
done


ssh -i $SSH_KEY ubuntu@$EC2_IP << EOSSH
    # Clean up
  rm -rf /home/ubuntu/springboard-talent
  mkdir -p /home/ubuntu/springboard-talent
  cd /home/ubuntu/springboard-talent
  
  # Clone repository (use correct URL)
  echo "Cloning repository..."
  
  git clone https://github.com/wilsonks1982/springboard-talent-platform.git .

  sleep 5

  cd backend

  docker compose down || true

  docker pull public.ecr.aws/l1s7l1v5/springboard-talent-backend:latest

  docker compose up -d
  
  echo "Waiting for containers to start..."
  sleep 5
  
  docker compose logs -f
EOSSH

echo ""
echo "✅ Backend deployed successfully"
echo "API URL: http://$EC2_IP:8080/api/v1"