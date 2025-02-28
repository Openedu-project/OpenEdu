'use client';

import type { ICertificateData, ICertificateTemplate } from '@oe/api/types/certificate';
import type { IFileResponse } from '@oe/api/types/file';
import type { DialogProps } from '@radix-ui/react-dialog';
import { nanoid } from 'nanoid';
import { useTranslations } from 'next-intl';
import { type ReactNode, useState } from 'react';
import { DatePicker } from '#components/date-picker';
import { Modal } from '#components/modal';
import { Input } from '#shadcn/input';
import { Label } from '#shadcn/label';
import { ExportPDFButton } from '../pdf';
import { CertificateRenderer } from './certificate-renderer';

interface PreviewModalProps extends DialogProps {
  trigger?: ReactNode;
  template: ICertificateTemplate;
  data?: ICertificateData;
  showPlaceholder?: boolean;
  onDownloadSuccess?: (handleClose?: () => void) => void;
}

const createDefaultFile = (url?: string): IFileResponse => {
  const id = nanoid();
  return {
    id,
    url,
    height: 0,
    width: 0,
    name: '',
    size: 0,
    props: {},
    create_at: 0,
    delete_at: 0,
    duration: 0,
    ext: '',
    mime: '',
    user_id: '',
    thumbnail_url: '',
    update_at: 0,
  } as IFileResponse;
};

