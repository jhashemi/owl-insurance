import { GoogleCloudDialogflowV2WebhookRequest } from "actions-on-google";
import { WebhookClient } from "dialogflow-fulfillment";
import { https, logger } from "firebase-functions";

// DOCUMENT
// import {
//   createHelpHandler,
//   // createWelcomeHandler,
//   createContextAwareWelcomeHandler,
// } from "./demoHandlers/document";

// LIST
// import {
//   createHelpHandler,
//   // createWelcomeHandler,
//   createContextAwareWelcomeHandler,
// } from "./demoHandlers/list";

// MAP
import {
  createHelpHandler,
  // createWelcomeHandler,
  createContextAwareWelcomeHandler,
} from "./demoHandlers/map";

// THE BIG ONE
import { createBigKahunaHandler } from "./demoHandlers/bigKahuna";

export const dialogflowFirebaseFulfillment = https.onRequest(
  async (request, response) => {
    // HELPFUL REFERENCES
    const dfRequest = request.body as GoogleCloudDialogflowV2WebhookRequest;

    // CREATE AGENT FROM REQUEST/RESPONSE
    const agent = new WebhookClient({ request, response });

    // ASSIGN HANDLERS
    const intentMap = new Map();
    intentMap.set(
      "Default Welcome Intent",
      createContextAwareWelcomeHandler(dfRequest)
    );
    intentMap.set("help", createHelpHandler(dfRequest));
    intentMap.set("name-given", createContextAwareWelcomeHandler(dfRequest));
    intentMap.set("big-kahuna", createBigKahunaHandler(dfRequest));
    try {
      await agent.handleRequest(intentMap);
    } catch (error) {
      logger.error(
        `Failed to handle request: ${
          error.message ?? "No error message provided"
        }`
      );
    }
  }
);
