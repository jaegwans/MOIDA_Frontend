import { useState } from "react";

const New = () => {
    // 타이틀
    const [title, setTitle] = useState<string>("");
    // 타입
    const [type, setType] = useState<string>("");
    // 글 내용
    const [context, setContext] = useState<string>("");



    return(
        
        <div>
            new
        </div>
    );
};

export default New;