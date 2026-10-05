variable "namespace_name" {
  type        = string
  description = "The name of the K8s namespace"
}

variable "cpu_quota" {
  type        = string
  description = "CPU quota for the namespace"
  default     = "4"
}

variable "memory_quota" {
  type        = string
  description = "Memory quota for the namespace"
  default     = "16Gi"
}
