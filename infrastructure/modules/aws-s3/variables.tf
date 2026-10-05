variable "bucket_name" {
  type        = string
  description = "The name of the S3 bucket"
}

variable "versioning" {
  type        = bool
  description = "Enable bucket versioning"
  default     = true
}

variable "public_access" {
  type        = bool
  description = "Allow public access to the bucket"
  default     = false
}
