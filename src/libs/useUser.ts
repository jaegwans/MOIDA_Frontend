import { useState, useEffect } from 'react';
import axios from 'axios';

const useUser = () => {
    const [user, setUser] = useState<{ username: string } | undefined>();

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
