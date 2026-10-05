resource "kubernetes_namespace" "this" {
  metadata {
    name = var.namespace_name
    labels = {
      managed_by = "narangos"
    }
  }
}

resource "kubernetes_resource_quota" "this" {
  metadata {
    name = "quota-${var.namespace_name}"
    namespace = kubernetes_namespace.this.metadata[0].name
  }
  spec {
    hard = {
      cpu    = var.cpu_quota
      memory = var.memory_quota
    }
  }
}
