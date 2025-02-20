import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '#shadcn/alert-dialog';

interface NextLessonAlertProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
  countdownSeconds?: number;
  title: string;
  description: string;
  continueText: string;
  cancelText: string;
}

const NextLessonAlert = ({
  isOpen,
  onOpenChange,
  onContinue,
  countdownSeconds = 5,
  title,
  description,
  continueText,
  cancelText,
}: NextLessonAlertProps) => {
  const [count, setCount] = useState(countdownSeconds);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  // Handle navigation effect
  useEffect(() => {
    if (shouldNavigate) {
      onContinue();
      setShouldNavigate(false);
    }
  }, [shouldNavigate, onContinue]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen && !isCountingDown) {
      setIsCountingDown(true);
      setCount(countdownSeconds);
    }

    if (isCountingDown && count > 0) {
      timer = setInterval(() => {
        setCount(prev => {
          if (prev <= 1) {
            setShouldNavigate(true); // Set flag instead of calling onContinue directly
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isOpen, count, countdownSeconds, isCountingDown]);

  // Reset states when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setIsCountingDown(false);
      setCount(countdownSeconds);
      setShouldNavigate(false);
    }
  }, [isOpen, countdownSeconds]);

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="mcaption-regular14 space-y-2">
            {description}
            <span className="block">{count > 0 && `Continuing in ${count} seconds...`}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setIsCountingDown(false);
              setCount(countdownSeconds);
            }}
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => setShouldNavigate(true)}>{continueText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NextLessonAlert;
