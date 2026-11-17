"use client";

// Rendering pattern adapted from UTaker-dashboard's MIT DataTable; upgraded to TanStack v9.
import { createPaginatedRowModel, createSortedRowModel, rowPaginationFeature, rowSortingFeature, sortFns, tableFeatures, useTable, type ColumnDef } from "@tanstack/react-table";
import type { ReactNode } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./dashboard.module.css";

const features = tableFeatures({ rowSortingFeature, sortedRowModel: createSortedRowModel(), sortFns, rowPaginationFeature, paginatedRowModel: createPaginatedRowModel() });
export type DashboardColumn<TData extends object> = ColumnDef<typeof features, TData>;
interface DataTableProps<TData extends object> {
  readonly id: string;
  readonly data: TData[];
  readonly columns: DashboardColumn<TData>[];
  readonly getRowId: (row: TData) => string;
  readonly rowClassName?: (row: TData) => string;
  readonly empty?: ReactNode;
  readonly className?: string;
  readonly tableClassName?: string;
  readonly clientSorting?: boolean;
  readonly pageSize?: number;
}
export function DataTable<TData extends object>({ id, data, columns, getRowId, rowClassName, empty, className, tableClassName, clientSorting = false, pageSize }: DataTableProps<TData>): React.JSX.Element {
  const table = useTable({ key: id, features, data, columns, getRowId, enableSorting: clientSorting, manualSorting: !clientSorting, manualPagination: pageSize === undefined, initialState: { pagination: { pageIndex: 0, pageSize: pageSize ?? 10 } } });
  return <>
    <div className={cn(styles.tableScroll, className)}>
      <table className={tableClassName ?? styles.table} aria-label={id} data-dashboard-table>
        <thead>{table.getHeaderGroups().map((group) => <tr key={group.id}>{group.headers.map((header) => <th key={header.id} colSpan={header.colSpan} scope="col" aria-sort={header.column.getCanSort() ? (header.column.getIsSorted() === "asc" ? "ascending" : header.column.getIsSorted() === "desc" ? "descending" : "none") : undefined}>
          {header.isPlaceholder ? null : header.column.getCanSort() ? <button type="button" className={styles.sort} onClick={header.column.getToggleSortingHandler()}><table.FlexRender header={header} />{header.column.getIsSorted() === "asc" ? <ArrowUp size={12} /> : header.column.getIsSorted() === "desc" ? <ArrowDown size={12} /> : <ChevronsUpDown size={12} />}</button> : <table.FlexRender header={header} />}
        </th>)}</tr>)}</thead>
        <tbody>{table.getRowModel().rows.map((row) => <tr key={row.id} className={rowClassName?.(row.original)}>{row.getAllCells().map((cell) => <td key={cell.id}><table.FlexRender cell={cell} /></td>)}</tr>)}</tbody>
      </table>
    </div>
    {data.length === 0 && empty}
    {pageSize !== undefined && data.length > 0 && <nav aria-label={`${id} 分页`} className="flex items-center justify-end gap-4 border-t border-border px-4 py-3 text-xs text-muted-foreground"><span>第 {table.state.pagination.pageIndex + 1} / {Math.max(1, table.getPageCount())} 页</span><button type="button" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>上一页</button><button type="button" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>下一页</button></nav>}
  </>;
}
