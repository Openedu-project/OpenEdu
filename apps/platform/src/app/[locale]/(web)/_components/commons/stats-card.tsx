interface StatsCardProps {
  number: string;
  label: string;
  circleColor: string;
}

export default function StatsCard({ number, label, circleColor }: StatsCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative font-bold text-4xl md:text-5xl">
        <div
          className={`h-4 w-4 md:h-7 md:w-7 rounded-full ${circleColor} -z-10 absolute top-[10px] left-[-3px] md:top-[10px] md:left-[-11px]`}
        />
        <span className="giant-iheading-bold24 md:giant-iheading-bold32">{number}</span>
      </div>
      <span className="giant-iheading-regular16 mt-1 text-[#637381]">{label}</span>
    </div>
  );
}
