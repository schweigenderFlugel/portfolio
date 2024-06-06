[![main](https://github.com/schweigenderFlugel/portfolio/actions/workflows/main.yml/badge.svg)](https://github.com/schweigenderFlugel/portfolio/actions/workflows/main.yml)
[![deployment](https://github.com/schweigenderFlugel/portfolio/actions/workflows/deployment.yml/badge.svg)](https://github.com/schweigenderFlugel/portfolio/actions/workflows/deployment.yml)
[![Portfolio](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/detailed/gr9djo/main&style=flat&logo=cypress)](https://cloud.cypress.io/projects/gr9djo/runs)
[![Netlify Status](https://api.netlify.com/api/v1/badges/07a247cb-ff61-4425-a271-fd770107e64c/deploy-status)](https://app.netlify.com/sites/facundo-castro/deploys)

<h1 align="center">My personal portfolio page</h1>

## Descirption
I developed this using astro, with the intention to make something simple and to avoid the excesive use of Javascript. For testing this app runs Cypress and the main reason is the possibility of incluiding Cypress on the CI/CD. This app is deployed in Netlify. 

## Installation

```
npm install --force
```
Note: "--force" is used to avoid the conflicts with the libraries during installation, especially with the linter. I personally do not recommend to force the installation in order to prevent posible failures. 

## Running the app

```
npm run dev
```

## Testing

```
npm run test
```
Note: In order to make the tests work, start-server-and-test library is used to start the server and run the cypress tests later. 

## Build
```
npm run build
```

## Performace Testing
This repository also contains performace tests to be executed with k6. Don't forget to [download]([/guides/content/editing-an-existing-page](https://github.com/grafana/k6/releases)) the binary file and execute it to check out that it works

```
./k6.exe version
```

Then you can execute a performing test, for example: 

```
./k6.exe run load.js
```
For execution of the tests on the cloud, type the next command: 

K6_CLOUD_TOKEN=$GRAFANA_K6_CLOUD_TOKEN ./k6.exe cloud ./k6/smoke.js 