import { PLATFORM_ROUTES, PROTECTED_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import { FilterSearch } from '@oe/ui/components/filter-search';
import { Uploader } from '@oe/ui/components/uploader';
import { Button } from '@oe/ui/shadcn/button';
import { Checkbox } from '@oe/ui/shadcn/checkbox';
import { RadioGroup, RadioGroupItem } from '@oe/ui/shadcn/radio-group';
import { Slider } from '@oe/ui/shadcn/slider';
import { Switch } from '@oe/ui/shadcn/switch';
import { Tabs, TabsList, TabsTrigger } from '@oe/ui/shadcn/tabs';
import { Toggle } from '@oe/ui/shadcn/toggle';
import { Camera, User2 } from 'lucide-react';
import TableDemo from './_components/table-demo';

export default function Home() {
  return (
    <>
      <nav>
        <Link href="/">Home</Link>
        <Link href={PROTECTED_ROUTES.admin}>Admin</Link>
        <Link href={PLATFORM_ROUTES.aboutUs}>About US</Link>
        <Link href={PROTECTED_ROUTES.blog}>Blog</Link>
        <Link href={PROTECTED_ROUTES.learner}>Learner</Link>
        <Link href={PROTECTED_ROUTES.creator}>Creator</Link>
        <Link href="/about">About</Link>
      </nav>
      <main>
        <TableDemo />
        <Checkbox />
        <RadioGroup>
          <RadioGroupItem value="apple" />
        </RadioGroup>
        <Slider />
        <Switch />
        <Tabs>
          <TabsList>
            <TabsTrigger value="apple">Apple</TabsTrigger>
          </TabsList>
        </Tabs>
        <Toggle />
        <Button variant="outline">Click me</Button>
        <FilterSearch
          filterOptions={[
            { id: 'name', value: 'name', label: 'Name', type: 'search' },
            {
              id: 'status',
              value: 'status',
              label: 'Status',
              type: 'select',
              options: [
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ],
            },
            {
              id: 'category',
              value: 'category',
              label: 'Category',
              type: 'select',
              options: [
                { value: 'technology', label: 'Technology' },
                { value: 'fashion', label: 'Fashion' },
              ],
            },
          ]}
        />
        <Uploader listType="picture-text" aspectRatio={4 / 3} crop={{ locked: false }} accept="image/*">
          <Button>Select files...</Button>
        </Uploader>
        <Uploader listType="picture" itemClassName="h-24 w-24">
          <Button>Select files...</Button>
        </Uploader>
        <Uploader multiple listType="picture">
          <Button>
            <Camera />
          </Button>
        </Uploader>
        <Uploader listType="picture" aspectRatio={1} crop itemClassName="h-40 w-40">
          <Button variant="outline" className="h-40 w-40 p-0">
            <User2 />
          </Button>
        </Uploader>
        <Uploader draggable listType="picture" crop />
      </main>
    </>
  );
}
