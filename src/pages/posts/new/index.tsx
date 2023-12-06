import axios from 'axios';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Post } from '@/types/types';
import { useMutation } from 'react-query';
import { useEffect } from 'react';

export default function Page() {
  const { register, handleSubmit, reset } = useForm<Post>();

  async function createPost(post: Post) {
    const postData = {
      ...post,
      userId: 1,
    };

    const { data } = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      postData,
      {
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      }
    );
    return data;
  }

  const { mutate, data, isLoading, isError, error, isSuccess } = useMutation(
    'posts',
    createPost,
    {
      onError: (error: any) => {
        console.log(error);
      },
      onSuccess: (data: any) => {
        console.log(data);
        reset();
      },
    }
  );

  const onSubmit: SubmitHandler<Post> = (data) => {
    mutate(data);
  };

  return (
    <>
      <h1 className="font-bold text-2xl py-2">Create New Post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            className="border-2 border-sky-200 rounded-lg my-2 block w-80 p-2"
            placeholder="Enter post title here..."
            type="text"
            id="title"
            {...register('title', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea
            className="border-2 border-sky-200 rounded-lg my-2 block w-80 p-2"
            placeholder="Enter post body here..."
            id="body"
            {...register('body', { required: true })}
          />
        </div>
        <button
          className="font-semibold text-slate-600 bg-sky-200 hover:bg-sky-400 hover:text-white py-1 px-2 my-2 rounded-lg w-fit"
          type="submit"
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      <div>
        {isSuccess && (
          <h4 className="font-semibold text-green-500 my-3 ">
            ✅ Post saved Successfully
          </h4>
        )}
        {isSuccess && data && JSON.stringify(data)}
        {isError && (
          <h4 className="font-semibold text-red-500 my-3 ">
            ❌ Oh snap, something went wrong!
          </h4>
        )}
      </div>

      <Link className="text-sky-500 font-bold py-5" href="/">
        Back
      </Link>
    </>
  );
}
