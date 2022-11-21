import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";

export default function Login() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function sendLogin(event) {
    event.preventDefault();
    const info = { email: email, password: password };
    const promisse = axios.post("http://localhost:5000/signin", info);
    promisse.then((res) => {
      console.log(res.data);
      Navigate("/home");
    });
    promisse.catch((err) => {
      console.log(err);
    });
  }
  return (
    <Container>
      <h1>MyWallet</h1>
      <form onSubmit={sendLogin}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        />
        <input
        type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Senha"
        />

        <Button type="submit">Entrar</Button>
      </form>
      <Link to={"/register"}>
        <h2>Primeira vez? Cadastre-se!</h2>
      </Link>
    </Container>
  );
}

const Container = styled.div`


  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #8c11be;

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  h1 {
    font-family: "Saira Stencil One";
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;

    color: #ffffff;
    margin-bottom: 28px;
  }
  h2 {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;

    color: #ffffff;
  }
  input {
    margin-bottom: 13px;
    width: 326px;
    height: 58px;
    left: 25px;
    top: 233px;

    background: #ffffff;
    border-radius: 5px;

    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;

    color: #000000;
  }
`;

const Button = styled.button`
  width: 326px;
  height: 46px;

  background: #a328d6;
  border-radius: 5px;

  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;

  color: #ffffff;

  margin-bottom: 32px;
`;
