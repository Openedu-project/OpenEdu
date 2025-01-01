'use client';

import { type ReactNode, useCallback, useRef, useState } from 'react';
import {
  TransformWrapper as ReactTransformWrapper,
  type ReactZoomPanPinchRef,
  TransformComponent,
} from 'react-zoom-pan-pinch';

interface TransformWrapperProps {
  children: ReactNode;
}

const TransformWrapper = ({ children }: TransformWrapperProps) => {
  const transformComponentRef = useRef(null);
  const [scale, setScale] = useState(1);

  const handleWheel = useCallback(
    (_: ReactZoomPanPinchRef, e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY * -0.01;
        const newScale = Math.min(Math.max(scale + delta, 0.1), 10);
        setScale(newScale);
      }
    },
    [scale]
  );

  return (
    <ReactTransformWrapper
      ref={transformComponentRef}
      initialScale={1}
      minScale={0.1}
      maxScale={10}
      wheel={{ step: 0.1 }}
      onWheel={handleWheel}
      doubleClick={{ disabled: true }}
    >
      <TransformComponent wrapperClass="w-full h-full" contentClass="w-full h-full">
        {children}
      </TransformComponent>
    </ReactTransformWrapper>
  );
};

export default TransformWrapper;
