import AssetListCards from './asset-list-cards';
import AssetListHeader from './asset-list-header';
import AssetListTable from './asset-list-table';

const AssetList = () => {
  return (
    <div className="w-full">
      <AssetListHeader />
      {/* Table for larger screens */}
      <AssetListTable />
      {/* Card layout for mobile screens */}
      <AssetListCards />
    </div>
  );
};

export default AssetList;
