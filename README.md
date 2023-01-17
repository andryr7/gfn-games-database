# GFN-Games-Database

This is a small project I built to train both my back-end and front-end abilities.
It consists in a database that lists GeforceNow available games.
The server is almost autonomous as it can gather data directly from the official website of the platform and the IGDB API. 
To deploy you will need IGDB credentials as ENV variables.

The back-end of the app is built on Express and the front-end is built on Vite and React, using Axios, Styled Components and React Router.

## Setting a test/local environment

1. Initialize client

.Install dependencies:

   ```bash
   yarn
   ```
   
.Build a static version of the client that will be served by the node/express server:

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
  AUTOMATE_APP=true
  ```

.Launch a dev server/Serve the server.js file:

  ```bash
  yarn devStart
  ```

## Deploying in production

- Follow the same steps as for the test setup but make sure your .env file is protected, or use another method to insert env values.
- Please keep in mind that this app cannot be deployed on certain shared hosting solutions as it requires certain programs to be installed (ex: chromium). You can still deploy on solutions like cpanel and its node app utility but the app won't be able to fetch new games in an automatic way.
- To do so, you will first need to run it in a test environment, to gather data in the generated json files in the tmp folder. You also have to change the value of AUTOMATE_APP to 'false' in your .env file or in your env variables manager.