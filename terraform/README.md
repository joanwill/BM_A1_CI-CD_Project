
# Terraform Deploy (Docker Provider)

Prereqs: Terraform, Docker, images pushed to Docker Hub.

```bash
# staging
terraform init
terraform apply -auto-approve -var="env=staging"

# production
terraform apply -auto-approve -var="env=production"
```
