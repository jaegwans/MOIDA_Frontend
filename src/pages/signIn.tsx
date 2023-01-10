import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

// interface ISignIn {
//     username: string;
//     password: string;
// }

const Login = () => {
  const router = useRouter();
  const [idData, setIdData] = useState<string>("");
  const [pwData, setPwData] = useState<string>("");
  // const [loginData, setLoginData] = useState({ username: '', password: '' });
  const _onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    setIdData(e.target.value);
  };
  const _onChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    setPwData(e.target.value);
  };

  const _onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (idData === "" || pwData === "") {
      alert("아이디, 비밀번호 값을 입력해주세요.");
    } else {
      axios
        .post("/login", {
          username: idData,
          password: pwData,
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("accessToken", res.data.accessToken);

          router.push("/post/list");
        })
        .catch((e) => {
          console.log(e);

          alert("아이디나 비밀번호가 틀립니다. Err:" + e.response.status);
        });
    }
  };

  return (
    <StyledLogin>
      <div>
        <h2>Moida</h2>
        <p>즉석 팀 빌딩 서비스</p>
      </div>
      <StyledForm onSubmit={_onSubmit}>
        <input
          type="text"
          placeholder="ID"
          onChange={_onChangeId}
          value={idData}
        />
        <input
          type="password"
          placeholder="PW"
          onChange={_onChangePw}
          value={pwData}
        />

        <StyledButtons>
          <button type="submit">로그인</button>
          <Link href="/register">
            <button>회원가입</button>
          </Link>
        </StyledButtons>
      </StyledForm>
    </StyledLogin>
  );
};
const StyledLogin = styled.div`
  width: 300px;
  height: 500px;
  margin-top: 3.125rem;
  display: flex;
  justify-content: space-around;
  align-items: center;

  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  flex-direction: column;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  input {
    all: unset;
    border-bottom: 2px solid #eee;
    font-size: 15px;
    padding: 5px 0px;
  }
`;

const StyledButtons = styled.div`
  margin-top: 10px;
  button {
    all: unset;
    margin: 20px;
    padding: 5px;
    font-size: 15px;
    color: #000;
    transition: transform 0.3s;
    &:hover {
      transform: translateY(-3px);
      cursor: pointer;
    }
  }
  a {
    all: unset;
  }
`;
export default Login;