import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Navigator = ({ pick }: any) => {
    return (
        <StyledTags>
            <div className="tagbox">
                <Link href="/postlist">전체</Link>
                <Link href="/tagPostlist/project">프로젝트</Link>
                <Link href="/tagPostlist/study">스터디</Link>
                <Link href="/tagPostlist/meal">밥</Link>
            </div>
        </StyledTags>
    );
};

export default Navigator;

const StyledTags = styled.div`
    display: flex;
    justify-content: flex-end;
    .tagbox {
        display: flex;
        gap: 10px;
        a {
            all: unset;
            border: 1px solid #c9b6e4;
            padding: 5px;
            border-radius: 5px;
            cursor: pointer;
        }
    }
    margin: 5px 5px 20px 5px;
`;
