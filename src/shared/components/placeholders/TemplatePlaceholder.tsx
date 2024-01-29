import React from "react";
import { Grid, TextPlaceholder, TitlePlaceholder } from "@canva/app-ui-kit";

import styles from "styles/video.css";

interface IAudioCardProps {
  count: number;
}

const TemplatePlaceholder = (props: IAudioCardProps) => {
  const { count } = props;
  return (
    <Grid columns={3} spacing="1u">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className={styles.audioItemContainer}
          style={{ padding: "0 6px" }}
        >
          <TitlePlaceholder size="xlarge" />
          <TextPlaceholder size="small" />
        </div>
        // <div
        //   key={index}
        //   style={{
        //     border: "2px solid transparent",
        //     borderRadius: "4px",
        //     padding: "1px",
        //     height: "9rem",
        //     minWidth: "12rem",
        //     width: "14rem",
        //   }}
        // >
        //   <div
        //     style={{
        //       background: "var(--color-secondary)",
        //       borderRadius: "2px",
        //       height: "100%",
        //       overflow: "hidden",
        //       position: "relative",
        //       width: "100%",
        //     }}
        //   >
        //     <Placeholder shape="square" />
        //   </div>
        // </div>
      ))}
    </Grid>
  );
};

export default TemplatePlaceholder;
