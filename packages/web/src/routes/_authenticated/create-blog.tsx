import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/create-blog')({
  component: CreateBlogPage,
});

type Blog = {
  title: string;
  description: string;
  imageUrl?: string;
};

function CreateBlogPage() {
  return (
    <div className=''>
      <h1 className='mb-4 text-2xl font-bold'>Create Post</h1>
      <CreateBlogForm />
    </div>
  );
}

// const mutation = useMutation({
//   mutationFn: async ({ data }: { data: Blog }) => {
//     const response = await fetch(
//       import.meta.env.VITE_APP_API_URL + '/blogs',
//       {
//         method: 'POST',
//         body: JSON.stringify({ blog: data }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error('Failed to create blog');
//     }

//     const json = await response.json();
//     return json;
//   },
// });

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

function CreateBlogForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
