'use client';
import { useGetCourseById } from '@oe/api/hooks/useCourse';
import { z } from '@oe/api/utils/zod';
import Collaborators from '@oe/assets/icons/collaborators';
import MedalStar from '@oe/assets/icons/medal-star';
import Trigger from '@oe/assets/icons/trigger';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { DashboardHeaderCard } from '@oe/ui/common/layout';
import { Link, useRouter } from '@oe/ui/common/navigation';
import {
  FormNestedProvider,
  FormNestedWrapper,
  type INestedFormsValues,
  useFormContext,
} from '@oe/ui/components/form-wrapper';
import { Badge } from '@oe/ui/shadcn/badge';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { cn } from '@oe/ui/utils/cn';
import { BookOpen, DollarSign, History, Settings, SquareUserRound } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';
import { type ReactNode, useMemo, useState } from 'react';

type CourseTab = {
  id: string;
  label: string;
  icon: ReactNode;
  href: string;
  required: boolean;
  disabled?: boolean;
};

export function CourseDetailLayout({ children }: { children: ReactNode }) {
  const [validSteps, setValidSteps] = useState<string[]>([]);
  const pathname = usePathname();

  // biome-ignore lint/suspicious/useAwait: <explanation>
  const handleSubmit = async (values: INestedFormsValues) => {
    console.log(values);
  };

  const courseTabs = useMemo(() => {
    return [
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
        disabled: !validSteps.includes('information'),
      },
      {
        id: 'price',
        label: 'Price Configuration',
        icon: <DollarSign width={16} height={16} />,
        href: CREATOR_ROUTES.coursePrice,
        required: true,
        disabled: !validSteps.includes('outline'),
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
      },
    ];
  }, [validSteps]);

  return (
    <FormNestedProvider
      onSubmit={handleSubmit}
      // onChange={handleChange}
      className="flex h-full flex-col"
    >
      <CourseDetailHeader
        courseTabs={courseTabs}
        currentPath={pathname}
        onValidStep={stepId => {
          setValidSteps(prev => [...new Set([...prev, stepId])]);
        }}
      />
      <div className="flex-1 overflow-hidden rounded p-2 md:p-4">{children}</div>
    </FormNestedProvider>
  );
}

const courseNameSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});

function CourseDetailHeader({
  courseTabs,
  currentPath,
  onValidStep,
}: {
  courseTabs: CourseTab[];
  currentPath: string;
  onValidStep: (stepId: string) => void;
}) {
  const params = useParams<{ courseId: string }>();
  const { course } = useGetCourseById(params.courseId);
  const { validateForms, activeFormId } = useFormContext();
  const router = useRouter();

  // Tìm current tab và next tab
  const currentTab = courseTabs.find(tab => currentPath.includes(tab.href.replace(':courseId', params.courseId)));
  const currentTabIndex = currentTab ? courseTabs.indexOf(currentTab) : -1;
  const nextTab = courseTabs[currentTabIndex + 1];

  // Kiểm tra xem có phải là tab required cuối cùng không
  const isLastRequiredTab = currentTab?.required && !courseTabs.slice(currentTabIndex + 1).some(tab => tab.required);

  const handleNext = async () => {
    const isValid = await validateForms(['course-name', activeFormId].filter(Boolean) as string[]);

    if (isValid) {
      if (currentTab) {
        onValidStep(currentTab.id);
      }

      if (isLastRequiredTab) {
        // TODO: Thêm logic publish course
        console.log('Publish course');
      } else if (nextTab) {
        const nextUrl = buildUrl({
          endpoint: nextTab.href,
          params: { courseId: params.courseId },
        });
        router.push(nextUrl);
      }
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
          <Button size="xs" onClick={handleNext}>
            {isLastRequiredTab ? 'Publish' : 'Next'}
          </Button>
        </div>
      </div>

      <div className="scrollbar overflow-x-auto">
        <div className="flex min-w-max items-center gap-2 pb-2">
          {courseTabs.map(tab => {
            const tabUrl = buildUrl({
              endpoint: tab.href,
              params: { courseId: params.courseId },
            });
            const isActive = currentPath === tabUrl;

            return (
              <Link
                key={tab.id}
                href={tabUrl}
                variant="ghost"
                size="xs"
                className={cn(
                  'relative gap-2',
                  isActive &&
                    "after:-bottom-2 border border-primary text-primary after:absolute after:h-0.5 after:w-full after:bg-primary/80 after:content-[''] hover:bg-primary/20 hover:text-primary",
                  tab.disabled && 'pointer-events-none opacity-50'
                )}
                disabled={tab.disabled}
              >
                {tab.icon}
                {tab.label}
                {tab.required && <span className="text-red-500">*</span>}
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardHeaderCard>
  );
}
