import React, { ReactElement } from "react";
import style from "styles/Tooltip.css";

interface IToolTipProps {
  text: string;
  children: ReactElement;
}

const Tooltip = (props: IToolTipProps) => {
  const { text, children } = props;
  return (
    <div className={style.tooltip}>
      {children}
      <span className={style.tooltiptext}>{text}</span>
    </div>
  );
};

export default Tooltip;
