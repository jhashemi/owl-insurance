import { GoogleCloudDialogflowV2WebhookRequest } from "actions-on-google";
import { WebhookClient } from "dialogflow-fulfillment";
import { https, logger } from "firebase-functions";

// DOCUMENT
// import {
//   createHelpHandler,
//   // createWelcomeHandler,
//   createContextAwareWelcomeHandler,
//   createDadJokeHandler,
// } from "./handlers/dynamicContextPanel/document";

// LIST
// import {
//   createHelpHandler,
//   // createWelcomeHandler,
//   createContextAwareWelcomeHandler,
//   createDadJokeHandler,
// } from "./handlers/dynamicContextPanel/list";

// MAP
import {
  createHelpHandler,
  // createWelcomeHandler,
  createContextAwareWelcomeHandler,
  createDadJokeHandler,
} from "./handlers/dynamicContextPanel/map";

// THE BIG ONE
import { createBigKahunaHandler } from "./handlers/dynamicContextPanel/bigKahuna";

// OTHER HANDLERS
import { createEscalateOrRejectHandler } from "./handlers/standard/escalateOrReject";

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
    intentMap.set("name-given", createContextAwareWelcomeHandler(dfRequest));
    intentMap.set("help", createHelpHandler(dfRequest));
    intentMap.set("big-kahuna", createBigKahunaHandler(dfRequest));
    intentMap.set("dad-joke", createDadJokeHandler(dfRequest));
    intentMap.set("speak-to-agent", createEscalateOrRejectHandler(dfRequest));
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
