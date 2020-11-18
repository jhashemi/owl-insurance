import { GoogleCloudDialogflowV2WebhookRequest } from "actions-on-google";
import {
  createDynamicContextPanelMap,
  findContext,
} from "twilio-ccai-fulfillment-tools";

import {
  createProfileSection,
  createInfoCard,
  SECTIONS,
} from "../../contextPanels";
import createHandler from "../../dfHelpers/createHandler";
import { DAD_JOKES } from "./dadJokes";

export const createWelcomeHandler = (
  dfRequest: GoogleCloudDialogflowV2WebhookRequest
) =>
  createHandler(dfRequest, () => [
    createDynamicContextPanelMap({
      [SECTIONS.PROFILE]: createProfileSection({}),
    }),
  ]);

export const createContextAwareWelcomeHandler = (
  dfRequest: GoogleCloudDialogflowV2WebhookRequest
) =>
  createHandler(dfRequest, () => {
    const nameContext = findContext(
      "name",
      dfRequest.queryResult?.outputContexts
    );
    const phoneNumberContext = findContext(
      "phone_number",
      dfRequest.queryResult?.outputContexts
    );

    return [
      createDynamicContextPanelMap({
        [SECTIONS.PROFILE]: createProfileSection({
          name: nameContext?.parameters?.["name.original"],
          phoneNumber:
            phoneNumberContext?.parameters?.phone_number === "Anonymous"
              ? "Chat"
              : phoneNumberContext?.parameters?.phone_number,
        }),
      }),
    ];
  });

export const createHelpHandler = (
  dfRequest: GoogleCloudDialogflowV2WebhookRequest
) =>
  createHandler(dfRequest, () => [
    createDynamicContextPanelMap({
      [SECTIONS.INFO_CARD]: createInfoCard({
        title: "Help",
        data: "They need help, give them a hand!",
      }),
    }),
  ]);

export const createDadJokeHandler = (
  dfRequest: GoogleCloudDialogflowV2WebhookRequest
) => {
  const joke = DAD_JOKES[Math.floor(Math.random() * DAD_JOKES.length)];

  return createHandler(
    dfRequest,
    () => [
      createDynamicContextPanelMap({
        [SECTIONS.INFO_CARD]: createInfoCard({
          title: "Dad Joke Required URGENT",
          data: joke,
        }),
      }),
    ],
    joke
  );
};
