'use client';
import type React from 'react';
import { type RefObject, useCallback, useState } from 'react';
import type { DragState, TransformState } from './image-gallery-type';

interface UseImageTransformProps {
  minScale?: number;
  maxScale?: number;
  scaleStep?: number;
  imageRef: RefObject<HTMLImageElement | null>; // Updated type to handle null
  onTransformChange?: (transform: TransformState) => void;
}

const DEFAULT_MIN_SCALE = 0.1;
const DEFAULT_MAX_SCALE = 20;
const DEFAULT_SCALE_STEP = 0.1;

export const useImageTransform = ({
  minScale = DEFAULT_MIN_SCALE,
  maxScale = DEFAULT_MAX_SCALE,
  scaleStep = DEFAULT_SCALE_STEP,
  imageRef,
  onTransformChange,
}: UseImageTransformProps) => {
  const [transform, setTransform] = useState<TransformState>({
    scale: 1,
    rotation: 0,
    position: { x: 0, y: 0 },
  });

  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragStart: { x: 0, y: 0 },
  });

  const updateTransform = useCallback(
    (newTransform: Partial<TransformState>) => {
      setTransform(prev => {
        const updated = { ...prev, ...newTransform };
        onTransformChange?.(updated);
        return updated;
      });
    },
    [onTransformChange]
  );

  const resetTransforms = useCallback(() => {
    updateTransform({
      scale: 1,
      rotation: 0,
      position: { x: 0, y: 0 },
    });
    setDragState({
      isDragging: false,
      dragStart: { x: 0, y: 0 },
    });
  }, [updateTransform]);

  const handleZoom = useCallback(
    (delta: number) => {
      const newScale = Math.min(Math.max(transform.scale + delta, minScale), maxScale);
      updateTransform({ scale: newScale });
    },
    [transform.scale, minScale, maxScale, updateTransform]
  );

  const handleRotate = useCallback(() => {
    updateTransform({ rotation: transform.rotation + 90 });
  }, [transform.rotation, updateTransform]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (transform.scale !== 1) {
        setDragState({
          isDragging: true,
          dragStart: {
            x: e.clientX - transform.position.x,
            y: e.clientY - transform.position.y,
          },
        });
      }
    },
    [transform.scale, transform.position]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragState.isDragging || transform.scale === 1 || !imageRef.current) {
        return;
      }

      const newX = e.clientX - dragState.dragStart.x;
      const newY = e.clientY - dragState.dragStart.y;

      const imageRect = imageRef.current.getBoundingClientRect();
      const maxX = (imageRect.width * Math.abs(transform.scale - 1)) / 2;
      const maxY = (imageRect.height * Math.abs(transform.scale - 1)) / 2;

      updateTransform({
        position: {
          x: Math.min(Math.max(newX, -maxX), maxX),
          y: Math.min(Math.max(newY, -maxY), maxY),
        },
      });
    },
    [dragState, transform.scale, imageRef, updateTransform]
  );

  const handleMouseUp = useCallback(() => {
    setDragState(prev => ({ ...prev, isDragging: false }));
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY * -0.01;
        handleZoom(delta * scaleStep);
      }
    },
    [handleZoom, scaleStep]
  );

  return {
    transform,
    dragState,
    handlers: {
      handleZoom,
      handleRotate,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      handleWheel,
    },
    resetTransforms,
  };
};
