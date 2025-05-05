'use client';
import { useState } from 'react';
import { ScheduleSettingEventList } from './schedule-setting-event-list';
import { ScheduleSettingForm } from './schedule-settings-form';

export function ScheduleSettingList() {
  const [scheduleID, setScheduleID] = useState<string | undefined>(undefined);

  return (
    <div className="block">
      <ScheduleSettingForm setScheduleID={setScheduleID} />
      <ScheduleSettingEventList scheduleID={scheduleID} />
    </div>
  );
}
