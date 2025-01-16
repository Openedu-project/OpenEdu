'use client';
import { useGetCourseById } from '@oe/api/hooks/useCourse';
import { z } from '@oe/api/utils/zod';
import Collaborators from '@oe/assets/icons/collaborators';
import MedalStar from '@oe/assets/icons/medal-star';
import Trigger from '@oe/assets/icons/trigger';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { DashboardHeaderCard } from '@oe/ui/common/layout';
import { Link } from '@oe/ui/common/navigation';
import {
  FormNestedProvider,
  FormNestedWrapper,
  type INestedFormsValues,
  useFormContext,
} from '@oe/ui/components/form-wrapper';
import { defineStepper } from '@oe/ui/components/stepper';
import { Badge } from '@oe/ui/shadcn/badge';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { cn } from '@oe/ui/utils/cn';
import { BookOpen, DollarSign, History, Settings, SquareUserRound } from 'lucide-react';
import { useParams } from 'next/navigation';
import type { ReactNode } from 'react';

const courseSteps = defineStepper(
  {
    id: 'information',
    label: 'General Info',
    icon: <Settings width={16} height={16} />,
    href: CREATOR_ROUTES.courseSettingUp,
    required: true,
  },
  {
    id: 'outline',
    label: 'Course Outline',
    icon: <BookOpen width={16} height={16} />,
    href: CREATOR_ROUTES.courseOutline,
    required: true,
  },
  {
    id: 'price',
    label: 'Price Configuration',
    icon: <DollarSign width={16} height={16} />,
    href: CREATOR_ROUTES.coursePrice,
    required: true,
  },
  {
    id: 'certificate',
    label: 'Certificate',
    icon: <MedalStar width={16} height={16} />,
    href: CREATOR_ROUTES.courseCertificate,
    required: false,
  },
  {
    id: 'trigger',
    label: 'Trigger',
    icon: <Trigger width={16} height={16} />,
    href: CREATOR_ROUTES.courseTriggerForm,
    required: false,
  },
  {
    id: 'collaborators',
    label: 'Collaborators',
    icon: <Collaborators width={16} height={16} />,
    href: CREATOR_ROUTES.courseCollaborators,
    required: false,
  },
  {
    id: 'learners',
    label: 'Learners',
    icon: <SquareUserRound width={16} height={16} />,
    href: CREATOR_ROUTES.courseLearners,
    required: false,
  },
  {
    id: 'history',
    label: 'History',
    icon: <History width={16} height={16} />,
    href: CREATOR_ROUTES.courseHistory,
    required: false,
  }
);

export function CourseDetailLayout({ children }: { children: ReactNode }) {
  const params = useParams<{ courseId: string }>();
  const { course } = useGetCourseById(params.courseId);
  // biome-ignore lint/suspicious/useAwait: <explanation>
  const handleSubmit = async (values: INestedFormsValues) => {
    console.log(values);
  };

  console.log(course);

  return (
    <courseSteps.Scoped initialStep="information">
      <FormNestedProvider onSubmit={handleSubmit} className="flex h-full flex-col">
        <StepperHeader />
        <div className="flex-1 overflow-hidden rounded p-2 md:p-4">{children}</div>
      </FormNestedProvider>
    </courseSteps.Scoped>
  );
}

const courseNameSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});

function StepperHeader() {
  const params = useParams<{ courseId: string }>();
  const { course } = useGetCourseById(params.courseId);
  const stepper = courseSteps.useStepper();

  const { validateForm } = useFormContext();

  const handleNext = async () => {
    const isValid = await validateForm();
    console.log('isValid', isValid);
    if (isValid) {
      stepper.next();
    }
  };

  return (
    <DashboardHeaderCard
      breadcrumbs={[{ label: 'Courses', path: CREATOR_ROUTES.courses }, { label: course?.name || 'Course Detail' }]}
      className="mb-0 flex flex-col gap-2 pb-0"
    >
      <div className="flex items-center justify-between gap-4">
        <FormNestedWrapper
          id="course-name"
          schema={courseNameSchema}
          useFormProps={{
            defaultValues: course?.name
              ? {
                  name: course?.name,
                }
              : undefined,
          }}
          className="flex-1"
        >
          {({ loading, form }) => {
            const courseName = form.watch('name') || 'Course Detail';

            return (
              <>
                <DashboardHeaderCard.UpdateBreadcrumb index={1} label={courseName} />

                <FormFieldWithLabel name="name">
                  <Input
                    disabled={loading}
                    autoFocus
                    className="mb-2 h-8 rounded-none border-0 border-b-2 px-0 pt-0 text-2xl focus:border-primary focus:border-b-2 focus-visible:ring-0"
                  />
                </FormFieldWithLabel>
              </>
            );
          }}
        </FormNestedWrapper>
        {/* <h1 className="text-2xl">{course?.name}</h1> */}
        <div className="flex items-center gap-2">
          <Badge variant="outline_primary">v{course?.version}.0</Badge>
          {!stepper.isFirst && (
            <Button variant="outline" size="xs" onClick={stepper.prev}>
              Previous
            </Button>
          )}
          <Button size="xs" onClick={handleNext}>
            {stepper.isLast ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>

      <div className="scrollbar overflow-x-auto">
        <div className="flex min-w-max items-center gap-2 pb-2">
          {stepper.all.map((step, index) => (
            <Link
              key={step.id}
              href={buildUrl({
                endpoint: step.href,
                params: { courseId: params.courseId },
              })}
              variant="ghost"
              size="xs"
              className={cn(
                'relative gap-2',
                stepper.current.index === index &&
                  "after:-bottom-2 border border-primary text-primary after:absolute after:h-0.5 after:w-full after:bg-primary/80 after:content-[''] hover:bg-primary/20 hover:text-primary",
                stepper.current.index > index && 'bg-primary/20'
              )}
              // disabled={mode === "create"}
              // onClick={() => stepper.goTo(step.id)}
            >
              {step.icon}
              {step.label}
              {step.required && <span className="text-red-500">*</span>}
            </Link>
          ))}
        </div>
      </div>
    </DashboardHeaderCard>
  );
}
