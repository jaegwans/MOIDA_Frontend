import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Navigator = ({ pick }: any) => {
    return (
        <StyledTags>
            <div className="tagbox">
                <Link href="/postlist">Home</Link>
                <Link href="/tagPostlist/project">Project</Link>
                <Link href="/tagPostlist/study">Study</Link>
                <Link href="/tagPostlist/meal">Meal</Link>
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
    margin: 5px;
`;
