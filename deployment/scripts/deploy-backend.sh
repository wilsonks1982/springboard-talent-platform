#!/bin/bash
set -e

EC2_IP=${1:-}
ENV=${2:-dev}

if [ -z "$EC2_IP" ]; then
  echo "Usage: ./deploy-backend.sh <ec2-ip> [environment]"
  exit 1
fi

echo "=== Deploying Backend to EC2 ==="
echo "EC2 IP: $EC2_IP"
echo "Environment: $ENV"
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

# Copy repository to EC2
echo "Copying repository to EC2..."
ssh -i $SSH_KEY ubuntu@$EC2_IP "rm -rf /home/ubuntu/springboard-talent"
scp -i $SSH_KEY -r . ubuntu@$EC2_IP:/home/ubuntu/springboard-talent/

# Build and start containers
echo "Building and starting Docker containers..."
ssh -i $SSH_KEY ubuntu@$EC2_IP << EOSSH
  cd /home/ubuntu/springboard-talent
  export SPRING_PROFILES_ACTIVE=$ENV
  export CORS_ALLOWED_ORIGINS="*"  # Update this with your S3 URL
  
  docker-compose -f deployment/docker/docker-compose.yml up -d --build
  
  echo "Waiting for containers to start..."
  sleep 5
  
  docker-compose -f deployment/docker/docker-compose.yml ps
EOSSH

echo ""
echo "✅ Backend deployed successfully"
echo "API URL: http://$EC2_IP:8080/api/v1"