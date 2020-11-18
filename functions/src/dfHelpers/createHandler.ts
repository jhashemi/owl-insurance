import {
  GoogleCloudDialogflowV2Context,
  GoogleCloudDialogflowV2WebhookRequest,
} from "actions-on-google";
import { WebhookClient } from "dialogflow-fulfillment";

export const createHandler = (
  dfRequest: GoogleCloudDialogflowV2WebhookRequest,
  createContexts?: () => GoogleCloudDialogflowV2Context[],
  textResponse?: string
) => (agent: WebhookClient): void => {
  agent.add(
    textResponse ??
      (dfRequest.queryResult?.fulfillmentText || "No Fulfillment Text Set")
  );

  if (createContexts) {
    createContexts().forEach((context) => agent.setContext(context));
  }
};

export default createHandler;
