import { DefaultLanguage } from './_components/default-language';
import { LanguageCards } from './_components/language-cards';
import { LanguageSelector } from './_components/language-selector';
import { SaveButton } from './_components/save-button';

export default function LanguagesSettingsPage() {
  return (
    <>
      <div className="space-y-4 rounded-sm bg-background p-4">
        <LanguageSelector />
        <DefaultLanguage />
        <SaveButton />
      </div>
      <LanguageCards />
    </>
  );
}
