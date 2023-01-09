import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled from 'styled-components';
import Comments from '../../../components/Comments';

interface IPost {
    id: string;
    author: string;
    title: string;
    context: string;
    type: string;
}

const Detail = () => {
    const router = useRouter();
    console.log(router.query.id);
    const { id } = router.query;
    let ready = router.isReady;

    const [post, setPost] = useState<IPost | never>();

    useEffect(() => {
        console.log(ready);
        const getPost = () => {
            const TOKEN = localStorage.getItem('accessToken');

            axios
                .get(`/post/${id}`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                })
                .then((data) => {
                    console.log(TOKEN);
                    setPost(data.data);
                })
                .catch((e) => {
                    alert('게시글 조회 실패');
                    console.log(TOKEN);
                    console.log(e);
                });
        };
        // 라우터 로딩 지연 이슈
        ready ? getPost() : null;
    }, [ready]);

    //<p>{JSON.stringify(post)}</p>
    //"id":3,"author":"test01","title":"third post!","type":"team_project","context":"this is context of third post in MOIDA!"
    return (
        <div>
            {post !== undefined ? (
                <StyledDetail>
                    <div>
                        <StyledInfo>
                            <h1>{post.title}</h1>
                            <div>
                                <div>
                                    <b>{post.author}</b>
                                </div>
                                <StyledChips>{post.type}</StyledChips>
                            </div>
                        </StyledInfo>
                        <StyledContext>{post.context}</StyledContext>
                    </div>
                    <StyledCommentsBox>
                        <Comments postId={Number(id)} />
                    </StyledCommentsBox>
                </StyledDetail>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

const StyledDetail = styled.div`
    display: flex;
    width: 70vw;
    min-height: 30rem;
    margin: 3rem;
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
`;

const StyledInfo = styled.div`
    display: flex;
    flex-direction: column;
    h1 {
        font-weight: 400;
        font-size: 2.75rem;
    }

    div {
        margin-top: 10px;
        display: flex;
        gap: 10px;
    }
`;
const StyledContext = styled.div`
    margin-top: 30px;
    margin-bottom: 60px;
    font-size: 1.3rem;
    min-height: 300px;
`;
const StyledChips = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e0e0e0;
    padding: 0 12px;
    border-radius: 32px;
    font-size: 13px;
    &:hover {
        background: #ccc;
    }
`;
const StyledCommentsBox = styled.div``;

export default Detail;
