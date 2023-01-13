import axios from 'axios';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
// import { instance } from "../libs/api";

const Register = () => {
    const router = useRouter();

    const [userId, setUserId] = useState<string>('');

    const [userPw, setUserPw] = useState<string>('');

    const [repeatPw, setRepeatPw] = useState<string>('');

    const [nickname, setNickname] = useState<string>('');

    const onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
    };

    const onChangePw = (e: ChangeEvent<HTMLInputElement>) => {
        setUserPw(e.target.value);
    };

    const onChangeRePeatPw = (e: ChangeEvent<HTMLInputElement>) => {
        setRepeatPw(e.target.value);
    };

    const onChangeNickName = (e: ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const errorAlert = () => {
        if (userPw != repeatPw) {
            return alert('비밀번호가 일치하지 않습니다.');
        } else {
        }
    };

    const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios
            .post('/join', {
                username: userId,
                password: userPw,
                repeatedPassword: repeatPw,
                nickname: nickname,
            })
            .then((res) => {
                console.log(res.data);
                router.push('/signIn');
            })
            .catch((error) => {
                console.log(error);

                errorAlert();
            });
    };
    /*
  헉 이건 안되넴
  if (userPw != repeatPw) {
    return alert("비밀번호가 일치하지 않습니다.");
  } else {
    return setRepeatPw(e.target.value);
  }
*/
    return (
        <RegisterBox>
            <RegisterList onSubmit={onSubmit}>
                <h2>회원가입</h2>
                <div>
                    <p>아이디</p>
                    <input
                        type="text"
                        placeholder="아이디"
                        onChange={onChangeId}
                        value={userId}
                    />
                </div>
                <div>
                    <p>비밀번호</p>
                    <input
                        type="password"
                        placeholder="비밀번호"
                        onChange={onChangePw}
                        value={userPw}
                    />
                </div>
                <div>
                    <p>비밀번호 확인</p>
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        onChange={onChangeRePeatPw}
                        value={repeatPw}
                    />
                    <ErrorMessageP
                        style={
                            userPw == repeatPw
                                ? { display: 'none' }
                                : { color: 'red' }
                        }
                    >
                        {' '}
                        비밀번호가 일치하지 않습니다.{' '}
                    </ErrorMessageP>
                </div>
                <div>
                    <p>별명</p>
                    <input
                        type="text"
                        placeholder="별명"
                        onChange={onChangeNickName}
                        value={nickname}
                    />
                </div>
                <SubmitBtn type="submit">제출하기</SubmitBtn>
            </RegisterList>
        </RegisterBox>
    );
};

export default Register;

const RegisterBox = styled.div`
    width: 300px;
    height: 500px;
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
        rgba(0, 0, 0, 0.3) 0px 8px 16px -8px; ;
`;

const RegisterList = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    input {
        all: unset;

        border: 1.3px solid #be9fe1;

        border-radius: 6px;
        font-size: 15px;
        padding: 5px 5px;
        margin-top: 10px;
    }
`;

const ErrorMessageP = styled.p`
    font-size: 12px;
`;

const SubmitBtn = styled.button`
    all: unset;
    margin: 20px;
    padding: 5px;
    text-align: center;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
        rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    :hover {
        cursor: pointer;
    }
    :active {
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px inset,
            rgba(60, 64, 67, 0.15) 0px 2px 6px 2px inset;
    }
`;
