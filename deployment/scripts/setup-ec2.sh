#!/bin/bash
set -e

# Update system
apt-get update
apt-get upgrade -y

# Install Docker
apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Install Docker Compose (standalone)
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Enable Docker service
systemctl enable docker
systemctl start docker

# Add ubuntu user to docker group
usermod -aG docker ubuntu

# Install essential tools
apt-get install -y git curl wget htop

# Create app directory
mkdir -p /home/ubuntu/springboard-talent
chown -R ubuntu:ubuntu /home/ubuntu/springboard-talent

# Log completion
echo "=== EC2 Setup Complete ===" > /var/log/springboard-setup.log
echo "Docker version: $(docker --version)" >> /var/log/springboard-setup.log
echo "Docker Compose version: $(/usr/local/bin/docker-compose --version)" >> /var/log/springboard-setup.log
echo "" >> /var/log/springboard-setup.log
echo "Next steps:" >> /var/log/springboard-setup.log
echo "1. SSH into EC2: ssh -i ~/.ssh/springboard-talent ubuntu@<IP>" >> /var/log/springboard-setup.log
echo "2. Clone your repo: git clone https://github.com/wilsonks1982/springboard-talent-platform.git /home/ubuntu/springboard-talent" >> /var/log/springboard-setup.log
echo "3. Run docker-compose: cd /home/ubuntu/springboard-talent && docker-compose up -d" >> /var/log/springboard-setup.log