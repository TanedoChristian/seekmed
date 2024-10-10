#!/bin/bash

# Clear configuration cache
echo "Clearing configuration cache..."
./vendor/bin/sail artisan config:clear
./vendor/bin/sail artisan config:cache

# Clear route cache
echo "Clearing route cache..."
./vendor/bin/sail artisan route:clear
./vendor/bin/sail artisan route:cache

echo "Cache cleared and updated successfully!"
