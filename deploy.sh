
#!/bin/bash

set -e

PROJECT_DIR="$HOME/devsecops-portfolio"
CONTAINER_NAME="cv-container"
URL="http://127.0.0.1:8081/"

echo "=================================="
echo " DevSecOps Portfolio Deployment"
echo "=================================="

# 1. Verifier Docker
if ! command -v docker >/dev/null 2>&1; then
    echo "ERREUR: Docker n'est pas installe."
    exit 1
fi

if ! docker info >/dev/null 2>&1; then
    echo "ERREUR: Docker n'est pas accessible."
    echo "Verifiez le service Docker et les permissions."
    exit 1
fi

# 2. Aller dans le repertoire du projet
cd "$PROJECT_DIR" || exit 1

# 3. Verifier Docker Compose
if ! docker compose config -q; then
    echo "ERREUR: Configuration Docker Compose invalide."
    exit 1
fi

# 4. Construire et deployer
echo "[1/4] Construction et deploiement..."
docker compose up -d --build

# 5. Verifier le conteneur
echo "[2/4] Verification du conteneur..."
docker ps --filter "name=$CONTAINER_NAME"

# 6. Tester le site
echo "[3/4] Test HTTP..."

if curl -fsS --max-time 10 "$URL" -o /dev/null; then
    echo "SUCCES: Le CV est accessible."
    echo "URL: http://192.168.10.177:8081"
else
    echo "ERREUR: Le CV ne repond pas."
    echo "Logs du conteneur:"
    docker logs --tail 50 "$CONTAINER_NAME" || true
    exit 1
fi

echo "[4/4] Deploiement termine."

