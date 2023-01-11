import React, { useEffect, useState } from 'react';
import useUser from '../libs/useUser';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
interface IUser {
    comments: any;
    username: string;
    posts: any;
    nickname: string;
}

const MyPage = () => {
    const { user } = useUser();
    const router = useRouter();
    const onClickPost = (e: React.MouseEvent<HTMLDivElement>) => {
        router.push(`/post/detail/${e.currentTarget.id}`);
    };
    const onClickComment = (e: React.MouseEvent<HTMLDivElement>) => {
        router.push(`/post/detail/${e.currentTarget.id}`);
    };

    console.log(user);
    return (
        <StyledMyPage>
            <h3>아이디:{user?.username}</h3>
            <h3>닉네임:{user?.nickname}</h3>
            <h3>작성한 게시글</h3>

            {user?.posts.content.map((data: any) => (
                <div key={data.id} onClick={onClickPost} id={data.id}>
                    {data.title} - {data.createdDate}
                </div>
            ))}
            <h3>작성한 댓글</h3>
            {user?.comments.content.map((data: any) => (
                <div key={data.id} onClick={onClickComment} id={data.postId}>
                    {data.context}- {data.createdDate}
                </div>
            ))}
        </StyledMyPage>
    );
};

export default MyPage;

const StyledMyPage = styled.div`
    display: flex;
    width: 70vw;
    min-height: 30rem;
    box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
        0 8px 16px -8px rgba(0, 0, 0, 0.3),
        0 -6px 16px -6px rgba(0, 0, 0, 0.025);
    flex-direction: column;
    padding: 2rem;
    margin-top: 4rem;
    gap: 1rem;
`;
