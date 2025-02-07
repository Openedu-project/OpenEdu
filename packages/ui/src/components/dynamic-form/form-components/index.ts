import {
  AtSign,
  Calendar,
  CaseSensitive,
  DollarSign,
  EyeOff,
  Hash,
  HeadingIcon,
  ImageIcon,
  Link,
  List,
  Phone,
  SquareCheck,
  SquareDashed,
  TextCursorInput,
  Type,
} from 'lucide-react';
import type { FormComponents } from '../types';
import { Checkbox } from './checkbox';
import { DateTimePicker } from './date-time-picker';
import { EmailInput } from './email';
import { Heading } from './heading';
import { FormImage } from './image';
import { Input } from './input';
import { InputCurrency } from './input-currency';
import { InputNumber } from './input-number';
import { InputPassword } from './input-password';
import { InputPhoneNumber } from './input-phonenumber';
import { InputURL } from './input-url';
import { Paragraph } from './paragraph';
import { Selectbox } from './selectbox';
import { Space } from './space';
import { SubmitButton } from './submit-button';
import { Textarea } from './textarea';

export const formComponents: FormComponents = {
  heading: {
    component: Heading,
    icon: HeadingIcon,
  },
  paragraph: {
    component: Paragraph,
    icon: CaseSensitive,
  },
  space: {
    component: Space,
    icon: SquareDashed,
  },
  input: {
    component: Input,
    icon: Type,
  },
  textarea: {
    component: Textarea,
    icon: TextCursorInput,
  },
  inputNumber: {
    component: InputNumber,
    icon: Hash,
  },
  email: {
    component: EmailInput,
    icon: AtSign,
  },
  inputCurrency: {
    component: InputCurrency,
    icon: DollarSign,
  },
  inputPhoneNumber: {
    component: InputPhoneNumber,
    icon: Phone,
  },
  inputPassword: {
    component: InputPassword,
    icon: EyeOff,
  },
  inputUrl: {
    component: InputURL,
    icon: Link,
  },
  selectbox: {
    component: Selectbox,
    icon: List,
  },
  datetimePicker: {
    component: DateTimePicker,
    icon: Calendar,
  },
  checkbox: {
    component: Checkbox,
    icon: SquareCheck,
  },
  image: {
    component: FormImage,
    icon: ImageIcon,
  },
  submitButton: {
    component: SubmitButton,
    icon: SquareCheck,
  },
};
