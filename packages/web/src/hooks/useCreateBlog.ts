import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

type Blog = {
  title: string;
  description: string;
};

// creating a blog
export function useCreateBlog() {
  const navigate = useNavigate({ from: '/create-blog' });

  const { mutate, error, isPending } = useMutation({
    mutationFn: async ({ data }: { data: Blog }) => {
      const response = await fetch(
        import.meta.env.VITE_APP_API_URL + '/blogs',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ blog: data }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create blog');
      }
    },
    onSuccess: () => {
      navigate({ to: '/' });
    },
  });

  return { createBlog: mutate, error, isCreating: isPending };
}
