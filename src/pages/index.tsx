import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { json } from 'stream/consumers';
import useToken from '../hooks/useToken';
import useUser from '../libs/useUser';
import { useRouter } from 'next/router';

type account = string | null;

export default function Home() {
    const [aToken, setAToken] = useState<account>('');
    const { user } = useUser();
    const router = useRouter();
    console.log(user);
    useEffect(() => {
        setAToken(localStorage.getItem('accessToken'));
        console.log(aToken);
        if (localStorage.getItem('accesss')) {
            console.log(localStorage.getItem('accesss'));
            router.push('/signIn');
        } else {
            router.push('/post/list');
        }
    }, []);

    console.log(aToken + '-Token');

    return (
        <>
            <h2>...Loading</h2>
        </>
    );
}
