import { Button } from '@oe/ui/shadcn/button';
import { Checkbox } from '@oe/ui/shadcn/checkbox';
import { Input } from '@oe/ui/shadcn/input';
import { Label } from '@oe/ui/shadcn/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@oe/ui/shadcn/select';
import { cn } from '@oe/ui/utils/cn';
import type React from 'react';
import { useEditor } from '../grapesjs';

import type { Trait } from 'grapesjs';

interface TraitPropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  trait: Trait;
}

export default function TraitPropertyField({ trait, ...rest }: TraitPropertyFieldProps) {
  const editor = useEditor();
  const handleChange = (value: string) => {
    trait.setValue(value);
  };

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(ev.target.value);
  };

  const handleButtonClick = () => {
    const command = trait.get('command');

    if (command) {
      if (typeof command === 'string') {
        editor.runCommand(command);
      } else {
        command(editor, trait);
      }
    }
  };

  const type = trait.getType();
  const defValue = trait.getDefault() || trait.attributes.placeholder;
  const value = trait.getValue();
  const valueWithDef = value === undefined ? defValue : value;

  let inputToRender = <Input placeholder={defValue} value={value} onChange={onChange} />;

  switch (type) {
    case 'select': {
      inputToRender = (
        <Select value={value} onValueChange={handleChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {trait.getOptions().map(option => (
              <SelectItem key={trait.getOptionId(option)} value={trait.getOptionId(option)}>
                {trait.getOptionLabel(option)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

      break;
    }
    case 'color': {
      inputToRender = (
        <div className="flex items-center gap-2">
          <div className="h-[30px] w-[30px] rounded border border-gray-300" style={{ backgroundColor: valueWithDef }} />
          <Input
            type="color"
            value={valueWithDef}
            onChange={ev => handleChange(ev.target.value)}
            className="w-[100px]"
          />
        </div>
      );

      break;
    }
    case 'checkbox': {
      inputToRender = <Checkbox checked={value} onCheckedChange={checked => trait.setValue(checked)} />;

      break;
    }
    case 'button': {
      inputToRender = <Button onClick={handleButtonClick}>{trait.getLabel()}</Button>;
      break;
    }
    default:
    // skip
  }

  return (
    <div {...rest} className={cn('mb-3 w-full px-1')}>
      <Label className="mb-2 capitalize">{trait.getLabel()}</Label>
      {inputToRender}
    </div>
  );
}
