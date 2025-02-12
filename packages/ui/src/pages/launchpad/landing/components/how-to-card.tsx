import type { THowToGetMoney } from "../lib/types";

const HowToCard = ({ data }: { data: THowToGetMoney }) => {
  return (
    <div className="flex flex-col items-start justify-start space-y-4 rounded-3xl bg-gradient-to-b bg-white from-34% from-white via-primary-20/30 to-primary-20/30 leading-[125%] shadow-[0px_4px_30px_0px_rgba(193,195,251,0.30)] backdrop-blur transition-all hover:scale-[102%] sm:flex-row sm:items-center">
      <div className="flex w-full flex-col items-center justify-center gap-[10px] rounded-3xl border-4 border-white bg-[linear-gradient(180deg,_#ECEDFF_34%,_rgba(242,241,255,0.3)_100%)] p-4 text-center backdrop-blur-[2px] sm:aspect-square sm:w-[160px] sm:p-5">
        <data.icon className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
        <h3 className="font-semibold text-xl sm:text-2xl">{data.title}</h3>
      </div>
      <div className="p-4 sm:p-6">
        <ul className="list-disc pl-4 sm:pl-5">
          {data.listDesc.map((item, index) => (
            <li key={`${index}-${item}`} className="text-sm sm:text-base">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HowToCard;
