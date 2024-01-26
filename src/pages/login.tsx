/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'
import { ComponentLayout } from './layout'

const Login = () => {
  const [loginLoading, setLoginLoading] = useState(false)

  const { status } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (status === 'loading') {
      setLoginLoading(true)
    } else if (status === 'authenticated') {
      setLoginLoading(false)
      push('/')
    } else {
      setLoginLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const handleOAuthSignIn = (provider: string) => {
    setLoginLoading(true)
    signIn(provider, { redirect: false, callbackUrl: '/' })
  }

  return (
    <ComponentLayout>
      <div className='flex h-screen flex-col bg-gray-200 p-0 portrait:h-screen landscape:min-h-fit'>
        <div className='w-full bg-black p-4'>
          <img
            className='h-9 w-auto self-start bg-black object-contain'
            src='https://companieslogo.com/img/orig/UBER.D-f23d4b1c.png?t=1635007057'
            alt='uber logo'
          />
        </div>
        <div className='flex flex-col p-4 lg:flex-row'>
          <div className='pt-4 text-5xl text-gray-500'>
            Log in to access your account
          </div>
          <img
            className='w-full object-contain lg:w-2/3'
            src='https://i.ibb.co/CsV9RYZ/login-image.png'
            alt='uber image'
          />
        </div>
        <button
          className={loginLoading ? 'button-disable' : 'button'}
          disabled={loginLoading}
          onClick={()=>handleOAuthSignIn('google')}
          name='signIn button'
        >
          {loginLoading ? (
            <div>Loading...</div>
          ) : (
            <div>Sign in with Google</div>
          )}
        </button>
      </div>
    </ComponentLayout>
  )
}

export default Login
