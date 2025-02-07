'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { IPdfViewerProps } from './pdf-viewer';

export const PdfViewer = dynamic<IPdfViewerProps>(() => import('./pdf-viewer')) as ComponentType<IPdfViewerProps>;
