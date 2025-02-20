'use client';

import { Button } from '@oe/ui/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@oe/ui/shadcn/card';
import { Input } from '@oe/ui/shadcn/input';
import { Label } from '@oe/ui/shadcn/label';
import { Slider } from '@oe/ui/shadcn/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@oe/ui/shadcn/tabs';
import { ImageIcon, Settings, Trash2, Type } from 'lucide-react';
import React from 'react';

interface CertificateStyle {
  titleSize: number;
  nameSize: number;
  descriptionSize: number;
  dateSize: number;
  titleColor: string;
  textColor: string;
  layout: 'left' | 'center' | 'right';
}

interface CertificateImages {
  frame: string | null;
  logo: string | null;
  signature: string | null;
}

interface Certificate {
  title: string;
  description: string;
  studentName: string;
  courseName: string;
  date: string;
  style: CertificateStyle;
  images: CertificateImages;
}

const CertificateBuilder: React.FC = () => {
  const [certificate, setCertificate] = React.useState<Certificate>({
    title: 'Certificate of Completion',
    description: 'This is to certify that',
    studentName: 'John Doe',
    courseName: 'React Development Course',
    date: new Date().toLocaleDateString(),
    style: {
      titleSize: 40,
      nameSize: 32,
      descriptionSize: 16,
      dateSize: 14,
      titleColor: '#2B3674',
      textColor: '#2B3674',
      layout: 'center',
    },
    images: {
      frame: null,
      logo: null,
      signature: null,
    },
  });

  const handleStyleChange = (key: keyof CertificateStyle, value: string | number): void => {
    setCertificate(prev => ({
      ...prev,
      style: {
        ...prev.style,
        [key]: value,
      },
    }));
  };

  const handleTextChange = (key: keyof Certificate, value: string): void => {
    setCertificate(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImageUpload = (type: keyof CertificateImages, event?: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event?.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setCertificate(prev => ({
            ...prev,
            images: {
              ...prev.images,
              [type]: result,
            },
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Preview Component
  const CertificatePreview: React.FC = () => (
    <div className="relative h-96 w-full overflow-hidden rounded-lg border bg-white">
      {certificate.images.frame && (
        <img
          src={certificate.images.frame}
          alt="Certificate Frame"
          className="absolute inset-0 h-full w-full object-contain"
        />
      )}

      <div className={`relative flex h-full w-full flex-col items-${certificate.style.layout} justify-center p-8`}>
        {certificate.images.logo && (
          <img src={certificate.images.logo} alt="Logo" className="mb-4 h-24 w-24 object-contain" />
        )}

        <h1
          style={{
            fontSize: `${certificate.style.titleSize}px`,
            color: certificate.style.titleColor,
          }}
          className="mb-4 font-bold"
        >
          {certificate.title}
        </h1>

        <p
          style={{
            fontSize: `${certificate.style.descriptionSize}px`,
            color: certificate.style.textColor,
          }}
          className="mb-2"
        >
          {certificate.description}
        </p>

        <h2
          style={{
            fontSize: `${certificate.style.nameSize}px`,
            color: certificate.style.textColor,
          }}
          className="mb-4 font-bold"
        >
          {certificate.studentName}
        </h2>

        <p
          style={{
            fontSize: `${certificate.style.descriptionSize}px`,
            color: certificate.style.textColor,
          }}
          className="mb-2"
        >
          has successfully completed the course
        </p>

        <h2
          style={{
            fontSize: `${certificate.style.nameSize}px`,
            color: certificate.style.textColor,
          }}
          className="mb-8 font-bold"
        >
          {certificate.courseName}
        </h2>

        {certificate.images.signature && (
          <img src={certificate.images.signature} alt="Signature" className="mb-2 h-16 w-32 object-contain" />
        )}

        <p
          style={{
            fontSize: `${certificate.style.dateSize}px`,
            color: certificate.style.textColor,
          }}
          className="mt-4"
        >
          {certificate.date}
        </p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">
      {/* Preview Section */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Certificate Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <CertificatePreview />
        </CardContent>
      </Card>

      {/* Editor Section */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Certificate Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="content">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content" className="flex items-center gap-2">
                <Type className="h-4 w-4" /> Content
              </TabsTrigger>
              <TabsTrigger value="style" className="flex items-center gap-2">
                <Settings className="h-4 w-4" /> Style
              </TabsTrigger>
              <TabsTrigger value="images" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" /> Images
              </TabsTrigger>
            </TabsList>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={certificate.title} onChange={e => handleTextChange('title', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={certificate.description}
                  onChange={e => handleTextChange('description', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Student Name</Label>
                <Input
                  value={certificate.studentName}
                  onChange={e => handleTextChange('studentName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Course Name</Label>
                <Input value={certificate.courseName} onChange={e => handleTextChange('courseName', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" onChange={e => handleTextChange('date', e.target.value)} />
              </div>
            </TabsContent>

            {/* Style Tab */}
            <TabsContent value="style" className="space-y-4">
              <div className="space-y-2">
                <Label>Title Size: {certificate.style.titleSize}px</Label>
                <Slider
                  value={[certificate.style.titleSize]}
                  min={20}
                  max={60}
                  step={1}
                  onValueChange={([value]) => handleStyleChange('titleSize', value as number)}
                />
              </div>
              <div className="space-y-2">
                <Label>Name Size: {certificate.style.nameSize}px</Label>
                <Slider
                  value={[certificate.style.nameSize]}
                  min={16}
                  max={48}
                  step={1}
                  onValueChange={([value]) => handleStyleChange('nameSize', value as number)}
                />
              </div>
              <div className="space-y-2">
                <Label>Description Size: {certificate.style.descriptionSize}px</Label>
                <Slider
                  value={[certificate.style.descriptionSize]}
                  min={12}
                  max={24}
                  step={1}
                  onValueChange={([value]) => handleStyleChange('descriptionSize', value as number)}
                />
              </div>
              <div className="space-y-2">
                <Label>Title Color</Label>
                <Input
                  type="color"
                  value={certificate.style.titleColor}
                  onChange={e => handleStyleChange('titleColor', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Text Color</Label>
                <Input
                  type="color"
                  value={certificate.style.textColor}
                  onChange={e => handleStyleChange('textColor', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Layout</Label>
                <div className="flex gap-2">
                  <Button
                    variant={certificate.style.layout === 'left' ? 'default' : 'outline'}
                    onClick={() => handleStyleChange('layout', 'left')}
                  >
                    Left
                  </Button>
                  <Button
                    variant={certificate.style.layout === 'center' ? 'default' : 'outline'}
                    onClick={() => handleStyleChange('layout', 'center')}
                  >
                    Center
                  </Button>
                  <Button
                    variant={certificate.style.layout === 'right' ? 'default' : 'outline'}
                    onClick={() => handleStyleChange('layout', 'right')}
                  >
                    Right
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Images Tab */}
            <TabsContent value="images" className="space-y-4">
              <div className="space-y-2">
                <Label>Certificate Frame</Label>
                <div className="flex items-center gap-2">
                  <Input type="file" accept="image/*" onChange={e => handleImageUpload('frame', e)} />
                  {certificate.images.frame && (
                    <Button variant="destructive" size="icon" onClick={() => handleImageUpload('frame')}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="flex items-center gap-2">
                  <Input type="file" accept="image/*" onChange={e => handleImageUpload('logo', e)} />
                  {certificate.images.logo && (
                    <Button variant="destructive" size="icon" onClick={() => handleImageUpload('logo')}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Signature</Label>
                <div className="flex items-center gap-2">
                  <Input type="file" accept="image/*" onChange={e => handleImageUpload('signature', e)} />
                  {certificate.images.signature && (
                    <Button variant="destructive" size="icon" onClick={() => handleImageUpload('signature')}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificateBuilder;
