import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//localStorage를 사용하려면 | null이 없으면 안됨 json이라서 그런가??
type account = string | null;
type grant = string | null;

//토큰을 여기서 저장해서 뿌려주면 좋을듯?
const useToken = () => {
    // 토큰값 저장할 State
    const [grant, setGrant] = useState<grant>("");
    const [aToken, setAToken] = useState<account>("");
    const router = useRouter();

    let Tokens = [grant + " " + aToken];

    let fullToken = Tokens.join();

    let ready = router.isReady;

    // 토큰값 localStaroge를 이용해서 getItem('key')key로부터 데이터 읽기
    useEffect(() => {
        setGrant(localStorage.getItem("grantType"));
        setAToken(localStorage.getItem("accessToken"));

        Tokens = [grant + " " + aToken];
        fullToken = Tokens.join();
    }, [ready]);

    // console.log(aToken);
    // console.log(grant);

    // console.log(fullToken);

    return { fullToken };
};

export default useToken;
