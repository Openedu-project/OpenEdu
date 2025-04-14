import { cn } from '#utils/cn';
const Title = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <h2 className={cn('giant-iheading-bold24 md:giant-iheading-bold40 lg:giant-iheading-bold44', className)}>
      {children}
    </h2>
  );
};

Title.displayName = 'Title';
export { Title };
