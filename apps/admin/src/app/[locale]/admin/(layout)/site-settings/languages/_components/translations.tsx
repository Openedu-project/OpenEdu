'use client';
import { type RankingInfo, rankItem, rankings } from '@oe/core/utils/match-sorter';
import { DEFAULT_LOCALE } from '@oe/i18n/constants';
import type { CustomFilterPayload, FilterOption } from '@oe/ui/components/filter-search';
import {
  type ColumnDef,
  type FilterFn,
  type Row,
  Table,
  TableEditableCell,
  type TableRef,
} from '@oe/ui/components/table';
import { Badge } from '@oe/ui/shadcn/badge';
import { Button } from '@oe/ui/shadcn/button';
// import { type RankingInfo, rankItem, rankings } from '@tanstack/match-sorter-utils';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { type TranslationItem, type TranslationSubItem, useLanguageStore } from '../_store/useLanguageStore';

type TranslationFilterValue = {
  locale: string;
  [key: string]: string | boolean;
};

type FilterValue = {
  id: string;
  value: TranslationFilterValue;
};

const filterTranslations: FilterFn<TranslationItem> = (row, columnId, filterValue) => {
  let itemRank: RankingInfo | undefined;

  if (columnId === 'key') {
    itemRank = rankItem(row.original[columnId], filterValue);
  }
  if (columnId === 'translation') {
    itemRank = rankItem(row.original[columnId], filterValue);

    if (!itemRank?.passed) {
      for (const subRow of row.original.subRows) {
        const subItemRank = rankItem(subRow[columnId], filterValue, {
          threshold: rankings.MATCHES,
        });
        if (subItemRank?.passed) {
          itemRank = subItemRank;
          break;
        }
      }
    }
  }

  if (columnId === 'translated') {
    const value = (filterValue as TranslationFilterValue)[columnId]?.toString() ?? '';
    const locale = (filterValue as TranslationFilterValue).locale;
    if (locale === DEFAULT_LOCALE) {
      itemRank = rankItem(row.original[columnId], value);
    } else {
      itemRank = rankItem(row.original.subRows.find(sub => sub.locale === locale)?.[columnId], value);
    }
  }
  return itemRank?.passed ?? false;
};

const customFilter = (columnId: string, { filter, value, prev }: CustomFilterPayload) => {
  const newFilter: FilterValue = {
    id: columnId,
    value: {
      locale: filter.value as string,
      [columnId]: value as boolean,
    },
  };

  const existingFilter = prev?.find(f => f.id === columnId);
  if (existingFilter) {
    return prev?.map(f => (f.id === columnId ? newFilter : f));
  }

  return [...(prev ?? []), newFilter];
};

export default function Translations() {
  const t = useTranslations('languages');
  const tGeneral = useTranslations('general');
  const { translations, locales, updateTranslations, updateTableData } = useLanguageStore();
  const tableRef = useRef<TableRef<TranslationItem>>(null);

  useEffect(() => {
    tableRef.current?.table.toggleAllRowsExpanded(true);
  }, []);

  const handleTranslationUpdate = useCallback(
    (row: Row<TranslationItem | TranslationSubItem>, value: string, columnId: string, isParent?: boolean) => {
      row.original.translated = value.trim() !== '';
      updateTableData(row.index, columnId, value, isParent);
      updateTranslations();
    },
    [updateTranslations, updateTableData]
  );

  const filterOptions: FilterOption[] = useMemo(
    () => [
      {
        id: 'key',
        value: 'key',
        label: t('key'),
        type: 'search',
      },
      {
        id: 'translation',
        value: 'translation',
        label: t('translation'),
        type: 'search',
      },
      ...(locales.map(locale => ({
        id: locale.value,
        value: locale.value,
        label: locale.label,
        type: 'select',
        options: [
          { value: true, label: t('translated') },
          { value: false, label: t('untranslated') },
        ],
        customFilter: (payload: CustomFilterPayload) => customFilter('translated', payload),
      })) as FilterOption[]),
    ],
    [t, locales]
  );

  const columns: ColumnDef<TranslationItem>[] = [
    {
      header: t('key'),
      accessorKey: 'key',
      size: 200,
      filterFn: filterTranslations,
    },
    {
      id: 'translation',
      header: t('english'),
      accessorKey: 'translation',
      size: 500,
      cell: info => (
        <TableEditableCell
          {...info}
          textarea
          onUpdate={(row, value) => handleTranslationUpdate(row, value, 'translation', true)}
        />
      ),
      className: 'flex-1',
      filterFn: filterTranslations,
    },
    {
      header: t('status'),
      accessorKey: 'translated',
      cell: ({ row }) => {
        return (
          <Badge variant={row.getValue('translated') ? 'success' : 'destructive'}>
            {row.original.translated ? t('translated') : t('untranslated')}
          </Badge>
        );
      },
      size: 200,
      enableSorting: false,
      filterFn: filterTranslations,
    },
  ];

  const subColumns: ColumnDef<TranslationSubItem>[] = [
    {
      id: 'id',
      size: 50,
    },
    {
      id: 'language',
      header: t('language'),
      accessorKey: 'language',
      size: 200,
    },
    {
      id: 'translation',
      header: t('translation'),
      accessorKey: 'translation',
      size: 500,
      cell: info => (
        <TableEditableCell
          {...info}
          textarea
          onUpdate={(row, value) => handleTranslationUpdate(row, value, 'translation')}
        />
      ),
      className: 'flex-1',
    },
    {
      header: t('status'),
      accessorKey: 'translated',
      cell: info => (
        <Badge variant={info.getValue() ? 'success' : 'destructive'}>
          {info.getValue() ? t('translated') : t('untranslated')}
        </Badge>
      ),
      size: 200,
      enableSorting: false,
    },
  ];

  const handleSave = () => {
    console.info('save', translations);
  };

  return (
    <div className="space-y-4 rounded bg-background p-4">
      <Table
        columns={columns}
        data={translations}
        filterOptions={filterOptions}
        height="500px"
        hasVirtualized
        hasExpand
        ref={tableRef}
        renderSubComponent={({ row }) => {
          return (
            <Table
              className="overflow-hidden"
              data={row.original.subRows}
              columns={subColumns}
              hasPagination={false}
              stickyHeader={false}
            />
          );
        }}
      >
        <Button onClick={handleSave}>{tGeneral('save')}</Button>
      </Table>
    </div>
  );
}
