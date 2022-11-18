import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Login() {
  return (
    <Container>
      <h1>MyWallet</h1>
      <input
        //onChange={(e) => setName(e.target.value)} //atualiza name para enviar
        //value={name}
        placeholder="Email"
      />
      <input
        //onChange={(e) => setName(e.target.value)} //atualiza name para enviar
        //value={name}
        placeholder="Senha"
      />
      
      <Button>Entrar</Button>
      <Link to={"/register"}>
      <h2>Primeira vez? Cadastre-se!</h2>
      </Link>
      
    </Container>
  );
}

const Container = styled.div`
body{
  height: 100%;
}
width:100%;
height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #8c11be;

  h1 {
    font-family: "Saira Stencil One";
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;

    color: #ffffff;
    margin-bottom:28px;
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

  margin-bottom:32px;
`;
