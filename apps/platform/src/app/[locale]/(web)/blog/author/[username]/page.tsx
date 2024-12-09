import { getMeServiceWithoutError } from '@oe/api/services/auth';
import { getUserProfileService } from '@oe/api/services/user';
import type { HTTPError } from '@oe/api/utils/http-error';
import { AuthorProfileCard } from '@oe/ui/components/blog';
import { cookies } from 'next/headers';

const getUserProfile = async (username: string) => {
  try {
    return await getUserProfileService(undefined, { id: username, init: { ...cookies } });
  } catch (error) {
    return error as HTTPError;
  }
};

// const getTopAuthor = async () => {
//   try {
//     return await getTopAuthorService(undefined, {params: {page: 1, per_page: 10, sort: 'update_at desc'}, init: {...cookies} });

//   } catch (error) {
//     return error as HTTPError;
//   }
// };

export default async function AuthorPage({ params }: { params: { username: string } }) {
  const { username } = await params;
  const [me, profileData] = await Promise.all([
    getMeServiceWithoutError(),
    getUserProfile(username),
    // getTopAuthor(),
  ]);

  if (profileData instanceof Error || !profileData) {
    return <>Something went wrong</>;
  }

  return (
    <>
      <AuthorProfileCard profile={profileData} isMe={me?.username === username} />
    </>
  );
}
