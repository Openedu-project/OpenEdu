import { z } from '@oe/api';
import { InputCurrency } from '@oe/ui';
import { Modal } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';

interface ISponsorGasProps {
  open: boolean;
  onClose: () => void;
  currency: string;
  handleSubmitTransaction: (value: IAmountSponsor) => void;
}

const amountSponsorSchema = z.object({
  amount: z.string().default('0'),
});

export type IAmountSponsor = z.infer<typeof amountSponsorSchema>;

export function SponsorGasCourseModal({ open, currency, onClose, handleSubmitTransaction }: ISponsorGasProps) {
  const handleSubmitSponsor = (value: IAmountSponsor) => {
    handleSubmitTransaction(value);
  };

  return (
    <Modal
      title="Deposit"
      open={open}
      onClose={onClose}
      validationSchema={amountSponsorSchema}
      onSubmit={value => handleSubmitSponsor(value)}
      showSubmit
      contentClassName="space-y-6 mb-2"
    >
      <div className="space-y-2">
        <span className="font-medium text-sm">Currency</span>
        <div className="h-10 rounded-sm border px-3 py-2">{currency}</div>
      </div>

      <FormFieldWithLabel
        name="amount"
        label="Amount"
        render={({ field }) => <InputCurrency {...field} defaultValue="0" hasCurrency={false} />}
      />
    </Modal>
  );
}
