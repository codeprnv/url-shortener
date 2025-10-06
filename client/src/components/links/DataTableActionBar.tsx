import type { Table } from '@tanstack/react-table';
import { X, Trash2, Download } from 'lucide-react';
import { Button } from '../ui/button';

interface DataTableActionBarProps<TData> {
  table: Table<TData>;
}

export function DataTableActionBar<TData>({
  table,
}: DataTableActionBarProps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;

  if (selectedRows.length === 0) {
    return null;
  }

  return (
    <div className='fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 shadow-lg'>
      <div className='flex items-center gap-2 text-sm text-white'>
        <span className='font-semibold'>{selectedRows.length}</span>
        <span>row(s) selected</span>
      </div>
      <div className='h-6 w-px bg-gray-700' />
      <div className='flex items-center gap-2'>
        <Button
          variant='ghost'
          size='sm'
          className='h-8 text-white hover:bg-gray-800 hover:text-white'
          onClick={() => {
            console.log('Export selected rows');
          }}
        >
          <Download className='mr-2 h-4 w-4' />
          Export
        </Button>
        <Button
          variant='ghost'
          size='sm'
          className='h-8 text-red-400 hover:bg-red-900/20 hover:text-red-300'
          onClick={() => {
            console.log('Delete selected rows');
          }}
        >
          <Trash2 className='mr-2 h-4 w-4' />
          Delete
        </Button>
        <div className='h-6 w-px bg-gray-700' />
        <Button
          variant='ghost'
          size='sm'
          className='h-8 w-8 p-0 text-gray-400 hover:bg-gray-800 hover:text-white'
          onClick={() => table.resetRowSelection()}
        >
          <X className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
