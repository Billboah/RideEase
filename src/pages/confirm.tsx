import React from "react";
import { useEffect, useState } from "react";
import Map from "../Components/map";
import { useRouter } from "next/router";
import RideSelector from "../Components/rideSelector";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCarType,
  selectCarDuration,
  setCarType,
} from "../state/features/locationSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import ComponentLayout from "./layout";
import Image from "next/image";

const stripePromise = loadStripe(
  "pk_test_51MKjY5AN6Uo13VzBRQfQc1RBF5AmlKyVIQxhtTiVkni1DF272YaLqJzoMMYipVCO7ix2UnuRFVnDZbtVrX1t12qj00SOMGXJJd"
);

const Confirm = () => {
  const router = useRouter();
  const { pickup, dropoff } = router.query;
  const selectedCar = useSelector(selectCarType);
  const selectRideDuration = useSelector(selectCarDuration);
  const [apiError, setApiError] = useState("");
  const [pickupCoordinates, setPickupCoordinates] = useState([0, 0]);
  const [dropoffCoordinates, setDropoffCoordinates] = useState([0, 0]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getPickupCoordinates = (pickup: any) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiYmlsbGJvYWgiLCJhIjoiY2xwYWU3ZGUzMDYydzJpcmw4c3hvcHdteSJ9.R0hd7u_Uuh-n-euSJTXo-w",
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setPickupCoordinates(data.features[0].center);
      });
  };

  const getDropoffCoordinates = (dropoff: any) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiYmlsbGJvYWgiLCJhIjoiY2xwYWU3ZGUzMDYydzJpcmw4c3hvcHdteSJ9.R0hd7u_Uuh-n-euSJTXo-w",
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setDropoffCoordinates(data.features[0].center);
      });
  };

  const ResetCarType = () => {
    dispatch(setCarType(""));
  };

  useEffect(() => {
    getPickupCoordinates(pickup);
    getDropoffCoordinates(dropoff);
    ResetCarType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    setLoading(true);
    try {
      const { data } = await axios.post("/api/stripe/checkout_sessions", {
        selectedCar: selectedCar,
        rideDuration: selectRideDuration,
        pick_up: pickup,
        drop_off: dropoff,
      });

      const result = await stripe?.redirectToCheckout(data);

      if (result) {
        setLoading(false);
      }
    } catch (error: any) {
      if (error.response) {
        setLoading(false);
        setApiError(error.response.data.error);
      } else if (error.request) {
        setLoading(false);
        alert(
          "Cannot reach the server. Please check your internet connection."
        );
      } else {
        setLoading(false);
        console.error("Error:", error.message);
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

  return (
    <ComponentLayout pageName="ConfirmPage">
      <div className="flex h-screen flex-col">
        <div className="absolute left-4 top-4 z-10 cursor-pointer rounded-full bg-white shadow-md">
          <Link href="/search" passHref onClick={ResetCarType}>
            <Image
              className="object-container "
              src="/images/leftarrow.png"
              height={35}
              width={45}
              alt="back button"
            />
          </Link>
        </div>
        <Map
          pickupCoordinates={pickupCoordinates}
          dropoffCoordinates={dropoffCoordinates}
        />
        <div className="flex h-1/2 flex-1 flex-col">
          <RideSelector
            pickupCoordinates={pickupCoordinates}
            dropoffCoordinates={dropoffCoordinates}
          />
          <div className="py-2">
            <button
              className={selectedCar && !loading ? "button" : "button-disable"}
              disabled={loading || !selectedCar}
              onClick={createCheckoutSession}
            >
              {loading
                ? "Loading..."
                : selectedCar && !loading
                ? ` Confirm ${selectedCar}`
                : "Select uber type"}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          !apiError ? "hidden" : "animate__fadeInUp"
        } animate__animated animate__delay-300ms absolute  bottom-[20px] flex h-fit w-full items-center justify-center p-[10px] `}
      >
        <div className="flex h-fit w-full max-w-[500px] items-center justify-center rounded border border-inherit bg-red-500 px-1 py-2 text-white shadow-lg">
          <p className="text-center font-semibold">{apiError}</p>
        </div>
      </div>
    </ComponentLayout>
  );
};

export default Confirm;
