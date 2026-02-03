import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Copy, Ellipsis, Eye, EyeOff, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import formatLinks from '@/utils/formatLinks';
import getFavicons from '@/utils/getFavicons';
import type { linksDataType } from '@/utils/linksData';
import { formatDate } from 'date-fns';
import QrcodeModal from '../Shadcn/QR/Qrcode-Modal';

interface ColumnsProps {
  handleDelete: (link: linksDataType) => void;
}

const handleCopy = async (text: string, type: string) => {
  await navigator.clipboard.writeText(text);
  toast.success(`${type} copied to clipboard!`, {
    duration: 5000,
  });
};

export const Columns = ({
  handleDelete,
}: ColumnsProps): ColumnDef<linksDataType>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'shortlink',
    header: 'Short Link',
    cell: ({ row }) => {
      const shortlink: string = row.getValue('shortlink');
      return (
        <div className='flex items-center gap-2'>
          <span
            onClick={() =>
              window.open(shortlink, '_blank', 'noopener,noreferrer')
            }
            className='cursor-pointer hover:text-blue-700 hover:underline'
            role='link'
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                window.open(shortlink, '_blank', 'noopener,noreferrer');
              }
            }}
          >
            {formatLinks(shortlink)}
          </span>

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
    cell: ({ row }) => <QrcodeModal imgUri={row.getValue('qrcode')} shortLink={row.getValue('shortlink')} />,
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
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Date
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      return <div>{formatDate(date, 'dd-MM-yy hh:mm aa')}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const link = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <Ellipsis className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='border-gray-700 bg-gray-900 text-white'
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => handleCopy(link.shortlink, 'Short link')}
              className='cursor-pointer hover:bg-gray-800'
            >
              <Copy className='mr-2 h-4 w-4' />
              Copy short link
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleCopy(link.originallink, 'Original link')}
              className='cursor-pointer hover:bg-gray-800'
            >
              <Copy className='mr-2 h-4 w-4' />
              Copy original link
            </DropdownMenuItem>
            <DropdownMenuSeparator className='bg-gray-700' />
            <DropdownMenuItem className='cursor-pointer hover:bg-gray-800'>
              {link.status ? (
                <>
                  <EyeOff className='mr-2 h-4 w-4' />
                  Deactivate
                </>
              ) : (
                <>
                  <Eye className='mr-2 h-4 w-4' />
                  Activate
                </>
              )}
            </DropdownMenuItem>
            <Button
              variant='destructive'
              className='flex w-full items-center justify-start hover:cursor-pointer hover:bg-red-800'
              onClick={() => handleDelete(link)}
            >
              <Trash2 className='pointer-events-none z-10 h-4 w-4' />
              Delete
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
