resource "azurerm_postgresql_flexible_server" "this" {
  name                          = var.db_name
  resource_group_name           = var.resource_group
  location                      = var.location
  version                       = "13"
  administrator_login           = var.admin_username
  administrator_password        = var.admin_password
  sku_name                      = var.sku_name
  storage_mb                    = var.storage_mb
  backup_retention_days         = var.backup_retention_days
  high_availability_tier        = var.ha_enabled ? "Zone" : "Disabled"
}

resource "azurerm_postgresql_flexible_server_database" "this" {
  name                = var.db_name
  server_id           = azurerm_postgresql_flexible_server.this.id
  collation           = "English_United States.UTF8"
  charset             = "utf8mb4"
}
