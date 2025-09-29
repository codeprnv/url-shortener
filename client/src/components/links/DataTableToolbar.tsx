'use client';
import type { Table } from '@tanstack/react-table';
import { Input } from '../ui/input';
import { DataTableViewOptions } from './DataTableViewOptions';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
                  placeholder='Filter by original link...'
                  value={
                    (table.getColumn('originallink')?.getFilterValue() as string) ?? ''
                  }
                  onChange={(event) =>
                    table.getColumn('originallink')?.setFilterValue(event.target.value)
                  }
                  className='focus:ring-blue-700! border-0! outline-0! max-w-[15rem] text-white shadow-md shadow-blue-800 ring ring-blue-500 transition-shadow duration-200 focus:shadow-lg focus:shadow-blue-500 md:max-w-xs'
                />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
