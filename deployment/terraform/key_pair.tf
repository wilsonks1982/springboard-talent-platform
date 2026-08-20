# Use existing SSH key from ~/.ssh/springboard-talent.pub
resource "aws_key_pair" "ec2_key" {
  key_name   = "${var.app_name}-ec2-key-${var.environment}"
  public_key = file("~/.ssh/springboard-talent.pub")

  tags = {
    Name = "${var.app_name}-ec2-key-${var.environment}"
  }
}