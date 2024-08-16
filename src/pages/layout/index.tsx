/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { ClipLoading } from "@/config/appLoading";
import Trip from "@/components/Trip";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { FcAbout, FcBusinessman } from "react-icons/fc";

interface UserData {
  name: string;
  photoUrl: string;
  email: string;
}

const ComponentLayout = ({
  children,
  pageName,
}: {
  children: any;
  pageName: any;
}) => {
  const { data: session, status } = useSession();
  const { push } = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [history, setHistory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [trip, setTrip] = useState<any>("");
  const [profileMenu, setProfileMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (session) {
      setUser({
        name: session.user.name,
        photoUrl: session.user.image,
        email: session.user.email,
      });
    }
  }, [session, push]);

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-screen w-full">
      <div className="h-full w-full min-w-[250px] bg-white flex flex-col">
        {pageName !== "ConfirmPage" && (
          <nav className="h-[70px] px-4 flex items-center justify-between bg-black text-white">
            <Link href="/" className="cursor-pointer" passHref title="Home">
              <Image
                src="/images/rideease_logo.png"
                alt="uber logo"
                height={40}
                width={70}
              />
            </Link>
            <div className="flex items-center">
              {pageName === "HomePage" && user && (
                <div className="flex items-center">
                  <button
                    className="mr-4 font-semibold"
                    onClick={displayHistory}
                  >
                    History
                  </button>
                </div>
              )}
              {user ? (
                <div className="flex flex-col">
                  <div className="relative " ref={ref}>
                    <button onClick={() => setProfileMenu((prev) => !prev)}>
                      {user.photoUrl ? (
                        <img
                          src={user.photoUrl}
                          alt=""
                          className={`h-10 w-10 cursor-pointer rounded-full border border-gray-100 p-px`}
                          title="User"
                        />
                      ) : (
                        <FcBusinessman
                          size={50}
                          className="w-10 rounded-full"
                        />
                      )}
                    </button>
                    {profileMenu && (
                      <div className="bg-gray-200 absolute top-[125%] right-0 z-20 flex flex-col rounded border  border-gray-400 shadow-lg w-[200px] min-w-fit h-[200px] before:block before:h-[20px] before:w-[20px] before:rotate-45 before:absolute before:top-[-11px] before:right-[5%]  before:bg-gray-200 before:border-t before:border-l before:border-gray-400">
                        <div className="flex p-[15px] border-b border-b-gray-400">
                          <div className="mr-[10px]">
                            {user.photoUrl ? (
                              <img
                                src={user.photoUrl}
                                alt=""
                                width={60}
                                height={60}
                                className=" rounded-full"
                              />
                            ) : (
                              <FaUser size={50} className="w-10 rounded-full" />
                            )}
                          </div>
                          <div className="flex flex-col justify-between py-[5px] text-xs text-gray-500 ">
                            <div>{user.name}</div>
                            <div>{user.email}</div>
                          </div>
                        </div>
                        <div className=" text-lg text-gray-600">
                          <Link
                            href="#"
                            className="flex items-center p-[7px] hover:bg-gray-300 w-full"
                          >
                            <FaUser size={16} color="gray" />
                            <span className="ml-[6px]">Profile</span>
                          </Link>
                          <button
                            onClick={() => {
                              signOut();
                              window.location.reload();
                            }}
                            className="flex items-center p-[7px] hover:bg-gray-300 w-full"
                          >
                            <FaSignOutAlt size={16} color="gray" />
                            <span className="ml-[6px]">Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => push(`/login`)}
                    className="h-[35px] w-[120px] bg-gray-500 hover:bg-gray-300 hover:text-black mx-[10px] p-[3px] rounded   border-1-inherit shadow-md active:shadow-inner "
                  >
                    SignIn
                  </button>
                </div>
              )}
            </div>
          </nav>
        )}
        <div className="flex-1">{children}</div>
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
