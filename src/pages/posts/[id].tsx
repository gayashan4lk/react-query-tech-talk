import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import type { Post, User } from '../../types/types';
import Link from 'next/link';

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

  async function getUser(userId: number): Promise<User> {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return data;
  }

  const { data, isLoading, isError, error } = useQuery(
    ['post', id],
    () => getPost(id),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  const {
    data: user,
    isLoading: userIsLoading,
    isError: userIsError,
    error: userError,
  } = useQuery(['user', data?.userId], () => getUser(data?.userId as number), {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{JSON.stringify(error)}</div>;

  if (!data) return <div>Post is unavailable.</div>;

  return (
    <div className="max-w-screen-sm">
      <h1 className="text-2xl font-bold py-3">{data.title}</h1>
      <p className="py-1">{data.body}</p>
      <div className="text-sm font-semibold">
        {userIsLoading && <span>Loading...</span>}
        {userIsError && <span>Oh snap, Error occured!</span>}
        {user && <span>Author: {user.name}</span>}
      </div>
      <Link className="block text-blue-600 font-bold py-5" href="/">
        Back
      </Link>
    </div>
  );
}
