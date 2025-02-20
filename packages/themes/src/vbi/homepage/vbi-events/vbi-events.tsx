import { cn } from "@oe/ui/utils/cn";
import type { SectionComponent } from "../../../_types/theme-page";
import { EventCard, type EventCardProps } from "../../_components/event-card";
import {
  InfoSection,
  type InfoSectionProps,
} from "../../_components/info-section";

export interface VbiHomepageEventsProps extends InfoSectionProps {
  events?: {
    event1: EventCardProps;
    event2: EventCardProps;
  };
}

const VbiHomepageEvents: SectionComponent<"homepage", "vbiEvents"> = ({
  props,
  className,
  t,
}) => {
  const events = [
    {
      title: t?.("events.event1.title"),
      description: t?.("events.event1.description"),
      image: props?.events?.event1?.image,
      stats: {
        stat1: {
          value: props?.events?.event1?.stats?.stat1?.value,
          label: t?.("events.event1.stats.stat1.label"),
        },
        stat2: {
          value: props?.events?.event1?.stats?.stat2?.value,
          label: t?.("events.event1.stats.stat2.label"),
        },
        stat3: {
          value: props?.events?.event1?.stats?.stat3?.value,
          label: t?.("events.event1.stats.stat3.label"),
        },
      },
    },
    {
      title: t?.("events.event2.title"),
      description: t?.("events.event2.description"),
      image: props?.events?.event2?.image,
      stats: {
        stat1: {
          value: props?.events?.event2?.stats?.stat1?.value,
          label: t?.("events.event2.stats.stat1.label"),
        },
        stat2: {
          value: props?.events?.event2?.stats?.stat2?.value,
          label: t?.("events.event2.stats.stat2.label"),
        },
        stat3: {
          value: props?.events?.event2?.stats?.stat3?.value,
          label: t?.("events.event2.stats.stat3.label"),
        },
      },
    },
  ];

  return (
    <div
      className={cn(
        "container space-y-4 bg-background p-4 md:space-y-8 md:p-8 lg:p-12",
        className
      )}
    >
      <InfoSection
        title={t?.("title")}
        titleSub={t?.("titleSub")}
        button={undefined}
        className="flex flex-col items-center pb-8"
      />
      <div className="flex flex-col gap-12 md:flex-row md:gap-4">
        {events?.map((item) => (
          <EventCard
            key={item.title}
            title={item.title}
            description={item.description}
            stats={item.stats}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default VbiHomepageEvents;
