import { useState } from "react";
import Input from "../inputs/Input";
import {
  AuthButtonContainer,
  AuthFormGroup,
  AuthFormLogin,
  AuthFormModal,
  AuthFormModalBlock,
  AuthFormModalTtl,
  SAuthForm,
} from "./SAuthForm.styled";
import Button from "../buttons/Button";
import {
  ErrorMessage,
  ErrorStarContainer,
} from "../errors/SErrorContainer.styled";
import { Link, useNavigate } from "react-router-dom";
import { InputWrapper } from "../inputs/SInput.styled";

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

  const [isTouched, setIsTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isActiveButton, setIsActiveButton] = useState(true);

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (inputName, value) => {
    setError("");
    setIsActiveButton(true);

    if (!isTouched[inputName]) {
      setIsTouched((prev) => ({ ...prev, [inputName]: true }));
    }

    if (isTouched[inputName]) {
      setErrors((prev) => ({ ...prev, [inputName]: false }));
    }

    setValues((prev) => ({ ...prev, [inputName]: value }));

    if (value.length === 0) {
      setStatusInputs((prev) => ({ ...prev, [inputName]: "default" }));
      setErrors({ ...errors, [inputName]: false });
      return;
    }

    if (value.length > 3) {
      setStatusInputs((prev) => ({ ...prev, [inputName]: "correct" }));
      setErrors({ ...errors, [inputName]: false });
    }

    if (value.length <= 3) {
      setStatusInputs((prev) => ({ ...prev, [inputName]: "error" }));
      setIsActiveButton(false);
      setErrors({ ...errors, [inputName]: true });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsTouched({ name: true, email: true, password: true });

    setIsSubmitted(true);

    const newErrors = { name: false, email: false, password: false };
    let isValid = true;

    if (isSignUp) {
      if (!values.name.trim() || values.name.trim().length <= 3) {
        newErrors.name = true;
        isValid = false;
      }
    }

    if (!values.email.trim() || values.email.trim().length <= 3) {
      newErrors.email = true;
      isValid = false;
    }

    if (!values.password.trim() || values.password.trim().length <= 3) {
      newErrors.password = true;
      isValid = false;
    }

    setErrors(newErrors);

    const newValues = { ...values };

    setValues(newValues);

    if (!isValid) {
      setIsActiveButton(false);
      setError(
        "Упс! Введенные вами данные некорректны. Введите данные корректно и повторите попытку."
      );
      setStatusInputs((prev) => ({
        name: newErrors.name ? "error" : prev.name,
        email: newErrors.email ? "error" : prev.email,
        password: newErrors.password ? "error" : prev.password,
      }));

      return;
    }

    setError("");
    navigate("/");
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "64px",
          backgroundColor: "#FFFFFF",
          display: "flex",
          alignItems: "center ",
        }}
      >
        <img src="../../../public/logo.svg" style={{ marginLeft: "120px" }} />
      </div>
      <SAuthForm>
        <AuthFormModal>
          <AuthFormModalBlock>
            <AuthFormModalTtl>
              <h2>{isSignUp ? "Регистрация" : "Вход"}</h2>
            </AuthFormModalTtl>
            <AuthFormLogin onSubmit={handleSubmit}>
              {isSignUp && (
                <InputWrapper>
                  <Input
                    id="formname"
                    type="text"
                    name="name"
                    placeholder="Имя"
                    value={values.name}
                    statusInput={statusInputs.name}
                    // showStar={errors.name && isSubmitted}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                  {errors.name && isSubmitted && (
                    <ErrorStarContainer>*</ErrorStarContainer>
                  )}
                </InputWrapper>
              )}
              <InputWrapper>
                <Input
                  id="formlogin"
                  type="text"
                  name="login"
                  placeholder="Эл. почта"
                  value={values.email}
                  statusInput={statusInputs.email}
                  // showStar={errors.email && isSubmitted}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                {errors.email && isSubmitted && (
                  <ErrorStarContainer>*</ErrorStarContainer>
                )}
              </InputWrapper>
              <InputWrapper>
                <Input
                  id="formpassword"
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  value={values.password}
                  statusInput={statusInputs.password}
                  // showStar={errors.password && isSubmitted}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
                {errors.password && isSubmitted && (
                  <ErrorStarContainer>*</ErrorStarContainer>
                )}
              </InputWrapper>
              <ErrorMessage>{error}</ErrorMessage>
              <AuthButtonContainer>
                <Button isActive={isActiveButton}>
                  {isSignUp ? "Зарегистрироваться" : "Войти"}
                </Button>
              </AuthButtonContainer>
            </AuthFormLogin>
            {!isSignUp && (
              <AuthFormGroup>
                <p>Нужно зарегистрироваться?</p>
                <Link to="/sign-up">Регистрируйтесь здесь</Link>
              </AuthFormGroup>
            )}
            {isSignUp && (
              <AuthFormGroup>
                <p>Уже есть аккаунт?</p>
                <Link to="/sign-in">Войдите здесь</Link>
              </AuthFormGroup>
            )}
          </AuthFormModalBlock>
        </AuthFormModal>
      </SAuthForm>
    </>
  );
};

export default AuthForm;
