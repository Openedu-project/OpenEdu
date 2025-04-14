import { X } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import { Badge } from '#shadcn/badge';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';

interface InputTagsProps {
  value: string[];
  onChange: (newValue: string[]) => void;
  onInputChange: (value: string) => void;
  inputValue: string;
  error?: boolean | string;
  placeholder?: string;
  className?: string;
  onBlur?: () => void; // Add onBlur prop
}

export function InputTags({
  value,
  onChange,
  onInputChange,
  inputValue,
  error,
  placeholder,
  className,
  onBlur, // Destructure onBlur
}: InputTagsProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',' || e.code === 'Space') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      e.preventDefault();
      removeTag(value.length - 1);
    }
  };

  const addTag = () => {
    if (inputValue.trim() !== '') {
      const newTags = new Set([...value, inputValue.trim()]);
      onChange([...newTags]);
      onInputChange('');
    }
  };

  const removeTag = (index: number) => {
    const newTags = value.filter((_, i) => i !== index);
    onChange(newTags);
  };

  const handleBlur = () => {
    addTag();
    onBlur?.();
  };

  return (
    <div
      className={cn(
        'flex w-full flex-wrap gap-2 rounded-md border border-input bg-background p-3',
        'ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
        error && 'border-destructive focus-within:ring-destructive',
        className
      )}
    >
      {value.map((tag, index) => (
        <Badge key={`tag-${index}-${tag}`} variant="secondary">
          {tag}
          <Button
            variant="ghost"
            size="sm"
            className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => removeTag(index)}
            type="button"
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      <input
        className="min-w-[120px] flex-1 bg-transparent outline-hidden placeholder:text-muted-foreground"
        value={inputValue}
        onChange={e => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
    </div>
  );
}
