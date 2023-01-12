import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, FormEvent, ChangeEvent, useState } from "react";
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
    // const onchangeType = (e: ChangeEvent<HTMLInputElement>) => {
    //     // console.log(e.target.value);
    //     setType(e.currentTarget.value);
    // };
    const onchangeContext = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setContext(e.currentTarget.value);
    };

    const onClickTypeData = (e: MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(e.currentTarget.value);
        setType(e.currentTarget.value);
        console.log(type);
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
                    <InPutBox
                        type="text"
                        placeholder="제목"
                        onChange={onchangeTitle}
                        value={title}
                    />
                    {/* <input
                        type="text"
                        placeholder="태그"
                        onChange={onchangeType}
                        value={type}
                    /> */}
                    <ChipListDiv>
                        <ChipInput
                            type="text"
                            placeholder="MEAL"
                            value={"MEAL"}
                            onClick={onClickTypeData}
                        />
                        <ChipInput
                            type="text"
                            placeholder="PROJECT"
                            value={"PROJECT"}
                            onClick={onClickTypeData}
                        />
                        <ChipInput
                            type="text"
                            placeholder="STUDY"
                            value={"STUDY"}
                            onClick={onClickTypeData}
                        />
                    </ChipListDiv>
                    <InPutBox
                        type="text"
                        placeholder="내용"
                        onChange={onchangeContext}
                        value={context}
                    />
                </InputListDiv>
                <BtnDiv>
                    <Link href={"/postlist"}>
                        <button>뒤로가기</button>
                    </Link>
                    <button type="submit">작성하기</button>
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
    /* input {
        all: unset;
        border-bottom: 2px solid #eee;
        font-size: 15px;
        padding: 5px 0px;
    } */
`;

const InputListDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const InPutBox = styled.input`
    all: unset;
    border-bottom: 2px solid #eee;
    font-size: 15px;
    padding: 5px 0px;
`;

const ChipListDiv = styled.div`
    display: flex;
    gap: 10px;
`;

const ChipInput = styled.input`
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e1ccec;
    width: 50px;
    padding: 5px 15px;
    border-radius: 32px;
    font-size: 13px;
    text-align: center;
    &:hover {
        background: #e1ccec8f;
    }
`;

const BtnDiv = styled.div`
    margin-top: 10px;
    margin-left: 15px;
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
