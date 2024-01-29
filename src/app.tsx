import React, { lazy, useEffect, useState } from "react";
import styles from "styles/components.css";
const Video = lazy(() => import("./features/video/Video"));
const Login = lazy(() => import("./features/auth/Login"));

import { useApi } from "./shared/context/ApiContext";
import { LoadingIndicator, Rows } from "@canva/app-ui-kit";

const App = () => {
  const { authToken } = useApi();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (!authToken) setIsLoggedIn(false);
    else setIsLoggedIn(true);

    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, [authToken]);

  const handleLogin = (status: boolean) => {
    setIsLoggedIn(status);
  };
  return (
    <div className={styles.mainContainer}>
      {loader ? (
        <div className={styles.center}>
          <LoadingIndicator size="large" />
        </div>
      ) : (
        <Rows spacing="2u">
          {isLoggedIn ? <Video /> : <Login login={handleLogin} />}
        </Rows>
      )}
    </div>
  );
};

export default App;
