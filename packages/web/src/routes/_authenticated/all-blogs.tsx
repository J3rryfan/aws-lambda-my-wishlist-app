import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/all-blogs')({
  component: AllBlogs,
});

function AllBlogs() {
  return (
    <>
      <h1 className='text-3xl font-bold'>All Blogs</h1>
    </>
  );
}
