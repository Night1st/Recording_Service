import { GetServerSideProps } from 'next'
import React from 'react'
import { RecordingData } from '@/shared/schemas/models/IRecording'
import dayjs from 'dayjs'
import { DATETIME_FORMAT } from '@/Settings'

type Props = {
    id: String
}

export default function ProjectDetail({ id }: Props) {
    const detail = RecordingData.find(obj => obj.conversationId === id)
    const milisecondsToTime = (ms?: number) => {
        const time = ms
        if(time == undefined) return ""
        const totalSeconds = time / 1000

        const minutes = Math.floor(totalSeconds / 60)
        const seconds = Math.floor(totalSeconds % 60)
        const miliseconds = Math.floor(time % 1000)

        const formattedMinutes = (minutes < 10) ? `0${minutes}` : minutes.toString()
        const formattedSeconds = (seconds < 10) ? `0${seconds}` : seconds.toString()
        const formattedMiliSeconds = (miliseconds < 10) ? `00${miliseconds}` : (miliseconds < 100) ? `0${miliseconds}` : miliseconds.toString()

        return `${formattedMinutes}:${formattedSeconds}.${formattedMiliSeconds}`
    }
    return (
        <section className='w-full flex flex-col gap-8'>
            <div className='text-2xl font-bold'>{id}</div>
            <div className='grid grid-cols-2'>
                <div className='w-full'>
                    <table>
                        <tbody>
                            <tr>
                                <th className='text-left pt-3'>Channel</th>
                                <td className='pt-3 pl-3'>{detail?.channel}</td>
                            </tr>
                            <tr>
                                <th className='text-left pt-3'>Conversation Start</th>
                                <td className='pt-3 pl-3'>{dayjs(detail?.conversationStart).format(DATETIME_FORMAT)}</td>
                            </tr>
                            <tr>
                                <th className='text-left pt-3'>Agent Name</th>
                                <td className='pt-3 pl-3'>{detail?.agent}</td>
                            </tr>
                            <tr>
                                <th className='text-left pt-3'>Originating Direction</th>
                                <td className='pt-3 pl-3'>{detail?.originatingDirection}</td>
                            </tr>
                            <tr>
                                <th className='text-left pt-3'>Queue Name</th>
                                <td className='pt-3 pl-3'>{detail?.queue}</td>
                            </tr>
                            <tr>
                                <th className='text-left pt-3'>Remote</th>
                                <td className='pt-3 pl-3'>{detail?.remote}</td>
                            </tr>
                            <tr>
                                <th className='text-left pt-3'>DNIS</th>
                                <td className='pt-3 pl-3'>{detail?.dnis}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='flex items-center gap-5'>
                        <p className='font-bold'>Recording</p>
                        <audio controls>
                            <source src='/assets/ByYourSide.mp3'></source>
                        </audio>
                    </div>
                </div>
                <div>
                    <table>
                        <tbody>
                        <tr>
                                <th className='text-left pt-3'>Division Name</th>
                                <td className='pt-3 pl-3'>{detail?.division}</td>
                            </tr>
                            <tr>
                                <th className='text-left pt-3'>Division ID</th>
                                <td className='pt-3 pl-3'>{detail?.divisionId}</td>
                            </tr>
                            <tr>
                                <th className='text-left pt-3'>Conversation Duration</th>
                                <td className='pt-3 pl-3'>{milisecondsToTime(detail?.conversationDuration)}</td>
                            </tr>
                            <tr>
                                <th className='text-left pt-3'>ACW</th>
                                <td className='pt-3 pl-3'>{milisecondsToTime(detail?.acw)}</td>
                            </tr>
                            <tr>
                                <th className='text-left pt-3'>Wrap-up</th>
                                <td className='pt-3 pl-3'>{detail?.wrapUpCode}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     // const shouldRedirect = await checkPermission({ permissionCode: PERMISSION_CODES.ROLE_MANAGE, type: 'view' }, ctx.req.cookies[APP_SAVE_KEY.TOKEN_KEY])
//     return { props: { id: ctx.query.id } }

// }