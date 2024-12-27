import type React from 'react';

export interface ImageType {
  src: string;
  alt?: string;
  title?: string;
  description?: string;
}

export interface ImageGalleryProps {
  images: ImageType[];
  width?: number;
  height?: number;
  className?: string;
  onImageChange?: (index: number) => void;
  defaultScale?: number;
  maxScale?: number;
  minScale?: number;
  scaleStep?: number;
  title?: string | React.ReactNode;
  titleClassName?: string;
}

export interface TransformState {
  scale: number;
  rotation: number;
  position: { x: number; y: number };
}

export interface DragState {
  isDragging: boolean;
  dragStart: { x: number; y: number };
}
