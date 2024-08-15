import { FaTag } from 'react-icons/fa';
import { FaEarthAsia } from 'react-icons/fa6';
import { FiMenu } from 'react-icons/fi';
import { RiPlaneLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import SignOut from './auth/SignOut';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { useSession } from '@/hooks/use-session';
import { cn } from '@/lib/utils';
import type { IconType } from 'react-icons/lib';
import type { LinkProps } from 'react-router-dom';

interface MenuItem extends LinkProps {
    text: string;
    icon?: IconType;
}

const menuList: MenuItem[] = [
    {
        text: 'Deals',
        to: '/',
        icon: FaTag,
    },
    {
        text: 'Discover',
        to: '/',
        icon: FaEarthAsia,
    },
];

export default function Header() {
    const { data: user } = useSession();
    const renderedFullNameWithAvatar = (
        <div className="flex items-center gap-1">
            <Avatar className="size-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="max-w-40 truncate text-sm font-medium capitalize">{`${user?.name} ${user?.surname}`}</span>
        </div>
    );

    return (
        <header role="banner" className="mx-2 md:mx-5">
            <nav role="navigation" aria-label="Main navigation" className="flex py-4">
                <div className="mr-auto flex items-center text-xl font-bold uppercase">
                    <div className="relative mr-2 size-8 overflow-hidden rounded-full bg-purple">
                        <RiPlaneLine
                            className="absolute -left-1 -top-px size-full rotate-90 scale-110"
                            color="white"
                        />
                    </div>
                    Plane scape
                </div>
                <div className="flex items-center gap-x-5 max-md:hidden">
                    {menuList.map(({ text, icon, className, ...rest }) => {
                        const Icon = icon;

                        return (
                            <Link
                                key={text}
                                className={cn('flex items-center gap-x-1', className)}
                                {...rest}
                            >
                                {Icon && <Icon className="size-4 text-purple" />}
                                <span className="text-sm font-medium capitalize">{text}</span>
                            </Link>
                        );
                    })}
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="ml-2">
                                {renderedFullNameWithAvatar}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-48"
                                onCloseAutoFocus={(e) => e.preventDefault()}
                            >
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link to="/profile" className="w-full cursor-default">
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <SignOut className="mt-2 p-0" />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link
                            to="/login"
                            className="rounded-sm bg-purple px-3 py-1.5 text-sm text-white"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
                <Sheet>
                    <SheetTrigger className="md:hidden" aria-label="Open hamburger menu">
                        <FiMenu className="size-7" />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader className="mt-2">
                            <SheetTitle className="truncate capitalize">
                                {user ? renderedFullNameWithAvatar : ''}
                            </SheetTitle>
                            <SheetDescription className="!mt-4 flex h-full flex-col gap-y-3 text-left">
                                {menuList.map(({ text, icon, className, ...rest }) => {
                                    const Icon = icon;

                                    return (
                                        <SheetClose key={text} asChild>
                                            <Link
                                                {...rest}
                                                className={cn(
                                                    'flex items-center gap-x-1 border-b-2 pb-1',
                                                    className,
                                                )}
                                            >
                                                {Icon && <Icon className="size-4 text-purple" />}
                                                <span className="text-sm font-medium capitalize">
                                                    {text}
                                                </span>
                                            </Link>
                                        </SheetClose>
                                    );
                                })}
                                {user ? (
                                    <>
                                        <SheetClose asChild>
                                            <Link
                                                to="/profile"
                                                className="text-sm font-medium capitalize"
                                            >
                                                Profile
                                            </Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <SignOut className="mt-auto" />
                                        </SheetClose>
                                    </>
                                ) : (
                                    <SheetClose asChild>
                                        <Link
                                            to="/login"
                                            className="mt-auto inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md border-black bg-purple text-xs font-medium uppercase tracking-widest text-white"
                                        >
                                            Sign In
                                        </Link>
                                    </SheetClose>
                                )}
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
}
