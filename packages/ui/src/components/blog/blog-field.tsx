import { Settings } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '#shadcn/button';
import { FormFieldWithLabel } from '#shadcn/form';
import { Skeleton } from '#shadcn/skeleton';

export const BlogFieldTitle = ({ title }: { title: string }) => (
  <div className="mb-2 flex w-full items-center justify-between gap-2">
    <p className="giant-iheading-semibold16 text-foreground">{title}</p>
    <Button variant="ghost" className="h-8 w-8 cursor-default p-0 hover:bg-transparent">
      <Settings className="h-4 w-4" />
    </Button>
  </div>
);

export const BlogFieldSkeleton = ({ title }: { title: string }) => (
  <div>
    <BlogFieldTitle title={title} />
    <Skeleton className="h-12" />
  </div>
);

interface IBlogFieldProps {
  name: string;
  title: string;
  children: ReactNode;
}

export const BlogField = ({ name, title, children }: IBlogFieldProps) => {
  return (
    <FormFieldWithLabel name={name} label={<BlogFieldTitle title={title} />}>
      {children}
    </FormFieldWithLabel>
  );
};
