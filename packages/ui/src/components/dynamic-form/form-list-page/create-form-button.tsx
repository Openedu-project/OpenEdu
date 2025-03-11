'use client';

import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
// import { createFormService } from "@oe/api/services/forms";
// import type { TFormType } from "@oe/api/types/form";
// import type { TFormEvent } from "@oe/api/types/form";
// import { z } from "@oe/api/utils/zod";
// import { FORM_EVENT, FORM_TYPE } from "@oe/core/utils/constants";
// import { CREATOR_ROUTES } from "@oe/core/utils/routes";
// import { buildUrl } from "@oe/core/utils/url";
// import { Modal } from "@oe/ui/components/modal";
// import { RichTextEditor } from "@oe/ui/components/rich-text";
// import { FormFieldWithLabel } from "@oe/ui/shadcn/form";
// import { Input } from "@oe/ui/shadcn/input";
// import { toast } from "@oe/ui/shadcn/sonner";
import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, type LinkProps } from '#common/navigation';
import { cn } from '#utils/cn';

// const createBaseFormSchema = z.object({
//   name: z.string().min(1, "dynamicForms.validation.name"),
//   description: z.string().min(1, "dynamicForms.validation.description"),
// });

// type ICreateBaseFormSchema = z.infer<typeof createBaseFormSchema>;

export function CreateFormButton({
  className,
  href,
  queryParams,
  ...props
}: Partial<LinkProps> & { queryParams?: Record<string, string> }) {
  const tDynamicForms = useTranslations('dynamicForms');
  // const { mutateAndClearCache } = useTable();
  // const router = useRouter();

  // const handleError = () => {
  //   toast.error(tDynamicForms("toast.createError"));
  // };

  // const onSubmit = async (data: ICreateBaseFormSchema) => {
  //   const form = await createFormService(undefined, {
  //     data: {
  //       title: data.name,
  //       description: data.description,
  //       event: FORM_EVENT.others as TFormEvent,
  //       type: FORM_TYPE.page as TFormType,
  //     },
  //   });
  //   await mutateAndClearCache?.();
  //   toast.success(tDynamicForms("toast.createSuccess"));
  //   router.push(
  //     buildUrl({
  //       endpoint: CREATOR_ROUTES.formDetail,
  //       params: { formId: form.id },
  //     })
  //   );
  // };

  return (
    <Link
      {...props}
      href={buildUrl({ endpoint: CREATOR_ROUTES.createForm, queryParams })}
      className={cn('h-8 gap-2', className)}
    >
      <PlusIcon className="h-4 w-4" />
      {tDynamicForms('create.title')}
    </Link>
  );

  // return (
  //   <Modal
  //     title={tDynamicForms("create.title")}
  //     trigger={
  //       <Button className={cn("h-8 gap-2", className)} {...props}>
  //         <PlusIcon className="h-4 w-4" />
  //         {tDynamicForms("create.title")}
  //       </Button>
  //     }
  //     validationSchema={createBaseFormSchema}
  //     onSubmit={onSubmit}
  //     onError={handleError}
  //     showSubmit
  //     buttons={[
  //       {
  //         label: tDynamicForms("actions.cancel"),
  //         type: "button",
  //         onClick: (onClose) => {
  //           onClose?.();
  //         },
  //         variant: "outline",
  //       },
  //       { label: tDynamicForms("actions.create"), type: "submit" },
  //     ]}
  //   >
  //     {() => (
  //       <>
  //         <FormFieldWithLabel
  //           name="name"
  //           label={tDynamicForms("form.name")}
  //           required
  //         >
  //           <Input />
  //         </FormFieldWithLabel>
  //         <FormFieldWithLabel
  //           name="description"
  //           label={tDynamicForms("form.description")}
  //           required
  //         >
  //           <RichTextEditor />
  //         </FormFieldWithLabel>
  //       </>
  //     )}
  //   </Modal>
  // );
}
