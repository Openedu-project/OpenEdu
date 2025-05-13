"use client";

import type { IAIEduCourseItem, IAIEduParamsPayload } from '@oe/api';
import { convertToTimeStamp } from '@oe/core';
import { AutocompeteMultiple, Card, CardContent } from '@oe/ui';
import { DateTimePicker } from 'node_modules/@oe/ui/src/components/date-time-picker/date-time-picker';
import { AICourseStatisticExportButton } from './ai-course-statistic-export';

interface IAICourseStatisticFilterProps {
  startDate: number;
  endDate: number;
  courseList: IAIEduCourseItem[];
  courseCuid: string | string[];
  campaignKey: string;
  params: IAIEduParamsPayload;
  setStartDate: (date: number) => void;
  setEndDate: (date: number) => void;
  setCourseCuid: (value: string | string[]) => void;
}
export function AICourseStatisticFilter({
  startDate,
  endDate,
  courseList,
  courseCuid,
  params,
  campaignKey,
  setStartDate,
  setEndDate,
  setCourseCuid,
}: IAICourseStatisticFilterProps) {
  const options = [
    { label: "Tất cả khóa học", value: "all" },
    ...courseList.map((course) => ({
      label: course.name,
      value: course.course_cuid ?? "",
    })),
  ];
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row">
          <div className="flex flex-col gap-2 lg:flex-row">
            <div className="flex flex-col gap-2 md:flex-row">
              <div className="space-y-2">
                <label htmlFor="time-period" className="font-medium text-sm">
                  Từ ngày
                </label>
                <DateTimePicker
                  value={new Date(startDate)}
                  onChange={(date) =>
                    setStartDate(convertToTimeStamp(date.toString()))
                  }
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="time-period" className="font-medium text-sm">
                  Đến ngày
                </label>
                <DateTimePicker
                  value={new Date(endDate)}
                  onChange={(date) =>
                    setEndDate(convertToTimeStamp(date.toString()))
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="course" className="font-medium text-sm">
                Khóa học:
              </label>
              <AutocompeteMultiple
                options={options}
                value={options.filter((option) =>
                  Array.isArray(courseCuid)
                    ? courseCuid.includes(option.value)
                    : option.value === courseCuid
                )}
                minHeightItem={50}
                onChange={(value) => {
                  const result: string[] = [];
                  value.map((item) => {
                    if (item.value === "all") {
                      result.push("all");
                    } else {
                      result.push(item.value);
                    }
                  });
                  if (result.includes("all")) {
                    setCourseCuid("all");
                    return;
                  }
                  setCourseCuid(result);
                }}
              />
              {/* <Select
                defaultValue="all"
                onValueChange={(value) => {
                  if (value === "all") {
                    setCourseCuid("all");
                  } else {
                    setCourseCuid(value);
                  }
                }}
              >
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả khóa học</SelectItem>
                  {courseList?.map((course) => (
                    <SelectItem
                      key={course.course_cuid}
                      value={course.course_cuid ?? ""}
                    >
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
            </div>
          </div>
          <AICourseStatisticExportButton params={params} campaignKey={campaignKey} />
        </div>
      </CardContent>
    </Card>
  );
}
