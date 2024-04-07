import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

type Blog = {
  title: string;
  description: string;
};

// creating a blog
export function useCreateBlog() {
  const { getToken } = useKindeAuth();
  const navigate = useNavigate({ from: '/create-blog' });

  const { mutate, error, isPending } = useMutation({
    mutationFn: async ({ data }: { data: Blog }) => {
      const token = await getToken();
      if (!token) {
        throw new Error('No token');
      }
      const response = await fetch(
        import.meta.env.VITE_APP_API_URL + '/blogs',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
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
