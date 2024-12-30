'use client';
import { type IBlogFormType, blogSchema } from '@oe/api/schemas/blogSchema';
import { postBlog, updateBlog } from '@oe/api/services/blog';
import type { IBlog, IBlogRequest } from '@oe/api/types/blog';
import type { ICategoryTree } from '@oe/api/types/categories';
import type { IHashtag } from '@oe/api/types/hashtag';
import type { HTTPError } from '@oe/api/utils/http-error';
import { BLOG_ADMIN_ROUTES, BLOG_ROUTES } from '@oe/core/utils/routes';
import { type LanguageCode, languages } from '@oe/i18n/languages';
import { Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import type { KeyboardEvent } from 'react';
import showdown from 'showdown';
import { useRouter } from '#common/navigation';
import { AutocompeteMultiple, Autocomplete } from '#components/autocomplete';
import { CategorySelectionModal } from '#components/category-selection';
import { FormWrapper } from '#components/form-wrapper';
import { RichTextEditor } from '#components/rich-text';
import { Uploader } from '#components/uploader';
import { Badge } from '#shadcn/badge';
import { Button } from '#shadcn/button';
import { FormControl, FormField, FormFieldWithLabel, FormItem, FormMessage } from '#shadcn/form';
import { Input } from '#shadcn/input';
import { toast } from '#shadcn/sonner';
import { Textarea } from '#shadcn/textarea';
import { cn } from '#utils/cn';

export type BlogType = 'org' | 'personal';
export type IFormAction = 'update' | 'create';
interface IActionStatus {
  status: 'SUCCESS' | 'ERROR';
  message: string;
}
interface IBlogFormAction {
  isPublish?: boolean;
  blogType: BlogType;
  action: IFormAction;
  id?: string;
  blogData: IBlogFormType;
}

interface IBlogCreationFormProps {
  blogType: BlogType;
  action?: IFormAction;
  aiButton?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
  className?: string;
  hashtags?: IHashtag[];
  categories?: ICategoryTree[];
  locales?: LanguageCode[];
  data?: IBlog;
}

const blogFormAction = async ({
  blogData,
  blogType,
  isPublish = false,
  action,
  id,
}: IBlogFormAction): Promise<IActionStatus> => {
  try {
    const { thumbnail, hashtag_names, ...baseData } = blogData;
    const payload: IBlogRequest = {
      ...baseData,
      is_publish: isPublish,
      blog_type: blogType,
      banner_id: thumbnail.id,
      hashtag_names: hashtag_names?.map(name => {
        return { name };
      }),
    };

    action === 'update'
      ? await updateBlog(blogType, undefined, id, { payload })
      : await postBlog(undefined, { payload });

    return { status: 'SUCCESS', message: `${action}Success` };
  } catch (error) {
    return { status: 'ERROR', message: (error as HTTPError).message };
  }
};

export default function BlogForm({
  blogType,
  action = 'create',
  data,
  onSuccess,
  onError,
  className,
  locales = ['en'],
  hashtags = [],
  categories = [],
}: IBlogCreationFormProps) {
  const tBlogs = useTranslations('blogForm');
  const converter = new showdown.Converter();
  const tGeneral = useTranslations('general');
  const tErrors = useTranslations('errors');
  const router = useRouter();

  const hashtagsName = useMemo(() => hashtags.map(hashtag => hashtag.name), [hashtags]);

  const defaultValues: IBlogFormType | undefined = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return {
      locale: data.locale,
      title: data.title,
      description: data.description,
      content: converter.makeHtml(data.content),
      image_description: data.image_description,
      thumbnail: data.banner,
      category_ids: data.categories,
      hashtag_names: data.hashtag?.map(hashtag => hashtag.name),
      is_ai_generated: data.is_ai_generated,
    };
  }, [data, converter]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, handleSelectOptions?: (value: string) => void) => {
    if (
      e.key === ' ' ||
      e.code === 'Space' ||
      (e.key === 'Enter' && (e.currentTarget.value.length === 0 || hashtagsName.includes(e.currentTarget.value)))
    ) {
      e.preventDefault();
      return;
    }

    if (e.nativeEvent.isComposing || e.key !== 'Enter') {
      return;
    }

    e.preventDefault();
    handleSelectOptions?.(e.currentTarget.value);
  };

  const handleSubmitDraft = async (blogData: IBlogFormType) => {
    const res = await blogFormAction({ blogData, blogType, action, id: data?.id });
    if (res.status === 'SUCCESS') {
      toast.success(tBlogs(res.message));
      onSuccess?.();
      router.push(blogType === 'org' ? BLOG_ADMIN_ROUTES.myBlog : BLOG_ROUTES.blogManagement);
    } else {
      toast.error(tErrors(res.message ?? 'unknown.title'));
      onError?.();
    }
  };

  const handleSubmitPublish = async (blogData: IBlogFormType) => {
    const res = await blogFormAction({ blogData, blogType, action, isPublish: true, id: data?.id });
    if (res.status === 'SUCCESS') {
      toast.success(tBlogs('publishSuccess'));
      onSuccess?.();
      router.push(blogType === 'org' ? BLOG_ADMIN_ROUTES.myBlog : BLOG_ROUTES.blogManagement);
    } else {
      toast.error(tErrors(res.message ?? 'unknown.title'));
      onError?.();
    }
  };

  return (
    <FormWrapper
      id="blog_form"
      schema={blogSchema}
      className={cn('grid grid-cols-1 gap-6 bg-background py-6 md:grid-cols-3 lg:grid-cols-4', className)}
      resetOnSuccess
      useFormProps={{ defaultValues: defaultValues ?? { locale: 'en', is_ai_generated: false }, mode: 'all' }}
    >
      {({ loading, form }) => (
        <>
          <div
            className={cn(
              'col-span-full flex w-full flex-wrap items-center justify-between gap-4 border-foreground/50 border-b bg-white py-2'
            )}
          >
            <FormFieldWithLabel name="title">
              <Input
                className="!giant-iheading-semibold16 md:!giant-iheading-semibold24 !border-none p-2 focus-visible:ring-0"
                placeholder={tBlogs('nameOfArticle')}
              />
            </FormFieldWithLabel>

            <div className="hidden gap-4 md:flex">
              <Button
                loading={loading}
                variant="outline"
                type="submit"
                className="px-4"
                onClick={form.handleSubmit(handleSubmitDraft)}
              >
                {tGeneral('save')}
              </Button>

              <Button loading={loading} type="submit" className="px-4" onClick={form.handleSubmit(handleSubmitPublish)}>
                {tGeneral('publish')}
              </Button>
            </div>
          </div>
          <div className="mb-8 h-fit rounded-lg border px-4 shadow md:order-1">
            <div className={cn(blogType === 'personal' && 'hidden')}>
              <div className="border-b py-4">
                <FormFieldWithLabel name="category_ids">
                  <CategorySelectionModal
                    className="giant-iheading-semibold12 md:giant-iheading-semibold16 px-2"
                    categories={categories}
                  />
                </FormFieldWithLabel>

                <div className="flex flex-wrap gap-2">
                  {form.getValues('category_ids')?.map(value => (
                    <Badge key={value.id} variant="default">
                      {value.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="border-b py-4">
                <div className="mb-4 flex justify-between px-2">
                  <p className="giant-iheading-semibold12 md:giant-iheading-semibold16 text-foreground">
                    {tBlogs('hashtag')}
                  </p>
                  <Settings className="h-4 w-4" />
                </div>
                <FormFieldWithLabel name="hashtag_names">
                  <AutocompeteMultiple
                    options={hashtagsName}
                    placeholder={tBlogs('inputHashtag')}
                    onKeyDown={handleKeyDown}
                  />
                </FormFieldWithLabel>
              </div>
            </div>
            <div className="border-b py-4">
              <FormFieldWithLabel
                name="locale"
                label={tBlogs('language')}
                labelClassName="giant-iheading-semibold12 md:giant-iheading-semibold16 mb-4"
              >
                <Autocomplete
                  options={locales}
                  getOptionLabel={locale => languages[locale]}
                  getOptionValue={locale => locale}
                />
              </FormFieldWithLabel>
            </div>

            <div className="flex flex-col gap-4 border-b px-2 py-6">
              <p className="giant-iheading-semibold12 md:giant-iheading-semibold16 mb-6 text-foreground">
                {tBlogs('thumbnail')}
              </p>
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <p className="mbutton-bold12 md:mbutton-semibold12 text-foreground/70">{tBlogs('image')}</p>
                    <FormControl>
                      <Uploader
                        listType="picture"
                        value={field.value ? [field.value] : []}
                        onChange={files => field.onChange(files[0])}
                        accept="image/*"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormFieldWithLabel
                label={tBlogs('imageDesc')}
                name="image_description"
                labelClassName="mbutton-bold12 md:mbutton-semibold12 mb-4 text-foreground/70"
              >
                <Input placeholder={tBlogs('desc')} />
              </FormFieldWithLabel>
            </div>
          </div>

          <div className={cn('flex flex-col gap-6 md:col-span-2 lg:col-span-3')}>
            <FormFieldWithLabel
              label={tBlogs('desc')}
              name="description"
              className="rounded-lg border p-6 shadow"
              labelClassName="giant-iheading-semibold12 md:giant-iheading-semibold16 mb-4"
            >
              <Textarea className="border-none bg-foreground/5" rows={5} placeholder={tBlogs('placeholderDesc')} />
            </FormFieldWithLabel>

            <FormFieldWithLabel
              label={tBlogs('write')}
              name="content"
              className="rounded-lg border p-6 shadow"
              labelClassName="giant-iheading-semibold12 md:giant-iheading-semibold16 mb-4"
            >
              <RichTextEditor
                className="bg-foreground/5 md:h-[calc(100vh-150px)]"
                defaultValue={converter.makeHtml(data?.content ?? '')}
                aiParams={{ blog_cuid: data?.cuid ?? '' }}
                aiButton={blogType === 'org'}
              />
            </FormFieldWithLabel>
          </div>

          <div className="flex gap-4 md:hidden">
            <Button
              loading={loading}
              variant="outline"
              type="submit"
              className="px-4"
              onClick={form.handleSubmit(handleSubmitDraft)}
            >
              {tGeneral('save')}
            </Button>

            <Button loading={loading} type="submit" className="px-4" onClick={form.handleSubmit(handleSubmitPublish)}>
              {tGeneral('publish')}
            </Button>
          </div>
        </>
      )}
    </FormWrapper>
  );
}
