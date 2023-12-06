import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function Home() {
  async function getPosts() {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    return data;
  }

  const postsQuery = useQuery('posts', getPosts);

  if (postsQuery.isLoading) return <div>Loading...</div>;

  if (postsQuery.isError) return <div>Error</div>;

  return (
    <main
      className={'flex min-h-screen flex-col items-center justify-between p-24'}
    >
      <div>{JSON.stringify(postsQuery.data)}</div>
    </main>
  );
}
