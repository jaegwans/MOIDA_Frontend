import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useToken from '../hooks/useToken';
import useUser from '../libs/useUser';

interface Post {
    id: string;
    author: string;
    title: string;
    context: string;
    type: string;
}

const Postist = () => {
    const router = useRouter();
    const { fullToken } = useToken();
    const { user } = useUser();

    const [posts, setPosts] = useState<Post | any>(' ');

    const getPostList = () => {
        axios
            .get('/post/list', {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb2lkYTAxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3MzUxODEyOX0.pVVI4zfdHBYf3wJ0DN_wtAJ_1wRo8fNY-HZxN7yUMY8`,
                },
            })
            .then((data) => {
                console.log(data.data);
                console.log(data.data);
                setPosts(data.data);
            })
            .catch((e) => {
                alert(e);
            });
    };

    useEffect(() => {
        getPostList();
    }, []);

    const newPostRouter = () => {
        router.push('/post/new');
    };

    console.log(posts?.author);

    return (
        <div>
            <h1>post list</h1>
            <div onClick={newPostRouter}>게시글 작성</div>
            <div>
                {posts !== undefined ? (
                    <div>
                        <div>
                            <div>
                                {user?.username === posts.author ? (
                                    <div className="postHeader">
                                        <h1>{posts.title}</h1>
                                    </div>
                                ) : (
                                    <h1>{posts.title}</h1>
                                )}
                                <div>
                                    <div>
                                        <b>{posts.author}</b>
                                    </div>
                                    <div>{posts.type}</div>
                                </div>
                            </div>
                            <div>{posts.context}</div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Postist;
