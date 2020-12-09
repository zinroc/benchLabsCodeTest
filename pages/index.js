import Head from "next/head";
import styled from "@emotion/styled";

import { useSelector } from "react-redux";

import Ledger from "../containers/Ledger";

const Header = styled.div`
  background-color: #2f9685;
  text-align: center;
  width: 100%;
  color: white;
  padding: 10px;
  font-weight: 500;
  cursor: default;
  position: fixed;
  justify-content: space-around;
  display: flex;
  padding: 50px;
  :hover {
    color: lightblue;
  }
`;

const Spacer = styled.div`
  height: ${({ height }) => (height ? height : "0px")};
`;

const Margin = styled.div`
  margin-top: ${({ top }) => (top ? top : "0px")};
  margin-left: ${({ left }) => (left ? left : "0px")};
  margin-right: ${({ right }) => (right ? right : "0px")};
  margin-bottom: ${({ bottom }) => (bottom ? bottom : "0px")};
`;

const Error = styled.div`
  color: red;
`;

export default function Home() {
  const error = useSelector((state) => state.main.error);

  return (
    <div>
      <Head>
        <title>Sergei - Bench Labs</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header>Bench Test</Header>
      <Spacer height="125px" />
      <Margin top="25px" left="25px" right="25px" bottom="25px">
        <Error>{error}</Error>
        <Ledger />
      </Margin>
    </div>
  );
}
