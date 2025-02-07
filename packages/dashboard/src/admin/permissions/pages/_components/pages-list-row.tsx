import type {
  IPermissionAction,
  IPermissionRouteInfo,
  IPermissionRouteKey,
  IPermissionSelectedActions,
} from '@oe/api/types/permissions';
import { Checkbox } from '@oe/ui/shadcn/checkbox';
import { TableCell, TableRow } from '@oe/ui/shadcn/table';
import { DEFAULT_ACTIONS_PERMISSION } from '../../permission-constant';

export const RouteRow = ({
  route,
  selectedActions,
  onActionToggle,
  onSelectAllForRoute,
}: {
  route: IPermissionRouteInfo;
  selectedActions: IPermissionSelectedActions;
  onActionToggle: (routeKey: IPermissionRouteKey, action: IPermissionAction) => void;
  onSelectAllForRoute: (routeKey: IPermissionRouteKey) => void;
}) => (
  <TableRow key={route.key}>
    <TableCell className="whitespace-nowrap bg-white font-medium capitalize">{route.name}</TableCell>
    <TableCell className="whitespace-nowrap bg-white text-gray-600">{route.path}</TableCell>
    {DEFAULT_ACTIONS_PERMISSION.map(action => (
      <TableCell key={action} className="text-center">
        <Checkbox
          checked={selectedActions[route.key]?.[action]}
          onCheckedChange={() => onActionToggle(route.key, action)}
        />
      </TableCell>
    ))}
    <TableCell className="text-center">
      <Checkbox
        checked={DEFAULT_ACTIONS_PERMISSION.every(action => selectedActions[route.key]?.[action])}
        onCheckedChange={() => onSelectAllForRoute(route.key)}
      />
    </TableCell>
  </TableRow>
);
