import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, MouseEvent, useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import useUser from "../../../libs/useUser";

interface PostData {
    id: number;
    author: string;
    title: string;
    type: string;
    context: string;
}

const PostPatch = () => {
    const router = useRouter();
    const { id } = router.query;
    let ready = router.isReady;
    const { user } = useUser();

    const [patchData, setPatchData] = useState<PostData>();
    console.log(patchData?.title);

    const [patchTitle, setPatchTitle] = useState<string>("");

    const [patchType, setPatchType] = useState<string>("");

    const [patchContext, setPatchContext] = useState<string>("");

    const errorAlert = () => {
        if (patchTitle.length == 0) {
            return alert("제목을 입력해 주세요");
        }
        if (patchType.length == 0) {
            return alert("태그를 입력해 주세요");
        }
        if (patchType !== "PROJECT" || "MEAL" || "STUDY") {
            return alert("태그를 올바르게 입력해 주세요");
        }
        if (patchContext.length == 0) {
            return alert("내용을 입력해 주세요");
        }
    };

    useEffect(() => {
        if (ready) {
            console.log(patchData?.title);

            const getPostData = () => {
                const TOKEN = localStorage.getItem("accessToken");
                axios
                    .get(`/post/edit/${id}`, {
                        headers: {
                            Authorization: `Bearer ${TOKEN}`,
                        },
                    })
                    .then((data) => {
                        console.log(data.data);
                        setPatchData(data.data);
                    })
                    .catch((e) => {
                        alert(e);
                    });
            };
            getPostData();
        }
    }, [ready]);

    const onChangePatchTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setPatchTitle(e.currentTarget.value);
    };
    const onChangePatchType = (e: ChangeEvent<HTMLInputElement>) => {
        setPatchType(e.currentTarget.value);
    };
    const onChangePatchContext = (e: ChangeEvent<HTMLInputElement>) => {
        setPatchContext(e.currentTarget.value);
    };

    // console.log(user?.username);
    const onClickPatch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const TOKEN = localStorage.getItem("accessToken");
        axios
            .patch(
                `/post/edit/${id}`,
                {
                    id: id,
                    author: user?.username,
                    title: patchTitle,
                    type: patchType,
                    context: patchContext,
                },
                {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                }
            )
            .then(() => {
                router.push(`/post/detail/${id}`);
            })
            .catch((err) => {
                errorAlert();
            });
    };
    return (
        <PatchPost>
            <h2>수정화면</h2>
            <PatchPostList onSubmit={onClickPatch}>
                <InputListDiv>
                    <input
                        type="text"
                        placeholder={patchData?.title}
                        onChange={onChangePatchTitle}
                        value={patchTitle}
                    />
                    <input
                        type="text"
                        placeholder={patchData?.type}
                        onChange={onChangePatchType}
                        value={patchType}
                    />
                    <input
                        type="text"
                        placeholder={patchData?.context}
                        onChange={onChangePatchContext}
                        value={patchContext}
                    />
                </InputListDiv>
                <StyledBtn>
                    <Link href={`/post/detail/${id}`}>
                        <button> 뒤로가기</button>
                    </Link>
                    <button type="submit">수정완료</button>
                </StyledBtn>
            </PatchPostList>
        </PatchPost>
    );
};

export default PostPatch;

const PatchPost = styled.div`
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

const PatchPostList = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    input {
        all: unset;
        border-bottom: 2px solid #eee;
        font-size: 15px;
        padding: 5px 0px;
    }
`;

const InputListDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const StyledBtn = styled.div`
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
