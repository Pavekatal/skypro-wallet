import { useState } from "react";
import Input from "../inputs/Input";
import {
  AuthFormContainer,
  AuthFormLogin,
  AuthFormModal,
  AuthFormModalBlock,
  AuthFormModalTtl,
  SAuthForm,
} from "./SAuthForm.styled";

const AuthForm = ({ isSignUp }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [statusInputs, setStatusInputs] = useState({
    name: "default",
    email: "default",
    password: "default",
  });

  const handleChange = (inputName, value) => {
    setValues((prev) => ({ ...prev, [inputName]: value }));

    if (value === "") {
      setStatusInputs((prev) => ({ ...prev, [inputName]: "default" }));
    } else if (value.length >= 3) {
      setStatusInputs((prev) => ({ ...prev, [inputName]: "correct" }));
    } else if (value.length <= 3) {
      setStatusInputs((prev) => ({ ...prev, [inputName]: "error" }));
    }
  };

  return (
    <>
      <div
        style={{ width: "100%", height: "64px", backgroundColor: "#FFFFFF" }}
      />
      <SAuthForm>
        <AuthFormContainer>
          <AuthFormModal>
            <AuthFormModalBlock>
              <AuthFormModalTtl>
                <h2>{isSignUp ? "Регистрация" : "Вход"}</h2>
              </AuthFormModalTtl>
              <AuthFormLogin>
                {isSignUp && (
                  <Input
                    id="formname"
                    type="text"
                    name="name"
                    placeholder="Имя"
                    value={values.name}
                    statusInput={statusInputs.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                )}
                <Input
                  id="formlogin"
                  type="text"
                  name="login"
                  placeholder="Эл. почта"
                  value={values.email}
                  statusInput={statusInputs.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                <Input
                  id="formpassword"
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  value={values.password}
                  statusInput={statusInputs.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
              </AuthFormLogin>
            </AuthFormModalBlock>
          </AuthFormModal>
        </AuthFormContainer>
      </SAuthForm>
    </>
  );
};

export default AuthForm;
