import { Uploader } from '@oe/ui/components/uploader';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';

export default function Thumbnail() {
  return (
    <FormFieldWithLabel
      name="thumbnail"
      label={
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg">Thumbnail</span>
          <span className="text-muted-foreground text-xs">
            The thumbnail is used to represent the course in the course list.
          </span>
        </div>
      }
      className="rounded-lg bg-background p-4 shadow-sm"
      labelClassName="mb-4 text-lg"
      render={({ field }) => (
        <Uploader
          accept="image/*"
          listType="picture"
          value={field.value ? [field.value] : []}
          className="h-48"
          fileListVisible
          onChange={files => {
            field.onChange(files[0]);
          }}
        />
      )}
    />
  );
}
