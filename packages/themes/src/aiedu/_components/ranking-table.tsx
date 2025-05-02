'use client';
import type { AIEduLeaderBoards } from '@oe/api';
import { Button, Input } from '@oe/ui';
import { ArrowRight, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import type React from 'react';
import { CircularPercentageChart } from './circular-percentage-chart';
interface RankingTableProps {
  leaderBoardsData?: AIEduLeaderBoards[];
}

const RankingTable = ({ leaderBoardsData = [] }: RankingTableProps) => {
  const t = useTranslations('themePage.aiedu.ranking.aieduDashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<AIEduLeaderBoards[]>([]);

  // Initialize the data to display (taking positions 3-11 from the original array)
  useEffect(() => {
    if (leaderBoardsData && leaderBoardsData.length > 2) {
      setFilteredData(leaderBoardsData.slice(2, 11));
    }
  }, [leaderBoardsData]);

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    if (!leaderBoardsData) {
      return;
    }

    if (searchTerm.trim() === '') {
      // If search is empty, reset to default display (positions 3-11)
      setFilteredData(leaderBoardsData.slice(2, 11));
    } else {
      // Filter data based on display_name containing the search term (case insensitive)
      const filtered = leaderBoardsData.filter(province =>
        province.display_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className="relative flex h-10">
        <Search className="absolute left-2 z-1 h-full w-4 text-forground/60" />
        <Input
          className="rounded-lg px-8"
          placeholder="Tìm kiếm theo địa phương"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        <Button className="!rounded-full absolute right-2 mt-1 h-8 w-8" onClick={handleSearch}>
          <ArrowRight className="absolute" />
        </Button>
      </div>

      <div className="mb-6 overflow-hidden rounded-lg border border-secondary">
        <table className="w-full">
          <thead>
            <tr className="border-secondary border-b">
              <th className="px-2 py-3 text-left text-sm sm:text-normal md:px-4">{t('province')}</th>
              <th className="px-2 py-3 text-center text-sm sm:text-normal md:px-4">{t('registerCount')}</th>
              <th className="px-2 py-3 text-center text-sm sm:text-normal md:px-4">{t('certCount')}</th>
              <th className="px-2 py-3 text-center text-sm sm:text-normal md:px-4">{t('percent_cert_on_ref')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((province, index) => (
                // <Link
                //   key={province.id}
                //   href={`/ranking/${province.user_id}`}
                //   className="w-full"
                // >
                <tr key={index.toString()} className="border-secondary border-b hover:bg-primary-foreground">
                  <td className="px-2 py-3 md:px-4">
                    <div className="flex items-center">
                      <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary font-bold text-background text-sm sm:mr-4 sm:h-8 sm:w-8 sm:text-normal">
                        {/* Calculate position dynamically */}
                        {leaderBoardsData.indexOf(province) + 1}
                      </div>
                      <span className="font-bold text-sm sm:text-normal">{province?.display_name ?? '-'}</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 text-center font-bold text-sm sm:text-normal md:px-4">
                    {province.register_count}
                  </td>
                  <td className="px-2 py-3 text-center font-bold text-sm sm:text-normal md:px-4">
                    {province.cert_count}
                  </td>
                  <td className="flex justify-center px-2 py-3 text-center font-bold text-sm sm:text-normal md:px-4">
                    <CircularPercentageChart percentage={Number(province.percent_cert_on_reg) * 100} />
                  </td>
                </tr>
                // </Link>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-3 text-center">
                  Không tìm thấy kết quả
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export { RankingTable };
