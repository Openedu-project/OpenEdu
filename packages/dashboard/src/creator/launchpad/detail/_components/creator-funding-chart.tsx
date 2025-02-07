import { useMemo } from 'react';
import { Cell, Pie, PieChart } from 'recharts';

interface CreatorFundingChartProps {
  target: number;
  pledged: number;
  backers: number;
}

const CreatorFundingChart = ({ target, pledged }: CreatorFundingChartProps) => {
  const percentage = useMemo(() => (pledged / target) * 100, [pledged, target]);

  const data = [
    { name: 'Pledged', value: percentage },
    { name: 'Remaining', value: 100 - percentage },
  ];

  const COLORS = ['#484AE7', '#E8E7F9'];

  return (
    <div className="relative mx-auto mt-8 h-32 w-32 md:mx-0 md:mt-0">
      <PieChart width={128} height={128}>
        <Pie
          data={data}
          cx={64}
          cy={64}
          innerRadius={48}
          outerRadius={60}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${entry.value}`} fill={COLORS[index]} strokeWidth={0} />
          ))}
        </Pie>
      </PieChart>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-bold text-2xl text-[#4339F2]">{percentage}%</span>
        <span className="text-[#4339F2] text-sm">target</span>
      </div>
    </div>
  );
};

export default CreatorFundingChart;
