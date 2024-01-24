import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ComponentLayout } from "./layout";
import { useRouter } from "next/router";
import Map from "../Components/map";

const Success = () => {
  const router = useRouter();
  const { session_id } = router.query;
  const [successData, setSuccessData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const sessionId = session_id;

  useEffect(() => {
    const fetchSuccessData = async () => {
      if (sessionId) {
        try {
          const response = await fetch(`/api/stripe/${sessionId}`);
          const data = await response.json();
          setSuccessData(data);
        } catch (error: any) {
          setLoading(false);
          if (error.response) {
            setApiError(error.response.data.error);
          } else if (error.request) {
            alert(
              "Cannot reach the server. Please check your internet connection."
            );
          } else {
            console.error("Error:", error.message);
          }
        }
      }
    };

    fetchSuccessData();
  }, [sessionId]);

  console.log(successData);

  return (
    <ComponentLayout>
      <div className="relative">
        <div>
          <div className="h-screen ">
            <Map />
          </div>
        </div>
        <div className="bg-black bg-opacity-50 absolute top-0 left-0 h-screen w-full flex justify-center items-center">
          <div className="flex flex-col items-center justify-center  bg-white rounded-md p-[20px]">
            <h1 className="text-[30px] text-center font-bold">
              Booking successful!
            </h1>
            <p className="">Booking has been confirm</p>
            <p className="">Driver will pick you up in 5 minutes</p>
            <div className="flex justify-center items-center">
              <Link href="/" passHref={true} className="button w-[200px] m-1">
                Home
              </Link>
              <Link
                href="/orders"
                passHref={true}
                className="button w-[200px] m-1"
              >
                My History
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ComponentLayout>
  );
};

export default Success;
