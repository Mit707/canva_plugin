import React, { useEffect, useState } from "react";
import { API_CONFIG } from "src/shared/constants/api";
import { useApi } from "src/shared/context/ApiContext";
import HttpService from "src/shared/services/Http.service";
import Catalogue from "src/shared/components/catalogue/Catalogue";
import { ICurrentCatalogue, IUrlModeProps } from "../interface/Video.Interface";
import SeeAllView from "src/shared/components/catalogue/components/SeeAllView";
import {
  Box,
  Button,
  ChevronLeftIcon,
  Column,
  Columns,
  FormField,
  Grid,
  Rows,
  TextInput,
  Title,
} from "@canva/app-ui-kit";
import {
  IActor,
  IMusic,
  ITemplate,
  IVoice,
  ISeeAllDetails,
  CatalogueItems,
  CatalogueValue,
} from "src/shared/components/catalogue/interface/Catalogue.interface";
import styles from "styles/components.css";
import { toast } from "react-toastify";
import { PLUGIN_ID } from "src/shared/constants";
import { checkAuthentication } from "src/shared/utility/Utility";

const UrlMode = (props: IUrlModeProps) => {
  const { changeView, manageView, mode } = props;
  const { allTemplates, allActors, allMusics, allVoices, changeAuthToken } =
    useApi();

  const [url, setUrl] = useState("");
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [actorList, setActorList] = useState<IActor[]>(allActors);
  const [templateList, setTemplateList] = useState<ITemplate[]>(allTemplates);
  const [voiceList, setVoiceList] = useState<IVoice[]>(allVoices);
  const [musicList, setMusicList] = useState<IMusic[]>(allMusics);
  const [showSeeAll, setShowSeeAll] = useState<ISeeAllDetails>({
    show: false,
    catalogueType: "",
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
    setSelectedCatalogue({ ...selectedCatalogue, [key]: value });
  };
  useEffect(() => {
    if (templateList?.length > 0)
      handleChangeCatalogue("template", templateList[0]);
  }, [allTemplates]);

  const handleView = (type: string, flag: boolean) => {
    setShowSeeAll({ show: flag, catalogueType: type });
  };
  const createVideo = () => {
    if (url?.trim()) {
      setErrorMessage("");
      setLoader(true);
      HttpService.post(`${API_CONFIG.video}/url`, {
        plugin: PLUGIN_ID,
        template_id: selectedCatalogue.template.id ?? "",
        voice_id: selectedCatalogue.template.id ?? "",
        actor_id: selectedCatalogue.actor.id ?? "",
        music_id: selectedCatalogue.music.id ?? "",
        url,
      })
        .then((res) => {
          if (!res.is_error) {
            manageView("list-view");
            setLoader(false);
          } else {
            toast.error(res.message);
            setLoader(false);
          }
        })
        .catch((error) => {
          if (checkAuthentication(error)) changeAuthToken("");
          toast.error(error.response.data.message || error.message);
          setLoader(false);
        });
    } else {
      setErrorMessage("URL is required");
    }
  };
  const handleChange = (value: string) => {
    if (value) {
      setUrl(value);
      setErrorMessage("");
    } else {
      setUrl(value);
      setErrorMessage("URL is required");
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
      default:
        break;
    }
    setShowSeeAll({ ...showSeeAll, show: false });
  };

  return (
    <>
      {showSeeAll?.show ? (
        <Rows spacing="1u" align="stretch">
          <SeeAllView
            details={showSeeAll}
            changeView={handleView}
            manageCatalogue={manageCatalogues}
          />
        </Rows>
      ) : (
        <div className={styles.scrollContainer} style={{ paddingRight: 8 }}>
          <Rows align="start" spacing="0">
            <Columns spacing="1u" align="center" alignY="center">
              <Column>
                <Button
                  icon={() => <ChevronLeftIcon />}
                  variant="tertiary"
                  onClick={() => changeView("type-view")}
                />
              </Column>
              <Column width="content">
                <Title size="small">{`Create ${mode?.label} video`}</Title>
              </Column>
            </Columns>
            <Box paddingBottom="0.5u" />
          </Rows>
          <Grid columns={1}>
            <Rows spacing="0.5u">
              <FormField
                control={(props) => (
                  <TextInput
                    onChange={(value: string) => handleChange(value)}
                    placeholder="Enter URL"
                    {...props}
                    value={url}
                  />
                )}
                label="URL*"
                error={errorMessage}
              />
              <Box paddingBottom="1u" />
            </Rows>
            <Catalogue
              currentCatalogue={selectedCatalogue}
              changeCatalogue={handleChangeCatalogue}
              openSeeAll={handleView}
              create={createVideo}
              showMedia={false}
              actorList={actorList}
              templateList={templateList}
              voiceList={voiceList}
              musicList={musicList}
              getMedias={() => {}}
              loader={loader}
            />
          </Grid>
        </div>
      )}
    </>
  );
};

export default UrlMode;
