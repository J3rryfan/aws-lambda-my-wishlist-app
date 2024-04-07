import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/create-blog')({
  component: CreateBlogPage,
});

function CreateBlogPage() {
  return (
    <div className=''>
      <h1 className='mb-4 text-2xl font-bold'>Create Blog</h1>
      <CreateBlogForm />
    </div>
  );
}

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
import { Textarea } from '@/components/ui/textarea';
import { useCreateBlog } from '@/hooks/useCreateBlog';
import { useState } from 'react';

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  image: z
    .instanceof(FileList, {
      message: 'Please upload a image',
    })
    .refine((value) => value.length > 0, 'Please upload a image'),
});

type CreateBlogFormSchema = z.infer<typeof formSchema>;

function CreateBlogForm() {
  const { createBlog, isCreating } = useCreateBlog();

  const form = useForm<CreateBlogFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      image: undefined,
    },
  });

  const [filePreviewURL, setFilePreviewURL] = useState<string | undefined>();

  const imageRef = form.register('image');

  // 2. Define a submit handler.
  function onSubmit({ title, description, image }: CreateBlogFormSchema) {
    console.log({ title, description });
    createBlog({ data: { title, description }, image: image[0] });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {filePreviewURL && (
          <img src={filePreviewURL} className='max-w-40 max-auto' />
        )}
        <FormField
          control={form.control}
          name='image'
          render={() => (
            <FormItem>
              <FormControl>
                <Input
                  type='file'
                  accept='image/*'
                  {...imageRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (filePreviewURL) {
                      URL.revokeObjectURL(filePreviewURL);
                    }
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setFilePreviewURL(url);
                    } else {
                      setFilePreviewURL(undefined);
                    }
                    imageRef.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='My Awesome Blog' {...field} />
              </FormControl>
              <FormDescription>
                This is where you can write a title for your blog.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='Write a short description' {...field} />
              </FormControl>
              <FormDescription>
                This is where you can write a short description for your blog.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isCreating} className='w-full'>
          Submit
        </Button>
      </form>
    </Form>
  );
}
