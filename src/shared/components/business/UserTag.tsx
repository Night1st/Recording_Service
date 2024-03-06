import { useAppSelector } from '@/shared/hooks/useRedux'


export default function UserNameTag() {
    const user = useAppSelector(state => state.appSlice.user)
    if (!user) return <></>
    return (
        <div className='flex flex-col'>
            <span className='font-bold text-lg capitalize'>
                {user?.fullName}
            </span>
            <span className='text-slate-400 text-sm'>
                {user.jobPosition?.name} - {user.department?.name}
            </span>
        </div>
    )
}