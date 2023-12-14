FROM node:20

# Install dependencies
RUN apt-get update &&\
  apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
  libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
  libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
  libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
  ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget \
  xvfb x11vnc x11-xkb-utils xfonts-100dpi xfonts-75dpi xfonts-scalable x11-apps

# Cd into client folder
WORKDIR /app/client

# Copy package.json into app client folder
COPY client/package.json .

# Install client dependencies
RUN yarn --prod
COPY client .

# Compile client files
RUN yarn build

# Cd into server folder
WORKDIR /app/server

# Copy package.json into app server folder
COPY server/package.json .

# Install server dependencies
RUN yarn --prod
COPY server .

EXPOSE 3000