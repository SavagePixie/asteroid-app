# Asteroid App

## About

Asteroid App is an automated WhatsApp account that provides information about the asteroids closest to Earth.

### How it works

When someone sends a WhatsApp message to your Twilio phone number, Twilio sends the request to your API endpoint. The API then tries to parse the request. It makes sure they're asking for closest asteroids to earth and that they provide valid dates (or no dates, in which case today will be assumed). If the validation is successful, it'll make a request to [NASA's NeoWs API](https://api.nasa.gov/index.html#browseAPI) and format and return the result as a WhatsApp message. Otherwise, it will fetch a random fact from [Cat Facts API](https://catfact.ninja/) and send a WhatsApp message apologising for not being able to understand the user's request and offering a random cat fact as consolation.

## Features

- Node.js web server using [Express.js](https://npm.im/express)
- Twilio's [WhatsApp API](https://www.twilio.com/whatsapp)
- [NASA's NeoWs API](https://api.nasa.gov/index.html#browseAPI)
- [Cat Facts API](https://catfact.ninja/)

## How to use it

1. Create a copy using [GitHub's repository template](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) functionality
2. Update the [`README.md`](README.md) and [`package.json`](package.json) with the respective values.

## Set up

### Requirements

- [Node.js](https://nodejs.org/)
- A Twilio account - [sign up](https://www.twilio.com/try-twilio)
- An API key for [NASA's open APIs](https://api.nasa.gov/index.html#signUp)

### Configuration

Asteroid App requires to configure environment variables related to NASA and the port on which the server is to listen for incoming requests. You should declare the following environment variables:

| Key | Description                                                                                                                                                  |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NASA_API_KEY | Your key to the NASA API. You can get one [on their website](https://api.nasa.gov/index.html#signUp) |
| NASA_HOST | It should have the following value: `api.nasa.gov`. |
| NASA_PATH | It should have the following value: `/neo/rest/v1/feed`. |
| PORT | The port on which you want your server to be available. |

### Local development

After the above requirements have been met:

1. Clone this repository and `cd` into it

```bash
git clone git@github.com:SavagePixie/asteroid-app.git
cd asteroid-app
```

2. Install dependencies

```bash
npm install
```

3. Run the application in dev mode

```bash
npm run dev
```

4. After you're happy with all your changes, deploy the application in your server and start node

```bash
npm start
```

5. On your Twilio dashboard, configure [your WhatsApp sandbox](https://www.twilio.com/console/sms/whatsapp/sandbox). To do so, after you've deployed your application, set the option `WHEN A MESSAGE COMES IN` in your WhatsApp sandbox to your server's url followed by `/api` (e.g. `https://www.example.url.net/api`)

### Deployment

This project is set to be automatically deployed using [Heroku](https://www.heroku.com/). If you want to use any other means to deploy it, you can simply delete the [`.circleci`](.circleci) folder.

## License

[MIT](http://www.opensource.org/licenses/mit-license.html)

## Disclaimer

No warranty expressed or implied. Software is as is.

[twilio]: https://www.twilio.com
