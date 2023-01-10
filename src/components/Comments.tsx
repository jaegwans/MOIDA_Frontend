import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

// 대댓글 컴포넌트
const RepleCommnets = (props: { data: IComment }) => {
    const data: IComment = props.data;
    return (
        <StyledComment className="repleBar">
            <div className="info">
                <b>{data.writer}</b>
            </div>
            <div className="context">{data.context}</div>
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
}) => {
    const data: IComment = props.data;
    const [openReple, setOpenReple] = useState(false);
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
                <div className="deleteAndUpdate">
                    <div>수정</div>
                    <div onClick={onClickCommentDelete}>삭제</div>
                </div>
            </div>
            <div className="context">{data.context}</div>

            <div className="reple">
                {openReple ? (
                    <>
                        {data.childComments?.map((rData) => (
                            <RepleCommnets key={rData.id} data={rData} />
                        ))}
                        <StyledInputBox>
                            <StyledTextArea
                                placeholder="댓글을 작성하세요."
                                spellCheck="false"
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
    useEffect(getComments, []);
    //댓글 작성 함수
    const onClickCommentButton = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios
            .post(
                `/post/${postId}/comments/new`,
                {
                    postId: 1,
                    writer: 'moida01',
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
        background-color: #12b886;
        padding: 6px 15px;
        border-radius: 3px;
        font-size: 1rem;
        &:hover {
            background-color: #3dc59c;
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
`;

const StyledComments = styled.div`
    width: 100%;
    .greenButton {
        color: #12b886;
        cursor: pointer;
    }
`;
