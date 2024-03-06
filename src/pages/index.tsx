import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/common/ui/card'
import { useAppSelector } from '@/shared/hooks/useRedux'
import dynamic from 'next/dynamic'
import { Quicksand } from 'next/font/google'
const quicksand = Quicksand({ subsets: ['vietnamese'] })

export default function Home() {
  const user = useAppSelector(state => state.appSlice.user)
  if (!user?.userType) return <></>
  if (['PMO', 'SYSTEM_ADMIN'].includes(user?.userType)) {
    return (
      <main
        className={`${quicksand.className} w-full`}
      >

      </main>
    )
  }
  if (user.userType === 'USER') {
    return (
      <main
        className={`${quicksand.className} w-full`}
      >

      </main>
    )
  }

}
