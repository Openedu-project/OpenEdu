'use client';
import {
  useDeleteCommission,
  useGetCommissionList,
  usePostCommission,
  usePutCommission,
} from '@oe/api/hooks/useCommission';
import type { ICommissionItem, ICommissionPayload, RefType } from '@oe/api/types/commission';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { RoleButton } from '@oe/ui/components/role-button';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';
import { Badge } from '@oe/ui/shadcn/badge';
import { buttonVariants } from '@oe/ui/shadcn/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@oe/ui/shadcn/dropdown-menu';
import { toast } from '@oe/ui/shadcn/sonner';
import { cn } from '@oe/ui/utils/cn';
import { ChevronDown, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CommissionBonusesModal from './commissions-bonuses-detail';
import DeleteCommissionModal from './commissions-detele-modal';
import FormBaseRateCommissionModal from './commissions-form-base-rate-modal';
import FormPartnerCommissionModal from './commissions-form-partner-modal';
import FormSpecificRefCommissionModal from './commissions-form-specific-ref-modal';

type BadgeVariant = 'success' | 'destructive' | 'secondary' | 'default' | 'outline' | null | undefined;
type StatusType = 'user' | 'kol' | 'purchased_user' | 'agency';

const generateVariantBadge = (status: string): BadgeVariant => {
  const obj: Record<StatusType, BadgeVariant> = {
    user: 'default',
    kol: 'success',
    purchased_user: 'destructive',
    agency: 'outline',
  };

  return obj[status as StatusType] ?? 'secondary';
};

export default function CommissionList() {
  const t = useTranslations('affiliateDetailCommission');
  const tError = useTranslations('errors');

  const tableRef = useRef<TableRef<ICommissionItem>>(null);
  const [selectedItem, setSelectedItem] = useState<ICommissionItem | null>(null);
  const [selectedType, setSelectedType] = useState<RefType>(null);
  const [isOpenBaseRateModal, setOpenBaseRateModal] = useState<boolean>(false);
  const [isOpenPartnerModal, setOpenPartnerModal] = useState<boolean>(false);
  const [isOpenSpecificRefModal, setOpenSpecificRefModal] = useState<boolean>(false);
  const [isOpenBonusModal, setOpenBonusModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [hasBaseCommission, setHasBaseCommission] = useState(false);

  const { campaignId } = useParams() as { campaignId: string | undefined };

  const { dataCommissionList, mutateCommissionList } = useGetCommissionList({
    params: {
      campaign_id: campaignId ?? '',
      parent_id_null: true,
      page: 1,
      per_page: 200,
    },
  });

  const { triggerPostCommission } = usePostCommission();
  const { triggerPutCommission } = usePutCommission();
  const { triggerDeleteCommission } = useDeleteCommission();

  const baseRate = useMemo(
    () => dataCommissionList?.results?.find(commission => commission.referrer_types?.[0] === 'user'),
    [dataCommissionList]
  );

  useEffect(() => {
    if (dataCommissionList?.results && dataCommissionList.results.length > 0) {
      const hasUser = dataCommissionList.results.some((item: ICommissionItem) => item.referrer_types?.[0] === 'user');

      setHasBaseCommission(hasUser);
    }
  }, [dataCommissionList]);

  const addCommissionType = useMemo(
    () => [
      {
        value: 'user',
        label: t('baseCommission'),
        disabled: hasBaseCommission,
      },
      { value: 'kol', label: t('kol') },
      { value: 'agency', label: t('agency') },
      { value: 'purchased_user', label: t('purchasedUser') },
      { value: 'specific_referrer', label: t('specificReferrers') },
    ],
    [hasBaseCommission, t]
  );

  const handleOpenBaseRateModal = useCallback((item: ICommissionItem | null = null) => {
    setSelectedItem(item);
    setIsCreating(!item);
    setOpenBaseRateModal(true);
  }, []);

  const handleCloseBaseRateModal = useCallback(() => {
    setSelectedItem(null);
    setIsCreating(false);
    setOpenBaseRateModal(false);
  }, []);

  const handleOpenPartnerModal = useCallback((item: ICommissionItem | null = null) => {
    setSelectedItem(item);
    setIsCreating(!item);
    setOpenPartnerModal(true);
  }, []);

  const handleClosePartnerModal = useCallback(() => {
    setSelectedItem(null);
    setIsCreating(false);
    setOpenPartnerModal(false);
  }, []);

  const handleOpenSpecificRefModal = useCallback((item: ICommissionItem | null = null) => {
    setSelectedItem(item);
    setIsCreating(!item);
    setOpenSpecificRefModal(true);
  }, []);

  const handleCloseSpecificRefModal = useCallback(() => {
    setSelectedItem(null);
    setIsCreating(false);
    setOpenSpecificRefModal(false);
  }, []);

  const handleOpenDeleteModal = useCallback((item: ICommissionItem | null = null) => {
    setSelectedItem(item);
    setIsOpenDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setSelectedItem(null);
    setIsOpenDeleteModal(false);
  }, []);

  const handleOpenBonusModal = useCallback((item: ICommissionItem | null = null) => {
    setSelectedItem(item);
    setOpenBonusModal(true);
  }, []);

  const handleCloseBonusModal = useCallback(() => {
    setSelectedItem(null);
    setOpenBonusModal(false);
  }, []);

  const handleOpenEditModal = useCallback((item: ICommissionItem) => {
    setSelectedItem(item);
    setSelectedType(item?.referrer_types?.[0] as RefType);
    setIsCreating(false);
    const type = item.referrer_types?.[0];

    switch (type) {
      case 'user': {
        setOpenBaseRateModal(true);
        break;
      }
      case 'kol':
      case 'agency':
      case 'purchased_user': {
        setOpenPartnerModal(true);
        break;
      }
      default: {
        setOpenSpecificRefModal(true);
        break;
      }
    }
  }, []);

  const handleSubmit = useCallback(
    async (value: ICommissionPayload) => {
      try {
        await (isCreating ? triggerPostCommission(value) : triggerPutCommission({ ...selectedItem, ...value }));
        await tableRef.current?.mutate();
        handleCloseBaseRateModal();
        handleClosePartnerModal();
        handleCloseSpecificRefModal();
        await mutateCommissionList();
        toast.success(t(isCreating ? 'createSuccess' : 'updateSuccess'));
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [
      handleCloseBaseRateModal,
      handleClosePartnerModal,
      handleCloseSpecificRefModal,
      isCreating,
      mutateCommissionList,
      selectedItem,
      t,
      tError,
      triggerPostCommission,
      triggerPutCommission,
    ]
  );

  const handleDeleteCommission = useCallback(async () => {
    try {
      await triggerDeleteCommission({
        ids: [selectedItem?.id ?? ''],
        campaign_id: selectedItem?.campaign_id ?? '',
      });
      await tableRef.current?.mutate();
      handleCloseDeleteModal();
      await mutateCommissionList();
      toast.success(t('deleteSuccess'));
    } catch (error) {
      console.error(error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  }, [handleCloseDeleteModal, mutateCommissionList, selectedItem, t, tError, triggerDeleteCommission]);

  const generateCommissionType = useCallback(
    (item: ICommissionItem) => {
      const type = item?.referrer_types?.[0];

      if (type && type !== 'user') {
        return t(type);
      }
      if (!type) {
        return t('specificReferrers');
      }
      return t('baseRate');
    },
    [t]
  );

  const columns: ColumnDef<ICommissionItem>[] = useMemo(
    () => [
      {
        header: t('commissionType'),
        accessorKey: 'referrer_types',
        align: 'center',
        size: 190,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <Badge
              variant={generateVariantBadge(item?.referrer_types?.[0] as keyof BadgeVariant)}
              className="capitalize"
            >
              {generateCommissionType(item)}
            </Badge>
          );
        },
      },
      {
        header: t('ref1Rate'),
        align: 'center',
        cell: ({ row }) => <>{row.original.ref1_rate}%</>,
      },
      {
        header: t('ref2Rate'),
        align: 'center',
        cell: ({ row }) => {
          const item = row.original;

          return item.referrer_types?.[0] === 'user' ? (
            <>{item?.ref2_rate}%</>
          ) : (
            <>{baseRate?.ref2_rate ?? item?.ref2_rate}%</>
          );
        },
      },
      {
        header: t('ref3Rate'),
        align: 'center',
        cell: ({ row }) => {
          const item = row.original;
          return item.referrer_types?.[0] === 'user' ? (
            <>{item.ref3_rate}%</>
          ) : (
            <>{baseRate?.ref3_rate ?? item.ref3_rate}%</>
          );
        },
      },
      {
        header: t('bonus'),
        accessorKey: 'id',
        align: 'center',
        cell: ({ row }) => {
          const item = row.original;

          return item?.bonuses?.length > 0 ? (
            <RoleButton
              action="update"
              variant="link"
              className="min-w-[100px] text-primary underline"
              onClick={() => handleOpenBonusModal(item)}
            >
              {t('seeDetail')}
            </RoleButton>
          ) : null;
        },
      },
      {
        header: t('status'),
        align: 'center',
        accessorKey: 'enable',
        cell: ({ row }) => {
          const item = row.original;
          const enable = item.enable;

          return (
            <Badge
              variant={enable ? 'success' : ('primary' as keyof BadgeVariant)}
              className="w-[120px] justify-center py-1 capitalize"
            >
              {enable ? t('active') : t('inactive')}
            </Badge>
          );
        },
      },
      {
        header: t('action'),
        align: 'center',
        sticky: 'right',
        cell: ({ row }) => {
          const item = row.original;

          return (
            <div className="flex justify-center gap-2">
              <RoleButton
                action="delete"
                variant="destructive"
                className="min-w-[100px]"
                onClick={() => handleOpenDeleteModal(item)}
              >
                {t('delete')}
              </RoleButton>
              <RoleButton
                action="update"
                variant="default"
                className="min-w-[100px]"
                onClick={() => handleOpenEditModal(item)}
              >
                {t('edit')}
              </RoleButton>
            </div>
          );
        },
      },
    ],
    [
      baseRate?.ref2_rate,
      baseRate?.ref3_rate,
      generateCommissionType,
      handleOpenBonusModal,
      handleOpenDeleteModal,
      handleOpenEditModal,
      t,
    ]
  );

  const addCommission = useCallback(
    (value: RefType) => {
      setSelectedType(value);

      switch (value) {
        case 'user': {
          handleOpenBaseRateModal();
          break;
        }
        case 'kol': {
          handleOpenPartnerModal();
          break;
        }
        case 'agency': {
          handleOpenPartnerModal();
          break;
        }
        case 'purchased_user': {
          handleOpenPartnerModal();
          break;
        }
        case 'specific_referrer': {
          handleOpenSpecificRefModal();
          break;
        }

        default: {
          break;
        }
      }
    },
    [handleOpenBaseRateModal, handleOpenPartnerModal, handleOpenSpecificRefModal]
  );

  return (
    <>
      <div className="mb-4 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger className={cn(buttonVariants({ variant: 'default' }))}>
            <Plus className="h-4 w-4" /> {t('addCommission')}
            <ChevronDown className="h-5 w-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {addCommissionType?.map(item => (
              <DropdownMenuItem
                key={item.label}
                onClick={() => addCommission(item.value as RefType)}
                disabled={item.disabled}
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table
        api={API_ENDPOINT.COMMISSIONS}
        apiQueryParams={{
          page: 1,
          per_page: 10,
          sort: 'create_at desc',
          campaign_id: campaignId,
          parent_id_null: true,
        }}
        columns={columns}
        ref={tableRef}
        hasNoColumn
        height="550px"
        border="bordered-rows"
        tableOptions={{
          manualPagination: true,
        }}
      />

      {isOpenBaseRateModal && (
        <FormBaseRateCommissionModal
          selectedType={selectedType}
          data={selectedItem}
          mutateCommissionList={tableRef.current?.mutate as () => void}
          onSubmit={handleSubmit}
          onClose={handleCloseBaseRateModal}
        />
      )}
      {isOpenPartnerModal && (
        <FormPartnerCommissionModal
          selectedType={selectedType}
          data={selectedItem}
          mutateCommissionList={tableRef.current?.mutate as () => void}
          onSubmit={handleSubmit}
          onClose={handleClosePartnerModal}
        />
      )}
      {isOpenSpecificRefModal && (
        <FormSpecificRefCommissionModal
          data={selectedItem}
          mutateCommissionList={tableRef.current?.mutate as () => void}
          onSubmit={handleSubmit}
          onClose={handleCloseSpecificRefModal}
        />
      )}
      {isOpenBonusModal && <CommissionBonusesModal data={selectedItem} onClose={handleCloseBonusModal} />}
      {isOpenDeleteModal && (
        <DeleteCommissionModal
          id={selectedItem?.id ?? ''}
          open={isOpenDeleteModal}
          onClose={handleCloseDeleteModal}
          onSubmit={handleDeleteCommission}
        />
      )}
    </>
  );
}
