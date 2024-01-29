import React, { useRef, useState } from "react";
import styles from "styles/customaudiocard.css";
import { ICustomAudioCardProps } from "./interface/CustomAudioCard.interface";
import { Text } from "@canva/app-ui-kit";

const CustomAudioCard = (props: ICustomAudioCardProps) => {
  const { title, subTitle, id, url, index, showFlag, caption, length } = props;
  const [isPlaying, setIsPlaying] = useState<number | null>(null);

  const refs = useRef<Array<HTMLAudioElement | null>>(
    new Array(length).fill(null)
  );

  const handlePlayPauseClick = (index: number) => {
    const currentAudio = refs.current[index];
    if (currentAudio) {
      if (isPlaying === index) {
        currentAudio.pause();
        setIsPlaying(null);
      } else {
        if (isPlaying !== null) {
          const previousAudio = refs.current[isPlaying];
          if (previousAudio) {
            previousAudio.pause();
          }
        }
        setIsPlaying(index);
        currentAudio.play();
      }
    }
  };

  return (
    <div className={styles.itemContainer}>
      <div
        className={styles.iconWrapper}
        onClick={() => handlePlayPauseClick(index)}
      >
        {isPlaying === null || isPlaying !== index ? (
          <div className={styles.pauseIconWrapper}>
            {/* sound icon */}
            <svg
              className={styles.soundIcon}
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m10.167 4.802-2.64 2.304a2.5 2.5 0 0 1-1.644.616H4v4.554h1.881a2.5 2.5 0 0 1 1.644.617l2.642 2.305V4.802Zm1.5 11.496c0 .859-1.011 1.318-1.658.754l-3.47-3.03a1 1 0 0 0-.658-.246H3.5a1 1 0 0 1-1-1V7.222a1 1 0 0 1 1-1h2.383a1 1 0 0 0 .657-.247l3.47-3.027c.646-.564 1.657-.105 1.657.754v12.596Zm1.041-10.465c0-.345.28-.625.625-.625a4.792 4.792 0 1 1 0 9.584.625.625 0 0 1 0-1.25 3.542 3.542 0 0 0 0-7.084.625.625 0 0 1-.625-.625Zm.625 1.875a.625.625 0 0 0 0 1.25 1.042 1.042 0 1 1 0 2.084.625.625 0 0 0 0 1.25 2.292 2.292 0 1 0 0-4.584Z"
                fill="#fff"
                fillOpacity="0.9"
              ></path>
            </svg>
            {/* play icon */}
            <svg
              className={styles.playIcon}
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m8.248 4.212 11.05 6.574c.694.412.91 1.29.483 1.961-.121.19-.287.35-.483.467l-11.05 6.574c-.694.413-1.602.204-2.03-.467A1.39 1.39 0 0 1 6 18.574V5.426C6 4.638 6.66 4 7.475 4c.273 0 .54.073.773.212Z"
                fill="#fff"
                fillOpacity="0.9"
              ></path>
            </svg>
          </div>
        ) : (
          <div>
            {/* pause icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.5 4C7.672 4 7 4.768 7 5.714v12.572C7 19.233 7.672 20 8.5 20s1.5-.767 1.5-1.714V5.714C10 4.768 9.328 4 8.5 4ZM15.5 4c-.828 0-1.5.768-1.5 1.714v12.572c0 .947.672 1.714 1.5 1.714s1.5-.767 1.5-1.714V5.714C17 4.768 16.328 4 15.5 4Z"
                fill="#fff"
                fillOpacity="0.9"
              ></path>
            </svg>
          </div>
        )}
        <audio id={id} ref={(el) => (refs.current[index] = el)} src={url} />
      </div>
      <div>
        <Text
          alignment="start"
          capitalization="default"
          size="small"
          variant="bold"
        >
          {subTitle ? `${title} - ${subTitle}` : title}
        </Text>

        <div
          style={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
          }}
        >
          {showFlag && (
            <img
              src="https://static.heygen.ai/region_flags/us.png"
              alt="flag"
              style={{ height: "12px" }}
            />
          )}
          {caption && (
            <span
              style={{
                color: "hsla(0,0%,100%,.9)",
                fontSize: "14px",
              }}
            >
              {caption}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export default CustomAudioCard;
