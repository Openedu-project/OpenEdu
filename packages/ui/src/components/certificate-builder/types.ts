export type ElementType = 'text' | 'datetime' | 'image' | 'signature';

export interface BaseElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation?: number;
  zIndex: number;
  visible: boolean;
}

export interface TextElement extends BaseElement {
  type: 'text';
  text: string;
  fontSize: number;
  fontFamily?: string;
  color: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  align?: 'left' | 'center' | 'right';
  dynamic?: boolean; // Cho phép map với data động
  dynamicKey?: string; // Key để map với data động (vd: studentName)
}

// export interface DateTimeElement extends BaseElement {
//   type: 'datetime';
//   text: IDate;
//   format: string;
//   fontSize: number;
//   fontFamily?: string;
//   color: string;
//   dynamic?: boolean;
//   dynamicKey?: string;
// }

export interface ImageElement extends BaseElement {
  type: 'image';
  text: string;
  src: string;
  alt?: string;
  aspectRatio?: number;
  maintainAspectRatio?: boolean; // Thêm thuộc tính này
  dynamic?: boolean;
  dynamicKey?: string;
}

// export interface SignatureElement extends BaseElement {
//   type: 'signature';
//   text: string;
//   src?: string;
//   placeholder?: string;
//   dynamic?: boolean;
//   dynamicKey?: string;
// }

// export type CertificateElement = TextElement | ImageElement | SignatureElement  | DateTimeElement;
export type CertificateElement = TextElement | ImageElement;

export interface CertificateTemplate {
  id: string;
  name: string;
  width: number;
  height: number;
  maxWidth: number;
  maxHeight: number;
  backgroundColor: string;
  backgroundImage?: string;
  backgroundSize?: 'contain' | 'cover';
  backgroundPosition?: string;
  backgroundRepeat?: string;
  elements: CertificateElement[];
}

export interface CertificateData {
  studentName?: string;
  courseName?: string;
  issueDate?: string;
  // Các trường dữ liệu động khác
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any;
}
