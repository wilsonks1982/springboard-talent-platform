# IAM Role for EC2
resource "aws_iam_role" "ec2_role" {
  name = "${var.app_name}-ec2-role-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

# IAM Policy for S3 and CloudWatch access
resource "aws_iam_role_policy" "ec2_policy" {
  name = "${var.app_name}-ec2-policy-${var.environment}"
  role = aws_iam_role.ec2_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.frontend.arn,
          "${aws_s3_bucket.frontend.arn}/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "cloudwatch:PutMetricData",
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "*"
      }
    ]
  })
}

# IAM Instance Profile
resource "aws_iam_instance_profile" "ec2_profile" {
  name = "${var.app_name}-ec2-profile-${var.environment}"
  role = aws_iam_role.ec2_role.name
}

# EC2 Instance
resource "aws_instance" "backend" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.ec2_instance_type
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.ec2.id]
  iam_instance_profile   = aws_iam_instance_profile.ec2_profile.name

  # ✅ ADD THIS LINE - Connect your SSH key
  key_name = aws_key_pair.ec2_key.key_name

  root_block_device {
    volume_type           = "gp3"
    volume_size           = var.ec2_root_volume_size
    delete_on_termination = true
    encrypted             = true
  }

  monitoring                  = var.enable_detailed_monitoring
  associate_public_ip_address = true

  user_data = base64encode(file("${path.module}/../scripts/setup-ec2.sh"))

  tags = {
    Name = "${var.app_name}-backend-${var.environment}"
  }

  depends_on = [aws_internet_gateway.main, aws_key_pair.ec2_key]
}

# Elastic IP for EC2 (optional but useful)
resource "aws_eip" "backend" {
  instance = aws_instance.backend.id
  domain   = "vpc"

  tags = {
    Name = "${var.app_name}-eip-${var.environment}"
  }

  depends_on = [aws_internet_gateway.main]
}