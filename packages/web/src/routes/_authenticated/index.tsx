import { useQuery } from '@tanstack/react-query';

import { createFileRoute } from '@tanstack/react-router';

import { Card, CardContent } from '@/components/ui/card';

export const Route = createFileRoute('/_authenticated/')({
  component: HomePage,
});

type Blog = {
  id: number;
  title: string;
  description: string;
};

function HomePage() {
  // get all blogs
  async function getAllBlogs() {
    const response = await fetch(import.meta.env.VITE_APP_API_URL + '/blogs');

    if (!response.ok) {
      throw new Error('Failed to get blogs');
    }

    return (await response.json()) as { blogs: Blog[] };
  }

  const { data, error, isPending } = useQuery({
    queryKey: ['getAllBlogs'],
    queryFn: getAllBlogs,
  });

  console.log(data);

  return (
    <>
      <h1 className='text-3xl font-bold'>All Wishlist</h1>
      {error ? (
        'An error has occurred' + error.message
      ) : (
        <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {data?.blogs.map((blog) => (
            <Card className='overflow-hidden'>
              <CardContent className='p-0'>
                <h1>{blog.title}</h1>
                <p>{blog.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
