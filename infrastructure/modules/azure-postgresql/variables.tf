variable "db_name" {
  type        = string
  description = "The name of the PostgreSQL server"
}

variable "resource_group" {
  type        = string
  description = "The Azure resource group"
}

variable "location" {
  type        = string
  description = "The Azure region"
}

variable "admin_username" {
  type        = string
  description = "Administrator username"
}

variable "admin_password" {
  type        = string
  description = "Administrator password"
  sensitive   = true
}

variable "sku_name" {
  type        = string
  description = "The SKU for the flexible server"
  default     = "GP_Standard_D2s_v3"
}

variable "storage_mb" {
  type        = number
  description = "Storage size in MB"
  default     = 32768
}

variable "backup_retention_days" {
  type        = number
  description = "Backup retention days"
  default     = 7
}

variable "ha_enabled" {
  type        = bool
  description = "Enable High Availability"
  default     = false
}
