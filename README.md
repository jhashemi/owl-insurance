# Owl Insurance

This repository should contain all you need to get set up with the Owl Insurance Twilio Contact Centre AI Demo.

This is designed to be deployed as a Firebase function, but it should be easy enough to lift'n'shift to your serverless environment of choice.

The star of the show here is the [Twilio CCAI Fulfillment Tools](https://www.npmjs.com/package/twilio-ccai-fulfillment-tools) dependency, that handles the heavy-lifting in terms of creating contexts and correct Dynamic Context Panel sections.

## Pre-requisites

To be able to use the code in this repository, you must have an Agent-Assist capable Dialogflow ES Agent, and have a Twilio Flex environment configured with Twilio Contact Centre AI Integration.

To get these setup, please reach out to your Twilio representative to begin your journey.

## Setup

Run `npm ci` inside the [functions](functions) folder. That should give you all the dependencies you need to get started!

## Agent

Inside the [agent](agent) folder is a ZIP containing the agent used for the demo. Create your own Dialogflow agent, and use the "Restore from ZIP" functionality to create a copy. Don't forget to change your fulfillment webhook URL!

## Modifying

This is written in TypeScript, but should be approachable for anyone familiar with JavaScript. The types really help out when dealing with Dialogflow requests and contexts!

## Development Suggestions

Even without a firebase project, you can `npm run serve` from inside the [functions](functions) folder which will begin the fulfillment function locally, and expose it on a port (by default this is `5001`). You can then use [ngrok](https://ngrok.com/) to create a tunnel to that using:

```
./ngrok http 5001
```

You can then use the generated `https://SOME_GENERATED_STRING.ngrok.io/` url as your fulfillment webhook url. Don't forget to append your the path to your served function (for example, this repo defaults to `owl-insurance-staging/us-central1/dialogflowFirebaseFulfillment`)!

## License

[![DVELP logo](https://raw.githubusercontent.com/DVELP/cookbook/master/assets/dvelp-logo.png "DVELP logo")](http://dvelp.co.uk)

This demo was created and is maintained by DVELP Ltd.

If you like what you see and would like to hire us or join us, [get in touch](http://dvelp.co.uk)!
