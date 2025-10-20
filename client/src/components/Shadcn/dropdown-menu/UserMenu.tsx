'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useClerk } from '@clerk/clerk-react';
import type { UserResource } from '@clerk/types';
import {
  BadgeCheckIcon,
  BellIcon,
  ChevronDown,
  CreditCardIcon,
  LogOutIcon,
  SparklesIcon,
} from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';

interface UserMenuProps {
  User: UserResource | null | undefined;
}

const fallbackUser = {
  name: 'Toby Belhome',
  email: 'contact@bundui.io',
  avatar: 'https://bundui-images.netlify.app/avatars/01.png',
};

export default function UserMenu({ User }: UserMenuProps) {
  const [open, setOpen] = React.useState(false);
  const { signOut } = useClerk();

  const handleLogOut = async () => {
    try {
      toast.success('Logged Out successfully!', {
        duration: 5000,
      });
      await signOut({redirectUrl: '/login'});
    } catch (err: any) {
      console.error(err ?? 'An unexpected error occured during sign out!!');
      toast.error(err ?? 'An unexpected error occured during sign out!!', {
        duration: 5000,
      });
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='gap-2 bg-[#4650D0] px-2 '>
          <Avatar className='size-6 rounded-lg'>
            <AvatarImage
              src={User?.hasImage ? User.imageUrl : fallbackUser.avatar}
              alt={User?.firstName ?? 'User'}
            />
            <AvatarFallback className='rounded-lg'>U</AvatarFallback>
          </Avatar>
          <div className='truncate text-white hover:text-black'>{User?.firstName}</div>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
        sideOffset={4}
      >
        <DropdownMenuLabel className='p-0 font-normal'>
          <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
            <Avatar className='size-9 rounded-lg'>
              <AvatarImage
                src={User?.hasImage ? User.imageUrl : fallbackUser.avatar}
                alt={User?.firstName ?? 'User'}
              />
              <AvatarFallback className='rounded-lg'>U</AvatarFallback>
            </Avatar>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-semibold'>{User?.fullName}</span>
              <span className='text-muted-foreground truncate text-xs'>
                {User?.primaryEmailAddress?.emailAddress}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <SparklesIcon />
            Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheckIcon />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BellIcon />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='text-red-600! hover:bg-red-800! hover:text-white! hover:cursor-pointer'
          onClick={handleLogOut}
        >
          <LogOutIcon className='text-red-600!' />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
