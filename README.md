# Simple Note E2E Tests 

This repo keeps e2e tests between the [Backend](https://github.com/luislhl/desafio_vtex_back) and [Frontend](https://github.com/luislhl/desafio_vtex_front) of the Simplenote App.

The tests run against docker images of both the frontend and backend projects, to assure that changes made to one project do not break the contract between them. 

There is also a Docker image of this PR, that we use to run the tests in the CI of both backend and frontend.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Docker
- Yarn

### Installing

Install the Node.js dependencies

```sh
yarn install
```

## Running the Tests

### Using the Docker image

To run the tests locally using Docker, just run:

```sh
docker-compose build
docker-compose run tests
```

### Run outside Docker 

You can also run it directly with Cypress in your local computer, to be able to use its interactive runner.

But you will still need to run the other projects, and we suggest doing so using Docker:

```sh
docker-compose up -d dynamodb backend frontend
yarn cypress open
```

## Deployment

Every time a PR is created, a new build will be triggered in CircleCI.

If the build is successfull, the Docker image will be built and pushed to DockerHub, using the build number as a tag for the imagse.
Builds in the `master` branch will also be tagged with the `latest` tag.

## Future Improvements
- Make the screenshots and videos generated during tests available as assets in CircleCI interface.
- Store tests results using CircleCI `store_test_utils` option.
