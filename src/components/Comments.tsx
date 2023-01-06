import React from 'react';
import styled from 'styled-components';

const Comments = () => {
    return (
        <StyledCommentBox>
            <StyledInputBox>
                <StyledTextArea
                    placeholder="댓글을 작성하세요."
                    spellCheck="false"
                />
                <button type="submit">댓글 작성</button>
            </StyledInputBox>
            <StyledComments>comment example</StyledComments>
        </StyledCommentBox>
    );
};

export default Comments;

const StyledCommentBox = styled.div`
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
    }
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
`;

const StyledInputBox = styled.form`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledComments = styled.div``;
