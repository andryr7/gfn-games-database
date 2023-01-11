# GFN-Games-Database

This is a small project I built to train both my back-end and front-end abilities.
It consists in a database that lists GeforceNow available games.
The server is almost autonomous as it can gather data directly from the official website of the platform and the IGDB API. 
To deploy it though, you will need twitch and IGDB credentials as ENV variables.

The back-end of the app is built on Express and the front-end is built on Vite and React, using Axios, Styled Components and React Router.

Please keep in mind that this is at the moment still a work in progress, as I need to implement automatic data gathering timing methods