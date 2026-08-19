#!/bin/bash
set -e

AWS_ACCOUNT_ID=${1:-}
AWS_REGION=${2:-us-east-1}
ECR_REPO_NAME=${3:-springboard-talent-backend}
IMAGE_TAG=${4:-latest}

if [ -z "$AWS_ACCOUNT_ID" ]; then
  AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
fi

echo "=== Building Backend Docker Image for Public ECR ==="
echo "Account: $AWS_ACCOUNT_ID"
echo "ECR Repo: $ECR_REPO_NAME"
echo "Tag: $IMAGE_TAG"
echo ""

# Check if Dockerfile exists
if [ ! -f "backend/Dockerfile" ]; then
  echo "❌ Dockerfile not found at backend/Dockerfile"
  exit 1
fi

# Create public ECR repository if it doesn't exist
echo "Checking public ECR repository..."
if ! aws ecr-public describe-repositories --repository-names $ECR_REPO_NAME --region us-east-1 &> /dev/null; then
  echo "Creating public ECR repository: $ECR_REPO_NAME"
  aws ecr-public create-repository \
    --repository-name $ECR_REPO_NAME \
    --region us-east-1
  echo "✓ Public repository created"
else
  echo "✓ Public repository exists"
fi

# Login to public ECR
echo ""
echo "Logging in to public ECR..."
aws ecr-public get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin public.ecr.aws

# Set public ECR URL
PUBLIC_ECR_URL="public.ecr.aws/l1s7l1v5/springboard-talent-backend"

# Build image
echo ""
echo "Building Docker image..."
docker build \
  -f backend/Dockerfile \
  -t $PUBLIC_ECR_URL:$IMAGE_TAG \
  -t $PUBLIC_ECR_URL:latest \
  backend/

# Push to public ECR
echo ""
echo "Pushing to public ECR..."
docker push $PUBLIC_ECR_URL:$IMAGE_TAG
docker push $PUBLIC_ECR_URL:latest

echo ""
echo "✅ Backend built and pushed to public ECR successfully"
echo ""
echo "=== Public ECR Details ==="
echo "Repository: $PUBLIC_ECR_URL"
echo "Image URL: $PUBLIC_ECR_URL:$IMAGE_TAG"
echo "Pull Command: docker pull $PUBLIC_ECR_URL:$IMAGE_TAG"
echo ""
echo "For local testing, use this in your docker-compose:"
echo ""
echo "  image: $PUBLIC_ECR_URL:$IMAGE_TAG"
echo ""