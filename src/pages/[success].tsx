import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ComponentLayout } from "./layout";
import { selectCheckoutSessionId } from "@/state/features/locationSlice";
import { useSelector } from "react-redux";
import router from "next/router";

const Success = () => {
  const { sessionId } = router.query;
  const [successData, setSuccessData] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const fetchSuccessData = async () => {
      if (sessionId) {
        try {
          const response = await fetch(`/api/sessions/${sessionId}`);
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
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[40px] font-bold">
          You have successfully ordered Uber service
        </h1>
        <p className="text-[20px]">
          The uber service car will be here in the next five minutes
        </p>
        <p className="flex justify-center items-center">
          <Link href="/" passHref={true} className="button">
            Go to homepage
          </Link>
          <Link href="/" passHref={true} className="button">
            Visit Orders
          </Link>
        </p>
      </div>
    </ComponentLayout>
  );
};

export default Success;
