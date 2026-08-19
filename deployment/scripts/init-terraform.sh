#!/bin/bash
set -e

echo "=== Initializing Terraform ==="

cd "$(dirname "$0")/../terraform"

# Verify AWS CLI
if ! aws sts get-caller-identity &> /dev/null; then
  echo "❌ AWS credentials not configured"
  exit 1
fi

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGION=$(aws configure get region)

echo "✓ AWS Account: $ACCOUNT_ID"
echo "✓ AWS Region: $REGION"
echo ""

# Initialize Terraform
terraform init

echo ""
echo "✅ Terraform initialized"
echo ""
echo "Next steps:"
echo "  1. Generate SSH key: ssh-keygen -f ~/.ssh/springboard-talent"
echo "  2. Review: terraform plan"
echo "  3. Apply: terraform apply"