import React, { useState } from "react";
import axios from "axios";
import { auth } from "@canva/user";
import { toast } from "react-toastify";
import { API_CONFIG } from "src/shared/constants/api";
import { useApi } from "src/shared/context/ApiContext";
import { Button, Rows, TextInput, Title } from "@canva/app-ui-kit";

import style from "styles/video.css";

interface ILoginProps {
  login: (status: boolean) => void;
}
const Login = (props: ILoginProps) => {
  const { login } = props;
  const { changeAuthToken } = useApi();
  const [token, setToken] = useState("");
  const [loader, setLoader] = useState(false);

  const userRegistration = async () => {
    setLoader(true);
    await auth.getCanvaUserToken().then((res: any) => {
      axios
        .post(`${BACKEND_HOST}${API_CONFIG.register}`, "", {
          headers: {
            "Oxolo-Key": token,
            Authorization: `Bearer ${res}`,
          },
        })
        .then((result: any) => {
          if (!result.is_error) {
            localStorage.setItem("token", res);
            changeAuthToken(res);
            login(true);
            setLoader(false);
            toast.success(result.message);
          } else {
            toast.error(result.message);
            setLoader(false);
          }
        })
        .catch((error) => {
          if (error.response?.data) {
            toast.error(error.response.data.message);
          } else {
            toast.error(error.message);
          }
          setLoader(false);
        });
    });
  };

  return (
    <div className={style.loginContainer}>
      <Rows spacing="2u">
        <Title alignment="start" capitalization="default" size="medium">
          Authentication
        </Title>
        <TextInput
          name="token"
          placeholder="Enter your oxolo key"
          onChange={(value: string) => setToken(value?.trim())}
        />
        <Button
          variant="primary"
          disabled={!token}
          onClick={() => userRegistration()}
          loading={loader}
          stretch
        >
          Submit
        </Button>
      </Rows>
    </div>
  );
};

export default Login;
