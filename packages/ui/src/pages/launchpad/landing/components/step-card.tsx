import type { TLaunchpadStep } from '../lib/types';

interface StepCardProps {
  data: TLaunchpadStep;
}

const StepCard = ({ data }: StepCardProps) => {
  return (
    <div className="flex min-h-0 flex-col items-center justify-center gap-2 rounded-3xl border-4 border-white bg-[linear-gradient(180deg,_#FFF_25%,_#F2F1FF_80%)] p-4 backdrop-blur-[2px] sm:gap-3 sm:p-6 md:min-h-[400px] md:gap-4 lg:px-8 hover:scale-[105%] transition-all">
      <span className="flex h-8 w-8 items-center justify-center rounded-full border-[2px] border-primary font-semibold text-primary text-sm sm:h-9 sm:w-9 sm:text-base md:h-10 md:w-10">
        {data.step}
      </span>
      <h3 className="text-center font-semibold text-xl leading-tight sm:text-xl md:text-2xl">{data.title}</h3>
      <ul className="list-disc pl-4 text-left text-sm leading-tight sm:pl-5 sm:text-base">
        {data.listDesc?.map((item, index) => (
          <li key={`${index}-${item}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default StepCard;
