import { useEffect, useState } from "react";


type account = string | null;

//토큰을 여기서 저장해서 뿌려주면 좋을듯?
const useToken = () => {
    const [aToken, setAToken] = useState<account>('');
    useEffect(() => {
        setAToken(localStorage.getItem('accessToken'));
    }, []);

    console.log(aToken);
    
    return{aToken};

};

export default useToken;