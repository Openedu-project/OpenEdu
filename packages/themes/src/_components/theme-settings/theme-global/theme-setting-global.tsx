import type { ThemeGlobal, ThemeSidebarGlobalKey } from '../../../_types/index';
import { ThemeBorderRadius } from './theme-border-radius';
import { ThemeSettingColors } from './theme-color';
import { ThemeFonts } from './theme-font';

interface ThemeSettingGlobalProps {
  isLoading: boolean;
  settingKey: ThemeSidebarGlobalKey;
  themeGlobalData: ThemeGlobal;
  onSubmit: (value: ThemeGlobal) => void;
}

const ThemeSettingGlobal = ({ isLoading, settingKey, themeGlobalData, onSubmit }: ThemeSettingGlobalProps) => {
  const renderContentSettingUIs = () => {
    if (settingKey === 'colors') {
      return (
        <ThemeSettingColors
          colorData={themeGlobalData?.colorVariables}
          isLoading={isLoading}
          onSubmitColor={colorVariables => onSubmit({ ...themeGlobalData, colorVariables })}
        />
      );
    }
    if (settingKey === 'fonts') {
      return (
        <ThemeFonts
          fontData={themeGlobalData?.fonts}
          isLoading={isLoading}
          onSubmitFonts={fonts => onSubmit({ ...themeGlobalData, fonts })}
        />
      );
    }
    if (settingKey === 'radius') {
      return (
        <ThemeBorderRadius
          radiusData={themeGlobalData?.radius}
          isLoading={isLoading}
          onSubmitRadius={radius => onSubmit({ ...themeGlobalData, radius })}
        />
      );
    }
  };
  return <div>{renderContentSettingUIs()}</div>;
};

export { ThemeSettingGlobal };
