import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  ChevronLeftIcon,
  Column,
  Columns,
  Placeholder,
  PlusIcon,
  Rows,
  Title,
} from "@canva/app-ui-kit";

import clsx from "clsx";
import moment from "moment";
import styles from "styles/video.css";
import empty from "assets/images/empty.png";
import rootStyle from "styles/components.css";
import { API_CONFIG } from "src/shared/constants/api";
import HttpService from "src/shared/services/Http.service";
import { IVideoListProps, IVideo } from "../interface/Video.Interface";
import VideoPlaceholder from "../../../shared/components/placeholders/VideoPlaceholder";

const List = (props: IVideoListProps) => {
  const { manageView } = props;
  const [videoList, setVideoList] = useState<IVideo[]>([]);

  const [loader, setLoader] = useState(true);

  const getVideoList = () => {
    setLoader(true);
    HttpService.get(`${API_CONFIG.video}?sortField=created&sortType=dec`)
      .then((res) => {
        if (!res.is_error) {
          setVideoList(res.data);
        } else {
          console.error(`Error fetching data for filter ${res.message}`);
        }
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.error(`Error fetching data for filter`, error);
      });
  };
  useEffect(() => {
    getVideoList();
  }, []);

  // const handleScroll = (event: any) => {
  //   console.log("event", event);
  //   // let totalPages = Math.ceil(totalCount / 10);
  //   // let nextPage = (pageData?.page || 0) + 1;
  //   let top = event.target.scrollTop;
  //   // if (top === 0 && !loading && nextPage <= totalPages) {
  //   // dispatch({ type: "SCROLLING_ACTION", payload: "pagination" });
  //   // handlePageData(nextPage);
  //   // }
  // };

  return (
    <>
      {loader ? (
        <>
          <div
            style={{
              height: "40px",
              width: "55.5%",
            }}
          >
            <Placeholder shape="rectangle" />
          </div>
          <VideoPlaceholder count={10} />
        </>
      ) : (
        <>
          <Rows spacing="1u">
            <Columns spacing="1u" align="start" alignY="center">
              <Column width="content">
                <Button
                  icon={() => <ChevronLeftIcon />}
                  variant="tertiary"
                  onClick={() => manageView("create-view")}
                />
              </Column>
              <Column width="4/5">
                <Title size="small">Video history</Title>
              </Column>
            </Columns>
          </Rows>
          {videoList?.length > 0 ? (
            <div className={styles.container}>
              <div
                className={clsx(rootStyle.scrollContainer, styles.listPadding)}
                id="CHAT_AREA"
                //onScroll={handleScroll}
              >
                {videoList?.map((video: IVideo) => (
                  <div
                    className={styles.itemContainer}
                    // style={{
                    //   border:
                    //     selectedVideo.identifier === video.identifier
                    //       ? "2px solid var(--ui-kit-color-primary)"
                    //       : "2px solid transparent",
                    // }}
                    key={video.identifier}
                  >
                    <Columns spacing="1u">
                      <Column width="content">
                        <img
                          src="https://picsum.photos/200/300"
                          alt="thumb"
                          width={50}
                          height={50}
                          style={{
                            borderRadius: "50%",
                            marginRight: 5,
                            objectFit: "cover",
                          }}
                        />
                      </Column>
                      <Column>
                        <Title size="xsmall">
                          {moment
                            .utc(video?.created)
                            .local()
                            .format("MMM Do YYYY, hh:mm")}
                        </Title>
                      </Column>
                    </Columns>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.center}>
              <img
                src={empty}
                alt="empty"
                width={150}
                height={150}
                style={{ paddingBottom: 10 }}
              />
              <Title size="xlarge">Welcome to Oxolo!</Title>
              <Box paddingBottom="0.5u" />
              <Title size="small">Nice to have you on board.</Title>
              <Box paddingBottom="0.5u" />
              <Title size="xsmall">
                Let´s get started by creating your first video.
              </Title>
              <Box paddingBottom="2u" />
              <Button
                icon={() => <PlusIcon />}
                variant="primary"
                onClick={() => manageView("create-view")}
              >
                Create Video
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default List;
