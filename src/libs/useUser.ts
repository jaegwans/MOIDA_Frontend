import { useState, useEffect } from 'react';
import axios from 'axios';

interface IUser {
    comments: any;
    username: string;
    posts: any;
    nickname: string;
}

const useUser = () => {
    const [user, setUser] = useState<IUser | undefined>();

    useEffect(() => {
        axios
            .get(`/user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                },
            })
            .then((data) => setUser(data.data))
            .catch((e) => {
                console.log(e);
            });
    }, []);
    return { user };
};

export default useUser;
