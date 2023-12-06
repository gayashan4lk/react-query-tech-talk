import axios from 'axios';
import Link from 'next/link';

import { Post } from '@/types/types';

export default function Page() {
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
  }

  return (
    <>
      <div>Create New Post</div>
      <Link className="text-sky-500 font-bold py-5" href="/">
        Back
      </Link>
    </>
  );
}
