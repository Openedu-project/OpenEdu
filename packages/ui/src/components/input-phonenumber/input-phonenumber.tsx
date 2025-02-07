import { ChevronsUpDown } from 'lucide-react';
import { type ComponentProps, type ComponentRef, type ForwardRefExoticComponent, forwardRef } from 'react';
import RPNInput, {
  type FlagProps,
  getCountryCallingCode,
  type Country,
  type Props,
  type Value,
} from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { Autocomplete } from '#components/autocomplete';
import { Input } from '#shadcn/input';
import { cn } from '#utils/cn';

type PhoneInputProps = Omit<ComponentProps<'input'>, 'onChange' | 'value' | 'ref'> &
  Omit<Props<typeof RPNInput>, 'onChange'> & {
    onChange?: (value: Value) => void;
  };

const InputPhoneNumber: ForwardRefExoticComponent<PhoneInputProps> = forwardRef<
  ComponentRef<typeof RPNInput>,
  PhoneInputProps
>(({ className, onChange, ...props }, ref) => {
  return (
    <RPNInput
      ref={ref}
      className={cn('flex', className)}
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      inputComponent={InputComponent}
      smartCaret={false}
      onChange={value => onChange?.(value || ('' as Value))}
      {...props}
    />
  );
});
InputPhoneNumber.displayName = 'InputPhoneNumber';

const InputComponent = forwardRef<HTMLInputElement, ComponentProps<'input'>>(({ className, ...props }, ref) => (
  <Input className={cn('rounded-s-none rounded-e-lg', className)} {...props} ref={ref} />
));
InputComponent.displayName = 'InputComponent';

type CountryEntry = { label: string; value: Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: Country;
  options: CountryEntry[];
  onChange: (country: Country) => void;
};

type CountryOption = {
  value: Country;
  label: string;
};

const CountrySelect = ({ disabled, value: selectedCountry, options: countryList, onChange }: CountrySelectProps) => {
  const countryOptions: CountryOption[] = countryList
    .filter((entry): entry is { label: string; value: Country } => entry.value !== undefined)
    .map(entry => ({
      value: entry.value,
      label: entry.label,
    }));

  const selectedOption = countryOptions.find(option => option.value === selectedCountry);

  return (
    <Autocomplete
      options={countryOptions}
      value={selectedOption}
      onChange={option => option && onChange(option.value)}
      className="w-[300px] rounded-s-none rounded-e-lg"
      width="auto"
      triggerProps={{
        className: 'flex gap-1 rounded-s-lg rounded-e-none border-r-0 px-3 focus:z-10',
        disabled,
      }}
      renderTrigger={option => {
        return (
          <>
            <FlagComponent country={option?.value ?? selectedCountry} countryName={option?.label ?? selectedCountry} />
            <ChevronsUpDown className={cn('-mr-2 size-4 opacity-50', disabled ? 'hidden' : 'opacity-100')} />
          </>
        );
      }}
      renderOption={option => (
        <div className="flex items-center gap-2">
          <FlagComponent country={option.value} countryName={option.label} />
          <span className="flex-1 text-sm">{option.label}</span>
          <span className="text-foreground/50 text-sm">{`+${getCountryCallingCode(option.value)}`}</span>
        </div>
      )}
      searchPlaceholder="Search country..."
      showSearch={true}
    />
  );
};

const FlagComponent = ({ country, countryName }: FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { InputPhoneNumber };
