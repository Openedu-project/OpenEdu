'use client';
import { Zalo } from '@oe/assets';
import { Link } from 'lucide-react';
import { type ChangeEvent, type FC, useState } from 'react';
import { SocialIcon } from 'react-social-icons';
import { Input, type InputProps } from '#shadcn/input';

interface SocialInputProps extends Omit<InputProps, 'onChange'> {
  placeholder?: string;
  onChange?: (url: string) => void;
  readOnly?: boolean;
  onClick?: () => void;
  value?: string;
}

export const SocialInput: FC<SocialInputProps> = ({
  placeholder = 'Enter social media URL',
  onChange,
  onClick,
  readOnly = false,
  value,
  ...rest
}) => {
  const [url, setUrl] = useState(value);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.currentTarget.value;

    setUrl(newUrl);
    if (onChange) {
      onChange(newUrl);
    }
  };

  const renderIcon = () => {
    if (url) {
      return url.includes('zalo') ? (
        <Zalo width={24} height={24} />
      ) : (
        <SocialIcon url={url} style={{ height: 24, width: 24 }} />
      );
    }
    return <Link className="h-4 w-4" />;
  };

  return (
    <div className="grid grid-cols-[32px_1fr] items-center gap-4 ">
      {renderIcon()}
      <Input
        type="text"
        placeholder={placeholder}
        value={url}
        onChange={handleInputChange}
        readOnly={readOnly}
        onClick={onClick}
        {...rest}
      />
    </div>
  );
};
