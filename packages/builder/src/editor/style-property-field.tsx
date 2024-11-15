import { Button } from '@oe/ui/shadcn/button';
import { Input } from '@oe/ui/shadcn/input';
import { Label } from '@oe/ui/shadcn/label';
import { RadioGroup, RadioGroupItem } from '@oe/ui/shadcn/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@oe/ui/shadcn/select';
import { Slider } from '@oe/ui/shadcn/slider';
import { cn } from '@oe/ui/utils/cn';
import { ArrowDownCircle, ArrowUpCircle, Plus, Trash, X } from 'lucide-react';
import type React from 'react';
import { useEditor } from '../grapesjs';

import type {
  Property,
  PropertyComposite,
  PropertyRadio,
  PropertySelect,
  PropertySlider,
  PropertyStack,
} from 'grapesjs';

import { BTN_CLS, ROUND_BORDER_COLOR } from '../utils';

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  prop: Property;
}

export default function StylePropertyField({ prop, ...rest }: StylePropertyFieldProps) {
  const editor = useEditor();
  const handleChange = (value: string) => {
    prop.upValue(value);
  };

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(ev.target.value);
  };

  const openAssets = () => {
    const { Assets } = editor;

    Assets.open({
      select(asset, complete) {
        prop.upValue(asset.getSrc() as string, { partial: !complete });
        if (complete) {
          Assets.close();
        }
      },
      types: ['image'],
      accept: 'image/*',
    });
  };

  const type = prop.getType();
  const defValue = prop.getDefaultValue();
  const canClear = prop.canClear();
  const hasValue = prop.hasValue();
  const value = prop.getValue();
  const valueString = hasValue ? value : '';
  const valueWithDef = hasValue ? value : defValue;

  let inputToRender = <Input placeholder={defValue} value={valueString} onChange={onChange} />;

  switch (type) {
    case 'radio': {
      const radioProp = prop as PropertyRadio;

      inputToRender = (
        <RadioGroup value={value} onValueChange={handleChange}>
          {radioProp.getOptions().map(option => (
            <div className="flex items-center space-x-2" key={radioProp.getOptionId(option)}>
              <RadioGroupItem value={radioProp.getOptionId(option)} id={radioProp.getOptionId(option)} />
              <Label htmlFor={radioProp.getOptionId(option)}>{radioProp.getOptionLabel(option)}</Label>
            </div>
          ))}
        </RadioGroup>
      );
      break;
    }
    case 'select': {
      const selectProp = prop as PropertySelect;

      inputToRender = (
        <Select value={value} onValueChange={handleChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {selectProp.getOptions().map(option => (
              <SelectItem key={selectProp.getOptionId(option)} value={selectProp.getOptionId(option)}>
                {selectProp.getOptionLabel(option)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
      break;
    }
    case 'color': {
      inputToRender = (
        <div className="flex items-center space-x-2">
          <div className={cn('h-6 w-6', ROUND_BORDER_COLOR)} style={{ backgroundColor: valueWithDef }} />
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
    case 'slider': {
      const sliderProp = prop as PropertySlider;

      inputToRender = (
        <Slider
          value={[Number.parseFloat(value as string)]}
          min={sliderProp.getMin()}
          max={sliderProp.getMax()}
          step={sliderProp.getStep()}
          onValueChange={values => {
            handleChange((values[0] ?? 0).toString());
          }}
        />
      );
      break;
    }
    case 'file': {
      inputToRender = (
        <div className="flex flex-col items-center gap-3">
          {value && value !== defValue && (
            <Button
              className="inline-block h-[50px] w-[50px] cursor-pointer rounded bg-center bg-cover"
              style={{ backgroundImage: `url("${value}")` }}
              onClick={() => handleChange('')}
            />
          )}
          <Button onClick={openAssets} className={BTN_CLS}>
            Select Image
          </Button>
        </div>
      );
      break;
    }
    case 'composite': {
      const compositeProp = prop as PropertyComposite;

      inputToRender = (
        <div className={cn('flex flex-wrap bg-black/20 p-2', ROUND_BORDER_COLOR)}>
          {compositeProp.getProperties().map(prop => (
            <StylePropertyField key={prop.getId()} prop={prop} />
          ))}
        </div>
      );
      break;
    }
    case 'stack': {
      const stackProp = prop as PropertyStack;
      const layers = stackProp.getLayers();
      const isTextShadow = stackProp.getName() === 'text-shadow';

      inputToRender = (
        <div className={cn('flex min-h-[54px] flex-col gap-2 bg-black/20 p-2', ROUND_BORDER_COLOR)}>
          {layers.map(layer => (
            <div key={layer.getId()} className={ROUND_BORDER_COLOR}>
              <div className="flex items-center gap-1 bg-slate-800 px-2 py-1">
                <Button variant="ghost" size="icon" onClick={() => layer.move(layer.getIndex() - 1) as number}>
                  <ArrowUpCircle className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => layer.move(layer.getIndex() + 1) as number}>
                  <ArrowDownCircle className="h-4 w-4" />
                </Button>
                <button type="button" className="flex-grow" onClick={() => layer.select()}>
                  {layer.getLabel()}
                </button>
                <div
                  className={cn(
                    'flex min-h-[17px] min-w-[17px] justify-center bg-white text-black text-sm',
                    ROUND_BORDER_COLOR
                  )}
                  style={layer.getStylePreview({
                    number: { min: -3, max: 3 },
                    camelCase: true,
                  })}
                >
                  {isTextShadow && 'T'}
                </div>
                <Button variant="ghost" size="icon" onClick={() => layer.remove() as number}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              {layer.isSelected() && (
                <div className="flex flex-wrap p-2">
                  {stackProp.getProperties().map(prop => (
                    <StylePropertyField key={prop.getId()} prop={prop} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      );
      break;
    }
    default:
    // skip
  }

  return (
    <div {...rest} className={cn('mb-3 px-1', prop.isFull() ? 'w-full' : 'w-1/2')}>
      <div className={cn('mb-2 flex items-center', canClear && 'text-sky-300')}>
        <Label className="flex-grow capitalize">{prop.getLabel()}</Label>
        {canClear && (
          <Button variant="ghost" size="icon" onClick={() => prop.clear()}>
            <X className="h-4 w-4" />
          </Button>
        )}
        {type === 'stack' && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={() => (prop as PropertyStack).addLayer({}, { at: 0 })}
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>
      {inputToRender}
    </div>
  );
}
