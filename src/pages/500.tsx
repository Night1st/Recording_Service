// ** React Imports
import BlankLayout from '@/shared/components/layouts/BlankLayout'
import useTrans from '@/shared/hooks/useTrans'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const Error500 = () => {
  const { trans } = useTrans()
  const Img404 = "/404.svg";

  return (
    <>
      <Head>
        <title>{trans.page[500].pageTitle}</title>
      </Head>
      <section className="pt-45 lg:pt-50 xl:pt-55 pb-25 lg:pb-32.5 xl:pb-37.5 overflow-hidden">
        <div className="animate_top mx-auto max-w-[518px] text-center">
          <Image
            src={Img404}
            alt="404"
            className="mx-auto mb-7.5"
            width={396}
            height={156}
          />

          <h2 className="font-semibold text-2xl md:text-4xl text-black dark:text-white mb-5">
            Xảy ra lỗi
          </h2>
          <p className="mb-7.5">
            Máy chủ xảy ra lỗi, vui lòng thử lại hoặc liên hệ admin
           
          </p>

          <button className=" bg-black dark:bg-btndark hover:bg-blackho ease-in-out duration-300 font-medium text-white rounded-full px-6 py-3 mt-4">
            <Link href={'/'} className="inline-flex gap-2.5 items-center">
              Quay trở lại trang chủ
              <svg
                className="fill-white"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                  fill=""
                />
              </svg>
            </Link>
          </button>
        </div>
      </section>
    </>

  )
}

Error500.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>


export default Error500
