import { generateSEO } from '@oe/core';
import { AIAssistantPage } from '@oe/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = generateSEO({
  title: 'AI Agent',
  keywords: ['AI', 'AI Agent', 'agent'],
});

export default function AIAgent() {
  return <AIAssistantPage />;
}
