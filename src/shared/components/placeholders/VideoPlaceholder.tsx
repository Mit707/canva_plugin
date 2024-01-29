import React from "react";
import {
  Column,
  Columns,
  Placeholder,
  TitlePlaceholder,
} from "@canva/app-ui-kit";
import style from "styles/video.css";

interface IVideoCardProps {
  count: number;
}

const VideoPlaceholder = (props: IVideoCardProps) => {
  const { count } = props;
  return (
    <div className={style.pr16}>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          style={{
            background: "#343536",
            borderRadius: "8px",
            padding: "8px",
            cursor: "pointer",
            border: "1px solid hsla(0,0%,100%,.2)",
            marginTop: index > 0 ? "16px" : "0", // Add margin to separate instances
          }}
        >
          <Columns spacing="1u">
            <Column width="1/5">
              <Placeholder shape="circle" />
            </Column>
            <Column>
              <div style={{ width: "190px" }}>
                <TitlePlaceholder size="small" />
              </div>
              <div style={{ width: "190px" }}>
                <TitlePlaceholder size="small" />
              </div>
            </Column>
          </Columns>
        </div>
      ))}
    </div>
  );
};

export default VideoPlaceholder;
