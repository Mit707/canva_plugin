import React, { Fragment } from "react";
import { VIDEO_TYPE } from "src/shared/constants";
import { IVideoType, IVideoTypeProps } from "../interface/Video.Interface";
import {
  Button,
  ChevronLeftIcon,
  Column,
  Columns,
  Rows,
  Title,
} from "@canva/app-ui-kit";
import style from "styles/video.css";

const VideoType = (props: IVideoTypeProps) => {
  const { mode, changeMode, manageView } = props;

  return (
    <div className={style.pr16}>
      <Rows spacing="1u" align="stretch">
        <Rows align="start" spacing="0">
          <Columns spacing="1u" align="center" alignY="center">
            <Column>
              <Button
                icon={() => <ChevronLeftIcon />}
                variant="tertiary"
                onClick={() => manageView("list-view")}
              />
            </Column>
            <Column width="content">
              <Title size="small">Choose video type</Title>
            </Column>
          </Columns>
        </Rows>
        {VIDEO_TYPE.map((item: IVideoType) => (
          <Fragment key={item.id}>
            <Rows spacing="0" align="center">
              <Button
                onClick={() => changeMode(item)}
                stretch
                variant={item.id === mode.id ? "primary" : "secondary"}
                disabled={item.view === "product-view"}
              >
                {item.title}
              </Button>
            </Rows>
          </Fragment>
        ))}
      </Rows>
    </div>
  );
};

export default VideoType;
