output "ec2_instance_id" {
  description = "EC2 instance ID"
  value       = aws_instance.backend.id
}

output "ec2_public_ip" {
  description = "EC2 public IP address"
  value       = aws_eip.backend.public_ip
}

output "ec2_public_dns" {
  description = "EC2 public DNS"
  value       = aws_instance.backend.public_dns
}

output "backend_api_url" {
  description = "Backend API URL"
  value       = "http://${aws_eip.backend.public_ip}:${var.backend_port}/api/v1"
}

output "s3_bucket_name" {
  description = "S3 bucket name for frontend"
  value       = aws_s3_bucket.frontend.id
}

output "s3_bucket_website_endpoint" {
  description = "S3 website endpoint"
  value       = aws_s3_bucket_website_configuration.frontend.website_endpoint
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "subnet_id" {
  description = "Subnet ID"
  value       = aws_subnet.public.id
}

output "security_group_id" {
  description = "Security group ID"
  value       = aws_security_group.ec2.id
}

output "ssh_command" {
  description = "SSH command to connect to EC2"
  value       = "ssh -i <your-key-pair>.pem ubuntu@${aws_eip.backend.public_ip}"
}