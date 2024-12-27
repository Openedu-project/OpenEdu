import type { ILessonContent } from '@oe/api/types/course/segment';

interface ITextProps {
  data?: ILessonContent;
  onCompleteContent?: () => void;
}

export default function ContentText({ data }: ITextProps) {
  const content = data?.content;
  const uid = data?.uid;

  return (
    <>
      {content && content?.length > 0 && (
        <div key={uid} className="flex w-full flex-1 flex-col">
          <div
            className="tiptap"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{
              __html: content as string | TrustedHTML,
            }}
          />
        </div>
      )}
    </>
  );
}
