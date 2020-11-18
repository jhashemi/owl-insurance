import { GoogleCloudDialogflowV2WebhookRequest } from "actions-on-google";
import { findContext } from "twilio-ccai-fulfillment-tools";

import createHandler from "../../dfHelpers/createHandler";
import { createNamedContext } from "../../dfHelpers/createNamedContext";
import { createTaskAttributesContext } from "../../dfHelpers/createTaskAttributesContext";

const HIGH_VALUE_NAMES = ["Tom", "James"];

const createEscalateContexts = (
  dfRequest: GoogleCloudDialogflowV2WebhookRequest
) => {
  const nameContext = findContext(
    "name",
    dfRequest.queryResult?.outputContexts
  );

  const name = nameContext?.parameters?.["name.original"] || "Unknown";
  const value = HIGH_VALUE_NAMES.includes(name) ? "HIGH" : "LOW";

  return () => [
    createNamedContext("escalation", { action: "escalate" }),
    createTaskAttributesContext({ value, name }),
  ];
};

export const createEscalateOrRejectHandler = (
  dfRequest: GoogleCloudDialogflowV2WebhookRequest
) => {
  let escalate = true;

  if (
    dfRequest.originalDetectIntentRequest?.payload?.task_router_stats?.workers
      ?.available_workers?.length === 0
  ) {
    escalate = false;
  }

  return createHandler(
    dfRequest,
    escalate ? createEscalateContexts(dfRequest) : undefined,
    escalate
      ? "I'll put you through to someone now. Hold tight!"
      : "Sorry, all of our agents are busy. Please try again later."
  );
};
