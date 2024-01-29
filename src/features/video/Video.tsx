import React, { ReactElement, useState } from "react";
import List from "./components/List";
import Create from "./components/Create";
import Details from "./components/Details";
import VideoGenerateView from "./components/VideoGenerateView";

const Video = () => {
  const [currentView, setCurrentView] = useState("waiting-view");
  const [currentVideoId, setCurrentVideoId] = useState(
    "83a2e859-f01f-427c-bc7c-3838ace3d74d"
  );

  const manageView = (flag: string, id?: string) => {
    setCurrentView(flag);
    if (id) setCurrentVideoId(id);
  };
  const handleSelectVideo = (video: string) => {
    setCurrentVideoId(video);
    setCurrentView("details-view");
  };

  const handleView = (key: string): ReactElement | null => {
    const componentMap: Record<string, ReactElement> = {
      "list-view": <List manageView={manageView} select={handleSelectVideo} />,
      "details-view": (
        <Details manageView={manageView} videoId={currentVideoId} />
      ),
      "create-view": <Create manageView={manageView} />,
      "waiting-view": (
        <VideoGenerateView videoId={currentVideoId} manageView={manageView} />
      ),
    };
    return componentMap[key] ?? null;
  };

  return <>{currentView && handleView(currentView)}</>;
};

export default Video;
