import type { ReactNode } from "react";

type Props = {
  title?: string;
  content: string | ReactNode;
};

const NoticeBlock = ({ title = "", content }: Props) => {
  return (
    <div>
      <h1 className="font-semibold text-base">{title}</h1>
      <div className="w-full rounded-xl border border-warning-500 bg-warning-50 p-4">
        <div className="text-base">{content}</div>
      </div>
    </div>
  );
};

export default NoticeBlock;
