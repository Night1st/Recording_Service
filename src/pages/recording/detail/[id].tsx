import { GetServerSideProps } from 'next'
import React from 'react'
import { RecordingData } from '@/shared/schemas/models/IRecording'

type Props = {
    id: String
}

export default function ProjectDetail({ id }: Props) {
    const detail = RecordingData.find(obj => obj.conversationId === id)
    return (
        <section className='w-full flex flex-col gap-10'>
            <div className='text-2xl font-bold'>{id}</div>
            <table>
                <tbody>
                    <tr>
                        <th>Channel</th>
                        <td>{detail?.channel}</td>
                    </tr>
                    <tr>
                        <th>Conversation ID</th>
                        <td>{detail?.conversationId}</td>
                    </tr>
                    <tr>
                        <th>Agent Name</th>
                        <td>{detail?.agent}</td>
                    </tr>
                    <tr>
                        <th>Originating Direction</th>
                        <td>{detail?.originatingDirection}</td>
                    </tr>
                    <tr>
                        <th>Queue Name</th>
                        <td>{detail?.queue}</td>
                    </tr>
                    <tr>
                        <th>Remote</th>
                        <td>{detail?.remote}</td>
                    </tr>
                    <tr>
                        <th>Wrap-up</th>
                        <td>{detail?.wrapUpCode}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // const shouldRedirect = await checkPermission({ permissionCode: PERMISSION_CODES.ROLE_MANAGE, type: 'view' }, ctx.req.cookies[APP_SAVE_KEY.TOKEN_KEY])
    return { props: { id: ctx.query.id } }

}