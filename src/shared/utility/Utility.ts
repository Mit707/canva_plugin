import {
  IActor,
  IMedia,
  IMusic,
  ITemplate,
  IVoice,
} from "../components/catalogue/interface/Catalogue.interface";
import { FILES, FILETYPE } from "../constants";

export const convertToSec = (inputTime: string) => {
  // Split the input time into minutes and seconds
  let timeArray = inputTime.split(":");
  let minutes = parseInt(timeArray[0], 10);
  let seconds = parseInt(timeArray[1], 10);

  // Convert the time to seconds
  return minutes * 60 + seconds;
};

export const convertToArray = (
  data: ITemplate[] | IVoice[] | IMusic[] | IActor[]
) => {
  const modifiedArray = Object.entries(data).map(
    ([id, template]: [string, ITemplate | IVoice | IMusic | IActor]) => ({
      id,
      ...template,
    })
  );
  return modifiedArray;
};

export const validateImage = async (file: File) => {
  try {
    const maxSize = FILES.IMAGE_SIZE;
    const fileTypes = FILETYPE["image"].split(",");
    const extension = /[.]/.exec(file.name)
      ? "." + /[^.]+$/.exec(file?.name)
      : undefined;
    //FOR EXTENSION
    if (!extension || !fileTypes.includes(extension))
      throw new Error(
        `${file.name} file is not a valid file please upload from ${FILETYPE["image"]} files`
      );
    //FOR FILE SIZE
    if (file.size / 1024 / 1024 > maxSize)
      throw new Error(
        `${file.name} file size needs to be less than ${maxSize} MB`
      );

    return true;
  } catch (error) {
    return error;
  }
};

export const removeDuplication = (array: any) => {
  const finalData = new Set(array);
  return finalData;
};

export const resetPosition = (
  type: string,
  array: any[],
  object: IMedia[] | any
) => {
  if (type !== "media") {
    return [object, ...array.filter((item) => item.id !== object.id)];
  } else {
    return [
      ...object,
      ...array.filter(
        (item) => !object.some((obj: IMedia) => obj.id === item.id)
      ),
    ];
  }
};

// export const getCatalogueList = (type: string): any => {
//   const { allTemplates, allActors, allMusics, allVoices } = useApi();

//   if (type === "template") return allTemplates;
//   else if (type === "actor") return allActors;
//   else if (type === "voice") return allVoices;
//   else if (type === "music") return allMusics;
// };

export const checkAuthentication = (error: any) => {
  const auth = [401, 403].includes(error?.response?.status);
  if (auth) localStorage.clear();
  return auth;
};

export const decodeToken = (token: string) => {
  const tokenPayload = JSON.parse(atob(token.split(".")[1]));
  const currentTimeInMilliseconds = Date.now();

  const expiryTimeInMilliseconds = tokenPayload.exp * 1000; // Convert seconds to milliseconds
  const timeLeft = expiryTimeInMilliseconds - currentTimeInMilliseconds;
  return timeLeft < 10 * 1000;
};
