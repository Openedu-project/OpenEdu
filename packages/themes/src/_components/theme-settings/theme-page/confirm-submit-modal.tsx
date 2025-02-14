import { Modal } from "@oe/ui/components/modal";
import { useTranslations } from "next-intl";

interface IConfirmSubmitModal {
  onClose: () => void;
  onSubmit: () => void;
}

const ConfirmSubmitModal = ({ onClose, onSubmit }: IConfirmSubmitModal) => {
  const t = useTranslations("themePage.themePageSettings");

  return (
    <Modal
      open={true}
      title="Confirm modal"
      onClose={onClose}
      hasCancelButton={false}
      buttons={[
        {
          type: "button",
          label: t("close"),
          variant: "outline",
          onClick: () => onClose(),
        },
        {
          type: "button",
          label: t("save"),
          variant: "default",
          onClick: () => onSubmit(),
        },
      ]}
    >
      <p>{t("confirmContent")}</p>
    </Modal>
  );
};

export default ConfirmSubmitModal;
