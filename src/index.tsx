import { AppUiProvider } from "@canva/app-ui-kit";
import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "@canva/app-ui-kit/styles.css";
import { ApiProvider } from "./shared/context/ApiContext";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = createRoot(document.getElementById("root")!);
function render() {
  root.render(
    <ApiProvider>
      <AppUiProvider>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={2200}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme={"colored"}
          transition={Flip}
          style={{ padding: "0 7px", top: "8px" }}
        />
      </AppUiProvider>
    </ApiProvider>
  );
}

render();

if (module.hot) {
  module.hot.accept("./app", render);
}
