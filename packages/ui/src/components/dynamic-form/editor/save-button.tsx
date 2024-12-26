'use client';

import { useTranslations } from 'next-intl';
import { Button } from '#shadcn/button';
import { useFormEditorStore } from '../store';

export default function SaveButton() {
  const tGeneral = useTranslations('general');
  const { fields } = useFormEditorStore();
  const handleSave = () => {
    console.log('save', fields);
  };
  return (
    <Button variant="default" onClick={handleSave}>
      {tGeneral('save')}
    </Button>
  );
}
