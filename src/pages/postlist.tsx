import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useToken from "../hooks/useToken";

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

    const [posts, setPosts] = useState<Post>();

    const getPostList = () => {
        axios
            .get("/post/list", {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb2lkYTAxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3MzUxODEyOX0.pVVI4zfdHBYf3wJ0DN_wtAJ_1wRo8fNY-HZxN7yUMY8`,
                },
            })
            .then((data) => {
                console.log(data.data);
                setPosts(data.data);
                console.log(fullToken);
            })
            .catch((e) => {
                alert(e);
            });
    };

    useEffect(() => {
        getPostList();
    }, []);

    const newPostRouter = () => {
        router.push("/post/new");
    };

    return (
        <div>
            <h1>post list</h1>
            <div onClick={newPostRouter}>게시글 작성</div>
            {/* <div>
                {posts.map((eachposts) => (
                    <div key={eachposts.id}>
                        <h3>{eachposts.title}</h3>
                        <span>{eachposts.author}</span>
                        <p>{eachposts.type}</p>
                        <div>
                            <div>{eachposts.context}</div>
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default Postist;
