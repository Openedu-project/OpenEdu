'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { QuizQuestions } from './quiz-questions';
import { QuizSettings } from './quiz-settings';
import type { IQuizProps } from './types';

export function QuizEditor({ contentIndex, quizIndex }: IQuizProps) {
  const tCourseQuiz = useTranslations('course.outline.lesson.content.quiz');
  const [activeTab, setActiveTab] = useState<'setting' | 'question'>('setting');

  return (
    <div className="flex h-full flex-col">
      <Tabs value={activeTab} onValueChange={v => setActiveTab(v as 'setting' | 'question')} className="text-center">
        <TabsList>
          <TabsTrigger value="setting">{tCourseQuiz('settings.title')}</TabsTrigger>
          <TabsTrigger value="question">{tCourseQuiz('question.title')}</TabsTrigger>
        </TabsList>

        <TabsContent value="setting" className="space-y-4 rounded-lg border bg-background p-4 text-left">
          <div className="flex flex-col gap-4">
            <QuizSettings contentIndex={contentIndex} quizIndex={quizIndex} />
          </div>
        </TabsContent>

        <TabsContent value="question" className="space-y-4 p-4 text-left">
          <QuizQuestions contentIndex={contentIndex} quizIndex={quizIndex} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
