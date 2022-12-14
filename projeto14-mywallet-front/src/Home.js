import { Link } from "react-router-dom";
import styled from "styled-components";
import image1 from "./img/Vector (1).png";
import addnegative from "./img/ant-design_minus-circle-outlined.png";
import addpositive from "./img/ant-design_plus-circle-outlined.png";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
const DateA = dayjs().format("DD/MM");

export default function Home() {
  const [entry, setEntry] = useState(false);
  const [leave, setLeave] = useState(false);
  const [walletV, setWalletV] = useState(true);
  const [saldoF,setSaldoF] = useState(0);

  const [newOperation, SetNewOperation] = useState("");
  const [newValue, SetNewValue] = useState("");

  const [listOperation, setListOperation] = useState([]);

  const [listOperation2, setListOperation2] = useState([
   
  ]);


  function EntryVision() {
    setEntry(true);
    setWalletV(false);
  }
  function EntryNone() {
    setEntry(false);
    setWalletV(true);
  }
  function LeaveVision() {
    setLeave(true);
    setWalletV(false);
  }
  function LeaveNone() {
    setLeave(false);
    setWalletV(true);
  }

  function addWalletnegative() {
    const newWallet = {
      date: DateA,
      operation: newOperation,
      value: newValue,
    };

    const promisse = axios.post("http://localhost:5000/negativewallet", newWallet);
    promisse.then((res) => {
      console.log(res.data);

    });
    promisse.catch((err) => {
      console.log(err);
    });
        
    //setListOperation([...listOperation, newWallet]);
    setSaldoF(saldoF - Number(newWallet.value));
    SetNewOperation("");
    SetNewValue("");
    LeaveNone();
    //console.log(listOperation);
  }


  function addWalletpostive() {
    const newWallet = {
      date: DateA,
      operation: newOperation,
      value: newValue,
    };

    const promisse = axios.post("http://localhost:5000/positivewallet", newWallet);
    promisse.then((res) => {
      console.log(res.data);
    });
    promisse.catch((err) => {
      console.log(err);
    });


    //setListOperation2([...listOperation2, newWallet]);
    setSaldoF(saldoF + Number(newWallet.value))
    SetNewOperation("");
    SetNewValue("");
    EntryNone();
    //console.log(listOperation2);
    
  }


 
  useEffect(() => {
  
    axios
      .get("http://localhost:5000/negativewallet")
      .then((res) => {
        console.log("aaa",res.data);
        console.log("res.data.isUser", res.data.isUser)
        setListOperation(res.data.isUser)
        console.log(listOperation)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

   
  useEffect(() => {
  
    axios
      .get("http://localhost:5000/positivewallet")
      .then((res) => {
        console.log("aaa",res.data);
        console.log("res.data.isUser", res.data.isUser)
        setListOperation2(res.data.isUser)
        console.log(listOperation2)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  return (
    <Container>
      <Wallet walletV={walletV}>
        <NavBar>
          <h1>Oi, Fulano</h1>
          <Link to="/">
            <img src={image1} />
          </Link>
        </NavBar>
        <Work>
          {listOperation.length === 0 && listOperation2.length === 0   ? (
            <h3>N??o h?? registros de entrada ou sa??da</h3>
          ) : (
            <div>
              {listOperation.map((op) => (
                <Deal>
                  <Detail>
                    <h1>{op.date}</h1>
                    <h2>{op.operation}</h2>
                  </Detail>
                  <Value>
                    <h1>{op.value}</h1>
                  </Value>
                </Deal>
              ))}
              {listOperation2.map((op) => (
                <Deal>
                  <Detail>
                    <h1>{op.date}</h1>
                    <h2>{op.operation}</h2>
                  </Detail>
                  <Value2>
                    <h1>{op.value}</h1>
                  </Value2>
                </Deal>
              ))}
              <Total>
                <h1>Saldo</h1>
                <h2>{saldoF}</h2>
              </Total>
            </div>
          )}
        </Work>
        <Operation>
          <ButtonO onClick={EntryVision}>
            <img src={addpositive} />
            <h1>Nova</h1>
            <h1>entrada</h1>
          </ButtonO>
          <ButtonO onClick={LeaveVision}>
            <img src={addnegative} />
            <h1>
              Nova <br />
              sa??da
            </h1>
          </ButtonO>
        </Operation>
      </Wallet>

      <NewEntry entry={entry}>
        <h1>Nova Entrada</h1>
          <input
            required
            type="number"
            minlength="1"
            onChange={(e) => SetNewValue(e.target.value)} //atualiza valor para enviar
            value={newValue}
            placeholder="Valor"
          />
          <input
            required
            type="text"
            minlength="1"
            onChange={(e) => SetNewOperation(e.target.value)} //atualiza Descri????o para enviar
            value={newOperation}
            placeholder="Descri????o"
          />
          <Button onClick={addWalletpostive}>Salvar Entrada</Button>
      </NewEntry>
      <NewLeave leave={leave}>
        <h1>Nova Sa??da</h1>
        <input
          type={"number"}
          onChange={(e) => SetNewValue(e.target.value)} //atualiza valor para enviar
          value={newValue}
          placeholder="Valor"
        />
        <input
          onChange={(e) => SetNewOperation(e.target.value)} //atualiza Descri????o para enviar
          value={newOperation}
          placeholder="Descri????o"
        />
        <Button onClick={addWalletnegative}>Salvar Sa??da</Button>
      </NewLeave>
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
`;

const Wallet = styled.div`
  height: 100%;
  display: ${({ walletV }) => (walletV ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h3 {
    margin-top: 200px;
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;

    color: #868686;
  }
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 25px;
  height: 50px;
  width: 100%;

  h1 {
    margin-left: 10px;
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    margin-right: 10px;
    height: 23px;
    width: 24px;
  }
`;

const Work = styled.div`
 position: relative;
  margin-top: 22px;
  width: 326px;
  height: 446px;

  background: #ffffff;
  border-radius: 5px;

  h1 {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;

    color: #868686;
  }
`;
const Operation = styled.div`
  width: 345px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const ButtonO = styled.button`
  margin-top: 13px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 155px;
  height: 114px;
  background: #a328d6;
  border-radius: 5px;
  h1 {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;

    color: #ffffff;
  }

  img {
    margin-top: 10px;
    height: 22px;
    width: 22px;
    margin-bottom: 25px;
  }
`;

const NewEntry = styled.div`
  display: ${({ entry }) => (entry ? "flex" : "none")};
  flex-direction: column;

  form{
    display:flex;
    flex-direction:column;
  }
  h1 {
    margin-top: 25px;
    margin-bottom: 40px;
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: left;
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

const NewLeave = styled.div`
  display: ${({ leave }) => (leave ? "flex" : "none")};
  flex-direction: column;

  h1 {
    margin-top: 25px;
    margin-bottom: 40px;
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: left;
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

const Deal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;
const Value = styled.div`
  h1 {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    margin-right: 12px;
    color: #c70000;
  }
`;
const Value2 = styled.div`
  h1 {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    margin-right: 12px;
    color: #03ac00;
  }
`;
const Detail = styled.div`
  display: flex;
  align-items: center;
  h1 {
    margin-left: 12px;
    color: #c6c6c6;
    margin-right: 10px;
  }
  h2 {
    justify-content: left;
    color: #000000;
  }
`;
const Total = styled.div`
  position: absolute;
  bottom: 5px;
  
  margin-top: 15px;
  display: flex;
  justify-content: space-between;

  h1 {
    margin-left: 10px;
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;

    color: #000000;
  }

  h2 {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    margin-left:230px;
    margin-right: 20px;
    color: #000000;
  }
`;