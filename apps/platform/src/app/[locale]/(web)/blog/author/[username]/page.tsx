import { getMeServiceWithoutError } from '@oe/api/services/auth';
import { getUserBlogService } from '@oe/api/services/blog';
import { getUserProfileService } from '@oe/api/services/user';
import type { HTTPError } from '@oe/api/utils/http-error';
import { AuthorProfileCard, PersonalBlogSection, TopBlogs } from '@oe/ui/components/blog';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

const getUserProfile = async (username: string) => {
  try {
    return await getUserProfileService(undefined, { id: username, init: { ...cookies } });
  } catch (error) {
    return error as HTTPError;
  }
};

const getOrgBlog = async (id: string) => {
  try {
    return await getUserBlogService('org', undefined, id, {
      params: { page: 1, per_page: 10, sort: 'update_at desc' },
      init: { ...cookies },
    });
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
  const t = await getTranslations('blogSectionTitle');
  const { username } = await params;
  const [me, profileData] = await Promise.all([
    getMeServiceWithoutError(),
    getUserProfile(username),
    // getTopAuthor(),
  ]);

  if (profileData instanceof Error || !profileData) {
    return (
      <p className="mcaption-regular16 lg:mcaption-regular20 w-full p-6 text-center text-[#FA0013]">
        Something went wrong
      </p>
    );
  }

  const orgBlogs = await getOrgBlog(profileData?.id);

  return (
    <div className="grid min-h-screen grid-cols-1 p-6 pb-10 md:px-10 lg:grid-cols-10 lg:gap-10">
      <div className="lg:order-1 lg:col-span-3">
        <AuthorProfileCard profile={profileData} isMe={me?.username === username} className="mb-6" />
        {!(orgBlogs instanceof Error || orgBlogs?.results.length === 0) && (
          <TopBlogs title={t('articlesOnOrg')} blogs={orgBlogs?.results} />
        )}
      </div>

      <PersonalBlogSection
        id={profileData.id}
        name={profileData.display_name.length > 0 ? profileData.display_name : profileData.username}
        className="col-span-10 pt-4 lg:col-span-7"
      />
    </div>
  );
}
