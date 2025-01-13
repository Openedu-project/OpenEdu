'use client';
import { FormNestedWrapper } from '@oe/ui/components/form-wrapper';
import Category from './category';
import Description from './description';
import Level from './level';
import Outcomes from './outcomes';
import PreviewVideos from './preview-videos';
import Referrence from './referrence';
import SupportChannels from './support-channels';
import Thumbnail from './thumbnail';

export default function CourseDetailInformationPage() {
  return (
    <div className="scrollbar mx-auto h-full max-w-[900px] overflow-auto">
      <FormNestedWrapper id="course-detail-information">
        <Description />
        <Outcomes />
        <Thumbnail />
        <PreviewVideos />
        <Referrence />
        <Category />
        <Level />
        <SupportChannels />
      </FormNestedWrapper>
    </div>
  );
}
