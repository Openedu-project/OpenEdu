import { FormFieldWithLabel, type FormFieldWithLabelProps } from '@oe/ui';

export function CourseFormField({ children, name, label, ...props }: FormFieldWithLabelProps) {
  return (
    <FormFieldWithLabel name={name} label={<p className="mbutton-semibold16 mb-2">{label}</p>} {...props}>
      {children}
    </FormFieldWithLabel>
  );
}
