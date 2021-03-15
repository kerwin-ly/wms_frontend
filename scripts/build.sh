#!/usr/bin/env bash

docker build \
  --build-arg SET_IMAGE_TAG=$IMAGE_TAG \
  --build-arg SET_SENTRY_ORG=$SENTRY_ORG \
  --build-arg SET_SENTRY_URL=$SENTRY_URL \
  --build-arg SET_SENTRY_PROJECT=$SENTRY_PROJECT \
  --build-arg SET_SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN \
  -t dockerhub.datagrand.com/$IMAGE_REPO_NAMESPACE/$IMAGE_REPO_NAME:$IMAGE_TAG \
  -f build/Dockerfile .
