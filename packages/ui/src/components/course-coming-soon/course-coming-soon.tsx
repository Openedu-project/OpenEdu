import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '#shadcn/card';

const CourseComingSoon = () => {
  const tComing = useTranslations('courseComingSoon');

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-xs">
        <CardHeader>
          <CardTitle className="text-center font-bold text-3xl text-gray-800">{tComing('title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-center text-gray-600">{tComing('desc')}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export { CourseComingSoon };
