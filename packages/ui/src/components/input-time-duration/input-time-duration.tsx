import {
  type ChangeEvent,
  type FocusEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type RefObject,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Input } from '#shadcn/input';

interface InputTimeDurationProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  value?: string;
  defaultValue?: string;
}

const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
const numberRegex = /^[0-9]+$/;
const InputTimeDuration = forwardRef<HTMLInputElement, InputTimeDurationProps>(
  ({ onChange, onValueChange, value, defaultValue = '00:00:00', className = '', ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selection, setSelection] = useState({ start: 0, end: 2 });
    const [inputBuffer, setInputBuffer] = useState('');
    const [internalValue, setInternalValue] = useState(value ?? defaultValue);

    // Sync with external value
    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    const validateTimeFormat = (value: string): boolean => {
      return timeRegex.test(value);
    };

    const updateTimeSection = (newValue: string | number, currentSection: number): string => {
      const timeParts = internalValue.split(':');
      const maxValue = currentSection === 0 ? 23 : 59;
      let validValue: number | string = Math.min(Math.max(Number.parseInt(newValue.toString()) || 0, 0), maxValue);
      validValue = validValue.toString().padStart(2, '0');
      timeParts[currentSection] = validValue;
      return timeParts.join(':');
    };

    const moveToNextSection = (): boolean => {
      if (selection.start < 6) {
        const newStart = selection.start + 3;
        setSelection({ start: newStart, end: newStart + 2 });
        setInputBuffer('');
        return true;
      }
      return false;
    };

    const moveToPreviousSection = (): boolean => {
      if (selection.start > 0) {
        const newStart = selection.start - 3;
        setSelection({ start: newStart, end: newStart + 2 });
        setInputBuffer('');
        return true;
      }
      return false;
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      const currentSection = Math.floor(selection.start / 3);
      const timeParts = internalValue.split(':');
      let currentValue = Number.parseInt(timeParts[currentSection] || '0');
      let newTime = internalValue;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          currentValue += 1;
          if (currentSection === 0 && currentValue > 23) {
            currentValue = 0;
          }
          if (currentSection !== 0 && currentValue > 59) {
            currentValue = 0;
          }
          newTime = updateTimeSection(currentValue, currentSection);
          setInputBuffer('');
          break;

        case 'ArrowDown':
          e.preventDefault();
          currentValue -= 1;
          if (currentSection === 0 && currentValue < 0) {
            currentValue = 23;
          }
          if (currentSection !== 0 && currentValue < 0) {
            currentValue = 59;
          }
          newTime = updateTimeSection(currentValue, currentSection);
          setInputBuffer('');
          break;

        case 'ArrowLeft':
          e.preventDefault();
          moveToPreviousSection();
          return;

        case 'ArrowRight':
        case ':':
          e.preventDefault();
          moveToNextSection();
          return;

        case 'Tab':
          if (e.shiftKey) {
            e.preventDefault();
            moveToPreviousSection();
          } else {
            e.preventDefault();
            if (!moveToNextSection()) {
              return;
            }
          }
          return;

        case 'Backspace':
        case 'Delete':
          e.preventDefault();
          if (
            (currentSection === 2 && internalValue.slice(6) === '00') ||
            (currentSection === 1 && internalValue.slice(3, 5) === '00') ||
            (currentSection === 0 && internalValue.slice(0, 2) === '00')
          ) {
            if (moveToPreviousSection()) {
              return;
            }
          }
          newTime = updateTimeSection('00', currentSection);
          setInputBuffer('');
          break;

        default:
          if (numberRegex.test(e.key)) {
            e.preventDefault();
            const newDigit = e.key;

            if (inputBuffer === '') {
              const validValue = newDigit.padStart(2, '0');
              newTime = updateTimeSection(validValue, currentSection);
              setInputBuffer(newDigit);
            } else {
              const twoDigitValue = inputBuffer + newDigit;
              const numValue = Number.parseInt(twoDigitValue);
              const maxValue = currentSection === 0 ? 23 : 59;

              if (numValue <= maxValue) {
                newTime = updateTimeSection(twoDigitValue, currentSection);
                moveToNextSection();
              } else {
                newTime = updateTimeSection(inputBuffer.padStart(2, '0'), currentSection);
              }
              setInputBuffer('');
            }
          }
          break;
      }

      setInternalValue(newTime);
      onChange?.(newTime);
      onValueChange?.(newTime);

      // Trigger a fake input event for form validation
      const event = new Event('input', { bubbles: true });
      inputRef.current?.dispatchEvent(event);
    };

    const handleClick = () => {
      const cursorPosition = inputRef.current?.selectionStart ?? 0;
      const sectionStart = Math.floor(cursorPosition / 3) * 3;
      setSelection({ start: sectionStart, end: sectionStart + 2 });
      setInputBuffer('');
    };

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      if (!(selection.start || selection.end)) {
        setSelection({ start: 0, end: 2 });
      }
      setInputBuffer('');
      props.onFocus?.(e);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      if (!validateTimeFormat(internalValue)) {
        const defaultTime = '00:00:00';
        setInternalValue(defaultTime);
        onChange?.(defaultTime);
        onValueChange?.(defaultTime);
      }
      setInputBuffer('');
      props.onBlur?.(e);
    };

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(selection.start, selection.end);
      }
    }, [selection, internalValue]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      // Handle manual input changes here if needed
      // For now, we'll just prevent direct text input
      e.preventDefault();
    };

    return (
      <Input
        {...props}
        ref={node => {
          // Forward the ref to both our internal ref and the passed ref
          inputRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as RefObject<HTMLInputElement | null>).current = node;
          }
        }}
        onChange={handleInputChange}
        value={internalValue}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`font-mono ${className}`}
      />
    );
  }
);

InputTimeDuration.displayName = 'InputTimeDuration';

export { InputTimeDuration };
