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
<<<<<<< HEAD
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
=======
          className='max-w-[15rem] border-0 text-white shadow-md shadow-blue-800 outline-0 ring ring-blue-500 transition-shadow duration-200 focus:shadow-lg focus:shadow-blue-500 focus:ring-blue-700 md:max-w-xs'
        />
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 text-white hover:bg-gray-800 lg:px-3'
          >
            Reset
            <X className='ml-2 h-4 w-4' />
>>>>>>> dafba6ca182a15f158f493b7b3f1bfc32056a367
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
