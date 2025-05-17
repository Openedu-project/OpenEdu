"use client";
import { API_ENDPOINT } from "@oe/api";
import type { IBlog, IBlogRequest } from "@oe/api";
import { postBlog, updateBlog } from "@oe/api";
import type { IFileResponse } from "@oe/api";
import type { HTTPError } from "@oe/api";
import { type IBlogFormType, blogSchema } from "@oe/api";
import type { ICategoryTree } from "@oe/api";
import type { IHashtag } from "@oe/api";
import { BLOG_ADMIN_ROUTES, BLOG_ROUTES } from "@oe/core";
import type { LanguageCode } from "@oe/i18n";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { mutate } from "swr";
import { useRouter } from "#common/navigation";
import { FormWrapper } from "#components/form-wrapper";
import { RichTextEditor } from "#components/rich-text";
import { SelectLanguage } from "#components/select-language";
import { Uploader } from "#components/uploader";
import { Button } from "#shadcn/button";
import { FormFieldWithLabel } from "#shadcn/form";
import { Input } from "#shadcn/input";
import { toast } from "#shadcn/sonner";
import { Textarea } from "#shadcn/textarea";
import { cn } from "#utils/cn";
import { marked } from "#utils/marker";
import { CategoryField } from "./category-field";
import { HashtagField } from "./hashtag-field";

export type BlogType = "org" | "personal";
export type IFormAction = "update" | "create";
interface IActionStatus {
  status: "SUCCESS" | "ERROR";
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
    const { thumbnail, hashtag_names, category_ids, ...baseData } = blogData;
    const payload: IBlogRequest = {
      ...baseData,
      is_publish: isPublish,
      blog_type: blogType,
      banner_id: Array.isArray(thumbnail)
        ? (thumbnail as IFileResponse[])[0]?.id ?? ""
        : thumbnail.id,
      category_ids: category_ids?.map((obj) => {
        return { id: obj.id };
      }),
      hashtag_names: hashtag_names?.map((name) => {
        return { name };
      }),
    };

    action === "update"
      ? await updateBlog(blogType, undefined, id, { payload })
      : await postBlog(undefined, { payload });

    mutate(
      (key: string) => !!key?.includes(API_ENDPOINT.USERS_ME_BLOGS),
      undefined,
      { revalidate: false }
    );
    return { status: "SUCCESS", message: `${action}Success` };
  } catch (error) {
    return { status: "ERROR", message: (error as HTTPError).message };
  }
};

