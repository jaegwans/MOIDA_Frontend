import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState, MouseEvent } from 'react';
import styled from 'styled-components';
import useToken from '../hooks/useToken';
import Image from 'next/image';
import Link from 'next/link';
import Navigator from '../components/Navigator';
import MyPage from './mypage';

interface Post {
    id: string;
    author: string;
    title: string;
    context: string;
    type: string;
    nickname: string;
    createdDate: string;
}
interface PostInfo {
    last: boolean;
    number: number;
    content: Post[];
}

const Postist = () => {
    const router = useRouter();
    const { fullToken } = useToken();
    let ready = router.isReady;

    // 여기 Post가 배열로 선언한게 아니라 그런가 <Post>로 쓰면 에러나서 any 넣어둠
    // 덕분에 아래 eachPost에서 에러뜸 근데 작동은 함
    // 해결방법: Post뒤에 []해서 배열 처리를 해주면 된다.
    const [posts, setPosts] = useState<Post[]>([]);
    const [mypage, setMypage] = useState(false);

    const [postsInfo, setPostsInfo] = useState<any>();
    const [PostListNum, setPostListNum] = useState<number>(1);
    const [last, setLast] = useState(true);

    const onClickPostMore = () => {
        const TOKEN = localStorage.getItem('accessToken');

        axios
            .get(`/post/list/${PostListNum + 1}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
            .then((data) => {
                console.log(data.data.content);
                setPosts([...posts, ...data.data.content]);
            })
            .catch((e) => {
                alert(e);
                alert('토큰이 만료되었습니다.');
                router.push('/signIn');
            });
        axios
            .get(`/post/list/${PostListNum + 1}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
            .then((data) => {
                console.log(data.data);
                setPostsInfo(data.data);
                setLast(data.data.last);
            })
            .catch((e) => {
                alert(e);
                alert('토큰이 만료되었습니다.');
                router.push('/signIn');
            });
    };

    useEffect(() => {
        // async await을 써도 되는데 router에서 제공하는 ready를 사용
        // console.log(fullToken);
        // console.log(ready);
        // ready 가 true일때
        if (ready) {
            const getPostList = () => {
                const TOKEN = localStorage.getItem('accessToken');

                axios
                    .get(`/post/list/1`, {
                        headers: {
                            Authorization: `Bearer ${TOKEN}`,
                        },
                    })
                    .then((data) => {
                        console.log(data.data.content);
                        setPosts(data.data.content);
                    })
                    .catch((e) => {
                        alert(e);
                        alert('토큰이 만료되었습니다.');
                        router.push('/signIn');
                    });
                axios
                    .get(`/post/list/1`, {
                        headers: {
                            Authorization: `Bearer ${TOKEN}`,
                        },
                    })
                    .then((data) => {
                        console.log(data.data);
                        setPostsInfo(data.data);
                    })
                    .catch((e) => {
                        alert(e);
                        alert('토큰이 만료되었습니다.');
                        router.push('/signIn');
                    });
            };
            getPostList();
            if (localStorage.getItem('accessToken') === null) {
                setMypage(false);
            } else {
                setMypage(true);
            }
        }
    }, [ready]);

    const newPostRouter = () => {
        if (localStorage.getItem('accessToken') === null) {
            alert('로그인 후 이용하세요.');
            router.push('/signIn');
        } else {
            router.push('/post/newPost');
        }
    };

    // MouseEvent를 사용하지않고 편법으로 하는 방법이 있었네요~

    const commentRouter = (e: String) => {
        if (localStorage.getItem('accessToken') === null) {
            alert('로그인 후 이용하세요.');
            router.push('/signIn');
        } else {
            console.log(e);
            router.push(`/post/detail/${e}`);
        }
    };

    return (
        <ListMain>
            <ImgDiv>
                <Image
                    alt={'moidaLogo'}
                    src={'/Group 1.svg'}
                    width={114}
                    height={80}
                ></Image>
                <div className="status">
                    {mypage ? (
                        <div onClick={() => router.push('/mypage')}>
                            마이페이지
                        </div>
                    ) : (
                        <div onClick={() => router.push('/signIn')}>로그인</div>
                    )}
                </div>
            </ImgDiv>

            <TopDiv>
                <Navigator pick="postlist" />
                <PostBtnDiv onClick={newPostRouter}>게시글 작성</PostBtnDiv>
            </TopDiv>

            <TotlaCard>
                {posts !== undefined ? (
                    <>
                        <CardList>
                            {posts.map((eachPost) => (
                                <CardDiv
                                    onClick={() => commentRouter(eachPost.id)}
                                    key={eachPost.id}
                                >
                                    <h1>{eachPost.title}</h1>
                                    <AuthorTypeDiv>
                                        <h5>{eachPost.type}</h5>
                                        <h3>{eachPost.nickname}</h3>
                                    </AuthorTypeDiv>
                                    {/* <p>{eachPost.context}</p> */}
                                    <span>
                                        {eachPost.createdDate.slice(2, 10)}
                                    </span>
                                </CardDiv>
                            ))}
                        </CardList>
                        {!last ? (
                            <div className="postmore" onClick={onClickPostMore}>
                                더보기
                            </div>
                        ) : null}
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </TotlaCard>
        </ListMain>
    );
};

export default Postist;
const ListMain = styled.div`
    display: flex;
    flex-direction: column;
    margin: 30px;
`;

const ImgDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;
    .status {
        cursor: pointer;
        div {
            cursor: pointer;
        }
    }
`;

const TopDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid rgba(190, 159, 225, 10);
`;

const PostLostH1 = styled.h1`
    margin: 0 50px;
    padding-bottom: 20px;
    text-align: center;
`;

const PostBtnDiv = styled.div`
    display: flex;
    padding: 10px;
    width: 100px;
    justify-content: center;
    border-radius: 5px;
    box-shadow: rgba(231, 211, 255, 10) 0px 1px 2px 0px,
        rgba(231, 211, 255, 0.5) 0px 2px 6px 2px;
`;

const TotlaCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .postmore {
        display: flex;
        padding: 10px 0px;
        width: 100%;
        height: 20px;
        margin-top: 30px;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        box-shadow: rgba(231, 211, 255, 10) 0px 1px 2px 0px,
            rgba(231, 211, 255, 0.5) 0px 2px 6px 2px;
        font-size: 15px;
        cursor: pointer;
    }
`;

const CardList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 1000px;
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
        border-bottom: 2px solid rgba(190, 159, 225, 10);
    }
    span {
        font-size: 13px;
        text-align: end;
    }
`;

const AuthorTypeDiv = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    h5 {
        background: rgba(231, 211, 255, 10);
        padding: 5px 15px; //왼 위 오 아래
        border-radius: 32px;
        font-size: 13px;
        &:hover {
            cursor: default;
            background: #c9b6e4;
        }
    }
`;

// 혹시 몰라 냅둠 ㅇㅇ
// <div>
//     <div>
//         <div>
//              json 구조때문에 posts를 배열로 만들어서 넣어줌
//             {user?.username === posts[0].author ? (
//                 <div className="postHeader">
//                     <h1>{posts[0].title}</h1>
//                 </div>
//             ) : (
//                 <h1>{posts[0].title}</h1>
//             )}
//             <div>
//                 <div>
//                     <b>{posts[0].author}</b>
//                 </div>
//                 <div>{posts[0].type}</div>
//             </div>
//         </div>
//         <div>{posts[0].context}</div>
//     </div>
// </div>
