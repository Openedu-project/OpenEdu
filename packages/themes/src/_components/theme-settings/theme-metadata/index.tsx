"use client";
import type { IFileResponse } from "@oe/api/types/file";
import { Uploader } from "@oe/ui/components/uploader";
import { Button } from "@oe/ui/shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "@oe/ui/shadcn/card";
import { Input } from "@oe/ui/shadcn/input";
import { Label } from "@oe/ui/shadcn/label";
import { Switch } from "@oe/ui/shadcn/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@oe/ui/shadcn/tabs";
import { Textarea } from "@oe/ui/shadcn/textarea";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { defaultMetadata } from "../../../_config/theme-metadata";
import type { ThemeMetadata, ThemeMetadataIcons } from "../../../_types";

interface ThemeConfigMetaDataProps {
  isSubmitting?: boolean;
  data?: ThemeMetadata;
  isRoot?: boolean;
  onSubmit: (data: ThemeMetadata) => void;
}

const ThemeConfigMetadata = ({
  data,
  isRoot = false,
  isSubmitting,
  onSubmit,
}: ThemeConfigMetaDataProps) => {
  const [seoData, setSeoData] = useState<ThemeMetadata | undefined>(defaultMetadata);

  useEffect(()=>{
    if(data){
      setSeoData(data);
    }
  },[data])

  const handleInputChange = (
    key: keyof Pick<ThemeMetadata, "title" | "description" | "keywords">,
    value: string
  ) => {
    if (!seoData) {
      return;
    }

    setSeoData((prev) => (prev ? { ...prev, [key]: value } : undefined));
  };

  const handleNestedInputChange = (
    parentKey: keyof Pick<ThemeMetadata, "openGraph" | "robots" | "alternates">,
    childKey: string,
    value: string | boolean | string[]
  ) => {
    if (!seoData) {
      return;
    }

    setSeoData((prev) => {
      if (!prev) {
        return undefined;
      }

      return {
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: value,
        },
      };
    });
  };

  const handleIconChange = (
    key: keyof ThemeMetadataIcons,
    value?: IFileResponse
  ) => {
    if (!(seoData && isRoot)) {
      return;
    }

    setSeoData((prev) =>
      prev
        ? {
            ...prev,
            icons: {
              ...prev.icons,
              [key]: value,
            },
          }
        : undefined
    );
  };

  const handleSave = () => {
    if (!seoData) {
      return;
    }
    onSubmit(seoData);
  };

  const calculateLength = (text: string, limit: number) => {
    const length = text?.length || 0;
    return `${length}/${limit}`;
  };

  return (
    seoData && (
      <Card className="w-full rounded-none border-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>SEO Configuration</CardTitle>
            <p className="mt-1 text-muted-foreground text-sm">
              Optimize your page for search engines
            </p>
          </div>
          <Button onClick={handleSave} disabled={!!isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            Save SEO Settings
          </Button>
        </CardHeader>
        <CardContent className="flex justify-between gap-8">
          <Tabs defaultValue="basic" className="w-full border-r pr-8">
            <TabsList>
              <TabsTrigger value="basic">Basic SEO</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              {isRoot && <TabsTrigger value="icons">Icons</TabsTrigger>}
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-2">
                <Label>
                  Page Title
                  <span className="text-muted-foreground text-xs">
                    ({calculateLength(seoData.title, 60)})
                  </span>
                </Label>
                <Input
                  value={seoData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  maxLength={60}
                  placeholder="Enter page title"
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Meta Description
                  <span className="text-muted-foreground text-xs">
                    ({calculateLength(seoData.description, 160)})
                  </span>
                </Label>
                <Textarea
                  value={seoData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  maxLength={160}
                  placeholder="Enter meta description"
                  className="h-20"
                />
              </div>

              <div className="space-y-2">
                <Label>Keywords</Label>
                <Input
                  value={seoData.keywords}
                  onChange={(e) =>
                    handleInputChange("keywords", e.target.value)
                  }
                  placeholder="Enter keywords, separated by commas"
                />
              </div>
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <div className="space-y-2">
                <Label>OG Title</Label>
                <Input
                  value={seoData.openGraph?.title}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "openGraph",
                      "title",
                      e.target.value
                    )
                  }
                  placeholder="Enter Open Graph title"
                />
              </div>

              <div className="space-y-2">
                <Label>OG Description</Label>
                <Textarea
                  value={seoData.openGraph?.description}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "openGraph",
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Enter Open Graph description"
                  className="h-20"
                />
              </div>

              <div className="space-y-2">
                <Label>OG Images</Label>
                <Input
                  value={seoData.openGraph?.images?.join(", ")}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "openGraph",
                      "images",
                      e.target.value.split(",").map((s) => s.trim())
                    )
                  }
                  placeholder="Enter Open Graph image URLs, separated by commas"
                />
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="space-y-2">
                <Label>Canonical URL</Label>
                <Input
                  value={seoData.alternates?.canonical}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "alternates",
                      "canonical",
                      e.target.value
                    )
                  }
                  placeholder="Enter canonical URL"
                />
              </div>

              <div className="space-y-4">
                <Label>Robots Meta Tags</Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Indexing</Label>
                      <p className="text-muted-foreground text-sm">
                        Allow search engines to index this page
                      </p>
                    </div>
                    <Switch
                      checked={seoData.robots?.index}
                      onCheckedChange={(checked) =>
                        handleNestedInputChange("robots", "index", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Following</Label>
                      <p className="text-muted-foreground text-sm">
                        Allow search engines to follow links on this page
                      </p>
                    </div>
                    <Switch
                      checked={seoData.robots?.follow}
                      onCheckedChange={(checked) =>
                        handleNestedInputChange("robots", "follow", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {isRoot && (
              <TabsContent
                value="icons"
                className="overflow-scroll-y h-[66vh] space-y-4"
              >
                <div className="space-y-2">
                  <Label>Main Icon URL</Label>
                  <Uploader
                    listType="picture"
                    accept="image/*"
                    fileListVisible={false}
                    aspectRatio={1}
                    crop={true}
                    cropProps={{
                      crop: { unit: "px", x: 0, y: 0, width: 12, height: 12 },
                    }}
                    value={seoData?.icons?.icon ? [seoData?.icons?.icon] : []}
                    onChange={(files) => {
                      handleIconChange("icon", files?.[0]);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Shortcut Icon URL</Label>
                  <Uploader
                    listType="picture"
                    accept="image/*"
                    fileListVisible={false}
                    aspectRatio={1}
                    crop={true}
                    cropProps={{
                      crop: { unit: "px", x: 0, y: 0, width: 12, height: 12 },
                    }}
                    value={
                      seoData?.icons?.shortcut ? [seoData?.icons?.shortcut] : []
                    }
                    onChange={(files) => {
                      files?.[0] && handleIconChange("shortcut", files?.[0]);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Apple Icon URL</Label>
                  <Uploader
                    listType="picture"
                    accept="image/*"
                    fileListVisible={false}
                    aspectRatio={1}
                    crop={true}
                    cropProps={{
                      crop: { unit: "px", x: 0, y: 0, width: 12, height: 12 },
                    }}
                    value={seoData?.icons?.apple ? [seoData?.icons?.apple] : []}
                    onChange={(files) => {
                      files?.[0] && handleIconChange("apple", files?.[0]);
                    }}
                  />
                </div>
              </TabsContent>
            )}
          </Tabs>

          <div className="w-full space-y-4">
            <Label>Preview</Label>
            <Card className="p-4">
              <h2 className="cursor-pointer text-blue-600 text-xl hover:underline">
                {seoData.title || "Page Title"}
              </h2>
              <p className="mt-1 text-gray-600 text-sm">
                {seoData.description || "Meta description will appear here..."}
              </p>
            </Card>
          </div>
        </CardContent>
      </Card>
    )
  );
};

export default ThemeConfigMetadata;
