import React from "react";
import {
  Column,
  Columns,
  Placeholder,
  TitlePlaceholder,
} from "@canva/app-ui-kit";

interface IAudioCardProps {
  count: number;
}

const ActorPlaceholder = (props: IAudioCardProps) => {
  const { count } = props;
  return (
    <div style={{ display: "flex" }}>
      {[...Array(count)].map((_, index) => (
        <div
          style={{
            border: "2px solid transparent",
            borderRadius: "4px",
            padding: "1px",
            height: "9rem",
            minWidth: "9rem",
            width: "9rem",
          }}
          key={index}
        >
          <div
            style={{
              background: "var(--color-secondary)",
              borderRadius: "2px",
              height: "100%",
              overflow: "hidden",
              position: "relative",
              width: "100%",
            }}
          >
            <Placeholder shape="square" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActorPlaceholder;
