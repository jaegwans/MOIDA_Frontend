import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import useToken from "../hooks/useToken";

export default function Home() {
  const { fullToken } = useToken();

  console.log(fullToken + "-Token");

  return (
    <>
      <h2>moida</h2>
      <p>{fullToken}</p>
    </>
  );
}
