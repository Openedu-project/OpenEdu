'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from '@oe/api/utils/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '#shadcn/form';
import { Input } from '#shadcn/input';
import SaveButton from './save-button';

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export function Header() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form className="flex flex-wrap justify-between gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Form name" className="min-w-60 " autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Form description" className="min-w-60 md:max-w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <SaveButton />
      </form>
    </Form>
  );
}
