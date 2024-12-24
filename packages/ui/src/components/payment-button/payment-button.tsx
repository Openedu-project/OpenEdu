import Cart from '@oe/assets/icons/cart';
import { Button } from '#shadcn/button';
import { usePaymentButton } from './_hooks';
import type { IPaymentButton } from './types';

export default function PaymentButton({ rightSection, courseData, isCourseDetail = false, ...props }: IPaymentButton) {
  const { buttonText, showCart, handleClick, currentAction } = usePaymentButton({ courseData, isCourseDetail });

  return (
    <Button
      leftSection={showCart ? <Cart /> : undefined}
      rightSection={rightSection}
      onClick={handleClick}
      data-action={currentAction}
      {...props}
    >
      {buttonText}
    </Button>
  );
}
