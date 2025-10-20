'use client';
import type { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { DataTableViewOptions } from './DataTableViewOptions';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

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
          className='max-w-[15rem] border-0 bg-[#181E29] text-white ring ring-[#262626] focus:ring-[#737373] md:max-w-xs'
        />
        {isFiltered && (
          <Button
            variant='default'
            onClick={() => table.resetColumnFilters()}
            className='h-8 border border-dotted px-2 text-white hover:bg-gray-800 lg:px-3 hover:cursor-pointer'
          >
            <X className='ml-2 h-4 w-4' />
            Reset
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
