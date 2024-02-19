import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import ComponentLayout from "./layout";
import Image from "next/image";

const Login = () => {
  const [loginLoading, setLoginLoading] = useState(false);

  const { status } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (status === "loading") {
      setLoginLoading(true);
    } else if (status === "authenticated") {
      setLoginLoading(false);
      push("/");
    } else {
      setLoginLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleOAuthSignIn = (provider: string) => {
    setLoginLoading(true);
    signIn(provider, { redirect: false, callbackUrl: "/" });
  };

  return (
    <div className="h-fit w-full min-h-screen bg-white">
      <nav className="h-[70px] px-4 flex items-center justify-between bg-black text-white">
        <Image
          src="/images/uber-logo.png"
          alt="uber logo"
          height={40}
          width={70}
        />
      </nav>
      <div className="flex portrait:flex-col p-4 landscape:flex-row">
        <div className="pt-4 text-3xl md:text-5xl text-gray-500">
          Log in to access your account
        </div>
        <Image
          className="object-contain"
          src="/images/uber-login-image.png"
          height={150}
          width={150}
          layout="responsive"
          alt="uber image"
        />
      </div>
      <button
        className={loginLoading ? "button-disable" : "button"}
        disabled={loginLoading}
        onClick={() => handleOAuthSignIn("google")}
        name="signIn button"
      >
        {loginLoading ? <div>Loading...</div> : <div>Sign in with Google</div>}
      </button>
    </div>
  );
};

export default Login;
