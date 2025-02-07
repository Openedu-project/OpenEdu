import { PLATFORM_ROUTES, PROTECTED_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import { RegistrationForm } from './_components/form-demo';
import { Registration } from './_components/stepper-demo';
import UploadDemo from './_components/upload-demo';

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
        <Registration />
        <UploadDemo />
        <RegistrationForm />
        {/* <TableDemo />
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
        /> */}
        {/* <DndSortDemo /> */}
      </main>
    </>
  );
}
