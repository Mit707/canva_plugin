import React, { useEffect, useRef, useState } from "react";
import {
  IVideoDetails,
  IVideoGenerateProps,
} from "../interface/Video.Interface";
import {
  Box,
  Button,
  LoadingIndicator,
  ProgressBar,
  Text,
  Title,
} from "@canva/app-ui-kit";
import styles from "styles/video.css";
import { API_CONFIG } from "src/shared/constants/api";
import { useApi } from "src/shared/context/ApiContext";
import HttpService from "src/shared/services/Http.service";
import { upload } from "@canva/asset";
import { addNativeElement } from "@canva/design";

const VideoGenerateView = (props: IVideoGenerateProps) => {
  const { videoId, manageView } = props;
  const { updateCredits, credits } = useApi();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDetails, setVideoDetails] = useState({} as IVideoDetails);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying((prevState) => !prevState);
    }
  };

  const getVideoDetails = (id: string) => {
    HttpService.get(`${API_CONFIG.video}/${id}`).then((res) => {
      if (!res.is_error) {
        setVideoDetails(res.data);
        // if (res.data.progress === "100") manageView("create-view");
      }
    });
  };
  useEffect(() => {
    if (videoId && videoDetails.progress !== "100") {
      getVideoDetails(videoId);
      updateCredits();
      const interval = setInterval(() => {
        getVideoDetails(videoId);
      }, 120000);
      //Clearing the interval
      return () => clearInterval(interval);
    }
  }, [videoId]);

  const addToDesign = async () => {
    const result = await upload({
      type: "VIDEO",
      id: "uniqueIdGoesHere",
      mimeType: "video/mp4",
      url: videoDetails.un_wateremark_link,
      thumbnailImageUrl: videoDetails.thumbnail,
      thumbnailVideoUrl: videoDetails.un_wateremark_link,
    });

    await addNativeElement({
      type: "VIDEO",
      ref: result.ref,
    });
  };

  return (
    <>
      {videoDetails.identifier ? (
        <>
          {videoDetails.un_wateremark_link ? (
            <div style={{ paddingRight: 16 }}>
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                }}
              >
                <div
                  style={{
                    padding: "20px",
                    overflow: "hidden",
                    border: "1px solid #cacaca",
                    height: "241px",
                    width: "250px",
                    borderRadius: "50%",
                    WebkitMaskImage:
                      "-webkit-radial-gradient(circle, white 100%, black 100%)",
                    position: "relative",
                  }}
                >
                  <video
                    controls
                    width="500px"
                    height="500px"
                    style={{
                      borderRadius: "50%",
                      position: "absolute",
                      top: "-109px",
                      left: "-125px",
                    }}
                  >
                    <source
                      src={videoDetails.un_wateremark_link}
                      type="video/mp4"
                    />
                  </video>
                </div>
                
              </div> */}

              <div className={styles.videoWrapper}>
                <div className={styles.videoContainer} id="video-container">
                  <video
                    ref={videoRef}
                    id="video"
                    preload="metadata"
                    poster={videoDetails.thumbnail}
                    loop={false}
                  >
                    <source
                      src={videoDetails.un_wateremark_link}
                      type="video/mp4"
                    />
                  </video>
                  <div className={styles.playBtnWrapper}>
                    <div
                      title="Play video"
                      className={styles.circlePlay}
                      id="circle-play-b"
                    >
                      <svg
                        onClick={() => handlePlayVideo()}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 80 80"
                        style={{
                          opacity: isPlaying ? 0 : 1,
                        }}
                      >
                        <path d="M40 0a40 40 0 1040 40A40 40 0 0040 0zM26 61.56V18.44L64 40z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <Box paddingBottom="2u" />
              <Button stretch variant="primary" onClick={() => addToDesign()}>
                Add to design
              </Button>
              <Box paddingBottom="2u" />
              <Button
                stretch
                variant="secondary"
                onClick={() => manageView("create-view")}
              >
                Make another video
              </Button>
              <Box paddingBottom="2u" />
              <div className={styles.creditDiv}>
                {`You have ${
                  credits
                    ?.toFixed(0)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") || 0
                } video credits left in Oxolo.`}
              </div>
            </div>
          ) : (
            <div className={styles.center}>
              <Title size="medium"> Generating AI video</Title>
              <Box paddingBottom="1u" />
              <div style={{ width: "85%" }}>
                <ProgressBar
                  size="medium"
                  tone="info"
                  value={+videoDetails.progress || 3}
                />
              </div>
              <Box paddingBottom="1u" />
              <Text>Grab a coffee, your video will be ready shortly.</Text>
              <Box paddingBottom="1u" />
              <Button
                variant="secondary"
                onClick={() => manageView("create-view")}
              >
                Make new video
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className={styles.center}>
          <LoadingIndicator size="large" />
        </div>
      )}

      {/* // ) : (
      //   <div className={styles.center}>
      //     <Title size="medium">No details found</Title>
      //   </div>
      // )} */}
    </>
  );
};

export default VideoGenerateView;
