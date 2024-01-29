import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  IActor,
  IMedia,
  IMusic,
  ITemplate,
  IVoice,
} from "../components/catalogue/interface/Catalogue.interface";
import axios from "axios";
import { auth } from "@canva/user";
import { toast } from "react-toastify";
import { API_CONFIG } from "../constants/api";
import { IVideo } from "src/features/video/interface/Video.Interface";
import { fetchCatalogue, getUserCredits } from "../services/Api.service";

interface IApiContextProps {
  allTemplates: ITemplate[];
  allActors: IActor[];
  allMusics: IMusic[];
  allVoices: IVoice[];
  allMedias: IMedia[];
  allVideos: IVideo[];
  changeAuthToken: (token: string) => void;
  setMedia: (list: IMedia[]) => void;
  authToken: string;
  credits: number;
  updateCredits: () => void;
}

interface IApiProviderProps {
  children?: ReactNode;
}
const ApiContext = createContext<IApiContextProps | undefined>(undefined);

export const ApiProvider: React.FC<IApiProviderProps> = ({ children }) => {
  const [allTemplates, setAllTemplates] = useState<ITemplate[]>([]);
  const [allActors, setAllActors] = useState<IActor[]>([]);
  const [allMusics, setAllMusics] = useState<IMusic[]>([]);
  const [allVoices, setAllVoices] = useState<IVoice[]>([]);
  const [allMedias, setAllMedias] = useState<IMedia[]>([]);
  const [authToken, setAuthToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allVideos, setAllVideos] = useState<IVideo[]>([]);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    if (authToken && allTemplates.length === 0) {
      // getVideoList(setAllVideos);
      fetchCatalogue("TEMPLATE", setAllTemplates);
      fetchCatalogue("ACTOR", setAllActors);
      fetchCatalogue("MUSIC", setAllMusics);
      fetchCatalogue("VOICE", setAllVoices);
      getUserCredits(setCredits);
      // setIsLoggedIn(true);
    }
  }, [authToken]);

  const login = (token: string) => {
    axios
      .get(`${BACKEND_HOST}${API_CONFIG.login}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        if (!res.data.is_error && res.data.data === true) {
          changeAuthToken(token);
          localStorage.setItem("token", token);
          setIsLoggedIn(true);
        } else {
          localStorage.clear();
          changeAuthToken("");
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message);
      });
  };
  const getToken = async () => {
    await auth.getCanvaUserToken().then((res: any) => {
      if (res) login(res);
    });
  };

  useEffect(() => {
    getToken();
    const interval = setInterval(() => {
      if (isLoggedIn) getToken();
    }, 1 * 60 * 1000); // 1 minutes in milliseconds

    return () => clearInterval(interval);
    // Cleanup the interval when the component unmounts
  }, [isLoggedIn]);

  const setMedia = (mediaList: IMedia[]) => {
    setAllMedias(mediaList);
  };
  const changeAuthToken = (token: string) => {
    setAuthToken(token);
  };

  const updateCredits = () => {
    getUserCredits(setCredits);
  };

  const contextValue = useMemo(
    () => ({
      allTemplates,
      allActors,
      allMusics,
      allVoices,
      allMedias,
      changeAuthToken,
      setMedia,
      allVideos,
      authToken,
      credits,
      updateCredits,
    }),
    [
      allTemplates,
      allActors,
      allMusics,
      allVoices,
      allMedias,
      changeAuthToken,
      setMedia,
      allVideos,
      authToken,
      credits,
      updateCredits,
    ]
  );

  // const handlePagination = (catalogueType: string, page: number) => {};

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
