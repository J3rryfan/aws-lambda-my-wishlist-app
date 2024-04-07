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
  imageUrl?: string;
  createdAt: Date;
};

function HomePage() {
  // get all blogs

  return (
    <section className='py-24'>
      <p>Login to create a new blog</p>

      <div className='mt-44'>
        <h2 className='text-xl font-semibold leading-none tracking-wide'>
          Recent Blogs
        </h2>
      </div>

      <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <Card className='overflow-hidden'>
          <CardContent className='p-0'>
            {/* link to blog */}

            <h1>Blog 1</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
