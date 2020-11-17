import { GoogleCloudDialogflowV2WebhookRequest } from "actions-on-google";
import { WebhookClient } from "dialogflow-fulfillment";
import {
  TMapContext,
  TListContext,
  TDocumentContext,
} from "twilio-ccai-fulfillment-tools";

export const createHandler = (
  dfRequest: GoogleCloudDialogflowV2WebhookRequest,
  createContext: () =>
    | TMapContext
    | TListContext
    | TDocumentContext
    | undefined,
  createTextResponse?: () => string | undefined
) => (agent: WebhookClient): void => {
  agent.add(
    (createTextResponse
      ? createTextResponse()
      : dfRequest.queryResult?.fulfillmentText) || "No Fulfillment Text Set"
  );
  const context = createContext();
  if (context) {
    agent.setContext(context);
  }
};

export default createHandler;
