import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import type { Post } from '../../types/types';

export default function Page() {
  const router = useRouter();
  const id = router.query.id;

  if (!id) return <div>404 ERRROR</div>;

  return <div>{id && <Post id={id as string} />}</div>;
}

type PostProps = {
  id: string;
};

export function Post({ id }: PostProps) {
  async function getPost(id: string): Promise<Post> {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return data;
  }

  const { data, isLoading, isError, error } = useQuery(['post', id], () =>
    getPost(id)
  );

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{JSON.stringify(error)}</div>;

  if (!data) return <div>Post is unavailable.</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold py-3">{data.title}</h1>
      <p className="py-1">{data.body}</p>
      <span>{data.userId}</span>
    </div>
  );
}
