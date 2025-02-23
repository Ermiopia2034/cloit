#!/usr/bin/env bash
# exit on error
set -e

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Build the application
npm run build
