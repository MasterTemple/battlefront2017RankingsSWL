# Stayed Up Till 4 AM Making This
### Screenshot
![](https://media.discordapp.net/attachments/886556470198546534/886562661322612798/unknown.png)

# Purpose
Tracks Data From [Here](https://docs.google.com/spreadsheets/d/1MJLybB_wugeYsh3u1OyBRYCWNC1eJzHVJybJknagbqc/edit?usp=sharing). To allow for a `/rank` command to view stats [(See Above)](#screenshot) and auto update Discord roles to match the players current league.

# Setup
1. run `npm install`
2. run `npm i nodemon -g`
3. add a `config.json` into `./data/` that looks like this
```json
{
    "token": "YOUR_TOKEN_GOES_HERE"
}
```
4. add a `creds.json` into `./data/` which is the downloaded JSON credentials you get for creating a Google desktop application. Looks something like this
```json
{
  "type": "service_account",
  "project_id": "Star Wars Leagues",
  "private_key_id": "SECRET_STUFF",
  "private_key": "-----BEGIN PRIVATE KEY-----LOTS_OF_SECRET_STUFF-----END PRIVATE KEY-----\n",
  "client_email": "star-wars-leagues@star-wars-leagues.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/star-wars-leagues%40star-wars-leagues-123456.iam.gserviceaccount.com"
}
```
5. run `nodemon index.js`