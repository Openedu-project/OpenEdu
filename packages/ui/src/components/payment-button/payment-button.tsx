import Cart from '@oe/assets/icons/cart';
import { Button } from '#shadcn/button';
import { TRIGGER_CLICKED_ON_ID } from '../course-form-trigger/_utils';
import { usePaymentButton } from './_hooks';
import type { IPaymentButton } from './types';

export default function PaymentButton({
  rightSection,
  courseData,
  isCourseDetail = false,
  onClick,
  ...props
}: IPaymentButton) {
  const { buttonText, showCart, handleClick, currentAction, isLoading } = usePaymentButton({
    courseData,
    isCourseDetail,
    onClick,
  });

  return (
    <Button
      id={TRIGGER_CLICKED_ON_ID.enroll_course}
      leftSection={showCart ? <Cart /> : undefined}
      rightSection={rightSection}
      onClick={handleClick}
      data-action={currentAction}
      loading={isLoading}
      {...props}
    >
      {buttonText}
    </Button>
  );
}
