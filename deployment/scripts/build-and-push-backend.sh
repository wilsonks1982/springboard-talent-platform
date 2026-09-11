#!/bin/bash
set -e

ECR_REPO_NAME=${1:-springboard-talent-backend}
IMAGE_TAG=${2:-latest}
REGISTRY_ALIAS=${3:-}


echo "=== Building Backend Docker Image for Public ECR ==="
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
  aws ecr-public create-repository --repository-name $ECR_REPO_NAME --region us-east-1
  echo "✓ Public repository created"
else
  echo "✓ Public repository exists"
fi

# Login to public ECR
echo ""
echo "Logging in to public ECR with AWS CLI and Docker client..."
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws

if [ -z "$REGISTRY_ALIAS" ]; then
  echo "Auto-detecting registry alias..."
  REGISTRY_ALIAS=$(aws ecr-public describe-repositories --region us-east-1 --query 'repositories[0].repositoryUri' --output text 2>/dev/null | cut -d'/' -f2)
  
  if [ -z "$REGISTRY_ALIAS" ]; then
    echo "❌ Auto-detect failed. No existing repositories found."
    echo "   Please provide your registry alias:"
    echo "   ./build-and-push.sh $ECR_REPO_NAME $IMAGE_TAG your-alias"
    exit 1
  fi
  echo "✓ Registry alias auto-detected: $REGISTRY_ALIAS"
fi


# Set public ECR URL
PUBLIC_ECR_URL="public.ecr.aws/$REGISTRY_ALIAS/$ECR_REPO_NAME"

# Build image
echo ""
echo "Building Docker image..."
docker build -f backend/Dockerfile -t $PUBLIC_ECR_URL:$IMAGE_TAG -t $PUBLIC_ECR_URL:latest backend/

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