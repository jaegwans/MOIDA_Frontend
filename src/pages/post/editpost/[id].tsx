import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, MouseEvent, useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import useUser from "../../../libs/useUser";
import Image from "next/image";

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
    const onChangePatchContext = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPatchContext(e.currentTarget.value);
    };
    const onClickTypeData = (e: MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(e.currentTarget.value);
        setPatchType(e.currentTarget.value);
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
        <div>
            <StyledTop>
                <Image
                    src={"/Group 1.svg"}
                    alt={"moidaLogd"}
                    width={290}
                    height={80}
                ></Image>
                <div></div>
            </StyledTop>
            <PatchPost>
                <h2>게시글 수정</h2>
                <PatchPostList onSubmit={onClickPatch}>
                    <InputListDiv>
                        <InPutDiv
                            type="text"
                            placeholder={patchData?.title}
                            onChange={onChangePatchTitle}
                            value={patchTitle}
                        />
                        <ChipsList>
                            <ChipsInput
                                type="text"
                                placeholder="MEAL"
                                value={"MEAL"}
                                onClick={onClickTypeData}
                            />
                            <ChipsInput
                                type="text"
                                placeholder="PROJECT"
                                value={"PROJECT"}
                                onClick={onClickTypeData}
                            />
                            <ChipsInput
                                type="text"
                                placeholder="STUDY"
                                value={"STUDY"}
                                onClick={onClickTypeData}
                            />
                        </ChipsList>
                        <StyledTextArea
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
        </div>
    );
};

export default PostPatch;

const StyledTop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: 40px;
    margin-bottom: 20px;

    width: 80vw;
`;

const PatchPost = styled.div`
    display: flex;
    width: 70vw;
    margin: 0 3rem 3rem 3rem;
    padding: 4rem;
    box-shadow: 0 7px 13px -2px rgba(50, 50, 93, 0.25),
        0 4px 8px -4px rgba(0, 0, 0, 0.3), 0 -3px 8px -3px rgba(0, 0, 0, 0.025);
    flex-direction: column;
    justify-content: space-between;

    @media screen and (max-width: 768px) {
        width: 95vw;
        margin: 0px;
        box-shadow: none;
        padding: 4rem 0px;
    }
    h2 {
        margin-bottom: 50px;
    }
`;

const PatchPostList = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;

    :nth-child(1) {
        align-items: center;
    }
`;

const InputListDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;

const InPutDiv = styled.input`
    all: unset;
    border-bottom: 2px solid #eee;
    font-size: 15px;
    padding: 5px 0px;
`;

const StyledTextArea = styled.textarea`
    all: unset;
    border-bottom: 2px solid #eee;
    font-size: 15px;
    padding: 5px 0px;
    min-height: 30rem;
`;

const ChipsList = styled.div`
    display: flex;
    gap: 10px;
`;

const ChipsInput = styled.input`
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

const StyledBtn = styled.div`
    display: flex;
    justify-content: center;
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
