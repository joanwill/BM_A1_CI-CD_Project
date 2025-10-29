provider "docker" {
  host = "npipe:////./pipe/dockerDesktopLinuxEngine"
}

variable "env" {
  description = "Deployment environment: staging or production"
  type        = string
  default     = "staging"
}

variable "dockerhub_user" {
  description = "Docker Hub username or org that hosts the images"
  type        = string
}

locals {
  tag            = var.env == "production" ? "latest" : "staging"
  backend_image  = "${var.dockerhub_user}/tasks-backend:${local.tag}"
  frontend_image = "${var.dockerhub_user}/tasks-frontend:${local.tag}"
}

resource "docker_image" "backend" {
  name = local.backend_image
}

resource "docker_image" "frontend" {
  name = local.frontend_image
}

resource "docker_container" "backend" {
  name  = "tasks-backend-${var.env}"
  image = docker_image.backend.image_id

  ports {
    internal = 8000
    external = var.env == "production" ? 8080 : 8000
  }

  env = [
    "DATABASE_URL=sqlite:///./tasks.db",
    "CORS_ORIGINS=*",
  ]
}

resource "docker_container" "frontend" {
  name       = "tasks-frontend-${var.env}"
  image      = docker_image.frontend.image_id
  depends_on = [docker_container.backend]

  ports {
    internal = 80
    external = var.env == "production" ? 8081 : 5173
  }

  env = [
    "VITE_API_BASE_URL=http://localhost:${var.env == "production" ? 8080 : 8000}"
  ]
}
