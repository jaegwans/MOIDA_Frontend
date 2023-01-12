import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { json } from 'stream/consumers';

const Navigator = ({ pick }: any) => {
    const [pickdata, setPickdata] = useState(pick);

    return (
        <StyledTags>
            <div className="tagbox">
                <Link
                    href="/postlist"
                    id="postlist"
                    style={
                        pick == 'postlist' ? { backgroundColor: '#c9b6e4' } : {}
                    }
                >
                    전체
                </Link>
                <Link
                    href="/tagPostlist/project"
                    id="project"
                    style={
                        pick == 'project' ? { backgroundColor: '#c9b6e4' } : {}
                    }
                >
                    프로젝트
                </Link>
                <Link
                    href="/tagPostlist/study"
                    id="study"
                    style={
                        pick == 'study' ? { backgroundColor: '#c9b6e4' } : {}
                    }
                >
                    스터디
                </Link>
                <Link
                    href="/tagPostlist/meal"
                    id="meal"
                    style={pick == 'meal' ? { backgroundColor: '#c9b6e4' } : {}}
                >
                    밥
                </Link>
            </div>
        </StyledTags>
    );
};

export default Navigator;

const StyledTags = styled.div`
    display: flex;
    align-items: center;

    .tagbox {
        display: flex;

        gap: 10px;
        a {
            all: unset;
            border: 1px solid #c9b6e4;

            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
        }
    }
    margin: 5px 5px 20px 5px;
`;
