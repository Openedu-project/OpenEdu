import { differenceInDays } from 'date-fns';

export const getTimeStatus = (endDate: number | Date) => {
  const daysLeft = differenceInDays(new Date(endDate), new Date());
  return daysLeft; // Chỉ return số ngày
};

export const calculateProgress = (
  pledged = 0,
  goal = 0
): {
  percentage: number;
  displayText: string;
} => {
  if (goal <= 0) {
    return { percentage: 0, displayText: '0%' };
  }

  const percentage = (pledged / goal) * 100;
  const displayText = `${Math.floor(percentage)}%`;

  return {
    percentage: percentage > 100 ? 100 : percentage, // Progress bar max là 100
    displayText: displayText, // Hiển thị % thực tế, có thể vượt 100%
  };
};

export const isValidDate = (date: string | Date): boolean => {
  const d = new Date(date);
  return d instanceof Date && !Number.isNaN(d.getTime());
};
