import React, { useEffect, useState } from "react";
import useUser from "../libs/useUser";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
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
    <ListMain>
      <ImgDiv>
        <Image
          alt={"moidaLogo"}
          src={"/Group 1.svg"}
          width={114}
          height={80}
          onClick={() => router.push("/postlist")}
        ></Image>
        <div className="status"></div>
      </ImgDiv>

      <StyledMyPage>
        <NickNameDiv>
          <strong style={{ fontSize: "50px" }}>{user?.nickname}</strong> 님의
          페이지
        </NickNameDiv>
        <SplitDiv>
          <SplitDetailDiv>
            <h3>작성한 게시글</h3>
            {user?.posts.content.map((data: any) => (
              <CardDiv onClick={onClickPost} key={data.id} id={data.id}>
                <h1>{data.title}</h1>
                <span>{data.createdDate.slice(2, 10)}</span>
              </CardDiv>
            ))}
          </SplitDetailDiv>
          <SplitDetailDiv>
            <h3>작성한 댓글</h3>
            {user?.comments.content.map((data: any) => (
              <CardDiv key={data.id} onClick={onClickComment} id={data.postId}>
                <h1>{data.context}</h1>
                <span> {data.createdDate.substring(2, 10)}</span>
              </CardDiv>
            ))}
          </SplitDetailDiv>
        </SplitDiv>
      </StyledMyPage>
    </ListMain>
  );
};

export default MyPage;

const ListMain = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
`;
const StyledMyPage = styled.div`
  display: flex;
  width: 1000px;
  padding: 10px;
  min-height: 70vh;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;
  div {
    cursor: pointer;
  }
`;

const ImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  width: 100%;
  .status {
    cursor: pointer;
    div {
      cursor: pointer;
    }
  }
`;
const NickNameDiv = styled.div`
  font-size: 1.5rem;
  padding-bottom: 5px;
  border-bottom: 2px solid rgba(190, 159, 225, 10);
`;
const SplitDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px;
`;

const SplitDetailDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding: 20px;
  gap: 10px;
  width: 280px;
  box-shadow: rgba(231, 211, 255, 10) 0px 1px 2px 0px,
    rgba(231, 211, 255, 0.5) 0px 2px 6px 2px;
  h1 {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 26px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    /* border-bottom: 2px solid rgba(190, 159, 225, 10); */
  }
  span {
    font-size: 13px;
    text-align: end;
  }
`;
