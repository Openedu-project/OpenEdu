interface ITextProps {
  uid: string;
  content?: string;
  onCompleteContent?: () => void;
}

export default function ContentText({ content, uid }: ITextProps) {
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
