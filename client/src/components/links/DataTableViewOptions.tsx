import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import type { Table } from '@tanstack/react-table';
import { Funnel } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu';
import { Button } from '../ui/button';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={true}>
        <Button
          variant={'default'}
          size={'sm'}
          className='ml-auto hidden h-8 rounded-2xl bg-[#181E29] ring ring-[#353C4A] hover:cursor-pointer hover:bg-[#0D1117] hover:ring-[#737373] lg:flex py-5 px-8'
        >
          <Funnel className='mr-1 h-4 w-4' />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='relative z-10 flex w-[150px] flex-col items-center justify-center rounded-xl bg-black/90 text-center text-white'
      >
        <DropdownMenuLabel className='bg-muted/35 flex h-8 w-full items-center justify-center rounded-lg font-semibold'>
          Toggle columns
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='hover:bg-muted/75 w-full rounded-xl capitalize hover:text-black hover:outline-0'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
