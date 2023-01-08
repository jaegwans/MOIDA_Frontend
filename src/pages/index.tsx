import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import useToken from "../hooks/useToken";

export default function Home() {
<<<<<<< HEAD
  const { fullToken } = useToken();

  console.log(fullToken + "-Token");
=======
  const [aToken, setAToken] = useState<account>("");
  useEffect(() => {
    setAToken(localStorage.getItem("accessToken"));
  }, []);

  console.log(aToken + "-Token");
>>>>>>> 540372dae7a77141af74eb3fcd2ba347a726d136

  return (
    <>
      <h2>moida</h2>
      <p>{fullToken}</p>
    </>
  );
}
