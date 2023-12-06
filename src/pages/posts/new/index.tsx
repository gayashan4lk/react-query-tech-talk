import Link from 'next/link';

export default function Page() {
  return (
    <>
      <div>Create New Post</div>
      <Link className="text-sky-500 font-bold py-5" href="/">
        Back
      </Link>
    </>
  );
}
