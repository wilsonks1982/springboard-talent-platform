variable "aws_profile" {
  description = "AWS CLI profile name for deployment"
  type    = string
  default = "wilson-admin"
}


variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "ap-south-1"
}

variable "environment" {
  description = "Environment name (dev/prod)"
  type        = string
  default     = "dev"

  validation {
    condition     = contains(["dev", "prod"], var.environment)
    error_message = "Environment must be dev or prod."
  }
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "springboard-talent"
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "Public subnet CIDR"
  type        = string
  default     = "10.0.1.0/24"
}

variable "ec2_instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro" # Free tier eligible
}

variable "ec2_root_volume_size" {
  description = "Root volume size in GB"
  type        = number
  default     = 20
}

variable "backend_port" {
  description = "Spring Boot backend port"
  type        = number
  default     = 8080
}

variable "spring_profiles_active" {
  description = "Spring profiles active"
  type        = string
  default     = "dev"
}

variable "cors_allowed_origins" {
  description = "CORS allowed origins (comma-separated)"
  type        = string
  default     = "*"
}

variable "enable_detailed_monitoring" {
  description = "Enable CloudWatch detailed monitoring"
  type        = bool
  default     = false
}

variable "tags" {
  description = "Additional tags"
  type        = map(string)
  default     = {}
}