import type { TLessonContent } from '@oe/api';
import { InputNumber } from '@oe/ui';
import { InputTimeDuration } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useWatch } from 'react-hook-form';
import type { IQuizProps } from './types';

// interface QuizTriggerSettingsProps {
//   onChange: (settings: Partial<IQuizPayload>) => void;
//   triggerConditions?: ITriggerConditions;
// }

export function QuizTriggerSettings({ contentIndex, quizIndex }: IQuizProps) {
  const tCourseQuiz = useTranslations('course.outline.lesson.content.quiz.settings');
  const type: TLessonContent = useWatch({
    name: `contents[${contentIndex}].type`,
  });

  if (type === 'video' || type === 'embedded') {
    return (
      <>
        <FormFieldWithLabel
          name={`contents.${contentIndex}.quizzes.${quizIndex}.trigger_conditions.timestamp`}
          label={tCourseQuiz('showAtTimestamp')}
          infoText={tCourseQuiz('showAtTimestampInfo')}
          render={({ field }) => <InputTimeDuration {...field} placeholder={tCourseQuiz('timeDuration')} />}
        />
        {/* <FormFieldWithLabel
          name={`contents.${contentIndex}.quizzes.${quizIndex}.trigger_conditions.is_triggered_by_timestamp`}
          render={({ field }) => (
            <input type="hidden" {...field} value="true" />
          )}
        /> */}
      </>
    );
  }

  if (type === 'pdf') {
    return (
      <>
        <FormFieldWithLabel
          name={`contents.${contentIndex}.quizzes.${quizIndex}.trigger_conditions.page_number`}
          label={tCourseQuiz('showAtPageNumber')}
          infoText={tCourseQuiz('showAtPageNumberInfo')}
          render={({ field }) => <InputNumber {...field} placeholder={tCourseQuiz('pageNumber')} />}
        />
        {/* <FormFieldWithLabel
          name={`contents.${contentIndex}.quizzes.${quizIndex}.trigger_conditions.is_trigger_by_reach_page_number`}
          render={({ field }) => (
            <input type="hidden" {...field} value="true" />
          )}
        /> */}
      </>
    );
  }

  if (type === 'text') {
    return (
      <FormFieldWithLabel
        name={`contents.${contentIndex}.quizzes.${quizIndex}.trigger_conditions.show_at_percentage`}
        label={tCourseQuiz('showAtPercentage')}
        infoText={tCourseQuiz('showAtPercentageInfo')}
        render={({ field }) => <InputNumber {...field} placeholder={tCourseQuiz('percentage')} />}
      />
    );
  }

  return null;

  // const {
  //   videoContents,
  //   pdfContents,
  //   handleVideoTrigger,
  //   handlePdfTrigger,
  //   resetTriggerSettings,
  // } = useQuizTriggerSettings(triggerConditions);

  // const [selectedTrigger, setSelectedTrigger] = useState<
  //   "end" | "video" | "pdf"
  // >(
  //   triggerConditions?.show_at_end
  //     ? "end"
  //     : triggerConditions?.is_triggered_by_timestamp
  //     ? "video"
  //     : triggerConditions?.is_trigger_by_reach_page_number
  //     ? "pdf"
  //     : "end"
  // );

  // return (
  //   <div className="space-y-4">
  //     <Label className="font-medium">Điều kiện hiển thị Quiz</Label>

  //     <RadioGroup
  //       value={selectedTrigger}
  //       onValueChange={(value: "end" | "video" | "pdf") => {
  //         setSelectedTrigger(value);
  //         if (value === "end") {
  //           resetTriggerSettings();
  //           onChange({
  //             trigger_conditions: {
  //               is_triggered_by_timestamp: false,
  //               is_trigger_by_reach_page_number: false,
  //               is_triggered_by_content_type: false,
  //               show_at_end: true,
  //             },
  //           });
  //         }
  //       }}
  //     >
  //       <div className="flex items-center space-x-2">
  //         <RadioGroupItem value="end" id="end" />
  //         <Label htmlFor="end">Hiển thị ở cuối bài học</Label>
  //       </div>

  //       <div className="flex items-center space-x-2">
  //         <RadioGroupItem
  //           value="video"
  //           id="video"
  //           disabled={
  //             !videoContents?.some((content) =>
  //               content.files?.some((file) => file.id)
  //             )
  //           }
  //         />
  //         <Label
  //           htmlFor="video"
  //           className={
  //             videoContents?.some((content) =>
  //               content.files?.some((file) => file.id)
  //             )
  //               ? ""
  //               : "text-muted-foreground"
  //           }
  //         >
  //           Hiển thị sau khi xem video
  //         </Label>
  //       </div>

  //       <div className="flex items-center space-x-2">
  //         <RadioGroupItem
  //           value="pdf"
  //           id="pdf"
  //           disabled={
  //             !pdfContents?.some((content) =>
  //               content.files?.some((file) => file.id)
  //             )
  //           }
  //         />
  //         <Label
  //           htmlFor="pdf"
  //           className={
  //             pdfContents?.some((content) =>
  //               content.files?.some((file) => file.id)
  //             )
  //               ? ""
  //               : "text-muted-foreground"
  //           }
  //         >
  //           Hiển thị khi đọc đến trang PDF
  //         </Label>
  //       </div>
  //     </RadioGroup>

  //     {selectedTrigger === "video" &&
  //       videoContents &&
  //       videoContents.length > 0 &&
  //       videoContents.some((content) =>
  //         content.files?.some((file) => file.id)
  //       ) && (
  //         <div className="space-y-2">
  //           <InputSelect
  //             id="video_trigger"
  //             selectPosition="start"
  //             value={{
  //               input: triggerConditions?.timestamp || "",
  //               select: triggerConditions?.content_id || "",
  //             }}
  //             onChange={(value) => {
  //               const newTriggerSettings = handleVideoTrigger(
  //                 value.select,
  //                 value.input
  //               );
  //               onChange({ trigger_conditions: newTriggerSettings });
  //             }}
  //             inputProps={{
  //               type: "text",
  //               placeholder: "Thời gian (HH:mm:ss)",
  //             }}
  //             selectProps={{
  //               items: videoContents.flatMap(
  //                 (content) =>
  //                   content.files
  //                     ?.filter((file) => file.id)
  //                     .map((file) => ({
  //                       value: file.id,
  //                       label: file.name || "Unnamed video",
  //                     })) || []
  //               ),
  //               placeholder: "Chọn video",
  //             }}
  //           />
  //         </div>
  //       )}

  //     {selectedTrigger === "pdf" &&
  //       pdfContents &&
  //       pdfContents.length > 0 &&
  //       pdfContents.some((content) =>
  //         content.files?.some((file) => file.id)
  //       ) && (
  //         <div className="space-y-2">
  //           <InputSelect
  //             id="pdf_trigger"
  //             selectPosition="start"
  //             value={{
  //               input: triggerConditions?.page_number?.toString() || "",
  //               select: triggerConditions?.content_id || "",
  //             }}
  //             onChange={(value) => {
  //               const newTriggerSettings = handlePdfTrigger(
  //                 value.select,
  //                 Number(value.input)
  //               );
  //               onChange({ trigger_conditions: newTriggerSettings });
  //             }}
  //             inputProps={{
  //               type: "number",
  //               placeholder: "Số trang",
  //             }}
  //             selectProps={{
  //               items: pdfContents.flatMap(
  //                 (content) =>
  //                   content.files
  //                     ?.filter((file) => file.id)
  //                     .map((file) => ({
  //                       value: file.id,
  //                       label: file.name || "Unnamed PDF",
  //                     })) || []
  //               ),
  //               placeholder: "Chọn PDF",
  //             }}
  //           />
  //         </div>
  //       )}
  //   </div>
  // );
}