export function BlogForm({
  blogType,
  action = "create",
  data,
  onSuccess,
  onError,
  className,
}: IBlogCreationFormProps) {
  const tBlogs = useTranslations("blogForm");
  const tGeneral = useTranslations("general");
  const tErrors = useTranslations("errors");
  const router = useRouter();
  const locale = useLocale();

  const defaultValues:
    | IBlogFormType
    | { locale: string; is_ai_generated: boolean; content: "" } =
    useMemo(() => {
      if (!data) {
        return { locale, is_ai_generated: false, content: "" };
      }

      return {
        locale: data.locale,
        title: data.title,
        description: data.description,
        content: data?.is_ai_generated
          ? marked.parse(data?.content, { async: false })
          : data?.content ?? "",
        image_description: data.image_description,
        thumbnail: data.banner,
        category_ids: data.categories?.map((cate) => ({
          id: cate.id,
          name: cate.name,
        })),
        hashtag_names: data.hashtag?.map((hashtag) => hashtag.name),
        is_ai_generated: data.is_ai_generated,
      };
    }, [data, locale]);

  const handleSubmitDraft = async (blogData: IBlogFormType) => {
    const res = await blogFormAction({
      blogData,
      blogType,
      action,
      id: data?.id,
    });
    if (res.status === "SUCCESS") {
      toast.success(tBlogs(res.message));
      onSuccess?.();
      router.push(
        blogType === "org"
          ? BLOG_ADMIN_ROUTES.myBlog
          : BLOG_ROUTES.blogManagement
      );
    } else {
      toast.error(tErrors(res.message ?? "unknown.title"));
      onError?.();
    }
  };

  const handleSubmitPublish = async (blogData: IBlogFormType) => {
    const res = await blogFormAction({
      blogData,
      blogType,
      action,
      isPublish: true,
      id: data?.id,
    });
    if (res.status === "SUCCESS") {
      toast.success(tBlogs("publishSuccess"));
      onSuccess?.();
      router.push(
        blogType === "org"
          ? BLOG_ADMIN_ROUTES.myBlog
          : BLOG_ROUTES.blogManagement
      );
    } else {
      toast.error(tErrors(res.message ?? "unknown.title"));
      onError?.();
    }
  };

  return (
    <FormWrapper
      id="blog_form"
      schema={blogSchema}
      className={cn(
        "grid grid-cols-1 gap-4 space-y-0 bg-background py-6 md:grid-cols-3 lg:grid-cols-4",
        className
      )}
      resetOnSuccess
      useFormProps={{
        defaultValues,
        mode: "all",
      }}
    >
      {({ loading, form }) => (
        <>
          <div
            className={cn(
              "col-span-full flex w-full flex-wrap justify-between gap-4 py-2"
            )}
          >
            <FormFieldWithLabel name="title" className="flex-1" required>
              <Input
                className="giant-iheading-semibold16 rounded-none border-0 border-b-2 p-2 focus:border-b-2 focus-visible:ring-0"
                placeholder={`${tBlogs("nameOfArticle")}...`}
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
                {tGeneral("save")}
              </Button>

              <Button
                loading={loading}
                type="submit"
                className="px-4"
                onClick={form.handleSubmit(handleSubmitPublish)}
              >
                {tGeneral("publish")}
              </Button>
            </div>
          </div>
          <div className="h-fit rounded-lg md:order-1">
            <div
              className={cn(
                "mb-4 flex flex-col gap-4",
                blogType === "personal" && "hidden"
              )}
            >
              <CategoryField />
              <HashtagField />
            </div>
            <FormFieldWithLabel
              name="locale"
              label={tBlogs("language")}
              labelClassName="giant-iheading-semibold16"
              className="mb-4 space-y-4"
            >
              <SelectLanguage />
            </FormFieldWithLabel>

            <div className="flex flex-col gap-4">
              <p className="giant-iheading-semibold16 text-foreground">
                {tBlogs("thumbnail")}
              </p>
              <FormFieldWithLabel
                required
                label={tBlogs("image")}
                name="thumbnail"
                render={({ field }) => {
                  const { onChange, value } = field;

                  return (
                    <Uploader
                      accept="image/*"
                      listType="picture"
                      className="h-48"
                      fileListVisible={false}
                      value={value}
                      onChange={onChange}
                    />
                  );
                }}
              />

              <FormFieldWithLabel
                label={tBlogs("imageDesc")}
                name="image_description"
                className="mt-4"
              >
                <Input placeholder={tBlogs("desc")} />
              </FormFieldWithLabel>
            </div>
          </div>

          <div
            className={cn("flex flex-col gap-4 md:col-span-2 lg:col-span-3")}
          >
            <FormFieldWithLabel
              label={tBlogs("desc")}
              name="description"
              className="rounded"
              labelClassName="giant-iheading-semibold16 mb-4"
            >
              <Textarea rows={5} placeholder={tBlogs("placeholderDesc")} />
            </FormFieldWithLabel>

            <FormFieldWithLabel
              required
              label={tBlogs("write")}
              name="content"
              className="rounded"
              labelClassName="giant-iheading-semibold16 mb-4"
            >
              <RichTextEditor
                className="md:h-[calc(100dvh-150px)]"
                defaultValue={defaultValues?.content ?? ""}
                aiParams={{ blog_cuid: data?.cuid ?? "" }}
                aiButton={blogType === "org"}
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
              {tGeneral("save")}
            </Button>

            <Button
              loading={loading}
              type="submit"
              className="px-4"
              onClick={form.handleSubmit(handleSubmitPublish)}
            >
              {tGeneral("publish")}
            </Button>
          </div>
        </>
      )}
    </FormWrapper>
  );
}
