import styled from "styled-components";

export const SAuthForm = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(244, 245, 246);
  position: absolute;
`;

export const AuthFormModal = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AuthFormModalBlock = styled.div`
  max-width: 379px;
  width: 100%;
  background-color: #ffffff;
  padding: 32px;
  border-radius: 30px;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
`;

export const AuthFormModalTtl = styled.div`
  h2 {
    font-family: Montserrat;
    font-size: 24px;
    font-weight: 700;
    line-height: 29px;
    margin-bottom: 24px;
    text-align: center;
  }
`;

export const AuthFormLogin = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  input {
    margin-bottom: 12px;
  }

  input:last-of-type {
    margin-bottom: 0;
  }
`;

export const AuthButtonContainer = styled.div`
  width: 100%;
  margin-top: 24px;
`;
