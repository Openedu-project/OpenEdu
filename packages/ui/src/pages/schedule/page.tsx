import { getOrgByDomainService, getSchedulesService } from "@oe/api";
import { Timer } from "@oe/assets";
import { formatDateSlash } from "@oe/core";
import { Sparkle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import ScheduleEventList from "./_components/schedule-event-list";
import ScheduleDateRangeFilter from "./_components/schedule-filter";
import ScheduleSearch from "./_components/schedule-search";

export async function Schedule({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  // const { search = "" } = await searchParams;

  const [{ search }, orgData, t] = await Promise.all([
    searchParams,
    getOrgByDomainService(),
    getTranslations("schedule.website"),
  ]);
  const orgId = orgData?.id;

  const scheduleRes = await getSchedulesService(undefined, {
    orgID: orgId ?? "",
  });

  const currentScheduleData = scheduleRes?.[0];

  return (
    <div className="container space-y-4 py-12 text-center">
      <h1 className="giant-iheading-bold20 lg:giant-iheading-bold40 mb-5 md:mb-7 lg:mb-10">
        {currentScheduleData?.name ?? ""}
      </h1>
      <div className="mb-4 flex flex-col items-center justify-center rounded-[16px] border border-primary py-6 md:mb-6">
        <div className="mb-4 flex items-center justify-center gap-4">
          <div className="flex items-center">
            <div className="h-[1.4px] w-6 translate-x-[1px] bg-primary md:w-[100px]" />
            <Sparkle className="text-primary" />
          </div>

          <h2 className="mcaption-semibold18 md:mcaption-semibold24 mb-0 flex flex-col justify-center gap-2 align-center align-center lg:flex-row">
            <div className="flex">
              <Timer className="mx-auto" />
              &nbsp;
            </div>
            <span className="flex items-center justify-center lg:justify-start">
              {t("timePeriod")}:
            </span>
            <span className="flex items-center justify-center text-primary lg:justify-start">
              {formatDateSlash(
                Number(currentScheduleData?.start_at ?? Date.now())
              )}
              &nbsp; -&nbsp;
              {formatDateSlash(
                Number(currentScheduleData?.end_at ?? Date.now())
              )}
              &nbsp;
            </span>
          </h2>

          <div className="flex items-center">
            <Sparkle className="translate-x-[1px] text-primary" />
            <div className="h-[1.4px] w-6 bg-primary md:w-[100px]" />
          </div>
        </div>

        <p className="mcaption-semibold16 px-5">
          {currentScheduleData?.description ?? ""}
        </p>
      </div>
      <ScheduleSearch searchValue={search} />
      <div className="gird-cols-1 grid gap-10 xl:grid-cols-4">
        <div className="col-span-4 xl:col-span-1 ">
          <ScheduleDateRangeFilter />
        </div>
        <div className="col-span-4 xl:col-span-3 ">
          <ScheduleEventList searchParams={searchParams} />
        </div>
      </div>
    </div>
  );
}
