import en from "date-fns/locale/en-US";

export const getValueByKey = (language: string) => {
  switch (language) {
    case "en":
      return en;
    default:
      return en;
  }
};
