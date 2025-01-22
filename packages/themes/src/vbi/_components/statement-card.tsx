import { Heart, Star } from 'lucide-react';

interface StatementCardProps {
  icon?: 'star' | 'heart';
  title: string;
  content: string;
}

const StatementCard = ({ icon, title, content }: StatementCardProps) => {
  const Icon = icon === 'star' ? Star : Heart;

  return (
    <div className="rounded-2xl bg-background p-8 shadow-sm">
      {/* Icon */}
      <div className="mb-6 h-14 w-14 rounded-2xl bg-primary p-4">
        <Icon className="h-full w-full text-white" strokeWidth={2} />
      </div>

      {/* Content */}
      <h2 className="mb-4 font-bold text-2xl">{title}</h2>
      <p className="text-foreground/80 leading-relaxed">{content}</p>
    </div>
  );
};

export { StatementCard, type StatementCardProps };
