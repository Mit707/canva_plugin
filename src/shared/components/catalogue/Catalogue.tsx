import React, { ChangeEvent, useState } from "react";
import { API_CONFIG } from "src/shared/constants/api";
import HttpService from "src/shared/services/Http.service";
import CatalogueHeader from "./components/CatalogueHeader";
import ActorPlaceholder from "../placeholders/ActorPlaceholder";
import TemplatePlaceholder from "../placeholders/TemplatePlaceholder";
import AudioCardPlaceholder from "../placeholders/AudioCardPlaceholder";
import {
  checkAuthentication,
  convertToSec,
  validateImage,
} from "src/shared/utility/Utility";
import {
  AudioCard,
  AudioContextProvider,
  Box,
  Button,
  ChevronLeftIcon,
  ChevronRightIcon,
  Column,
  Columns,
  Grid,
  LoadingIndicator,
  Rows,
  Text,
  Title,
  VideoCard,
} from "@canva/app-ui-kit";
import {
  IActor,
  ICatalogueProps,
  IMedia,
  IMusic,
  ITemplate,
  IVoice,
} from "./interface/Catalogue.interface";

import styles from "styles/video.css";
import { toast } from "react-toastify";
import { useApi } from "src/shared/context/ApiContext";
import defaultImage from "assets/images/default_image.png";
import CustomAudioCard from "../audioCard/CustomAudioCard";

