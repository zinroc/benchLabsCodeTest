import Head from "next/head";

import { useSelector } from "react-redux";

import Ledger from "../containers/Ledger";
import { Header, Spacer, Margin, Error } from "../components/common";

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
