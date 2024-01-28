import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

interface UserData {
  name: string;
  photoUrl: string;
}

const ComponentLayout = ({
  children,
  pageName,
}: {
  children: any;
  pageName: any;
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const { asPath } = useRouter();

  useEffect(() => {
    if (session) {
      setUser({
        name: session.user.name,
        photoUrl: session.user.image,
      });
    } else {
      setUser(null);
      if (router.pathname !== "/login") {
        router.push("/login");
      }
    }
  }, [session, router]);

  return (
    <div className="h-full w-full">
      <div className="h-screen w-full min-w-[320px] bg-white flex flex-col">
        {pageName !== "ConfirmPage" && pageName !== "SuccessPage" && (
          <nav className="flex items-center justify-between bg-black p-3 text-white md:p-5">
            <Link
              href={`${pageName === "LoginPage" ? "#" : "/"}`}
              className={`${
                pageName === "LoginPage" ? "cursor-default" : "cursor-pointer"
              }`}
              passHref
            >
              <img
                className="h-7 md:h-9"
                src="https://companieslogo.com/img/orig/UBER.D-f23d4b1c.png?t=1635007057"
                alt="uber logo"
              />
            </Link>
            {pageName === "HomePage" && (
              <div className="flex items-center">
                <div className="mr-4 w-fit text-sm">{user && user.name}</div>
                {user && (
                  <img
                    className="h-10 w-10 cursor-pointer rounded-full border border-gray-100 p-px"
                    src={user.photoUrl}
                    onClick={() =>
                      signOut({ redirect: false, callbackUrl: "/login" })
                    }
                    alt="user image"
                    title="Sign out"
                  />
                )}
              </div>
            )}
          </nav>
        )}
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default ComponentLayout;
