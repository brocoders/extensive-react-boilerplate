import { enUS } from "date-fns/locale/en-US";

export const getValueByKey = (language: string) => {
  switch (language) {
    case "en":
      return enUS;
    default:
      return enUS;
  }
};
