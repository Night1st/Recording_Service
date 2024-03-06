import InputText from '@/shared/components/common/form/InputText'
import { Button } from '@/shared/components/common/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/components/common/ui/card'
import { Form } from '@/shared/components/common/ui/form'
import { useGetDetailUser } from '@/shared/schemas/models/IUser.model'
import { GetServerSideProps } from 'next'
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
    id: number
}

export default function UserDetail({ id }: Props) {
    const data = useGetDetailUser({ id })
    const form = useForm<any>({})
    useEffect(() => {
        const res = data.data
        if (res) {
            for (const [key, value] of Object.entries(res)) {
                form.setValue(key, value, {
                    shouldValidate: true,
                    shouldDirty: true
                })
            }
        }
    }, [data])

    return (
        <div>
            {JSON.stringify(data.data)}
        </div>
    )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // const shouldRedirect = await checkPermission({ permissionCode: PERMISSION_CODES.ROLE_MANAGE, type: 'view' }, ctx.req.cookies[APP_SAVE_KEY.TOKEN_KEY])
    return { props: { id: ctx.query.id } }

}