# GFN-Games-Database

This is a small project I built to train both my back-end and front-end abilities.
It consists in a database that lists GeforceNow available games.
The server is almost autonomous as it can gather data directly from the official website of the platform and the IGDB API. 
To deploy you will need IGDB credentials as ENV variables.

The back-end of the app is built on Express and the front-end is built on Vite and React, using Axios, Styled Components and React Router.

## Deploying in a test environment

1. Initialize client

.Install dependencies:

   ```bash
   yarn
   ```
   
.Build a static version of the client that will be served by the node server:

  ```bash
  yarn build
   ```
  
2. Initialize server

.Install dependencies:

   ```bash
   yarn
   ```

.Create a .env file following the example.env file with your IGDB API credentials:

  ```bash
  IGDB_CLIENT_ID=
  IGDB_CLIENT_SECRET=
  ```

.Launch the dev server:

  ```bash
  yarn devStart
  ```

## Deploying in production

- Follow the same steps as for the test environment but make sure your .env file is protected, or use another method to insert env values.
- Please keep in mind that this app cannot be deployed on certain shared hosting solutions as it requires certain programs to be installed (ex: chromium). You can still deploy on solutions like cpanel but it the app won't be able to fetch new games in an automatic way.
- To do so, you will first need to run it in a test environment, to gather data in the generated json file in the tmp folder. Once it's done, you will need to comment the automation function and uncomment the simpler loading function. Finally, deploy the app while making sure the 'tmp' folder is still present.