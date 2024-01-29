import React, { useEffect, useState } from "react";
import CatalogueFooter from "./CatalogueFooter";
import { useApi } from "src/shared/context/ApiContext";
import { convertToSec, resetPosition } from "src/shared/utility/Utility";
import AudioCardPlaceholder from "../../placeholders/AudioCardPlaceholder";
import { ICurrentCatalogue } from "src/features/video/interface/Video.Interface";
import {
  AudioCard,
  AudioContextProvider,
  Box,
  Button,
  ChevronLeftIcon,
  Column,
  Columns,
  Grid,
  Rows,
  Text,
  Title,
  VideoCard,
} from "@canva/app-ui-kit";
import {
  IActor,
  IMedia,
  IMusic,
  ITemplate,
  IVoice,
  ISeeAllViewProps,
  CatalogueItem,
} from "../interface/Catalogue.interface";
import styles from "styles/video.css";
import defaultImage from "assets/images/default_image.png";

const SeeAllView = (props: ISeeAllViewProps) => {
  const { details, changeView, manageCatalogue } = props;
  const { allTemplates, allActors, allMusics, allVoices, allMedias } = useApi();
  const { catalogueType } = details;

  const [catalogueList, setCatalogueList] = useState([]);
  const [selectedCatalogue, setSelectedCatalogue] = useState<ICurrentCatalogue>(
    {
      voice: {} as IVoice,
      music: {} as IMusic,
      actor: {} as IActor,
      template: {} as ITemplate,
      media: [],
      position: 0,
    }
  );

  const getCatalogueList = (type: string): any => {
    if (type === "template") return allTemplates;
    else if (type === "actor") return allActors;
    else if (type === "voice") return allVoices;
    else if (type === "music") return allMusics;
    else return allMedias;
  };
  useEffect(() => {
    setCatalogueList(getCatalogueList(catalogueType));
    return () => {
      setCatalogueList([]);
    };
  }, [details]);

  const handleSelectCatalogue = (
    key: string,
    value: CatalogueItem,
    index: number
  ) => {
    setSelectedCatalogue({
      ...selectedCatalogue,
      [key]: value,
      position: index,
    });
    // const newCatalogue = {
    //   ...prev,
    //   [key]:
    //     key !== "media"
    //       ? value
    //       : ([...new Set([...prev[key], value])] as IMedia[]),
    //   position: index,
    // };
    // return newCatalogue;
  };
  const handleUseCatalogue = () => {
    const array = resetPosition(
      catalogueType,
      catalogueList,
      selectedCatalogue[catalogueType]
    );
    manageCatalogue(catalogueType, array, selectedCatalogue[catalogueType]);
  };
  // const handleScroll = (event: any) => {
  //   console.log("event", event);
  //   let totalPages = Math.ceil(+pagination.total / 20);
  //   let nextPage = (pagination.page || 0) + 1;
  //   let top = event.target.scrollTop;
  //   // console.log("🚀 ~ handleScroll ~ top:", top, totalPages);
  //   if (top === 0 && nextPage <= totalPages) {
  //     console.log("Called next page", nextPage, totalPages);

  //     // dispatch({ type: "SCROLLING_ACTION", payload: "pagination" });
  //     // handlePageData(nextPage);
  //   }
  // };
  const manageMediaSelection = (media: IMedia, index: number) => {
    const { id } = media;
    const existingMediaIndex = selectedCatalogue.media.findIndex(
      (item) => item.id === id
    );
    const updatedMedia =
      existingMediaIndex !== -1
        ? selectedCatalogue.media.filter((item) => item.id !== id)
        : [...selectedCatalogue.media, media];

    setSelectedCatalogue({
      ...selectedCatalogue,
      media: updatedMedia,
      position: index,
    });
  };

  return (
    <div className={styles.pr8} style={{ height: "100%", overflow: "hidden" }}>
      <Rows align="start" spacing="0">
        <Columns spacing="1u" align="center" alignY="center">
          <Column>
            <Button
              icon={() => <ChevronLeftIcon />}
              variant="tertiary"
              onClick={() => changeView("", false)}
            />
          </Column>
          <Column width="content">
            <Title size="small">Choose an avatar voice</Title>
          </Column>
        </Columns>
      </Rows>
      <Box paddingBottom="2u" />

      {catalogueType === "template" && (
        <div className={styles.container}>
          <div className={styles.scrollableContainer}>
            <Grid spacing="1u" columns={3} alignY="stretch">
              {(catalogueList as ITemplate[]).map(
                (template: ITemplate, index: number) => (
                  <div
                    key={template.id}
                    className={styles.audioItemContainer}
                    style={{
                      borderColor:
                        selectedCatalogue.template.id === template.id
                          ? "var(--ui-kit-color-primary)"
                          : "transparent",
                    }}
                    onClick={() =>
                      handleSelectCatalogue("template", template, index)
                    }
                  >
                    <Box padding="0.5u">
                      <VideoCard
                        ariaLabel="Add video to design"
                        mimeType="video/mp4"
                        onClick={function noRefCheck() {}}
                        onDragStart={function noRefCheck() {}}
                        thumbnailUrl={template.preview?.replace(
                          /\.[^.]+$/,
                          ".webp"
                        )}
                        videoPreviewUrl={template.preview}
                      />
                    </Box>
                    <Box padding="0.5u">
                      <Text>{template.name}</Text>
                    </Box>
                  </div>
                )
              )}
            </Grid>
          </div>
          <Box paddingBottom="1.5u" />
          <CatalogueFooter
            currentValue={selectedCatalogue}
            useCatalogue={() => handleUseCatalogue()}
            type={catalogueType}
            changeView={changeView}
          />
        </div>
      )}
      {catalogueType === "actor" && (
        <div className={styles.container}>
          <div className={styles.scrollableContainer}>
            <Grid spacing="1u" columns={3} alignY="stretch">
              {(catalogueList as IActor[]).map(
                (actor: IActor, index: number) => (
                  <div
                    key={actor.id}
                    className={styles.imageContainer}
                    style={{
                      borderColor:
                        selectedCatalogue.actor.id === actor.id
                          ? "var(--ui-kit-color-primary)"
                          : "",
                    }}
                    onClick={() => handleSelectCatalogue("actor", actor, index)}
                  >
                    <div className={styles.imageWrapper}>
                      <img
                        src={actor.preview}
                        alt={`actor${index}`}
                        loading="lazy"
                        style={{
                          objectFit: "cover",
                          height: "100%",
                          width: "100%",
                        }}
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement, Event>
                        ) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = defaultImage;
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </Grid>
          </div>
          <Box paddingBottom="1.5u" />
          <CatalogueFooter
            currentValue={selectedCatalogue}
            useCatalogue={() => handleUseCatalogue()}
            type={catalogueType}
            changeView={changeView}
          />
        </div>
      )}
      {catalogueType === "media" && (
        <div className={styles.container}>
          <div className={styles.scrollableContainer}>
            <Grid spacing="1u" columns={3} alignY="stretch">
              {(catalogueList as IMedia[]).map(
                (media: IMedia, index: number) => (
                  <div
                    className={styles.imageContainer}
                    style={{
                      borderColor: selectedCatalogue.media.some(
                        (item) => item.id === media.id
                      )
                        ? "var(--ui-kit-color-primary)"
                        : "",
                    }}
                    key={media.id}
                    onClick={() => manageMediaSelection(media, index)}
                  >
                    <div className={styles.imageWrapper}>
                      <img
                        src={media.thumbnail}
                        alt={`media${index}`}
                        loading="lazy"
                        style={{
                          objectFit: "cover",
                          height: "100%",
                          width: "100%",
                        }}
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement, Event>
                        ) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = defaultImage;
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </Grid>
          </div>
          <Box paddingBottom="1.5u" />
          <CatalogueFooter
            currentValue={selectedCatalogue}
            useCatalogue={() => handleUseCatalogue()}
            type={catalogueType}
            changeView={changeView}
          />
        </div>
      )}
      {catalogueType === "music" && (
        <div className={styles.container}>
          <div className={styles.scrollableContainer}>
            <Grid spacing="1u" columns={2} alignY="stretch">
              {(catalogueList as IMusic[]).map(
                (music: IMusic, index: number) => (
                  <div
                    className={styles.audioItemContainer}
                    style={{
                      borderColor:
                        selectedCatalogue.music.alias === music.alias
                          ? "var(--ui-kit-color-primary)"
                          : "transparent",
                    }}
                    key={music.id}
                    onClick={() => handleSelectCatalogue("music", music, index)}
                  >
                    <AudioContextProvider>
                      <AudioCard
                        ariaLabel={music.alias}
                        audioPreviewUrl={music.preview}
                        durationInSeconds={convertToSec(music.music_duration)}
                        onClick={function noRefCheck() {}}
                        thumbnailUrl=""
                        title={music.name}
                      />
                    </AudioContextProvider>
                  </div>
                )
              )}
            </Grid>
            {catalogueList?.length === 0 && <AudioCardPlaceholder count={10} />}
          </div>
          <Box paddingBottom="1.5u" />
          <CatalogueFooter
            currentValue={selectedCatalogue}
            useCatalogue={() => handleUseCatalogue()}
            type={catalogueType}
            changeView={changeView}
          />
        </div>
      )}
      {catalogueType === "voice" && (
        <div className={styles.container}>
          <div className={styles.scrollableContainer}>
            <Grid spacing="1u" columns={1} alignY="stretch">
              {(catalogueList as IVoice[]).map(
                (voice: IVoice, index: number) => (
                  <div
                    key={voice.id}
                    className={styles.audioItemContainer}
                    style={{
                      borderColor:
                        selectedCatalogue.voice.id === voice.id
                          ? "var(--ui-kit-color-primary)"
                          : "transparent",
                    }}
                    onClick={() => handleSelectCatalogue("voice", voice, index)}
                  >
                    <AudioContextProvider>
                      <AudioCard
                        ariaLabel={voice.id}
                        audioPreviewUrl={voice.url}
                        onClick={function noRefCheck() {}}
                        thumbnailUrl=""
                        title={`${voice.display_id}-${voice.display_style}`}
                        durationInSeconds={0}
                      />
                    </AudioContextProvider>
                  </div>
                )
              )}
            </Grid>
            {catalogueList?.length === 0 && <AudioCardPlaceholder count={10} />}
          </div>
          <Box paddingBottom="1.5u" />
          <CatalogueFooter
            currentValue={selectedCatalogue}
            useCatalogue={() => handleUseCatalogue()}
            type={catalogueType}
            changeView={changeView}
          />
        </div>
      )}
    </div>
  );
};

export default SeeAllView;
