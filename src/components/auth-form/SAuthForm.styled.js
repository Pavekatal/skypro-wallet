import styled from "styled-components";

export const SAuthForm = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(244, 245, 246);
  position: absolute;
`;

export const AuthFormContainer = styled.div`
  display: block;
  width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
`;

export const AuthFormModal = styled.div`
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AuthFormModalBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 368px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
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
    margin-bottom: 7px;
  }

  input:last-of-type {
    margin-bottom: 0;
  }
`;
