import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useUser from '../libs/useUser';

interface IPostInfo {
    postId: number;
}
interface IComment {
    id: number;
    writer: string;
    context: string;
    parentCommentId: number | null;
    childComments: IComment[] | null;
}
interface IUser {
    username: string;
    nickname: string;
}

// 대댓글 컴포넌트
const RepleCommnets = (props: {
    key: number;
    data: IComment;
    postId: any;
    getComments: any;
}) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [editValue, setEditValue] = useState('');
    const { user } = useUser();
    const data: IComment = props.data;
    const onChangeEdit = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setEditValue(e.currentTarget.value);
    };

    const onClickCommentDelete = () => {
        axios
            .delete(`/post/${props.postId}/comments/${props.data.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                },
            })
            .then((data) => {
                console.log(data);
                props.getComments();
            })
            .catch((e) => console.log(e));
    };

    const onSubmitEdit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios
            .patch(
                `/post/${props.postId}/comments/${props.data.id}`,
                {
                    context: editValue,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'accessToken'
                        )}`,
                    },
                }
            )
            .then((data) => {
                console.log(data);
                props.getComments();
                setOpenEdit(false);
            })
            .catch((e) => console.log(e));
    };
    return (
        <StyledComment className="repleBar">
            <div className="info">
                <b>{data.writer}</b>
                {user?.username === data.writer ? (
                    <div className="deleteAndUpdate">
                        <div onClick={() => setOpenEdit(!openEdit)}>수정</div>
                        <div onClick={onClickCommentDelete}>삭제</div>
                    </div>
                ) : null}
            </div>
            <div className="context">{data.context}</div>
            <div className="reple">
                {openEdit ? (
                    <>
                        <StyledInputBox onSubmit={onSubmitEdit}>
                            <StyledTextArea
                                placeholder="댓글을 수정하세요."
                                spellCheck="false"
                                value={editValue}
                                onChange={onChangeEdit}
                            />
                            <div className="editOption">
                                <button type="submit">수정 전송</button>
                            </div>
                        </StyledInputBox>
                    </>
                ) : null}
            </div>
        </StyledComment>
    );
};

