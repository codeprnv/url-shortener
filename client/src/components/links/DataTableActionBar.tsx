import type { Table } from '@tanstack/react-table';
<<<<<<< HEAD
import { ArrowUpFromLine, Trash2, X } from 'lucide-react';
// import toast from 'react-hot-toast';
import { useLinks } from '@/hooks/useLinks';
import type { linksDataType } from '@/utils/linksData';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';

interface DataTableActionBarProps<TData extends linksDataType> {
  table: Table<TData>;
}

export function DataTableActionBar<TData extends linksDataType>({
=======
import { X, Trash2, Download } from 'lucide-react';
import { Button } from '../ui/button';

interface DataTableActionBarProps<TData> {
  table: Table<TData>;
}

export function DataTableActionBar<TData>({
>>>>>>> dafba6ca182a15f158f493b7b3f1bfc32056a367
  table,
}: DataTableActionBarProps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;

  if (selectedRows.length === 0) {
    return null;
  }
<<<<<<< HEAD
  const { deleteLinks } = useLinks();

  const handleDeletion = async () => {
    if (selectedRows.length === 0) return;

    const linksToDelete = selectedRows.map((row) => row.original);

    try {
      await deleteLinks(linksToDelete);
      table.resetRowSelection();
      toast.success(`${linksToDelete.length} link(s) deleted successfully!`, {
        duration: 5000,
      });
    } catch (error) {
      toast.error(`An error occured while deleting the links`, {
        duration: 5000,
      });
      console.error(`Deletion failed: `, error);
    }
  };

  return (
    <div className='fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-lg bg-gray-900 px-4 py-2 shadow-lg ring ring-[#353C4A]'>
=======

  return (
    <div className='fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 shadow-lg'>
>>>>>>> dafba6ca182a15f158f493b7b3f1bfc32056a367
      <div className='flex items-center gap-2 text-sm text-white'>
        <span className='font-semibold'>{selectedRows.length}</span>
        <span>row(s) selected</span>
      </div>
      <div className='h-6 w-px bg-gray-700' />
      <div className='flex items-center gap-2'>
        <Button
          variant='ghost'
          size='sm'
<<<<<<< HEAD
          className='h-8 text-white hover:cursor-pointer hover:bg-gray-800 hover:text-white'
=======
          className='h-8 text-white hover:bg-gray-800 hover:text-white'
>>>>>>> dafba6ca182a15f158f493b7b3f1bfc32056a367
          onClick={() => {
            console.log('Export selected rows');
          }}
        >
<<<<<<< HEAD
          <ArrowUpFromLine className='mr-1 h-4 w-4' />
          Export
        </Button>
        <Button
          variant='destructive'
          size='sm'
          className='hover:bg-red-800! h-fit p-2 transition-colors duration-200 hover:cursor-pointer'
          onClick={handleDeletion}
        >
          <Trash2 className='h-4 w-4' />
=======
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
>>>>>>> dafba6ca182a15f158f493b7b3f1bfc32056a367
        </Button>
        <div className='h-6 w-px bg-gray-700' />
        <Button
          variant='ghost'
          size='sm'
<<<<<<< HEAD
          className='h-8 w-8 p-0 text-gray-400 transition-colors duration-200 hover:cursor-pointer hover:bg-red-800 hover:text-white'
=======
          className='h-8 w-8 p-0 text-gray-400 hover:bg-gray-800 hover:text-white'
>>>>>>> dafba6ca182a15f158f493b7b3f1bfc32056a367
          onClick={() => table.resetRowSelection()}
        >
          <X className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
