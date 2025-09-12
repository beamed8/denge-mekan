import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "İletişim | Denge Mekan Menajerlik",
};

export default function ContactUs() {
  return (
    <div className='container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-44 pb-14 md:pb-28'>
      <div className='mb-16'>
        <div className='flex gap-2.5 items-center justify-center mb-3'>
          <span>
            <Icon
              icon={'ph:house-simple-fill'}
              width={20}
              height={20}
              className='text-primary'
            />
          </span>
          <p className='text-base font-semibold text-badge dark:text-white/90'>
            İletişim
          </p>
        </div>
        <div className='text-center'>
          <h3 className='text-4xl sm:text-52 font-medium tracking-tighter text-black dark:text-white mb-3 leading-10 sm:leading-14'>
            Mekan mı arıyorsunuz? Size yardımcı olalım!
          </h3>
          <p className='text-xm font-normal tracking-tight text-black/50 dark:text-white/50 leading-6'>
            Etkinliğiniz, prodüksiyonunuz veya çekiminiz için özel mekanlar mı arıyorsunuz? <b>Denge Mekan Menajerlik</b> ekibi olarak size en uygun mekanı bulmak için buradayız. Aşağıdaki formdan bize ulaşabilirsiniz.
          </p>
        </div>
      </div>
      {/* form */}
      <div className='border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-xl dark:shadow-white/10'>
        <div className='flex flex-col lg:flex-row lg:items-center gap-12'>
          <div className='relative w-fit'>
            <Image
              src={'/images/contactUs/contactUs.jpg'}
              alt='wall'
              width={497}
              height={535}
              className='rounded-2xl brightness-50 h-full'
              unoptimized={true}
            />
            <div className='absolute top-6 left-6 lg:top-12 lg:left-12 flex flex-col gap-2'>
              <h5 className='text-xl xs:text-2xl mobile:text-3xl font-medium tracking-tight text-white'>
                İletişim Bilgileri
              </h5>
              <p className='text-sm xs:text-base mobile:text-xm font-normal text-white/80'>
                Dilediğiniz zaman bize ulaşabilirsiniz. Size en kısa sürede dönüş yapacağız.
              </p>
            </div>
            <div className='absolute bottom-6 left-6 lg:bottom-12 lg:left-12 flex flex-col gap-4 text-white'>
              <div className='flex items-center gap-4 group w-fit'>
                <Icon icon={'ph:phone'} width={32} height={32} />
                <p className='text-sm xs:text-base mobile:text-xm font-normal group-hover:text-primary'>
                  +90 555 555 55 55
                </p>
              </div>
              <div className='flex items-center gap-4 group w-fit'>
                <Icon icon={'ph:envelope-simple'} width={32} height={32} />
                <p className='text-sm xs:text-base mobile:text-xm font-normal group-hover:text-primary'>
                  info@dengemekan.com
                </p>
              </div>
              <div className='flex items-center gap-4'>
                <Icon icon={'ph:map-pin'} width={32} height={32} />
                <p className='text-sm xs:text-base mobile:text-xm font-normal'>
                  Maslak Mah. Büyükdere Cad. No:100, Sarıyer / İSTANBUL
                </p>
              </div>
            </div>
          </div>
          <div className='flex-1/2'>
            <form>
              <div className='flex flex-col gap-8'>
                <div className='flex flex-col lg:flex-row gap-6'>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    autoComplete='username'
                    placeholder='Adınız Soyadınız*'
                    required
                    className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full'
                  />
                  <input
                    type='text'
                    name='mobile'
                    id='mobile'
                    autoComplete='mobile'
                    placeholder='Telefon Numaranız*'
                    required
                    className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full'
                  />
                </div>
                <input
                  type='email'
                  name='email'
                  id='email'
                  autoComplete='email'
                  placeholder='E-posta Adresiniz*'
                  required
                  className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline'
                />
                <textarea
                  rows={8}
                  cols={50}
                  name='message'
                  id='message'
                  placeholder='Mesajınız'
                  required
                  className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-2xl outline-primary focus:outline'></textarea>
                <button className='px-8 py-4 rounded-full bg-primary text-white text-base font-semibold w-full mobile:w-fit hover:cursor-pointer hover:bg-dark duration-300'>
                  Mesajı Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
