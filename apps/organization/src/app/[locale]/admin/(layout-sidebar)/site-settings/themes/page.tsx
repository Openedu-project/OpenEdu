import SelectTheme from './_components/select-theme';

export default function ThemePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 font-bold text-3xl">Select a Theme</h1>

      <SelectTheme />
    </div>
  );
}
