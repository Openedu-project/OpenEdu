import { Button } from '@oe/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@oe/ui';
import { Label } from '@oe/ui';
import { Popover, PopoverContent, PopoverTrigger } from '@oe/ui';
import { ScrollArea } from '@oe/ui';
import { Separator } from '@oe/ui';
import { Switch } from '@oe/ui';
import { Moon, RotateCcw, Save, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { initialThemeGlobalColors } from '../../../_config/theme-global-initial';
import type { ThemeGlobalColorConfig, ThemeMode } from '../../../_types/index';
import { getHSLPreview } from '../../../_utils/function';
import { hslStringToHex, setColorScheme, setRootCSSVariable } from './_utils';
import { ColorPicker } from './color-picker';

interface ThemeSettingColorsProps {
  isLoading: boolean;
  colorData?: ThemeGlobalColorConfig;
  onSubmitColor: (color: ThemeGlobalColorConfig) => void;
}

const ThemeSettingColors = ({ onSubmitColor, isLoading, colorData }: ThemeSettingColorsProps) => {
  const t = useTranslations('themeUI.color');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ThemeMode>('light');
  const [themeConfig, setThemeConfig] = useState<ThemeGlobalColorConfig>(initialThemeGlobalColors);

  const handleVariableChange = (variable: string, value: string) => {
    setThemeConfig(prev => ({
      ...prev,
      [activeTheme]: {
        ...prev[activeTheme],
        [variable]: value,
      },
    }));
    setRootCSSVariable(variable, `hsl(${value})`);
  };

  const toggleTheme = () => {
    const newTheme = activeTheme === 'light' ? 'dark' : 'light';
    setActiveTheme(newTheme);
    setIsDarkMode(newTheme === 'dark');
    document.documentElement.classList.toggle('dark');

    setColorScheme(themeConfig[newTheme]);
  };

  const handleReset = () => {
    setThemeConfig(initialThemeGlobalColors);
    setColorScheme(initialThemeGlobalColors[activeTheme]);
    onSubmitColor(initialThemeGlobalColors);
  };

  const handleSave = () => {
    onSubmitColor(themeConfig);
  };

  const variableGroups = {
    [t('groups.baseColors')]: ['--background', '--foreground'],
    [t('groups.componentColors')]: ['--card', '--card-foreground', '--popover', '--popover-foreground'],
    [t('groups.primaryColors')]: ['--primary', '--primary-foreground'],
    [t('groups.secondaryColors')]: ['--secondary', '--secondary-foreground'],
    [t('groups.accentColors')]: ['--accent', '--accent-foreground'],
    [t('groups.stateColors')]: [
      '--destructive',
      '--destructive-foreground',
      '--warning',
      '--warning-foreground',
      '--success',
      '--success-foreground',
      '--info',
      '--info-foreground',
    ],
    [t('groups.uiElements')]: ['--muted', '--muted-foreground', '--border', '--input', '--ring'],
  };

  useEffect(() => {
    setThemeConfig(colorData || initialThemeGlobalColors);
  }, [colorData]);

  return (
    <Card className="w-full rounded-none border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('title')}</CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
            <Moon className="h-4 w-4" />
          </div>
          <Button variant="outline" size="icon" onClick={handleReset} title={t('actions.reset')}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {t('actions.saveTheme')}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[720px] pr-4">
          {Object.entries(variableGroups).map(([groupName, variables]) => (
            <div key={groupName} className="mb-8">
              <h3 className="mb-4 font-semibold text-lg">{groupName}</h3>
              <div className="grid grid-cols-2 gap-4">
                {variables.map(variable => {
                  const value = themeConfig?.[activeTheme][variable] || '';
                  const variableName = variable.replace('--', '');
                  return (
                    <div key={variable} className="flex items-center gap-4">
                      <Label className="min-w-[150px] text-sm">{t(`variables.${variableName}`)}</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            className="h-10 w-24 rounded border transition-all hover:ring-2 hover:ring-ring"
                            style={{ backgroundColor: getHSLPreview(value) }}
                          />
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <ColorPicker
                            defaultColor={hslStringToHex(value)}
                            onColorSelect={color => handleVariableChange(variable, color)}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  );
                })}
              </div>
              <Separator className="my-4" />
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export { ThemeSettingColors };
