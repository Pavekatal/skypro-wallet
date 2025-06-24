import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
`;

const FormWrapper = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const FormTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
`;

const FormInput = styled.input`
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
`;

const FormButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #00C853;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  cursor: pointer;
`;

const SignInPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //Имитация входа в систему//
    console.log('Signed in');
    navigate('/');
  };

  return (
    <>
      <Header currentPath="/sign-in" />
      <Container>
        <FormWrapper>
          <FormTitle>Вход</FormTitle>
          <form onSubmit={handleSubmit}>
            <FormInput type="email" placeholder="Email" />
            <FormInput type="password" placeholder="Пароль" />
            <FormButton type="submit">Войти</FormButton>
          </form>
        </FormWrapper>
      </Container>
    </>
  );
};

export default SignInPage;