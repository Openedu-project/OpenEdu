'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { IBlockingUser } from '@oe/api';
import { type IPrivacyProfileFormSchemaType, privacyProfileFormSchema } from '@oe/api';
import { PLATFORM_ROUTES, buildUrl } from '@oe/core';
import { pickCharacters } from '@oe/core';
import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDebouncedCallback } from 'use-debounce';
import { Link } from '#common/navigation';
import { Spinner } from '#components/spinner';
import { Avatar, AvatarFallback, AvatarImage } from '#shadcn/avatar';
import { Button } from '#shadcn/button';
import { Checkbox as UICheckbox } from '#shadcn/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel } from '#shadcn/form';
import { Input } from '#shadcn/input';
import { cn } from '#utils/cn';

interface UserListBlockForm {
  data: IBlockingUser[];
  onSubmit: ({ user_ids }: { user_ids: string[] }) => void;
  onSetPage: () => void;
  page: number;
  totalPages: number;
  totalItems: number;
  setSearchText: (text: string) => void;
  isLoading?: boolean;
  onClose: () => void;
}

interface ISearch {
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
}

function Search({ onChange, defaultValue, placeholder, className }: ISearch) {
  const debouncedOnChange = useDebouncedCallback((value: string) => {
    onChange(value);
  }, 300);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedOnChange(value);
  };

  return (
    <div className={cn('relative md:w-[200px] lg:w-[300px]', className)}>
      <SearchIcon className="absolute top-[6px] left-[10px] z-[1] stroke-1 stroke-primary" />
      <Input
        className="mbutton-regular16 h-9 border-primary pl-[44px] placeholder:text-[#999999] focus-visible:border-[3px] focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder={placeholder ?? 'Search...'}
        onInput={handleSearch}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export function UserListForm({
  data,
  page,
  totalItems,
  totalPages,
  isLoading,
  setSearchText,
  onSubmit,
  onSetPage,
  onClose,
}: UserListBlockForm) {
  const tBlocking = useTranslations('userProfile.privacy');

  const form = useForm<IPrivacyProfileFormSchemaType>({
    resolver: zodResolver(privacyProfileFormSchema),
    defaultValues: { user_ids: [] },
  });

  const { control, handleSubmit } = form;

  const handleFormSubmit = useCallback(
    async (value: IPrivacyProfileFormSchemaType) => {
      const submissionValue = {
        ...value,
      };

      await onSubmit(submissionValue);
    },
    [onSubmit]
  );

  return (
    <div className="flex flex-1 flex-col gap-6">
      <Search className="!w-full" onChange={value => setSearchText(value)} />
      <Form {...form}>
        <form
          id="user_list_form"
          onSubmit={handleSubmit(handleFormSubmit)}
          className="h-full max-h-[368px] flex-1 overflow-y-auto"
        >
          <FormField
            name="user_ids"
            control={control}
            render={({ field }) => (
              <FormItem className="w-full pb-12">
                <InfiniteScroll
                  className="!overflow-hidden"
                  dataLength={totalItems}
                  next={onSetPage}
                  hasMore={page < (totalPages ?? 1)}
                  loader={<Spinner className="mx-auto h-4 w-4 animate-spin" />}
                  scrollableTarget="user_list_form"
                  scrollThreshold="100px"
                >
                  {data?.map(user => (
                    <div key={user.id} className="mb-3 p-1">
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <UICheckbox
                            checked={field.value.includes(user.id)}
                            onCheckedChange={checked => {
                              const updatedValue = checked
                                ? [...field.value, user.id]
                                : field.value.filter(id => id !== user.id);

                              field.onChange(updatedValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="mcaption-regular16 !mt-0 text-neutral-600">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-7 w-7">
                              <AvatarImage src={user?.avatar} alt="avatar" />
                              <AvatarFallback>
                                {user?.display_name?.length > 0
                                  ? pickCharacters(user.display_name)
                                  : pickCharacters(user?.username)}
                              </AvatarFallback>
                            </Avatar>

                            <Link
                              href={buildUrl({
                                endpoint: PLATFORM_ROUTES.userProfile,
                                params: { username: user.username },
                              })}
                              target="_blank"
                              className="mbutton-semibold16 p-0 text-foreground"
                            >
                              {user?.display_name?.length > 0 ? user.display_name : user.username}
                            </Link>
                          </div>
                        </FormLabel>
                      </FormItem>
                    </div>
                  ))}

                  {isLoading && <Spinner className="mx-auto h-4 w-4 animate-spin" />}
                </InfiniteScroll>
              </FormItem>
            )}
          />
          <div className="sticky bottom-0 mt-6 flex justify-end gap-5 bg-white p-4">
            <Button type="button" variant="outline" className="mbutton-semibold16" onClick={onClose}>
              {tBlocking('cancel')}
            </Button>
            <Button type="submit" className="mbutton-semibold16">
              {tBlocking('block')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
