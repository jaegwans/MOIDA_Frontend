import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, ChangeEvent, useState } from "react";
import { json } from "stream/consumers";
import styled from "styled-components";
import useToken from "../../hooks/useToken";

const New = () => {
    //post 헤더에 들어갈 토큰
    // const { fullToken } = useToken();
    // 게시글 작성 후 list로 넘겨줄 라우터
    const router = useRouter();
    // 타이틀
    const [title, setTitle] = useState<string>("");
    // 타입
    const [type, setType] = useState<string>("");
    // 글 내용
    const [context, setContext] = useState<string>("");

    const onchangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        // console.log(title);
        setTitle(e.currentTarget.value);
    };
    const onchangeType = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setType(e.currentTarget.value);
    };
    const onchangeContext = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setContext(e.currentTarget.value);
    };

    const errorAlert = () => {
        if (title.length == 0) {
            return alert("제목을 입력해 주세요");
        }
        if (type.length == 0) {
            return alert("태그를 입력해 주세요");
        }
        if (type !== "PROJECT" || "MEAL" || "STUDY") {
            return alert("태그를 올바르게 입력해 주세요");
        }
        if (context.length == 0) {
            return alert("내용을 입력해 주세요");
        }
    };

    const onSubmitNewPost = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const TOKEN = localStorage.getItem("accessToken");
        // console.log(data.title);
        // console.log(data.type);
        // console.log(data.context);
        axios
            .post(
                "/post/new",
                {
                    title: title,
                    type: type,
                    context: context,
                },
                {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                        "Content-Type": `application/json`,
                    },
                }
            )
            .then((res) => {
                console.log(res.data);

                router.push("/postlist");
                alert("작성을 성공했습니다");
            })
            .catch((error) => {
                console.log(error);
                errorAlert();
            });
    };

    return (
        <NewPost>
            <h2>게시글 작성</h2>
            <NewPostList onSubmit={onSubmitNewPost}>
                <InputListDiv>
                    <input
                        type="text"
                        placeholder="제목"
                        onChange={onchangeTitle}
                        value={title}
                    />
                    <input
                        type="text"
                        placeholder="태그"
                        onChange={onchangeType}
                        value={type}
                    />
                    <input
                        type="text"
                        placeholder="내용"
                        onChange={onchangeContext}
                        value={context}
                    />
                </InputListDiv>
                <BtnDiv>
                    <button type="submit">작성하기</button>
                    <Link href={"/postlist"}>
                        <button>뒤로가기</button>
                    </Link>
                </BtnDiv>
            </NewPostList>
        </NewPost>
    );
};

export default New;

const NewPost = styled.div`
    width: 300px;
    height: 500px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
        rgba(0, 0, 0, 0.3) 0px 8px 16px -8px; ;
`;

const NewPostList = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    input {
        all: unset;
        border-bottom: 2px solid #eee;
        font-size: 15px;
        padding: 5px 0px;
    }
    input:nth-child(2) {
        display: inline-block;
        padding: 0 25px;
        height: 50px;
        font-size: 16px;
        line-height: 50px;
        border-radius: 25px;
        background-color: #f1f1f1;
    }
    input:nth-child(3) {
    }
`;

const InputListDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const BtnDiv = styled.div`
    margin-top: 10px;
    button {
        all: unset;
        margin: 20px;
        padding: 5px;
        font-size: 15px;
        color: #000;
        transition: transform 0.3s;
        &:hover {
            transform: translateY(-3px);
            cursor: pointer;
        }
    }
    a {
        all: unset;
    }
`;
