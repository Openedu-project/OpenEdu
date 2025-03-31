'use client';
import { useGetForm } from '@oe/api/hooks/useForms';
import { createFormService, updateFormService } from '@oe/api/services/forms';
import type { IQuestionParam, TFormEvent, TFormType } from '@oe/api/types/form';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { z } from '@oe/api/utils/zod';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { ChevronLeft, Eye, SaveIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';
import { DashboardHeaderCard } from '#common/layout';
import { FormWrapper } from '#components/form-wrapper';
import { Button } from '#shadcn/button';
import { FormFieldWithLabel } from '#shadcn/form';
import { Input } from '#shadcn/input';
import { useFormEditorStore } from '../store';
import { convertFieldsToQuestions } from '../utils';
import { FormRendererModal } from './form-renderer-modal';

const formSchema = z.object({
  title: z
    .string({ required_error: 'formValidation.required' })
    .min(1, {
      message: 'formValidation.too_small.string.inclusive--type:name--minimum:1',
    })
    .max(50, {
      message: 'formValidation.too_big.string.inclusive--type:name--maximum:50',
    }),
  description: z
    .string({ required_error: 'formValidation.required' })
    .min(1, {
      message: 'formValidation.too_small.string.inclusive--type:name--minimum:1',
    })
    .max(255, {
      message: 'formValidation.too_big.string.inclusive--type:name--maximum:255',
    }),
});

export function Header({ isComponent = true }: { isComponent?: boolean }) {
  const tDynamicForms = useTranslations('dynamicForms');
  const { id } = useParams<{ id: string }>();
  const { dataForm, mutateForm } = useGetForm({ id });
  const { fields } = useFormEditorStore();
  const router = useRouter();
  const { mutate: globalMutate } = useSWRConfig();

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const questions: IQuestionParam[] = convertFieldsToQuestions(fields);

      if (id) {
        await updateFormService(undefined, {
          id,
          data: {
            title: data.title,
            description: data.description,
            event: dataForm?.event as TFormEvent,
            type: dataForm?.type as TFormType,
            questions,
          },
        });
        await globalMutate((key: string) => !!key?.includes(API_ENDPOINT.FORMS), undefined, { revalidate: false });
        await mutateForm();
      } else {
        const res = await createFormService(undefined, {
          data: {
            title: data.title,
            description: data.description,
            event: 'others',
            type: 'page',
            is_template: true,
            questions,
          },
        });
        await globalMutate((key: string) => !!key?.includes(API_ENDPOINT.FORMS), undefined, { revalidate: false });
        router.replace(
          buildUrl({
            endpoint: CREATOR_ROUTES.formDetail,
            params: { id: res.id },
            queryParams: isComponent ? { type: 'component' } : undefined,
          })
        );
      }
      toast.success(tDynamicForms('toast.saveSuccess'));
    } catch (error) {
      console.error(error);
      toast.error(tDynamicForms('toast.saveError'));
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <FormWrapper
      id="dynamic-form-info"
      schema={formSchema}
      useFormProps={{
        defaultValues: dataForm,
      }}
      onSubmit={handleSubmit}
    >
      {({ form }) => {
        const title = form.watch('title') || tDynamicForms('noName');

        return (
          <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-start">
            {!isComponent && <DashboardHeaderCard.UpdateBreadcrumb index={1} label={title} />}
            {isComponent && (
              <Button variant="outline" onClick={handleBack} className="h-10 w-10 shrink-0 p-0">
                <ChevronLeft className="size-4" />
              </Button>
            )}
            <FormFieldWithLabel name="title">
              <Input placeholder={tDynamicForms('form.name')} className="min-w-60 " autoComplete="off" />
            </FormFieldWithLabel>

            <FormFieldWithLabel name="description" className="w-full">
              <Input placeholder={tDynamicForms('form.description')} className="min-w-80 " autoComplete="off" />
            </FormFieldWithLabel>

            <FormRendererModal
              trigger={
                <Button variant="default" type="button" className="gap-2">
                  <Eye className="size-4" />
                  {tDynamicForms('actions.preview')}
                </Button>
              }
              formData={dataForm}
            />
            <Button variant="default" type="submit" className="gap-2">
              <SaveIcon className="size-4" />
              {tDynamicForms('actions.save')}
            </Button>
          </div>
        );
      }}
    </FormWrapper>
  );
}
