import { DATETIME_FORMAT } from '@/Settings'
import { RestAPIData } from '@/shared/schemas/models/IRestAPI'
import dayjs from 'dayjs'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

type Props = {
    id: number
}

export default function RestAPIDetail({ id }: Props) {
    const detail = RestAPIData.find(obj => obj.id == id)
    console.log(detail)
    return (
        <section className='w-full flex flex-col gap-8'>
            <div className='text-2xl font-bold'>{detail?.api}</div>
            <div className='grid grid-cols-2'>
                <div className='w-full'>
                    <table>
                        <tbody>
                            <tr>
                                <th className='text-left pt-3'>Collection</th>
                                <td className='pt-3 pl-3'>{detail?.collection}</td>
                            </tr>
                            <tr>
                                <th className='text-left pt-3'>Request URL</th>
                                <td className='pt-3 pl-3'>{detail?.requestURL}</td>
                            </tr>
                            <tr>
                                <th className='text-left pt-3'>Request Method</th>
                                <td className='pt-3 pl-3'>{detail?.requestMethod}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th className='text-left pt-3'>Created By</th>
                                <td className='pt-3 pl-3'>{detail?.createdBy}</td>
                            </tr>
                            <tr>
                                <th className='text-left pt-3'>Created On</th>
                                <td className='pt-3 pl-3'>{dayjs(detail?.createdOn).format(DATETIME_FORMAT)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='pt-5 flex flex-col gap-5'>
                <div className='border-b-2'>
                    <p className='texl-xl font-bold'> PARAMETERS</p>
                </div>
                <div className='flex gap-3'>
                    <p className='texl-xl font-bold'> Params</p>
                    <pre> {JSON.stringify(detail?.params, undefined, 5)} </pre>
                </div>
                <div className='flex gap-3'>
                    <p className='texl-xl font-bold'> Headers</p>
                    <pre> {JSON.stringify(detail?.headers, undefined, 5)} </pre>
                </div>
            </div>
            <div className='pt-5 flex flex-col gap-5'>
                <div className='border-b-2'>
                    <p className='texl-xl font-bold'> RESULTS</p>
                </div>
                <div className='flex gap-3'>
                    <p className='texl-xl font-bold'> Responses</p>
                    <pre> {JSON.stringify(detail?.responses, undefined, 5)} </pre>
                </div>
            </div>
        </section>
    )
}
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     // const shouldRedirect = await checkPermission({ permissionCode: PERMISSION_CODES.ROLE_MANAGE, type: 'view' }, ctx.req.cookies[APP_SAVE_KEY.TOKEN_KEY])
//     return { props: { id: ctx.query.id } }

// }

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = [{ params: { id: '1' } }, { params: { id: '2' } }]; // Example paths
    return {
      paths,
      fallback: true, // or 'blocking' if you want to wait for data to be fetched
    };
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    return { props: {id: params?.id}}
}
