import type { IUserRole } from '@oe/api/types/user-profile';
import { create } from 'zustand';

interface ShowItem {
  id: string;
  cuid?: string;
  is_show?: boolean;
}

interface IShowItemsStore<T extends ShowItem> {
  showItemList: T[];
  initialData: T[];
  addItem: (item: T) => void;
  removeItem: (cuid: string, isCert?: boolean) => void;
  setInitialData: (data: T[]) => void;
}

export const useShowProfileItemsStore = create<IShowItemsStore<ShowItem>>(set => {
  return {
    showItemList: [],
    initialData: [],

    addItem: item =>
      set(state => {
        return {
          showItemList: [...state.showItemList, item],
        };
      }),

    removeItem: (cuid, isCert) =>
      set(state => {
        return {
          showItemList: isCert
            ? state.showItemList.filter(item => item.id !== cuid)
            : state.showItemList.filter(item => item.cuid !== cuid),
        };
      }),

    setInitialData: data =>
      set({
        initialData: data,
        showItemList: data.filter(item => item.is_show),
      }),
  };
});

interface UserRoleState {
  roles: IUserRole[];
  setRoles: (roles: IUserRole[]) => void;
  filterUserData: () => IUserRole[];
  isCreator: () => boolean;
}

export const useUserRoleStore = create<UserRoleState>((set, get) => {
  return {
    roles: [],

    setRoles: roles => set({ roles }),

    filterUserData() {
      const { roles } = get();
      const orgMap: { [key: string]: IUserRole } = {};

      for (const role of roles) {
        if (role.role_id !== 'learner' && role.role_id !== 'guest') {
          const orgId = role.org_id;

          if (!orgMap[orgId]) {
            orgMap[orgId] = {
              org_id: orgId,
              org_name:
                role.org_name.length > 0 ? role.org_name : role.org_domain ? (role.org_domain.split('.')[0] ?? '') : '',
              role_id: role.role_id,
              org_domain: role.org_domain,
            };
          }
        }
      }

      // return Object.values(orgMap);
      const result = Object.values(orgMap).sort((a, b) => {
        // Organizations with non-empty names come first
        if (a.org_name.length > 0 && b.org_name.length === 0) {
          return -1;
        }
        if (a.org_name.length === 0 && b.org_name.length > 0) {
          return 1;
        }

        // If both have names or both don't have names, sort alphabetically
        return a.org_name.localeCompare(b.org_name);
      });

      return result;
    },

    isCreator() {
      const { roles } = get();

      return roles.some(role => role.role_id === 'partner');
    },
  };
});