//댓글 컴포넌트
const Comment = (props: {
    key: number;
    data: IComment;
    postId: any;
    getComments: any;
    commentId: any;
    userData: any;
}) => {
    const data: IComment = props.data;
    const [openReple, setOpenReple] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editValue, setEditValue] = useState('');
    const [repleValue, setrepleValue] = useState('');
    const { user } = useUser();
    const onChangeEdit = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setEditValue(e.currentTarget.value);
    };
    const onChangeReple = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setrepleValue(e.currentTarget.value);
    };

    //리플 작성
    const onClickRepleButton = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios
            .post(
                `/post/${props.postId}/comments/new`,
                {
                    writer: props.userData.username,
                    context: repleValue,
                    parentCommentId: data.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'accessToken'
                        )}`,
                    },
                }
            )
            .then(() => {
                props.getComments();
                setrepleValue('');
                alert('답글 작성 완료');
            })
            .catch((e) => {
                console.log(e);
            });
    };

    //댓글 수정
    const onSubmitEdit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios
            .patch(
                `/post/${props.postId}/comments/${props.commentId}`,
                {
                    context: editValue,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'accessToken'
                        )}`,
                    },
                }
            )
            .then((data) => {
                console.log(data);
                props.getComments();
                setOpenEdit(false);
            })
            .catch((e) => console.log(e));
    };
    const onClickCommentDelete = () => {
        axios
            .delete(`/post/${props.postId}/comments/${props.commentId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                },
            })
            .then((data) => {
                console.log(data);
                props.getComments();
            })
            .catch((e) => console.log(e));
    };

    return (
        <StyledComment>
            <div className="info">
                <b>{data.writer}</b>
                {user?.username === data.writer ? (
                    <div className="deleteAndUpdate">
                        <div onClick={() => setOpenEdit(!openEdit)}>수정</div>
                        <div onClick={onClickCommentDelete}>삭제</div>
                    </div>
                ) : null}
            </div>
            <div className="context">{data.context}</div>

            <div className="reple">
                {openEdit ? (
                    <>
                        <StyledInputBox onSubmit={onSubmitEdit}>
                            <StyledTextArea
                                placeholder="댓글을 수정하세요."
                                spellCheck="false"
                                value={editValue}
                                onChange={onChangeEdit}
                            />
                            <div className="editOption">
                                <button type="submit">수정 전송</button>
                            </div>
                        </StyledInputBox>
                    </>
                ) : null}
            </div>

            <div className="reple">
                {openReple ? (
                    <>
                        {data.childComments?.map((rData) => (
                            <RepleCommnets
                                key={rData.id}
                                data={rData}
                                postId={props.postId}
                                getComments={props.getComments}
                            />
                        ))}
                        <StyledInputBox onSubmit={onClickRepleButton}>
                            <StyledTextArea
                                placeholder="답글을 작성하세요."
                                spellCheck="false"
                                value={repleValue}
                                onChange={onChangeReple}
                            />
                            <div className="repleOption">
                                <div onClick={() => setOpenReple(false)}>
                                    <b className="greenButton">^ 답글 닫기</b>
                                </div>
                                <button type="submit">답글 작성</button>
                            </div>
                        </StyledInputBox>
                    </>
                ) : (
                    <div onClick={() => setOpenReple(true)}>
                        <b className="greenButton">
                            + 답글 달기{' '}
                            {data.childComments
                                ? '[' + data.childComments?.length + '개]'
                                : null}
                        </b>
                    </div>
                )}
            </div>
        </StyledComment>
    );
};

//댓글 메인 컴포넌트
const Comments = ({ postId }: IPostInfo) => {
    const [comments, setComments] = useState<IComment[]>();
    const [commentValue, setCommentValue] = useState<string>('');
    const [userData, setUserData] = useState<IUser>();

    //유저 정보 조회
    const getUser = async () => {
        await axios
            .get(`/user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                },
            })
            .then((data) => setUserData(data.data))
            .catch((e) => {
                console.log(e);
            });
    };

    const getComments = () => {
        axios
            .get(`/post/${postId}/comments`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                },
            })
            .then((data) => {
                setComments(data.data);
            })
            .catch((e) => {
                alert(e);
            });
    };
    useEffect(() => {
        getComments();
        getUser();
    }, []);
    //댓글 작성 함수
    const onClickCommentButton = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios
            .post(
                `/post/${postId}/comments/new`,
                {
                    writer: userData?.username,
                    context: commentValue,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'accessToken'
                        )}`,
                    },
                }
            )
            .then(() => {
                getComments();
                setCommentValue('');
                alert('댓글 작성 완료');
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCommentValue(e.currentTarget.value);
    };

    return (
        <StyledCommentsBox>
            <StyledInputBox onSubmit={(e) => onClickCommentButton(e)}>
                <StyledTextArea
                    value={commentValue}
                    onChange={(e) => onChangeComment(e)}
                    placeholder="댓글을 작성하세요."
                    spellCheck="false"
                />
                <button type="submit">댓글 작성</button>
            </StyledInputBox>
            <StyledComments>
                {comments?.map((data) => (
                    <Comment
                        key={data.id}
                        commentId={data.id}
                        data={data}
                        getComments={getComments}
                        postId={postId}
                        userData={userData}
                    />
                ))}
            </StyledComments>
        </StyledCommentsBox>
    );
};

export default Comments;

const StyledComment = styled.div`
    display: flex;
    min-height: 7.5rem;
    border-bottom: 1px solid #f1f3f5;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem;
    .info {
        display: flex;
        justify-content: space-between;
        .deleteAndUpdate {
            display: flex;
            color: gray;
            gap: 10px;
            margin-right: 30px;
            div {
                cursor: pointer;
            }
        }
    }
    .repleBar {
        border-top: 1px solid #f1f3f5;
    }

    .reple {
    }
    .context {
        min-height: 6.25rem;
        display: flex;
        align-items: center;
    }
`;

const StyledCommentsBox = styled.div`
    display: flex;

    flex-direction: column;
    align-items: center;
    button {
        all: unset;
        align-self: flex-end;
        margin-right: 0%;
        color: white;
        background-color: #be9fe1;
        padding: 6px 15px;
        border-radius: 3px;
        font-size: 1rem;
        &:hover {
            background-color: #c8b5de;
        }
        @media screen and (max-width: 768px) {
            font-size: 1.2rem;
        }
    }
    width: 100%;
`;

const StyledTextArea = styled.textarea`
    width: 100%;
    margin: 10px;
    border: 1px solid #f1f3f5;
    min-height: 100px;
    resize: none;
    line-height: 1.75;
    font-size: 1rem;
    outline: none;
    &:focus {
        outline-offset: 0px;
    }
    white-space: pre-wrap;
    overflow-wrap: break-word;
    appearance: auto;
    @media screen and (max-width: 768px) {
        font-size: 1.3rem;
    }
`;

const StyledInputBox = styled.form`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .repleOption {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .editOption {
        display: flex;
        justify-content: flex-end;
        width: 95%;
    }
`;

const StyledComments = styled.div`
    width: 100%;
    .greenButton {
        color: #be9fe1;
        cursor: pointer;
    }
`;
