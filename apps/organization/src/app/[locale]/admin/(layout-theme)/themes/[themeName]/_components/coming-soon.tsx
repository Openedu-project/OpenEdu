import { Card, CardContent } from '@oe/ui/shadcn/card';
import { Clock } from 'lucide-react';

export default function ComingSoon() {
  return (
    <Card className="border-dashed bg-gradient-to-br from-slate-50 to-gray-50">
      <CardContent className="flex flex-col items-center justify-center gap-2 p-6 text-center">
        <Clock className="text-gray-400" size={24} />
        <h3 className="font-medium text-gray-600">Coming Soon</h3>
      </CardContent>
    </Card>
  );
}
