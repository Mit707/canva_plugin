import React, { ReactElement, useEffect, useState } from "react";
import { IVideoCreateProps, IVideoType } from "../interface/Video.Interface";
import FormMode from "./FormMode";
import VideoType from "./VideoType";

const Create = (props: IVideoCreateProps) => {
  const { manageView } = props;
  const [currentView, setCurrentView] = useState("form-view");
  const [currentMode, setCurrentMode] = useState<IVideoType>({
    id: 2,
    title: "Form mode",
    label: "form mode",
    view: "form-view",
  });

  const handleChangeMode = (item: IVideoType) => {
    setCurrentMode(item);
    handleChangeView(item.view);
  };
  const handleChangeView = (view: string) => {
    setCurrentView(view);
  };

  useEffect(() => {
    return () => {
      setCurrentView("form-view");
      setCurrentMode({} as IVideoType);
    };
  }, []);

  const handleView = (key: string): ReactElement | null => {
    const componentMap: Record<string, ReactElement> = {
      "type-view": (
        <VideoType
          mode={currentMode}
          changeMode={handleChangeMode}
          manageView={manageView}
        />
      ),
      "form-view": (
        <FormMode
          changeView={handleChangeView}
          mode={currentMode}
          manageView={manageView}
        />
      ),
      // "url-view": (
      //   <UrlMode
      //     changeView={handleChangeView}
      //     mode={currentMode}
      //     manageView={manageView}
      //   />
      // ),
      // "product-view": (
      //   <ProductMode
      //     changeView={handleChangeView}
      //     mode={currentMode}
      //     manageView={manageView}
      //   />
      // ),
    };
    return componentMap[key] ?? null;
  };

  return <>{currentView && handleView(currentView)}</>;
};

export default Create;
