import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Detail = () => {
    const router = useRouter();
    console.log(router.query.id);
    const { id } = router.query;
    let ready = router.isReady;

    const [post, setPost] = useState();

    useEffect(() => {
        console.log(ready);
        const getPost = () => {
            const TOKEN =
                'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MDIiLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjczMDc5NjI1fQ.LAHhqAfMYzjU7hL5uKpEOGC6HJt2ud059ReKIN-9_Lk';

            axios
                .get(`/post/${id}`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                })
                .then((data) => {
                    console.log(TOKEN);
                    setPost(data.data);
                })
                .catch((e) => {
                    alert('게시글 조회 실패');
                    console.log(TOKEN);
                    console.log(e);
                });
        };
        // 라우터 로딩 지연 이슈
        ready ? getPost() : null;
    }, [ready]);

    // post undefined에 대한 예외처리 할 것

    return (
        <div>
            {post !== undefined ? (
                <p>{JSON.stringify(post)}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Detail;
