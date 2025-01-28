import { useCourseRequestStore } from "@/store/admin-course-management";
import { useAdminFeedback } from "@oe/api/hooks/useApprovals";
import { useGetMe } from "@oe/api/hooks/useMe";
import type { IListApproval } from "@oe/api/types/approvals";
import type { ICourse } from "@oe/api/types/course/course";
import type { IDiscussion } from "@oe/api/types/course/discuss";
import type { ICourseOrganizationRequestProps } from "@oe/api/types/course/org-request";
import type { HTTPErrorMetadata } from "@oe/api/utils/http-error";
import CheckFilledCircle from "@oe/assets/icons/check-filled-circle";
import CloseCircle from "@oe/assets/icons/close-circle";
import { formatTimeHourMinute } from "@oe/core/utils/datetime";
import { Modal } from "@oe/ui/components/modal";
import { Label } from "@oe/ui/shadcn/label";
import { toast } from "@oe/ui/shadcn/sonner";
import { Textarea } from "@oe/ui/shadcn/textarea";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyedMutator } from "swr";

interface IProps {
  open: boolean;
  onClose: () => void;
  mutate?: KeyedMutator<
    IListApproval<ICourse, ICourseOrganizationRequestProps>
  >;
  readOnly?: boolean;
}

const AdminFeedbackCourseModal = ({
  open,
  onClose,
  mutate,
  readOnly = false,
}: IProps) => {
  const t = useTranslations("coursesManagement");
  const tError = useTranslations("errors");

  const { selectedCourseRequest, setSelectedCourseRequest } =
    useCourseRequestStore.getState();
  const { triggerAdminFeedback } = useAdminFeedback(selectedCourseRequest?.id);

  const [val, setVal] = useState("");
  const { dataMe: me } = useGetMe();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.scrollIntoView();
      }
    }, 0);
  }, []);

  const handleSendFeedback = useCallback(async () => {
    try {
      const res = await triggerAdminFeedback({ content: val });

      if (!res) {
        throw new Error("Fail");
      }

      setVal("");
      setSelectedCourseRequest(res);
      scrollToBottom();
      await mutate?.();
    } catch (error) {
      console.error("Error", error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  }, [
    mutate,
    scrollToBottom,
    setSelectedCourseRequest,
    toast,
    triggerAdminFeedback,
    val,
  ]);

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [scrollToBottom, open]);

  const FeedbackConversationItem = useMemo(() => {
    return ({
      discuss,
      username,
    }: {
      discuss: IDiscussion;
      username?: string;
    }) => (
      <div className="flex flex-col gap-spacing-m">
        <div className="flex justify-between items-start">
          <div className="mcaption-semibold16 flex gap-spacing-s">
            <p> {discuss.username}</p>
            <p>{username === discuss.username ? " (You)" : ""}</p>
            {discuss.action === "feedback" ? (
              ""
            ) : (
              <div className="flex gap-spacing-m items-center">
                {discuss.action === "approved" ? (
                  <CheckFilledCircle
                    height={16}
                    width={16}
                    className="text-content-primary-color-content-primary-strong"
                  />
                ) : (
                  <CloseCircle height={16} width={16} />
                )}
                <p className="giant-iheading-regular16">{`${discuss.action} your request`}</p>
              </div>
            )}
          </div>
          <p className="mcaption-regular14 text-content-neutral-color-content-neutral-light600">
            {formatTimeHourMinute(discuss.send_date)}
          </p>
        </div>

        <p className="p-spacing-m bg-bg-base-surface rounded-sm">
          {discuss.content}
        </p>
      </div>
    );
  }, []);

  return (
    <Modal
      open={true}
      title={t("approveTitle")}
      onClose={onClose}
      buttons={[
        {
          type: "button",
          label: t("cancel"),
          variant: "outline",
          onClick: () => onClose(),
        },
      ]}
    >
      <>
        <div className="py-spacing-ml min-h-[calc(100%-136px)] gap-spacing-ml flex flex-col">
          {selectedCourseRequest?.props?.discussion?.map((discuss, index) => (
            <FeedbackConversationItem
              key={index}
              discuss={discuss}
              username={me?.username}
            />
          ))}
        </div>
        {!readOnly && (
          <div className="flex flex-col gap-spacing-ml border-t-[1px] border-border-neutral-50 pt-spacing-ml">
            <Label>{t("yourFeedback")}</Label>

            {selectedCourseRequest?.props?.is_include_change && (
              <p>{t("updatedCourseVersion")}</p>
            )}

            <Textarea
              value={val}
              onChange={(e) => {
                if (e) {
                  setVal(e.currentTarget.value);
                }
              }}
              placeholder={t("writeResponse")}
              ref={textareaRef}
            />
          </div>
        )}
      </>
    </Modal>
    // <Modal
    //   id={MODAL_ID.adminFeedback}
    //   open={open}
    //   onClose={handleClose}
    //   title={t("sendFeedback")}
    //   content={
    //     open ? (
    //       <>
    //         <div className="py-spacing-ml min-h-[calc(100%-136px)] gap-spacing-ml flex flex-col">
    //           {selectedCourseRequest?.props?.discussion?.map(
    //             (discuss, index) => (
    //               <FeedbackConversationItem
    //                 key={index}
    //                 discuss={discuss}
    //                 username={me?.username}
    //               />
    //             )
    //           )}
    //         </div>
    //         {!readOnly && (
    //           <div className="flex flex-col gap-spacing-ml border-t-[1px] border-border-neutral-50 pt-spacing-ml">
    //             <Label>{t("yourFeedback")}</Label>

    //             {selectedCourseRequest?.props?.is_include_change && (
    //               <p>{t("updatedCourseVersion")}</p>
    //             )}

    //             <Textarea
    //               value={val}
    //               onChange={(e) => {
    //                 if (e) {
    //                   setVal(e.currentTarget.value);
    //                 }
    //               }}
    //               placeholder={t("writeResponse")}
    //               ref={textareaRef}
    //             />
    //           </div>
    //         )}
    //       </>
    //     ) : null
    //   }
    //   keepOpen
    //   actions={
    //     readOnly
    //       ? []
    //       : [
    //           {
    //             text: "Send",
    //             variant: "outlinePrimary",
    //             onClick: handleSendFeedback,
    //           },
    //         ]
    //   }
    //   contentClassName="h-[90%] w-[80%] max-h-[90%] max-w-[80%]"
    // />
  );
};

export { AdminFeedbackCourseModal };
