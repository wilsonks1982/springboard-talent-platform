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

# Create systemd service for docker-compose
cat > /etc/systemd/system/springboard-talent.service << 'EOF'
[Unit]
Description=Springboard Talent Docker Compose
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
User=ubuntu
WorkingDirectory=/home/ubuntu/springboard-talent
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload

# Log completion
echo "=== EC2 Setup Complete ===" > /var/log/springboard-setup.log
echo "Docker version: $(docker --version)" >> /var/log/springboard-setup.log
echo "Docker Compose version: $(/usr/local/bin/docker-compose --version)" >> /var/log/springboard-setup.log