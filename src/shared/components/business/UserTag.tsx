import { useAppSelector } from '@/shared/hooks/useRedux'


export default function UserNameTag() {
    const user = useAppSelector(state => state.appSlice.user)
    if (!user) return <></>
    return (
        <div className='flex flex-col'>
            <span className='font-bold text-lg capitalize'>
                {user?.fullName}
            </span>
        </div>
    )
}