import { useQuery } from 'react-query';
import axios from 'axios';
import type { Post } from '../types/types';
import Link from 'next/link';

export default function Home() {
  async function getPosts(): Promise<Post[]> {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    return data;
  }

  const { data, isLoading, isError, error } = useQuery('posts', getPosts);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{JSON.stringify(error)}</div>;

  if (!data) return <div>Posts are unavailable.</div>;

  return (
    <main
      className={'flex min-h-screen flex-col items-center justify-between p-24'}
    >
      <div>
        <ul>
          {data.map((post: Post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
