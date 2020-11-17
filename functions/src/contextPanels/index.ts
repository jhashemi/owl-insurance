import {
  createProfile,
  createImageItem,
  createTextItem,
  createPhoneNumberItem,
  createCard,
} from "twilio-ccai-fulfillment-tools";

export enum SECTIONS {
  PROFILE,
  INFO_CARD,
}

export const createProfileSection = ({
  name,
  phoneNumber,
}: {
  name?: string;
  phoneNumber?: string;
}) =>
  createProfile({
    position: SECTIONS.PROFILE,
    items: [
      createImageItem({
        data: `https://avatars.dicebear.com/api/male/${name ?? "unknown"}.svg`,
      }),
      createTextItem({
        data: name ?? "Unknown",
      }),
      createPhoneNumberItem({
        data: phoneNumber ?? "Unknown",
      }),
    ],
  });

export const createInfoCard = ({
  title,
  data,
}: {
  title?: string;
  data?: string;
}) =>
  createCard({
    position: SECTIONS.INFO_CARD,
    items: [
      createTextItem({
        title: title ?? "No Title Set",
        data: data ?? "No data Set",
      }),
    ],
  });
