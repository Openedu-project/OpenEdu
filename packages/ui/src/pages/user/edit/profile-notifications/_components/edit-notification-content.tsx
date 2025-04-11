'use client';
import { CourseComingSoon } from '#components/course-coming-soon';
import { Section } from '../../../_components/user-section';

export function NotificationContent() {
  return (
    <Section
      title="notifications"
      className="px-3"
      content={
        <div className="w-full">
          <CourseComingSoon />
          {/* <div className="mb-6 p-3 w-full">
            <div className="flex justify-between items-center">
              <span className="mbutton-semibold16 mb-3">Notifications for comment</span>
              <Switch checked onCheckedChange={value => console.log(value)} />
            </div>
            <p className="mbutton-regular16">Notifications when receiving a certificate</p>
          </div>

          <div className="p-3">
            <div className="flex justify-between items-center">
              <span className="mbutton-semibold16 mb-3">Notifications for certificates</span>
              <Switch checked={false} onCheckedChange={value => console.log(value)} />
            </div>
            <p className="mbutton-regular16">Notifications for comments on posts or replies to their comments</p>
          </div> */}
        </div>
      }
    />
  );
}