const Catalogue: React.FC<ICatalogueProps> = ({
  create,
  showMedia,
  openSeeAll,
  currentCatalogue,
  changeCatalogue,
  actorList,
  templateList,
  voiceList,
  musicList,
  mediaList,
  getMedias,
  loader,
  changeView,
}) => {
  const { changeAuthToken, credits } = useApi();
  const [loading, setLoading] = useState(false);
  const [activeSlide, setActiveSlide] = useState({ actor: 0, media: 0 });

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file?.length) {
      const fileCheck = await validateImage(file[0]);
      if (fileCheck) {
        setLoading(true);
        const formData = new FormData();
        formData.append("asset", file[0]);
        formData.append("media_type", "IMAGE");
        HttpService.post(`${API_CONFIG.asset}/upload`, formData, {
          contentType: "multipart/form-data",
        })
          .then((res) => {
            if (!res.is_error) {
              getMedias(res.data.results);
              setLoading(false);
            } else {
              setLoading(false);
            }
          })
          .catch((error) => {
            if (checkAuthentication(error)) changeAuthToken("");
            toast.error(error.response.data.message || error.message);
            setLoading(false);
          });
      } else {
        console.log("Alert, Error in uploading");
      }
    }
  };
  const handleNext = (key: string, length: number) => {
    const nextSlide = activeSlide[key] + 1;
    const maxSlides = Math.ceil(length / 3);
    if (nextSlide < maxSlides) {
      setActiveSlide({ ...activeSlide, [key]: nextSlide });
    }
  };
  const handleBack = (key: string) => {
    setActiveSlide({
      ...activeSlide,
      [key]: Math.max(activeSlide[key] - 1, 0),
    });
  };
  const manageMediaSelection = (media: IMedia) => {
    const { id } = media;
    const existingMediaIndex = currentCatalogue.media.findIndex(
      (item) => item.id === id
    );
    const updatedMedia =
      existingMediaIndex !== -1
        ? currentCatalogue.media.filter((item) => item.id !== id)
        : [...currentCatalogue.media, media];

    changeCatalogue("media", updatedMedia);
  };

  return (
    <div>
      <Rows spacing="1u" align="stretch">
        {/* Template div start */}
        <>
          <CatalogueHeader
            title=" Choose a template"
            subTitle="See all"
            open={() =>
              templateList?.length > 0 ? openSeeAll("template", true) : ""
            }
          />
          <Grid spacing="1u" columns={3} alignY="stretch">
            {templateList?.slice(0, 6).map((template: ITemplate) => {
              return (
                <div
                  key={template.id}
                  className={styles.audioItemContainer}
                  style={{
                    borderColor:
                      currentCatalogue.template?.id === template.id
                        ? "var(--ui-kit-color-primary)"
                        : "",
                  }}
                  onClick={() => changeCatalogue("template", template)}
                >
                  <Box padding="0.5u">
                    <VideoCard
                      ariaLabel="Add video to design"
                      videoPreviewUrl={template.preview}
                      mimeType="video/mp4"
                      onClick={function noRefCheck() {}}
                      onDragStart={function noRefCheck() {}}
                      thumbnailUrl={template.preview?.replace(
                        /\.[^.]+$/,
                        ".webp"
                      )}
                    />
                  </Box>
                  <Box padding="0.5u">
                    <Text>{template.name}</Text>
                  </Box>
                </div>
              );
            })}
          </Grid>
          {templateList?.length === 0 && <TemplatePlaceholder count={6} />}
        </>
        {/* Template div end */}

        {/* Actor div start */}
        <>
          <CatalogueHeader
            title="Choose an AI avatar"
            subTitle="See all"
            open={() =>
              actorList?.length > 0 ? openSeeAll("actor", true) : ""
            }
          />
          <div className={styles.imageMain}>
            {actorList?.length > 0 && (
              <>
                <div
                  className={styles.imageSliderContainer}
                  style={{
                    transform: `translateX(${-activeSlide.actor * 12}%)`,
                  }}
                >
                  {actorList
                    .slice(0, 25)
                    .map((actor: IActor, index: number) => (
                      <div
                        key={actor.id}
                        className={styles.imageContainer}
                        onClick={() => changeCatalogue("actor", actor)}
                        style={{
                          borderColor:
                            currentCatalogue.actor?.id === actor.id
                              ? "var(--ui-kit-color-primary)"
                              : "",
                        }}
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
                    ))}
                </div>
                <div className={styles.sliderBtnWrapper}>
                  {activeSlide.actor > 0 && (
                    <button
                      onClick={() => handleBack("actor")}
                      className={styles.backBtn}
                    >
                      <ChevronLeftIcon />
                    </button>
                  )}
                  <button
                    onClick={() =>
                      handleNext("actor", actorList.slice(0, 25).length)
                    }
                    // disabled={activeSlide.actor * 3 + 3 >= 10}
                    className={styles.nextBtn}
                  >
                    <ChevronRightIcon />
                  </button>
                </div>
              </>
            )}
            {actorList?.length === 0 && <ActorPlaceholder count={4} />}
            <Box paddingBottom="2u" />
          </div>
        </>
        {/* Actor div end */}

        {/* Media div start */}
        <>
          {showMedia && (
            <>
              <CatalogueHeader
                title="Or choose your own!"
                subTitle="See all"
                open={() =>
                  mediaList && mediaList?.length > 0
                    ? openSeeAll("media", true)
                    : ""
                }
              />
              <div className={styles.imageMain}>
                {mediaList && mediaList?.length > 0 && (
                  <>
                    <div
                      className={styles.imageSliderContainer}
                      style={{
                        transform: `translateX(${-activeSlide.media * 12}%)`,
                      }}
                    >
                      <div className={styles.imageContainer}>
                        {loading ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                            }}
                          >
                            <LoadingIndicator size="medium" />
                          </div>
                        ) : (
                          <label
                            htmlFor="file"
                            style={{ display: "contents", cursor: "pointer" }}
                          >
                            <div className={styles.imageWrapper}>
                              <div className={styles.uploadContainer}>
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.75 19.488A5.625 5.625 0 0 1 5.01 8.66a6 6 0 0 1 11.944-.41 5.625 5.625 0 0 1 .296 11.237v.012H15V18h1.75v-.002l.125.002a4.125 4.125 0 1 0-1.493-7.972 4.5 4.5 0 1 0-8.813-.241 4.126 4.126 0 0 0 .681 8.211V18H9v1.5H6.75v-.012Zm6-5.677 1.796 1.795a.75.75 0 0 0 1.06-1.06l-2.35-2.351a1.75 1.75 0 0 0-2.476 0l-2.35 2.35a.75.75 0 0 0 1.06 1.061l1.76-1.76v7.404a.75.75 0 0 0 1.5 0v-7.44Z"
                                    fill="#fff"
                                    fillOpacity="0.9"
                                  ></path>
                                </svg>
                                <span style={{ fontSize: 15 }}>Upload</span>
                                <input
                                  id="file"
                                  type="file"
                                  multiple
                                  accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
                                  onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                  ) => handleChange(event)}
                                  style={{ display: "none" }}
                                />
                              </div>
                            </div>
                          </label>
                        )}
                      </div>
                      {mediaList
                        .slice(0, 25)
                        .map((media: IMedia, index: number) => (
                          <div
                            className={styles.imageContainer}
                            style={{
                              borderColor: currentCatalogue.media?.some(
                                (item) => item?.id === media.id
                              )
                                ? "var(--ui-kit-color-primary)"
                                : "",
                            }}
                            key={media.id}
                            onClick={() => {
                              manageMediaSelection(media);
                            }}
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
                                  e: React.SyntheticEvent<
                                    HTMLImageElement,
                                    Event
                                  >
                                ) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null;
                                  target.src = defaultImage;
                                }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className={styles.sliderBtnWrapper}>
                      {activeSlide.media > 0 && (
                        <button
                          onClick={() => handleBack("media")}
                          className={styles.backBtn}
                        >
                          <ChevronLeftIcon />
                        </button>
                      )}
                      <button
                        onClick={() =>
                          handleNext("media", mediaList.slice(0, 25)?.length)
                        }
                        // disabled={activeSlide.media * 3 + 3 >= 10}
                        className={styles.nextBtn}
                      >
                        <ChevronRightIcon />
                      </button>
                    </div>
                  </>
                )}
                {mediaList?.length === 0 && <ActorPlaceholder count={4} />}
                <Box paddingBottom="2u" />
              </div>
            </>
          )}
        </>
        {/* Media div end */}

        {/* Voice Start */}
        <>
          <CatalogueHeader
            title="Choose a voice"
            subTitle="See all"
            open={() => (voiceList?.length ? openSeeAll("voice", true) : "")}
          />
          <Grid spacing="1u" columns={1} alignY="stretch">
            {voiceList?.slice(0, 3).map((voice: IVoice, index: number) => {
              return (
                <div
                  className={styles.audioItemContainer}
                  style={{
                    borderColor:
                      currentCatalogue.voice?.id === voice.id
                        ? "var(--ui-kit-color-primary)"
                        : "",
                  }}
                  key={voice.id}
                  onClick={() => changeCatalogue("voice", voice)}
                >
                  <CustomAudioCard
                    key={voice.id}
                    index={index}
                    showFlag={false}
                    title={voice.display_id}
                    subTitle={voice.display_style}
                    caption={voice.gender}
                    url={voice.url}
                    id={voice.id as string}
                    selectedItem={currentCatalogue.voice.id}
                    length={4}
                  />
                  {/* <AudioContextProvider>
                    <AudioCard
                      ariaLabel={voice.display_id}
                      audioPreviewUrl={voice.url}
                      durationInSeconds={0}
                      onClick={function noRefCheck() {}}
                      thumbnailUrl=""
                      title={`${voice.display_id} - ${voice.display_style}`}
                    />
                  </AudioContextProvider> */}
                </div>
              );
            })}
          </Grid>
          {voiceList?.length === 0 && <AudioCardPlaceholder count={2} />}
        </>
        {/* Voice End */}

        {/* Music Start */}
        <>
          <CatalogueHeader
            title="Choose a music"
            subTitle="See all"
            open={() => (musicList?.length ? openSeeAll("music", true) : "")}
          />
          <Grid spacing="1u" columns={2} alignY="stretch">
            {musicList?.slice(0, 4).map((music: IMusic, index: number) => {
              return (
                <div
                  className={styles.audioItemContainer}
                  style={{
                    borderColor:
                      currentCatalogue.music?.id === music.id
                        ? "var(--ui-kit-color-primary)"
                        : "",
                  }}
                  key={music.alias}
                  onClick={() => changeCatalogue("music", music)}
                >
                  <CustomAudioCard
                    index={index}
                    showFlag={false}
                    title={music.name}
                    url={music.preview}
                    id={music.id as string}
                    caption={music.preview_duration}
                    selectedItem={currentCatalogue.music.id}
                    length={4}
                  />
                </div>
              );
            })}
          </Grid>
          {musicList?.length === 0 && <AudioCardPlaceholder count={2} />}
        </>
        {/* Music End */}
        {/* <CustomAudioCard /> */}
      </Rows>
      <Box paddingTop="2u" />
      <Rows spacing="0">
        <Columns spacing="3u" align="spaceBetween" alignY="center">
          <Column width="4/5">
            <Title size="small">Video history</Title>
          </Column>
          {changeView && (
            <Column>
              <Button
                icon={() => <ChevronRightIcon />}
                variant="tertiary"
                onClick={() => changeView()}
              />
            </Column>
          )}
        </Columns>
      </Rows>
      <Box paddingTop="2u" />
      <Box>
        <Button
          variant="primary"
          loading={loader}
          stretch
          onClick={() => create()}
        >
          Generate AI video
        </Button>
      </Box>
      <Box paddingTop="2u" />
      <div className={styles.creditDiv}>
        {`You have ${credits
          .toFixed(0)
          .replace(
            /(\d)(?=(\d{3})+(?!\d))/g,
            "$1."
          )} video credits left in Oxolo.`}
      </div>
      <Box paddingTop="4u" />
    </div>
  );
};

export default Catalogue;
