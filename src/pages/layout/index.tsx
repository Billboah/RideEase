/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { ClipLoading } from "@/config/appLoading";
import Trip from "@/Components/Trip";

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
  const [history, setHistory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [trip, setTrip] = useState<any>("");
  const ref = useRef<HTMLDivElement>(null);

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

  const displayHistory = async () => {
    setHistory(true);
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/stripe/trips`);
      setTrip(data[0]);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        setApiError(error.response.data.error);
      } else if (error.request) {
        alert(
          "Cannot reach the server. Please check your internet connection."
        );
      } else {
        setApiError(error.message);
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setApiError("");
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [apiError]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setHistory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-full w-full">
      <div className="h-screen w-full min-w-[250px] bg-white flex flex-col">
        {pageName !== "ConfirmPage" && (
          <nav className="flex items-center justify-between bg-black p-3 text-white md:p-5">
            <Link
              href={`${pageName === "LoginPage" ? "#" : "/"}`}
              className={`${
                pageName === "LoginPage" ? "cursor-default" : "cursor-pointer"
              }`}
              passHref
            >
              <Image
                src="/images/uber-logo.png"
                alt="uber logo"
                height={40}
                width={70}
              />
            </Link>
            <div className="flex items-center">
              {pageName === "HomePage" && (
                <div className="flex items-center">
                  <button
                    className="mr-4 font-semibold"
                    onClick={displayHistory}
                  >
                    History
                  </button>
                  <div className="mr-2 w-fit text-sm">{user && user.name}</div>
                </div>
              )}
              {user && (
                <img
                  className={`h-10 w-10 ${
                    pageName === "HomePage"
                      ? "cursor-pointer"
                      : "cursor-default"
                  } rounded-full border border-gray-100 p-px`}
                  src={user.photoUrl}
                  onClick={() =>
                    pageName === "HomePage" &&
                    signOut({ redirect: false, callbackUrl: "/login" })
                  }
                  alt="user image"
                  title={`${pageName === "HomePage" ? "Sign out" : ""}`}
                />
              )}
            </div>
          </nav>
        )}
        <div className="h-full w-full">{children}</div>
      </div>
      {history && (
        <div className="h-screen w-full bg-black bg-opacity-60 flex justify-center items-center absolute top-0 left-0">
          <div
            className="h-fit w-full min-w-[fit] max-w-[400px] py-[15px] bg-white rounded-md "
            ref={ref}
          >
            <div className="flex flex-col justify-center items-center">
              <h4 className="h-full w-full text-center font-bold border-b boder-gray-300">
                Last Trip
              </h4>
              {loading ? <ClipLoading size={35} /> : <Trip trip={trip} />}
            </div>
            <div className="w-full text-sm text-center border-t border-gray-300 my-3 text-gray-500">
              <Link href="/histories">See More Trips</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentLayout;
