import React from "react";
import {
  Column,
  Columns,
  Grid,
  Placeholder,
  TitlePlaceholder,
} from "@canva/app-ui-kit";

interface IAudioCardProps {
  count: number;
}

const AudioCardPlaceholder = (props: IAudioCardProps) => {
  const { count } = props;
  return (
    <div>
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
          <Grid columns={2}>
            <Columns spacing="1u">
              <Column width="1/3">
                <Placeholder shape="square" />
              </Column>
              <Column>
                <div style={{ width: "85px" }}>
                  <TitlePlaceholder size="small" />
                </div>
                <div style={{ width: "85px" }}>
                  <TitlePlaceholder size="small" />
                </div>
              </Column>
            </Columns>
            <Columns spacing="1u">
              <Column width="1/3">
                <Placeholder shape="square" />
              </Column>
              <Column>
                <div style={{ width: "85px" }}>
                  <TitlePlaceholder size="small" />
                </div>
                <div style={{ width: "85px" }}>
                  <TitlePlaceholder size="small" />
                </div>
              </Column>
            </Columns>
          </Grid>
        </div>
      ))}
    </div>
  );
};

export default AudioCardPlaceholder;
