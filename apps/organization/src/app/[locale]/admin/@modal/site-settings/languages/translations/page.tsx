"use client";

import { Translations } from "@oe/dashboard";
import { useRouter } from "@oe/ui";
import { Modal } from "@oe/ui";
import { useSearchParams } from "next/navigation";

export default function TranslationsModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const showModal = searchParams.get("modal") === "true";

  return (
    <Modal
      open={showModal}
      title="Translation"
      className="max-w-[80%]"
      hasCloseIcon={false}
      buttons={[
        {
          type: "button",
          label: "Back",
          variant: "outline",
          onClick: () => {
            router.back();
          },
        },
      ]}
    >
      <div className="relative h-[59vh]">
        <Translations className="!h-[52vh]" />
      </div>
    </Modal>
  );
}
