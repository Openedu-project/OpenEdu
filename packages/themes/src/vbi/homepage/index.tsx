import { PreviewPanel } from '../../_components/theme-settings/theme-page/theme-preview-panel';
import type { SectionComponent } from '../../_types';

const Homepage: SectionComponent<'homepage', 'theme'> = ({ props }) => {
  if (!props) {
    return;
  }
  return (
    <PreviewPanel
      themeName={props?.themeName}
      selectedPage={props?.selectedPage}
      pageConfig={props?.pageConfig}
      currentConfigSections={props?.currentConfigSections}
      renderByServer
    />
  );
};
export default Homepage;
