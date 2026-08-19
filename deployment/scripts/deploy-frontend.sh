#!/bin/bash
set -e

BUCKET_NAME=${1:-}
ENV=${2:-dev}

if [ -z "$BUCKET_NAME" ]; then
  echo "Usage: ./deploy-frontend.sh <bucket-name> [environment]"
  exit 1
fi

echo "=== Deploying Frontend to S3 ==="
echo "Bucket: $BUCKET_NAME"
echo "Environment: $ENV"
echo ""

# Verify bucket exists
if ! aws s3 ls "s3://$BUCKET_NAME" &> /dev/null; then
  echo "❌ S3 bucket not found: $BUCKET_NAME"
  exit 1
fi

# Build frontend
echo "Building frontend..."
cd springboard-talent-frontend
NODE_ENV=$ENV npm run build
cd - > /dev/null

# Deploy to S3
echo "Syncing to S3..."
aws s3 sync springboard-talent-frontend/dist/ s3://$BUCKET_NAME \
  --delete \
  --cache-control "max-age=31536000,public" \
  --exclude "index.html" \
  --exclude "*.map"

# Upload index.html with no cache
aws s3 cp springboard-talent-frontend/dist/index.html s3://$BUCKET_NAME/index.html \
  --cache-control "no-cache,no-store,must-revalidate" \
  --content-type "text/html"

echo ""
echo "✅ Frontend deployed successfully"
echo "URL: http://$(aws s3api get-bucket-website s3://$BUCKET_NAME --query 'WebsiteConfiguration.IndexDocument.Suffix' --output text 2>/dev/null || echo 'Check S3 website endpoint')"