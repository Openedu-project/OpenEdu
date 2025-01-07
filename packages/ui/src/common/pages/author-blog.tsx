import { getUserBlog } from '@oe/api/actions/blog';
import { getUserProfile } from '@oe/api/actions/user';
import { getMeServiceWithoutError } from '@oe/api/services/auth';
import WhaleNoData from '@oe/assets/images/whale-no-data.png';
import { AuthorProfileCard, PersonalBlogSection, TopBlogs } from '@oe/ui/components/blog';
import { Image } from '@oe/ui/components/image';
import { getTranslations } from 'next-intl/server';

export default async function AuthorPage({ params }: { params: { username: string } }) {
  const { username } = await params;
  const [t, me, { profileData, validateTag }] = await Promise.all([
    getTranslations(),
    getMeServiceWithoutError(),
    getUserProfile(username),
    // getTopAuthor(),
  ]);

  if (!profileData) {
    return (
      <div className="p-10">
        <Image
          src={WhaleNoData.src}
          alt="no user data"
          priority
          aspectRatio="1:1"
          quality={100}
          fill
          sizes="(max-width: 768px) 100vw, 70vw"
        />
        <p className="mcaption-regular16 lg:mcaption-regular20 w-full py-6 text-center">{t('errors.2030')}</p>
      </div>
    );
  }

  const [orgBlogs, personalBlogs] = await Promise.all([
    getUserBlog({ type: 'org', id: profileData?.id }),
    getUserBlog({ type: 'personal', id: profileData?.id, noCache: true }),
  ]);

  return (
    <div className="grid min-h-screen grid-cols-1 p-6 pb-4 md:px-10 lg:grid-cols-10 lg:gap-10">
      <div className="mb-4 lg:order-1 lg:col-span-3 lg:mb-0">
        <AuthorProfileCard
          profile={profileData}
          isMe={me?.username === username}
          validateTags={[validateTag]}
          className="mb-6"
        />
        {!(orgBlogs instanceof Error || orgBlogs?.results.length === 0) && (
          <TopBlogs title={t('blogSectionTitle.articlesOnOrg')} blogs={orgBlogs?.results} />
        )}
      </div>
      <PersonalBlogSection
        id={profileData.id}
        name={profileData.display_name.length > 0 ? profileData.display_name : profileData.username}
        className="col-span-10 pt-4 lg:col-span-7"
        initData={personalBlogs instanceof Error ? [] : personalBlogs?.results}
        totalPages={personalBlogs instanceof Error ? 0 : (personalBlogs?.pagination.total_pages ?? 1)}
      />
    </div>
  );
}
