import React, { useEffect, useState } from "react";
import { API_CONFIG } from "src/shared/constants/api";
import { useApi } from "src/shared/context/ApiContext";
import HttpService from "src/shared/services/Http.service";
import Catalogue from "src/shared/components/catalogue/Catalogue";
import SeeAllView from "src/shared/components/catalogue/components/SeeAllView";
import {
  Box,
  Button,
  FormField,
  Grid,
  MultilineInput,
  Rows,
  TextInput,
} from "@canva/app-ui-kit";
import {
  IActor,
  IMedia,
  IMusic,
  ITemplate,
  IVoice,
  ISeeAllDetails,
  CatalogueItems,
  CatalogueValue,
} from "src/shared/components/catalogue/interface/Catalogue.interface";
import {
  ICurrentCatalogue,
  IFormModeProps,
  IPagination,
} from "../interface/Video.Interface";
import { toast } from "react-toastify";
import styles from "styles/components.css";
import { PLUGIN_ID } from "src/shared/constants";
import { checkAuthentication } from "src/shared/utility/Utility";

const FormMode = (props: IFormModeProps) => {
  const { manageView } = props;
  const {
    allTemplates,
    allActors,
    allMusics,
    allVoices,
    allMedias,
    setMedia,
    changeAuthToken,
  } = useApi();

  const [loader, setLoader] = useState(false);
  const [formDetails, setFormDetails] = useState({ title: "", text: "" });
  const [actorList, setActorList] = useState<IActor[]>(allActors);
  const [templateList, setTemplateList] = useState<ITemplate[]>(allTemplates);
  const [voiceList, setVoiceList] = useState<IVoice[]>(allVoices);
  const [musicList, setMusicList] = useState<IMusic[]>(allMusics);
  const [mediaList, setMediaList] = useState<IMedia[]>(allMedias);
  // const [mediaPagination, setMediaPagination] = useState<IPagination>({
  //   page: 1,
  //   skip: "0",
  //   take: "20",
  //   total: "",
  // });
  const [showSeeAll, setShowSeeAll] = useState<ISeeAllDetails>({
    show: false,
    catalogueType: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    title: "",
    text: "",
  });
  const [selectedCatalogue, setSelectedCatalogue] = useState<ICurrentCatalogue>(
    {
      voice: {} as IVoice,
      music: {} as IMusic,
      actor: {} as IActor,
      template: {} as ITemplate,
      media: [],
    }
  );

  const handleChangeCatalogue = (key: string, value: CatalogueItems) => {
    setSelectedCatalogue((prev) => ({ ...prev, [key]: value }));
  };
  const getAllMedia = (id?: string, page?: string) => {
    HttpService.get(`${API_CONFIG.asset}`).then((res) => {
      if (!res.is_error) {
        setMedia(res.data.results);
        // setMediaPagination(res.data.pagination);
        if (id) {
          const data = res.data.results.find((x: IMedia) => x.id === id);
          if (data)
            handleChangeCatalogue("media", [...selectedCatalogue.media, data]);
        } else {
          handleChangeCatalogue("media", [res.data.results[0]]);
        }
      }
    });
  };

  useEffect(() => {
    if (allMedias?.length > 0) {
      setSelectedCatalogue((prev) => ({
        ...prev,
        media: [...selectedCatalogue.media],
      }));
      setMediaList(allMedias);
    } else {
      getAllMedia();
    }
  }, [allMedias]);

  useEffect(() => {
    if (allTemplates?.length > 0)
      setSelectedCatalogue((prev) => ({ ...prev, template: allTemplates[0] }));
    setTemplateList(allTemplates);
  }, [allTemplates]);
  useEffect(() => {
    setActorList(allActors);
  }, [allActors]);
  useEffect(() => {
    setVoiceList(allVoices);
  }, [allVoices]);
  useEffect(() => {
    setMusicList(allMusics);
  }, [allMusics]);

  const handleView = (type: string, flag: boolean) => {
    setShowSeeAll({ show: flag, catalogueType: type });
  };
  const createVideo = () => {
    setLoader(true);
    if (formDetails.title?.trim() && formDetails.text?.trim()) {
      setErrorMessage({ title: "", text: "" });
      HttpService.post(`${API_CONFIG.video}/form`, {
        plugin: PLUGIN_ID,
        template_id: selectedCatalogue.template.id ?? "",
        voice_id: selectedCatalogue.template.id ?? "",
        actor_id: selectedCatalogue.actor.id ?? "",
        music_id: selectedCatalogue.music.id ?? "",
        media: selectedCatalogue?.media?.map((item: IMedia) => item.id) ?? [""],
        title: formDetails.title,
        text: formDetails.text,
      })
        .then((res) => {
          if (!res.is_error) manageView("waiting-view", res.data.identifier);
          else toast.error(res.message);
          setLoader(false);
        })
        .catch((error) => {
          if (checkAuthentication(error)) changeAuthToken("");
          toast.error(error.response?.data?.message || error.message);
          setLoader(false);
        });
    } else {
      setErrorMessage({
        title: formDetails.title.trim() ? "" : "Title is required.",
        text: formDetails.text.trim() ? "" : "Text is required.",
      });
      setLoader(false);
    }
  };
  const changeFormDetails = (key: string, value: string) => {
    if (value) {
      setFormDetails({ ...formDetails, [key]: value });
      setErrorMessage({
        ...errorMessage,
        [key]: "",
      });
    } else {
      setFormDetails({ ...formDetails, [key]: "" });
      setErrorMessage({
        ...errorMessage,
        [key]: `${key === "text" ? "Text" : " Title"} is required.`,
      });
    }
  };
  const manageCatalogues = (
    key: string,
    value: CatalogueValue,
    item: CatalogueItems
  ) => {
    switch (key) {
      case "template":
        setTemplateList(value as ITemplate[]);
        setSelectedCatalogue({
          ...selectedCatalogue,
          [key]: item as ITemplate,
        });
        break;
      case "actor":
        setActorList(value as IActor[]);
        setSelectedCatalogue({ ...selectedCatalogue, [key]: item as IActor });
        break;
      case "music":
        setMusicList(value as IMusic[]);
        setSelectedCatalogue({ ...selectedCatalogue, [key]: item as IMusic });
        break;
      case "voice":
        setVoiceList(value as IVoice[]);
        setSelectedCatalogue({ ...selectedCatalogue, [key]: item as IVoice });
        break;
      case "media":
        setMediaList(value as IMedia[]);
        setSelectedCatalogue({ ...selectedCatalogue, [key]: item as IMedia[] });
        break;
      default:
        break;
    }
    setShowSeeAll({ ...showSeeAll, show: false });
  };

  const logout = () => {
    HttpService.get(`${API_CONFIG.logout}`).then((res) => {
      if (!res.is_error) changeAuthToken("");
    });
  };

  return (
    <>
      {showSeeAll?.show ? (
        <Rows spacing="1u" align="stretch">
          <SeeAllView
            details={showSeeAll}
            changeView={handleView}
            manageCatalogue={manageCatalogues}
            // pagination={mediaPagination}
          />
        </Rows>
      ) : (
        <div className={styles.scrollContainer}>
          {/* <Rows align="start" spacing="0">
            <Columns spacing="1u" align="center" alignY="center">
              <Column>
                <Button
                  icon={() => <ChevronLeftIcon />}
                  variant="tertiary"
                  onClick={() => changeView("create-view")}
                />
              </Column>
              <Column width="content">
                <Title size="small">{`Create ${mode?.label} video`}</Title>
              </Column>
            </Columns>
          </Rows> */}
          <div style={{ display: "none" }}>
            <Button variant={"primary"} onClick={() => logout()}>
              Logout
            </Button>
          </div>
          <Grid columns={1}>
            <Rows spacing="0.5u">
              <FormField
                control={(props) => (
                  <TextInput
                    onChange={(value: string) =>
                      changeFormDetails("title", value)
                    }
                    placeholder="Enter title"
                    {...props}
                    value={formDetails.title}
                  />
                )}
                label="Title *"
                error={errorMessage.title}
              />
              <Box paddingBottom="0.5u" />
            </Rows>
            <Rows spacing="0.5u">
              <FormField
                control={(props) => (
                  <MultilineInput
                    autoGrow
                    onChange={(value: string) =>
                      changeFormDetails("text", value)
                    }
                    placeholder="Enter text"
                    {...props}
                    value={formDetails.text}
                  />
                )}
                label="Description *"
                description="Minimum 50 characters."
                error={errorMessage.text}
              />
              <Box paddingBottom="2u" />
            </Rows>
            <Catalogue
              currentCatalogue={selectedCatalogue}
              changeCatalogue={handleChangeCatalogue}
              openSeeAll={handleView}
              create={createVideo}
              showMedia={true}
              actorList={actorList}
              templateList={templateList}
              voiceList={voiceList}
              musicList={musicList}
              mediaList={mediaList}
              getMedias={getAllMedia}
              loader={loader}
              changeView={() => manageView("list-view")}
            />
          </Grid>
        </div>
      )}
    </>
  );
};

export default FormMode;
