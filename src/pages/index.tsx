/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import Map from '../Components/map'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'
import { ComponentLayout } from './layout'

interface UserData {
  name: string;
  photoUrl: string;
}

export default function Home() {
  const [user, setUser] = useState<UserData | null>(null);
  const { asPath } = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setUser({
        name: session.user.name ,
        photoUrl: session.user.image ,
      });
    } else {
      setUser(null);
    }
  }, [status, session]);


  return (
    <ComponentLayout>
      <div className='flex h-screen min-w-[320px] flex-col'>
        <div className='flex items-center justify-between bg-black p-3 text-white md:p-5'>
          <img
            className='h-7 md:h-9'
            src='https://companieslogo.com/img/orig/UBER.D-f23d4b1c.png?t=1635007057'
            alt='uber logo'
          />
          <div className='flex items-center'>
            <div className='mr-4 w-fit text-sm'>{user && user.name}</div>
            {user && (
            <img
              className='h-10 w-10 cursor-pointer rounded-full border border-gray-100 p-px'
              src={ user.photoUrl}
              onClick={() =>
                signOut({ redirect: false, callbackUrl: '/login' })
              }
              alt='user image'
              title='Sign out'
              />
              )}
          </div>
        </div>
        <div className='h-1/2'>
          <Map />
        </div>
        <div className='flex-1 px-4 py-12'>
          <div className='flex'>
            <button className='lg:45 m-1 flex h-32 flex-1 transform flex-col items-center justify-center rounded-lg bg-gray-200 text-xl transition hover:scale-105 active:scale-100 md:h-40'>
              <Link
                href='/search'
                passHref={true}
                className='flex h-full w-full flex-col items-center justify-center'
              >
                <img
                  className='h-3/5'
                  src='https://i.ibb.co/cyvcpfF/uberx.png'
                />
                Ride
              </Link>
            </button>
            <button className='lg:45 m-1 flex h-32 flex-1 transform flex-col items-center justify-center rounded-lg bg-gray-200 text-xl transition hover:scale-105 active:scale-100 md:h-40'>
              <img className='h-3/5' src='https://i.ibb.co/n776JLm/bike.png' />
              Wheels
            </button>
            <button className='lg:45 m-1 flex h-32 flex-1 transform flex-col items-center justify-center rounded-lg bg-gray-200 text-xl transition hover:scale-105 active:scale-100 md:h-40'>
              <img
                className='h-3/5'
                src='https://i.ibb.co/5RjchBg/uberschedule.png'
              />
              Reserve
            </button>
          </div>
          <div className='m-1  bg-gray-200 p-1 text-2xl '>
            <p>Where to? </p>
          </div>
        </div>
      </div>
    </ComponentLayout>
  )
}

