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
    <div>
      <h1 className="font-bold text-2xl py-2">Posts</h1>
      <ul>
        {data.map((post: Post) => (
          <li key={post.id} className="font-bold py-1 text-sky-600">
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
