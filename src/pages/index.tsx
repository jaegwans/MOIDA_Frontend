import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { json } from 'stream/consumers';
import Comments from '../components/Comments';
import Link from 'next/link';

type account = string | null;

export default function Home() {
    const [aToken, setAToken] = useState<account>('');
    useEffect(() => {
        setAToken(localStorage.getItem('accessToken'));
    }, []);

    console.log(aToken + '-Token');

    return (
        <>
            <h2>moida</h2>
        </>
    );
}
