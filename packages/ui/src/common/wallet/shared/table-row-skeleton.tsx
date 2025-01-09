import { TableCell, TableRow } from "#shadcn/table";

const TableRowSkeleton = ({ rowCount = 1, columnCount = 4 }) => {
  const rows = Array.from({ length: rowCount }, (_, rowIndex) => (
    <TableRow key={rowIndex} className="animate-pulse">
      {Array.from({ length: columnCount }, (_, colIndex) => (
        <TableCell key={colIndex} className="h-20 bg-gray-200" />
      ))}
    </TableRow>
  ));

  return <>{rows}</>;
};

export default TableRowSkeleton;
