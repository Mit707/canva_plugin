import { Alert, Text } from "@canva/app-ui-kit";
import React from "react";

interface IToastProps {
  message: string;
  close: () => void;
  toastTone: "critical" | "warn" | "positive" | "info";
}

const Toast = (props: IToastProps) => {
  const { message, toastTone, close } = props;

  return (
    <div
      style={{
        position: "absolute",
        margin: "0px 7px",
        transition: "transform 0.5s ease-in-out",
        right: 0,
      }}
    >
      <Alert onDismiss={() => close()} tone={toastTone ?? "critical"}>
        <Text>{message}</Text>
      </Alert>
    </div>
  );
};

export default Toast;
