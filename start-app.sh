#!/bin/bash

# Step 1: Start the containers in detached mode
./vendor/bin/sail up -d

# Step 2: Wait for the container to be up and running
# Checking the status of the Laravel container (you may adjust the service name based on your docker-compose.yml)
echo "Waiting for the Sail containers to be ready..."
while ! ./vendor/bin/sail ps | grep "laravel.test"; do
  sleep 2
done

echo "Containers are up and running!"

# Step 3: Start the Laravel development server in the background
./vendor/bin/sail artisan serve &

# Step 4: Start the npm process in the foreground
./vendor/bin/sail npm run dev
