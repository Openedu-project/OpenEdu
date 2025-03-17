'use client';

import { useGetCourseById, usePutRelyFeedback } from '@oe/api/hooks/useCourse';
import { useGetMe } from '@oe/api/hooks/useMe';
import { usePathname, useRouter } from '@oe/ui/common/navigation';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCallback, useMemo, useRef } from 'react';
import { DiscussItem } from './discuss-item';
import { SendReply } from './send-reply';

const FeedbackSection = () => {
  // const t = useTranslations("course.history.feedback");
  const tToast = useTranslations('course.history.toast');
  const params = useParams<{ courseId: string }>();
  const pathName = usePathname();
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const courseId = params.courseId;
  const { course, mutateCourse } = useGetCourseById(courseId);
  const { dataMe: me } = useGetMe();
  const { triggerReplyFeedback } = usePutRelyFeedback(courseId as string);

  const isOrgFeedback = true;

  const renderedConversation = useMemo(() => {
    const orgDiscussion = course?.org_request?.props?.discussion || [];

    // const rootDiscussion = course?.root_request?.props?.discussion || [];
    const rootDiscussion: never[] = [];

    return [...orgDiscussion, ...rootDiscussion]?.sort((a, b) => {
      const dateA = new Date(a.send_date).getTime();
      const dateB = new Date(b.send_date).getTime();

      return dateA - dateB; // For ascending order. Use dateB - dateA for descending
    });
  }, [course]);

  const changeCurrentId = useCallback(
    (newId: string) => {
      const pathParts = pathName.split('/');
      const currentIdIndex = pathParts.indexOf(course?.id ?? '');

      if (currentIdIndex !== -1) {
        pathParts[currentIdIndex] = newId;
        const newPath = pathParts.join('/');
        router.push(newPath);
      }
    },
    [pathName, course?.id, router]
  );

  const scrollToBottom = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollIntoView();
    }
  }, []);

  const handleSubmit = useCallback(
    async (content: string, isIncludedCourse: boolean) => {
      // const requestId = isOrgFeedback ? course?.org_request?.id : course?.root_request?.id;
      const requestId = course?.org_request?.id;

      if (!requestId) {
        toast.error(tToast('missId'));
        return;
      }

      try {
        const res = await triggerReplyFeedback({
          id: requestId,
          content: content,
          entity_id: isIncludedCourse ? (courseId as string) : undefined,
        });

        if (!res) {
          throw new Error(tToast('replyFail'));
        }

        if (isIncludedCourse) {
          changeCurrentId(res.id);
        } else {
          await mutateCourse();
          scrollToBottom();
        }
      } catch {
        toast.error(tToast('replyFail'));
      }
    },
    [changeCurrentId, course?.org_request?.id, courseId, mutateCourse, scrollToBottom, toast, triggerReplyFeedback]
  );

  return (
    <div className="flex min-h-[150px] flex-col gap-4">
      <div className="flex flex-col gap-spacing-ml">
        {renderedConversation?.map((discuss, index) => (
          <DiscussItem username={me?.username} discuss={discuss} key={`${discuss.id}${index}`} />
        ))}
        <SendReply onSubmit={handleSubmit} isOrgFeedback={isOrgFeedback} textareaRef={textareaRef} />
      </div>
    </div>
  );
};

export { FeedbackSection };
