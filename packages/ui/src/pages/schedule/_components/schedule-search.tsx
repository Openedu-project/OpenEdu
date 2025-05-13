"use client";
import { buildQueryParam } from "@oe/core";
import { MoveRight, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { usePathname, useRouter } from "#common/navigation";
import { Button } from "#shadcn/button";
import { Input } from "#shadcn/input";

export default function ScheduleSearch({
  searchValue = "",
}: {
  searchValue?: string;
}) {
  const t = useTranslations("schedule.website");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>(searchValue ?? "");

  const handleSearch = useCallback(() => {
    router.push(
      `${pathname}?${buildQueryParam({
        currentParams: searchParams,
        params: [
          {
            name: "search",
            value: value,
          },
        ],
        resetPage: true,
      })}`,
      {
        scroll: false,
      }
    );
  }, [router, pathname, searchParams, value]);
  return (
    <div className="mb-4 flex md:mb-6">
      <Input
        prefixIcon={<Search />}
        className="h-12 rounded-[300px]"
        placeholder={t("searchPlaceholder")}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        suffixIcon={
          <Button
            className="h-10 w-10 rounded-[48px] p-1"
            onClick={handleSearch}
          >
            <MoveRight />
          </Button>
        }
      />
    </div>
  );
}
