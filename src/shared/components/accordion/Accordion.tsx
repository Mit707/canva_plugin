import React, { ReactElement, useState } from "react";
import clsx from "clsx";
import { MinusIcon, PlusIcon } from "@canva/app-ui-kit";

import style from "styles/accordion.css";

interface IAccordionProps {
  children: ReactElement;
}

const Accordion: React.FC<IAccordionProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const click = () => {
    setOpen(!open);
  };

  return (
    <div className={style.accordion}>
      <div
        className={style.title}
        onClick={() => click()}
        style={{
          color: open ? "var(--ui-kit-color-primary)" : "#fff",
          borderColor: open ? "var(--ui-kit-color-primary)" : "",
        }}
      >
        <div className={style.arrowWrapper}>
          {/* <span className={style.titleText}>Advance details</span> */}
          <span
            style={{
              fontSize: "1.4rem",
              lineHeight: "2.2rem",
              fontWeight: 600,
            }}
          >
            Advance details
          </span>
          {open ? <MinusIcon /> : <PlusIcon />}
        </div>
      </div>
      <div
        className={
          open ? clsx(style.content, style.contentOpen) : style.content
        }
      >
        <div
          className={
            open
              ? clsx(style.contentText, style.contentTextOpen)
              : style.contentText
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
