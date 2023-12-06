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

  const { data, isLoading, isError, error } = useQuery('posts', getPosts);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{JSON.stringify(error)}</div>;

  return (
    <main
      className={'flex min-h-screen flex-col items-center justify-between p-24'}
    >
      <div>{JSON.stringify(data)}</div>
    </main>
  );
}
