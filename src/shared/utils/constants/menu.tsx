import { useAppSelector } from '@/shared/hooks/useRedux';
import { UserType } from '@/shared/schemas/models/IUser.model';
import {
    FolderGit2,
    GitPullRequest,
    Store,
} from 'lucide-react';
import { useMemo } from 'react';

export type MenuItem = {
    title: string;
    permission?: boolean;
    external?: boolean;
    href: string;
    Icon?: React.ReactNode;
    chidren?: MenuItem[];
    isDisable?: boolean;
    userType?: UserType[];
};

export const APP_MENU: MenuItem[] = [
    {
        title: 'All Recording',
        href: '/recording',
        Icon: <FolderGit2 className='mr-2 h-5 w-5' />,
        userType: ["SYSTEM_ADMIN"]

    },
    {
        title: 'Sync Management',
        href: '/sync',
        Icon: <GitPullRequest className='mr-2 h-5 w-5' />,
        userType: ["SYSTEM_ADMIN"]

    },
    {
        title: 'REST API',
        href: '/restapi',
        Icon: <Store className='mr-2 h-5 w-5' />,
        userType: ["SYSTEM_ADMIN"]

    }
];

export function ValidMenus() {
    const userType = useAppSelector(state => state.appSlice.user?.userType)
    return useMemo(() => APP_MENU.filter(item => item.userType?.includes(userType!)), [userType])
}