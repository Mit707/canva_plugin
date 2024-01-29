import { Dispatch } from "react";
import HttpService from "./Http.service";
import { convertToArray } from "../utility/Utility";
import { API_CONFIG } from "../constants/api";

export const fetchCatalogue = async (
  filter: string,
  setDataFunction: Dispatch<React.SetStateAction<any[]>>
) => {
  try {
    const res = await HttpService.get(
      `${API_CONFIG.catalogue}?filter=${filter}`
    );
    if (!res.is_error) {
      const data = convertToArray(res.data);
      setDataFunction(data);
    } else {
      console.error(`Error fetching data for filter ${filter}: ${res.message}`);
    }
  } catch (error) {
    console.error(`Error fetching data for filter ${filter}:`, error);
  }
};

export const getUserCredits = (
  setDataFunction: Dispatch<React.SetStateAction<any>>
) => {
  HttpService.get(`${API_CONFIG.credits}`)
    .then((res) => {
      if (!res.is_error) setDataFunction(res.data.results);
      else setDataFunction(0);
    })
    .catch(() => {
      setDataFunction(0);
    });
};

// export const registerUser = async (oxoloKey: string, token: string) => {
//   try {
//     const res = await a.get(`${API_CONFIG.register}`);
//     if (!res.is_error) {
//       return true;
//     } else {
//       console.error(`Error fetching data for filter: ${res.message}`);
//     }
//   } catch (error) {
//     console.error(`Error fetching data for filter:`, error);
//   }
// };
// export const fetchInitialData = async (
//   setTemplateList: Dispatch<React.SetStateAction<any[]>>,
//   setActorList: Dispatch<React.SetStateAction<any[]>>,
//   setMusicList: Dispatch<React.SetStateAction<any[]>>,
//   setVoiceList: Dispatch<React.SetStateAction<any[]>>
// ) => {
//   try {
//     await fetchCatalogue("TEMPLATE", setTemplateList);
//     await fetchCatalogue("ACTOR", setActorList);
//     await fetchCatalogue("MUSIC", setMusicList);
//     await fetchCatalogue("VOICE", setVoiceList);
//     // Additional initial data fetching if needed
//   } catch (error) {
//     console.error("Error fetching initial data:", error);
//   }
// };
