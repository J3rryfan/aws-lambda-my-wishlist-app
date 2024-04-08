import { useQuery } from '@tanstack/react-query';

import { createFileRoute } from '@tanstack/react-router';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_authenticated/')({
  component: HomePage,
});

type Blog = {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
};

function HomePage() {
  const { getToken } = useKindeAuth();
  // get all blogs
  async function getAllBlogs() {
    const token = await getToken();
    if (!token) {
      throw new Error('No token');
    }

    const response = await fetch(import.meta.env.VITE_APP_API_URL + '/blogs', {
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get blogs');
    }

    return (await response.json()) as { blogs: Blog[] };
  }

  const { data, error } = useQuery({
    queryKey: ['getAllBlogs'],
    queryFn: getAllBlogs,
  });

  return (
    <>
      <h1 className='text-3xl font-bold'>Recent Wishlist</h1>
      {error ? (
        'An error has occurred' + error.message
      ) : (
        <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {data?.blogs.map((blog) => (
            <Card className=''>
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
                <CardDescription>{blog.description}</CardDescription>
              </CardHeader>
              <CardContent className='flex justify-center p-4'>
                <img
                  src={blog.imageUrl}
                  alt={blog.description}
                  height='200'
                  width='200'
                  style={{ aspectRatio: '200/200', objectFit: 'cover' }}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