export const PreviewModal = ({
  trigger,
  template,
  data,
  showPlaceholder = false,
  onDownloadSuccess,
  ...props
}: PreviewModalProps) => {
  const tCertificate = useTranslations('certificate');

  const [sampleData, setSampleData] = useState<ICertificateData>(
    data || {
      learner_name: '',
      course_name: '',
      issue_date: Date.now(),
      organizations: [],
      signatures: [],
    }
  );

  return (
    <Modal
      title={tCertificate('builder.preview.title')}
      trigger={trigger}
      className="md:max-w-[800px]"
      contentClassName="px-4 flex md:overflow-hidden"
      buttons={[
        {
          label: tCertificate('builder.preview.cancel'),
          variant: 'outline',
          type: 'button',
        },
        {
          label: tCertificate('builder.preview.download'),
          component: handleClose => (
            <ExportPDFButton
              key={template.id}
              template={template}
              data={sampleData}
              variant="default"
              className="gap-2"
              onClick={() => {
                onDownloadSuccess?.(handleClose);
              }}
            />
          ),
        },
      ]}
      {...props}
    >
      <div className="relative flex w-full flex-col items-center justify-start md:flex-row md:justify-center">
        <div className="order-1 flex w-full flex-1 md:justify-center md:overflow-hidden">
          <div
            className="origin-center transform md:scale-[0.6]"
            style={{
              width: template.frame?.width,
              height: template.frame?.height,
              aspectRatio: `${template.frame?.width} / ${template.frame?.height}`,
            }}
          >
            <CertificateRenderer template={template} data={sampleData} showPlaceholder={showPlaceholder} />
          </div>
        </div>
        <div className="order-2 flex h-full w-full flex-1 flex-col gap-4">
          <div className="md:scrollbar md:overflow-y-auto">
            <h3 className="mb-2 font-medium text-base">{tCertificate('builder.preview.sampleData')}</h3>
            <div className="space-y-3">
              <div>
                <Label className="mb-1 block font-medium text-sm" htmlFor="learner_name">
                  {tCertificate('builder.preview.studentName')}
                </Label>
                <Input
                  id="learner_name"
                  value={sampleData?.learner_name || ''}
                  onChange={e => {
                    const newData = {
                      ...(sampleData as ICertificateData),
                      learner_name: e.target.value,
                    };
                    setSampleData(newData);
                  }}
                  className="h-8 w-full"
                />
              </div>
              <div>
                <Label className="mb-1 block font-medium text-sm" htmlFor="course_name">
                  {tCertificate('builder.preview.courseName')}
                </Label>
                <Input
                  id="course_name"
                  value={sampleData?.course_name || ''}
                  onChange={e => {
                    const newData = {
                      ...(sampleData as ICertificateData),
                      course_name: e.target.value,
                    };
                    setSampleData(newData);
                  }}
                  className="h-8 w-full"
                />
              </div>
              <div>
                <Label className="mb-1 block font-medium text-sm" htmlFor="issue_date">
                  {tCertificate('builder.preview.issueDate')}
                </Label>
                <DatePicker
                  value={sampleData?.issue_date ? new Date(sampleData.issue_date) : undefined}
                  onChange={e => {
                    setSampleData({
                      ...(sampleData as ICertificateData),
                      issue_date: new Date(e as Date).getTime(),
                    });
                  }}
                  className="h-8 w-full"
                />
              </div>

              <div>
                <Label className="mb-1 block font-medium text-sm">
                  {tCertificate('builder.preview.organizations')}
                </Label>
                <div className="space-y-2">
                  {sampleData.organizations?.map((org, index) => (
                    <div key={org.id} className="space-y-2 rounded-md border p-2">
                      <div className="flex items-center gap-2">
                        <Input
                          value={org.name || ''}
                          placeholder={tCertificate('builder.preview.organizationName')}
                          onChange={e => {
                            const newOrgs = [...(sampleData.organizations || [])];
                            if (newOrgs[index]) {
                              newOrgs[index].name = e.target.value;
                            }
                            setSampleData({
                              ...sampleData,
                              organizations: newOrgs,
                            });
                          }}
                          className="h-8 flex-1"
                        />
                      </div>
                      <div>
                        <Label className="mb-1 block text-xs">{tCertificate('builder.preview.organizationLogo')}</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = event => {
                                const base64 = event.target?.result as string;
                                const newOrgs = [...(sampleData.organizations || [])];
                                if (newOrgs[index]) {
                                  newOrgs[index].logo = createDefaultFile(base64);
                                }
                                const updatedData = {
                                  ...sampleData,
                                  organizations: newOrgs,
                                };
                                setSampleData(updatedData);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        className="rounded-md border p-1 text-sm"
                        onClick={() => {
                          const newOrgs = [...(sampleData.organizations || [])];
                          newOrgs.splice(index, 1);
                          setSampleData({
                            ...sampleData,
                            organizations: newOrgs,
                          });
                        }}
                      >
                        {tCertificate('builder.preview.remove')}
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="rounded-md border p-1 text-sm"
                    onClick={() => {
                      setSampleData({
                        ...sampleData,
                        id: nanoid(),
                        organizations: [
                          ...(sampleData.organizations || []),
                          {
                            id: nanoid(),
                            name: '',
                            logo: createDefaultFile(''),
                          },
                        ],
                      });
                    }}
                  >
                    {tCertificate('builder.preview.addOrganization')}
                  </button>
                </div>
              </div>

              {/* Thêm phần cài đặt cho Signatures */}
              <div>
                <Label className="mb-1 block font-medium text-sm">{tCertificate('builder.preview.signatures')}</Label>
                <div className="space-y-2">
                  {sampleData.signatures?.map((sig, index) => (
                    <div key={sig.id} className="space-y-2 rounded-md border p-2">
                      <div className="flex items-center gap-2">
                        <Input
                          value={sig.educator_name || ''}
                          placeholder={tCertificate('builder.preview.signerName')}
                          onChange={e => {
                            const newSigs = [...(sampleData.signatures || [])];
                            if (newSigs[index]) {
                              newSigs[index].educator_name = e.target.value;
                            }
                            setSampleData({
                              ...sampleData,
                              signatures: newSigs,
                            });
                          }}
                          className="h-8 flex-1"
                        />
                      </div>
                      <div>
                        <Input
                          value={sig.position || ''}
                          placeholder={tCertificate('builder.preview.signerPosition')}
                          onChange={e => {
                            const newSigs = [...(sampleData.signatures || [])];
                            if (newSigs[index]) {
                              newSigs[index].position = e.target.value;
                            }
                            setSampleData({
                              ...sampleData,
                              signatures: newSigs,
                            });
                          }}
                          className="h-8 w-full"
                        />
                      </div>
                      <div>
                        <Label className="mb-1 block text-xs">{tCertificate('builder.preview.signature')}</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = event => {
                                  const base64 = event.target?.result as string;
                                  const newSigs = [...(sampleData.signatures || [])];
                                  if (newSigs[index]) {
                                    newSigs[index].signature = createDefaultFile(base64);
                                  }
                                  setSampleData({
                                    ...sampleData,
                                    signatures: newSigs,
                                  });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="rounded-md border p-1 text-sm"
                        onClick={() => {
                          const newSigs = [...(sampleData.signatures || [])];
                          newSigs.splice(index, 1);
                          setSampleData({
                            ...sampleData,
                            signatures: newSigs,
                          });
                        }}
                      >
                        {tCertificate('builder.preview.remove')}
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="rounded-md border p-1 text-sm"
                    onClick={() => {
                      setSampleData({
                        ...sampleData,
                        id: nanoid(),
                        signatures: [
                          ...(sampleData.signatures || []),
                          {
                            id: nanoid(),
                            educator_name: '',
                            position: '',
                            signature: createDefaultFile(),
                          },
                        ],
                      });
                    }}
                  >
                    {tCertificate('builder.preview.addSignature')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
