'use client';

import type { IOrganization } from '@oe/api';
import { ChevronDown } from 'lucide-react';
import { Button } from '#shadcn/button';
import { Checkbox } from '#shadcn/checkbox';

export interface OrganizationsSectionProps {
  title: string;
  isOpen: boolean;
  toggleSection: () => void;
  resetSection: () => void;
  resetLabel: string;
  checkboxes: Record<string, boolean>;
  handleCheckboxChange: (id: string) => void;
  organizations: IOrganization[]; // Added organizations prop
}

const CourseListFilterOrganizations = ({
  title,
  isOpen,
  toggleSection,
  resetSection,
  resetLabel,
  checkboxes,
  handleCheckboxChange,
  organizations, // Using the organizations prop
}: OrganizationsSectionProps) => {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="giant-iheading-semibold16 md:giant-iheading-semibold20 mb-0">{title}</h3>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="link" className="mbutton-semibold16 h-auto p-0 text-primary" onClick={resetSection}>
            {resetLabel}
          </Button>
          <Button variant="ghost" size="sm" className="p-1" onClick={toggleSection}>
            <ChevronDown
              className={`h-5 w-5 transform transition-transform duration-200 ${isOpen ? '' : 'rotate-180'}`}
            />
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="mt-3 space-y-2">
          {organizations
            .filter(org => org.active)
            .map(org => (
              <div key={org.id} className="flex items-center">
                <Checkbox
                  id={`org-${org.id}`}
                  className="mr-2 rounded"
                  checked={checkboxes?.[`org-${org.id}`]}
                  onCheckedChange={() => handleCheckboxChange(`org-${org.id}`)}
                />
                <label htmlFor={`org-${org.id}`} className="mcaption-regular16">
                  {org.name}
                </label>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export { CourseListFilterOrganizations };
