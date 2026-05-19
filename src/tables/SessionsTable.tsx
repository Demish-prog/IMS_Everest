import { useMemo, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table'
import { ChevronDown, ChevronUp, ChevronsUpDown, MoreHorizontal, Settings2 } from 'lucide-react'
import type { SessionRow } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/utils/cn'

interface SessionsTableProps {
  data: SessionRow[]
}

/**
 * Advanced sessions table with TanStack Table.
 * Horizontal scroll on mobile; PROTOCOL + SOURCE IP columns sticky left.
 */
export function SessionsTable({ data }: SessionsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; row: SessionRow } | null>(null)

  const columns = useMemo<ColumnDef<SessionRow>[]>(
    () => [
      {
        accessorKey: 'protocol',
        header: 'PROTOCOL',
        cell: ({ getValue }) => (
          <span className="font-mono text-xs font-medium">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'sourceIp',
        header: 'SOURCE IP',
        cell: ({ getValue }) => <span className="font-mono text-xs">{getValue() as string}</span>,
      },
      {
        accessorKey: 'destinationIp',
        header: 'DESTINATION IP',
        cell: ({ getValue }) => <span className="font-mono text-xs">{getValue() as string}</span>,
      },
      {
        id: 'ports',
        header: 'PORTS',
        cell: ({ row }) => (
          <span className="font-mono text-xs">
            {row.original.sourcePort} → {row.original.destPort}
          </span>
        ),
      },
      { accessorKey: 'router', header: 'ROUTER' },
      { accessorKey: 'volume', header: 'VOLUME' },
      { accessorKey: 'duration', header: 'DURATION' },
      {
        accessorKey: 'tags',
        header: 'TAGS',
        cell: ({ getValue }) => (
          <div className="flex flex-wrap gap-1">
            {(getValue() as string[]).map((tag) => (
              <Badge key={tag} variant={tag === 'suspicious' ? 'danger' : 'default'}>
                {tag}
              </Badge>
            ))}
          </div>
        ),
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <button
            type="button"
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
            onClick={(e) => {
              e.stopPropagation()
              setContextMenu({ x: e.clientX, y: e.clientY, row: row.original })
            }}
            aria-label="Row actions"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        ),
      },
    ],
    [],
  )

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, columnVisibility },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 15 } },
  })

  return (
    <div className="space-y-4">
      {/* Toolbar — stacks on mobile, filters full width */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Filter sessions..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-full sm:max-w-xs"
          aria-label="Filter table"
        />
        <div className="flex flex-wrap gap-2">
          <details className="relative">
            <summary className="list-none cursor-pointer">
              <Button variant="outline" size="sm">
                <Settings2 className="h-4 w-4" />
                Columns
              </Button>
            </summary>
            <div className="absolute right-0 mt-1 z-20 rounded-lg bg-surface shadow-lg border p-2 min-w-[160px]">
              {table.getAllLeafColumns().map((col) => (
                <label key={col.id} className="flex items-center gap-2 px-2 py-1 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={col.getIsVisible()}
                    onChange={col.getToggleVisibilityHandler()}
                  />
                  {col.id}
                </label>
              ))}
            </div>
          </details>
        </div>
      </div>

      {/* Table wrapper — horizontal scroll on mobile */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-surface">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header, idx) => (
                    <th
                      key={header.id}
                      className={cn(
                        'px-4 py-3 text-left text-xs font-semibold text-heading-table uppercase tracking-wider',
                        /* Sticky important columns on horizontal scroll */
                        idx <= 1 && 'sticky left-0 z-10 bg-slate-50 dark:bg-slate-800/50',
                        idx === 1 && 'left-[100px]',
                      )}
                    >
                      {header.isPlaceholder ? null : (
                        <button
                          type="button"
                          className="flex items-center gap-1 hover:text-primary-600"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <ChevronUp className="h-3 w-3" />,
                            desc: <ChevronDown className="h-3 w-3" />,
                          }[header.column.getIsSorted() as string] ?? (
                            <ChevronsUpDown className="h-3 w-3 opacity-40" />
                          )}
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  {row.getVisibleCells().map((cell, idx) => (
                    <td
                      key={cell.id}
                      className={cn(
                        'px-4 py-3',
                        idx <= 1 && 'sticky left-0 z-[1] bg-surface',
                        idx === 1 && 'left-[100px]',
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination — wraps on mobile */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-500">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Context menu */}
      {contextMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setContextMenu(null)} aria-hidden />
          <div
            className="fixed z-50 rounded-lg bg-surface shadow-xl border py-1 min-w-[160px]"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            <button type="button" className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
              View details
            </button>
            <button type="button" className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
              Add tag
            </button>
            <button type="button" className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
              Export flow
            </button>
          </div>
        </>
      )}
    </div>
  )
}
