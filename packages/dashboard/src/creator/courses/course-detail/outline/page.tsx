'use client';
import { z } from '@oe/api/utils/zod';
import { FormNestedWrapper } from '@oe/ui/components/form-wrapper';
import { Button } from '@oe/ui/shadcn/button';
import { Drawer, DrawerContent } from '@oe/ui/shadcn/drawer';
import { MenuIcon, MoreVerticalIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

const outlineFormSchema = z.object({
  sections: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, { message: 'Tên section không được để trống' }),
      lessons: z.array(
        z.object({
          id: z.string(),
          name: z.string().min(1, { message: 'Tên bài học không được để trống' }),
          content: z.string(),
          order: z.number(),
        })
      ),
    })
  ),
});

export default function CourseDetailOutlinePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <FormNestedWrapper id="course-detail-outline" schema={outlineFormSchema} className="space-y-4">
        {/* Section */}
        <div className="flex items-center justify-between rounded-md border p-4">
          <div className="flex items-center gap-2">
            <span>Section 1: Name of section</span>
            <Button variant="ghost" size="icon" onClick={() => setIsDrawerOpen(true)}>
              <MenuIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Draft
            </Button>
            <Button variant="outline" size="icon">
              <PlusIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Lesson */}
        <div className="ml-8 border rounded-md p-4">
          <div className="flex items-center justify-between">
            <span>Lesson 1: Lesson name</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Save
              </Button>
              <Button variant="outline" size="icon">
                <MoreVerticalIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Text Editor Area */}
          <div className="mt-4 border rounded-md p-4">
            <div className="flex items-center gap-2 border-b pb-2">{/* Text editor toolbar */}</div>
            <div className="min-h-[200px] mt-2">Write Your Description</div>
          </div>
        </div>
      </FormNestedWrapper>

      {/* Section Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <div className="p-4">
            <h2>Section Settings</h2>
            {/* Section settings content */}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
