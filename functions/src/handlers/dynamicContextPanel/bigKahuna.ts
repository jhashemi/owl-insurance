import { GoogleCloudDialogflowV2WebhookRequest } from "actions-on-google";
import {
  createCard,
  createDetail,
  createDynamicContextPanelMap,
  createIframe,
  createImageItem,
  createNotification,
  createPhoneNumberItem,
  createProfile,
  createTextItem,
  createTimeline,
  SIZES,
} from "twilio-ccai-fulfillment-tools";

import createHandler from "../../dfHelpers/createHandler";

enum SECTIONS {
  PROFILE,
  TRUE_BLUE,
  ADDRESS,
  PURCHASE_HISTORY,
  CONTACT_HISTORY,
  IFRAME,
  CURRENT_TRIP,
  DATES,
  PACKAGE_HOLIDAY,
  OCCASION,
  HOTEL_CHOICE,
  ADULTS_ONLY,
  ALL_INCLUSIVE,
  SELECT_VEHICLE,
  NOTIFICATION,
  TEST,
}

export const createBigKahunaHandler = (
  dfRequest: GoogleCloudDialogflowV2WebhookRequest
) =>
  createHandler(dfRequest, () => [
    createDynamicContextPanelMap({
      [SECTIONS.PROFILE]: createProfile({
        position: SECTIONS.PROFILE,
        width: SIZES.THIRD,
        items: [
          createImageItem({
            data: "https://avatars.dicebear.com/api/male/big_kauna.svg",
          }),
          createTextItem({
            data: "Mauro Failli",
          }),
          createPhoneNumberItem({
            data: "(412) 715-4205",
          }),
        ],
      }),
      [SECTIONS.TRUE_BLUE]: createDetail({
        position: SECTIONS.TRUE_BLUE,
        width: SIZES.TWO_THIRD,
        items: [
          createTextItem({
            title: "Rewards Number",
            data: "2169149460",
          }),
          createTextItem({
            title: "Rewards Point Balance",
            data: "11,375",
          }),
        ],
      }),
      [SECTIONS.ADDRESS]: createCard({
        position: SECTIONS.ADDRESS,
        items: [
          createTextItem({
            title: "Address",
            data: "123 Cherry Lane, New York, NY 10002",
          }),
        ],
      }),
      [SECTIONS.PURCHASE_HISTORY]: createTimeline({
        position: SECTIONS.PURCHASE_HISTORY,
        width: SIZES.HALF,
        title: "Customer Purchase History",
        items: [
          {
            title: "New York City ➡️ Aruba",
            subtitle: "3/2/2019   $3,878.50",
          },
          {
            title: "New York City ➡️ Bahamas",
            subtitle: "11/2/2019   $4,536.43",
          },
        ],
      }),
      [SECTIONS.CONTACT_HISTORY]: createTimeline({
        position: SECTIONS.CONTACT_HISTORY,
        width: SIZES.HALF,
        title: "Customer Contact History",
        items: [
          {
            title: "Phone Call",
            subtitle: "1/19/2019",
          },
          {
            title: "Webchat",
            subtitle: "02/10/2020",
          },
          {
            title: "Phone Call",
            subtitle: "02/13/2020",
          },
        ],
      }),
      [SECTIONS.CURRENT_TRIP]: createDetail({
        position: SECTIONS.CURRENT_TRIP,
        items: [
          createTextItem({
            title: "Current Trip",
            data: "Punta Cana",
          }),
        ],
      }),
      [SECTIONS.IFRAME]: createIframe({
        position: SECTIONS.IFRAME,
        title: "Look, it's Google!",
        height: "400px",
        url: "https://www.google.com/",
      }),
      [SECTIONS.NOTIFICATION]: createNotification({
        position: SECTIONS.NOTIFICATION,
        type: "success",
        title: "This example is big!",
        text: "Destination: Punta Cana",
      }),
    }),
  ]);
