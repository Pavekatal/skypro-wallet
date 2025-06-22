import React from "react";
import { SInput } from "./SInput.styled";

const Input = ({
  type = "text",
  id = "",
  name = "",
  placeholder = "",
  error = false,
  statusInput = "default",
  autoFocus = true,
  onChange,
}) => {
  return (
    <SInput
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      $error={error}
      onChange={onChange}
      autoFocus={autoFocus}
      autoComplete="current-password"
      $statusInput={statusInput}
    />
  );
};

export default Input;
