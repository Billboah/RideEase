import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const ComponentLayout = ({ children }: { children: any }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!session && router.pathname !== "/login") {
        router.push("/login");
      }
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [session, router]);

  return <div className="h-full w-full">{children}</div>;
};

export default ComponentLayout;
