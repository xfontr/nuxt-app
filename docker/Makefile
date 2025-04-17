IMAGE_NAME = portfolio
CONTAINER_NAME = portfolio-container
DOCKER_PORT = 8080

SETUP_SCRIPT = ./setup.sh
DOCKER_BUILD_CMD = docker build -t $(IMAGE_NAME) .
DOCKER_RUN_CMD = docker run -d -p $(DOCKER_PORT):$(DOCKER_PORT) --name $(CONTAINER_NAME) $(IMAGE_NAME)

.PHONY: all setup build run

init: setup build run

setup:
	@echo "Running setup script..."
	$(SETUP_SCRIPT)

build:
	@echo "Building Docker image..."
	$(DOCKER_BUILD_CMD)

run:
	@echo "Running Docker container..."
	$(DOCKER_RUN_CMD)

refresh:
	@echo "Cleaning local app folder..."
	- rm -rf ./app

	@echo "Stopping and removing Docker container..."
	- docker stop $(CONTAINER_NAME)
	- docker rm $(CONTAINER_NAME)

	@echo "Removing Docker image..."
	- docker rmi $(IMAGE_NAME)

	@echo "Rebuilding and running Docker container..."
	$(MAKE) init