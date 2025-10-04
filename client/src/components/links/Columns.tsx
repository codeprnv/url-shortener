import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

// Define the shape of the link data
import getFavicons from '@/utils/getFavicons';
import type { linksDataType } from '@/utils/linksData';
import { formatDate } from 'date-fns';
import { Link } from 'react-router-dom';

const handleCopy = async (text: string, type: string) => {
  await navigator.clipboard.writeText(text);
  toast.success(`${type} copied to clipboard!`, {
    duration: 5000,
  });
};

export const Columns: ColumnDef<linksDataType>[] = [
  // Short Link
  {
    accessorKey: 'shortlink',
    header: 'Short Link',
    cell: ({ row }) => {
      const shortlink: string = row.getValue('shortlink');
      return (
        <div className='flex items-center gap-2'>
          <a
            href={shortlink}
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-blue-700 hover:underline'
          >
            {shortlink.length > 30
              ? `${shortlink.substring(0, 30)}...`
              : shortlink}
          </a>
          <Copy
            className='h-4 w-4 cursor-pointer text-gray-400 shadow-black hover:text-white hover:shadow-md'
            onClick={() => handleCopy(shortlink, 'Short link')}
          />
        </div>
      );
    },
  },
  // Original Link
  {
    accessorKey: 'originallink',
    header: 'Original Link',
    cell: ({ row }) => {
      const originallink: string = row.getValue('originallink');
      //   Truncate for display purposes
      const displayUrl =
        originallink.length > 30
          ? `${originallink.substring(0, 30)}...`
          : originallink;
      return (
        <div className='flex max-w-fit items-center gap-3'>
          <img
            src={getFavicons(originallink)}
            alt={`${originallink}-favicon`}
          />
          <a
            href={originallink}
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-blue-700 hover:underline'
            title={originallink}
          >
            {displayUrl}
          </a>
        </div>
      );
    },
  },
  //   QR Code
  {
    accessorKey: 'qrcode',
    header: 'QR Code',
    cell: ({ row }) => (
      <Link to={`/img?qr=${encodeURIComponent(row.getValue('qrcode'))}`}>
        <img src={row.getValue('qrcode')} alt='QR Code' className='w-18 h-18' />
      </Link>
    ),
  },
  //   Clicks
  {
    accessorKey: 'clicks',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Clicks
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => (
      <div className='text-center font-medium'>{row.getValue('clicks')}</div>
    ),
  },
  //   Status
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status: boolean = row.getValue('status');
      return (
        <Badge
          variant={status ? 'secondary' : 'destructive'}
          className={
            status
              ? 'border border-black bg-green-600 font-semibold text-white shadow-md shadow-green-600'
              : 'border border-black bg-red-600 font-semibold text-white shadow-md shadow-red-600'
          }
        >
          {status ? 'Active' : 'Inactive'}
        </Badge>
      );
    },
  },
  // Date
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Date
        <ArrowUpDown className='h-4 w-4' />
        <p className='text-[11px]'>{column.getIsSorted()}</p>
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      return <div>{formatDate(date, 'dd-MM-yy hh:mm aa')}</div>;
    },
  },
];
