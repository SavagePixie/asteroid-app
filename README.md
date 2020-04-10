# Asteroid App

## About

Asteroid App is an automated WhatsApp account that provides information about the asteroids closest to Earth.

### How it works



## Features

- Node.js web server using [Express.js](https://npm.im/express)
- Twilio's [WhatsApp API](https://www.twilio.com/whatsapp)
- [Cat Facts API](https://catfact.ninja/)

## How to use it

1. Create a copy using [GitHub's repository template](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) functionality
2. Update the [`README.md`](README.md) and [`package.json`](package.json) with the respective values and create a file named `conf.json`.

## Set up

### Requirements

- [Node.js](https://nodejs.org/)
- A Twilio account - [sign up](https://www.twilio.com/try-twilio)

### Configuration

Asteroid App requires a file named `conf.json` where all the configuration is set. It should contain a JSON object with the following entries:

| Key | Description                                                                                                                                                  |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| nasa | An object with the keys `apiKey`, `host` and `path`. |
| nasa.apiKey | Your key to the NASA API. You can get one [on their website](https://api.nasa.gov/index.html#signUp) |
| nasa.host | It should have the following value: `"api.nasa.gov"`. |
| nasa.path | It should have the following value: `"/neo/rest/v1/feed"`. |
| port | The port on which you want your server to be available. |
| twilioSid  | Your primary Twilio account identifier. Find this [in the Console](https://www.twilio.com/console).                                                         |
| twilioToken   | Used to authenticate. Just like the above, [you'll find this here](https://www.twilio.com/console).                                                         |
| twilioPhone | A Twilio phone number in [E.164 format](https://en.wikipedia.org/wiki/E.164) starting with `whatsapp:`. You can [get one here](https://www.twilio.com/console/phone-numbers/incoming) |

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

3. Run the application

```bash
npm start
```

That's it!

### Tests

You can run the tests locally by typing:

```bash
npm test
```

## License

[MIT](http://www.opensource.org/licenses/mit-license.html)

## Disclaimer

No warranty expressed or implied. Software is as is.

[twilio]: https://www.twilio.com
