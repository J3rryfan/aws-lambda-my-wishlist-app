import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

type Blog = {
  title: string;
  description: string;
  imageUrl?: string;
};

const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
};

// creating a blog
export function useCreateBlog() {
  const { getToken } = useKindeAuth();
  const navigate = useNavigate({ from: '/create-blog' });

  const { mutate, error, isPending } = useMutation({
    mutationFn: async ({ data, image }: { data: Blog; image: File }) => {
      const token = await getToken();
      if (!token) {
        throw new Error('No token');
      }

      if (image) {
        const signedURLResponse = await fetch(
          import.meta.env.VITE_APP_API_URL + '/signed-url',
          {
            method: 'POST',
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contentType: image.type,
              contentLength: image.size,
              checksum: await computeSHA256(image),
            }),
          }
        );
        if (!signedURLResponse.ok) {
          throw new Error('Failed to get signed url');
        }

        const { url } = (await signedURLResponse.json()) as { url: string };
        console.log(url);

        await fetch(url, {
          method: 'PUT',
          body: image,
          headers: {
            'Content-Type': image.type,
          },
        });

        const imageUrl = url.split('?')[0];
        data.imageUrl = imageUrl;
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
