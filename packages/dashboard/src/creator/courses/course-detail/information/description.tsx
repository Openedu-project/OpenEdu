import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Textarea } from '@oe/ui/shadcn/textarea';

export default function Description() {
  return (
    <FormFieldWithLabel
      name="description"
      label={
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg">Description</span>
          <span className="text-muted-foreground text-xs">The description is used to describe the course.</span>
        </div>
      }
      className="rounded-lg bg-background p-4 shadow-sm"
      labelClassName="mb-4 text-lg"
    >
      <Textarea placeholder="Description" />
    </FormFieldWithLabel>
  );
}
