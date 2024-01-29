import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ChevronLeftIcon,
  Column,
  Columns,
  EmbedCard,
  Placeholder,
  Rows,
  Title,
  TitlePlaceholder,
} from "@canva/app-ui-kit";
import {
  IVideoDetails,
  IVideoDetailsProps,
} from "../interface/Video.Interface";
import HttpService from "src/shared/services/Http.service";
import { API_CONFIG } from "src/shared/constants/api";

const Details = (props: IVideoDetailsProps) => {
  const { manageView, videoId } = props;

  const [videoDetails, setVideoDetails] = useState({} as IVideoDetails);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (videoId) {
      HttpService.get(`${API_CONFIG.video}/${videoId}`).then((res) => {
        if (!res.is_error) {
          setVideoDetails(res.data);
        }
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    }
  }, [videoId]);

  return (
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
          <Title size="small">Details</Title>
        </Column>
      </Columns>
      <Box paddingBottom="1u" />
      {loading ? (
        <div
          style={{
            background: "#343536",
            borderRadius: "8px",
            padding: "8px",
            cursor: "pointer",
            border: "1px solid hsla(0,0%,100%,.2)",
            marginTop: "16px", // Add margin to separate instances
          }}
        >
          <Columns spacing="1u" alignY="stretch">
            <Column>
              <div
                style={{ width: "295px", height: "200px", paddingBottom: 10 }}
              >
                <Placeholder shape="rectangle" />
              </div>
              <div style={{ width: "295px" }}>
                <TitlePlaceholder size="small" />
              </div>
            </Column>
          </Columns>
          <Columns spacing="1u">
            <Column>
              <div style={{ width: "145px" }}>
                <TitlePlaceholder size="small" />
              </div>
            </Column>
            <Column>
              <div style={{ width: "145px" }}>
                <TitlePlaceholder size="small" />
              </div>
            </Column>
          </Columns>
          <Columns spacing="1u">
            <Column>
              <div style={{ width: "145px" }}>
                <TitlePlaceholder size="small" />
              </div>
            </Column>
            <Column>
              <div style={{ width: "145px" }}>
                <TitlePlaceholder size="small" />
              </div>
            </Column>
          </Columns>
        </div>
      ) : (
        <Columns spacing="0">
          <Column>
            <EmbedCard
              ariaLabel="Add embed to design"
              description=""
              onClick={function noRefCheck() {}}
              onDragStart={function noRefCheck() {}}
              thumbnailUrl={videoDetails.thumbnail}
              title={videoDetails.stagText}
            />
            {/* <div>
          <div style={{ padding: 5 }}>
            <img
              width="100%"
              height="100%"
              src={videoDetails.thumbnail}
              alt="imge"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div> */}
            {/* <ImageCard
          alt="thumbnail"
          ariaLabel="Add image to design"
          borderRadius="none"
          onClick={function noRefCheck() {}}
          onDragStart={function noRefCheck() {}}
          thumbnailUrl={videoDetails.thumbnail}
        /> */}
          </Column>
        </Columns>
      )}
    </Rows>
  );
};

export default Details;
