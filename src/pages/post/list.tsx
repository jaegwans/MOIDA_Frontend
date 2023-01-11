import { useRouter } from 'next/router';
import Link from 'next/link';

const List = () => {
    const router = useRouter();

    return (
        <div>
            <h1>post list</h1>
            <Link href="/post/detail/1">첫 게시글 조회 test click</Link>
        </div>
    );
};

export default List;
