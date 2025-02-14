import type {
  AllSectionKeys,
  PageSectionConfig,
  PageSectionConfigs,
  SectionsByPage,
  ThemePageKey,
} from "@oe/themes/types/index";
import {
  DndSortable,
  DndSortableDragButton,
} from "@oe/ui/components/dnd-sortable";
import { Button } from "@oe/ui/shadcn/button";
import { ScrollArea } from "@oe/ui/shadcn/scroll-area";
import { Save } from "lucide-react";
import { useTranslations } from "next-intl";
import { memo, useState } from "react";
import ConfirmSubmitModal from "./confirm-submit-modal";
import { ConfigSection } from "./theme-section-config";
import { ThemeSectionUpdateKeys } from "./theme-section-update-key";

export interface SimpleItem<K extends ThemePageKey> {
  key: SectionsByPage[K];
  content: PageSectionConfig<K>;
}

interface SettingsPanelProps {
  currentPath: string[];
  configSections: PageSectionConfigs<ThemePageKey>;
  defaultConfigSections: PageSectionConfigs<ThemePageKey>; // the template config of the system
  fetchConfigSections?: PageSectionConfigs<ThemePageKey>; // the config was storage by API
  selectedSectionKey?: SectionsByPage[ThemePageKey];
  loadingStates: Partial<Record<SectionsByPage[ThemePageKey], boolean>>;
  isSubmitting: boolean;
  onSectionSelect: (key: SectionsByPage[ThemePageKey] | undefined) => void;
  onConfigUpdate: (configs: PageSectionConfigs<ThemePageKey>) => void;
  onPreview: (
    val: PageSectionConfig<ThemePageKey>,
    sectionKey: SectionsByPage[ThemePageKey]
  ) => void;
  onReset: (sectionKey: SectionsByPage[ThemePageKey]) => void;
  onSubmit: (configSections: PageSectionConfigs<ThemePageKey>) => void;
}

function createMergedObject<T extends PageSectionConfigs<ThemePageKey>>(
  parentObj: T,
  childObj: Partial<T>,
  keys: (keyof T)[]
): Partial<T> {
  const newObj: Partial<T> = {};

  for (const key of keys) {
    // Check if value in childObj exists and is valid
    newObj[key] =
      childObj[key] !== undefined && childObj[key] !== null
        ? childObj[key]
        : parentObj[key];
  }

  return newObj;
}

export const SettingsPanel = memo(function SettingsPanel({
  currentPath,
  configSections,
  defaultConfigSections,
  fetchConfigSections,
  selectedSectionKey,
  loadingStates,
  isSubmitting,
  onSectionSelect,
  onConfigUpdate,
  onPreview,
  onSubmit,
  onReset,
}: SettingsPanelProps) {
  const t = useTranslations("themePageSettings");
  const [openSubmitModal, setOpenSubmitModal] = useState(false);

  const createMenuSection = (): SimpleItem<ThemePageKey>[] => {
    if (configSections && Object.keys(configSections).length > 0) {
      return Object.entries(configSections)
        .sort(([, a], [, b]) => a.order - b.order)
        .map(([key, value]) => ({
          key: key as SectionsByPage[ThemePageKey],
          content: value,
        }));
    }
    return [];
  };

  const sortedConfig = (configs: PageSectionConfigs<ThemePageKey>) => {
    let newConfigs = {};
    if (configs && Object.keys(configs).length > 0) {
      Object.entries(configs).map(([_key, value], index) => {
        newConfigs = {
          ...newConfigs,
          [value.key as unknown as string]: { ...value.content, order: index },
        };
      });
    }

    return newConfigs;
  };

  // Add or remove section to configSections based on keys and defaultConfigSections.
  const handleUpdateSectionKeys = (keys: AllSectionKeys[]) => {
    if (!fetchConfigSections) {
      // TODO: show toast warning - no data fetching
      return;
    }
    const newConfig = createMergedObject(
      defaultConfigSections,
      fetchConfigSections,
      keys
    );
    onConfigUpdate(newConfig);
  };

  return (
    <div>
      <div className="flex justify-end border-b p-4 ">
        <Button
          onClick={() => {
            setOpenSubmitModal(true);
          }}
          disabled={isSubmitting}
        >
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? t("saving") : t("save")}
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-10rem)]">
        <div className="space-y-4 pt-4 pr-4">
          <ThemeSectionUpdateKeys
            defaultConfigSectionKeys={
              Object.keys(defaultConfigSections) as AllSectionKeys[]
            }
            configSectionKeys={Object.keys(configSections) as AllSectionKeys[]}
            onUpdateSectionKeys={handleUpdateSectionKeys}
          />
          <DndSortable<SimpleItem<ThemePageKey>, unknown>
            data={createMenuSection()}
            dataConfig={{
              idProp: "key",
              type: "array",
              direction: "vertical",
            }}
            className="flex flex-col gap-4"
            renderConfig={{
              renderItem: ({ item }) => {
                return (
                  <ConfigSection
                    sectionKey={item.original.key}
                    config={item.original.content}
                    isSelected={item.original.key === selectedSectionKey}
                    isLoading={!!loadingStates?.[item.original.key]}
                    currentPath={currentPath}
                    dragButton={<DndSortableDragButton />}
                    onSelect={onSectionSelect}
                    onPreview={onPreview}
                    onReset={onReset}
                  />
                );
              },
            }}
            onChange={(configs) => {
              const newConfigs = sortedConfig(
                configs as PageSectionConfigs<ThemePageKey>
              );
              onConfigUpdate(newConfigs);
            }}
          />
        </div>
      </ScrollArea>

      {openSubmitModal && (
        <ConfirmSubmitModal
          onClose={()=>            setOpenSubmitModal(false)          }
          onSubmit={() => {
            onSubmit(configSections);
            setOpenSubmitModal(false);
          }}
        />
      )}
    </div>
  );
});
