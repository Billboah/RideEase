/* eslint-disable @next/next/no-img-element */
import React from "react";
import { format, isToday, isYesterday } from "date-fns";

const Trip = ({ trip }: { trip: any }) => {
  const uberImage = trip && trip.images;

  const formattedDateAndTime = (date: any) => {
    const today = new Date();
    const messageDate = new Date(date);

    if (isToday(messageDate)) {
      return `Today at ' ${format(messageDate, "HH:mm")}`;
    } else if (isYesterday(messageDate)) {
      return `Yesterday at ${format(messageDate, "HH:mm")}`;
    } else {
      return (
        format(messageDate, " d/MM/yyyy") +
        "  at  " +
        format(messageDate, "HH:mm")
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center py-2">
        <div className="flex flex-col justify-center items-center">
          <p className="font-bold text-lg text-white text-center bg-gray-500 rounded-lg px-2 shadow-md">
            $ {trip.price}
          </p>
          <p className="text-md font-bold">
            {formattedDateAndTime(trip.createdAt)}
          </p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <img src={uberImage} alt="" className="h-[130px] w-[130px]" />
          <p className="text-gray-400 font-bold">{trip.uber_type}</p>
        </div>
        <p className="text-blue-400 font-semibold capitalize">
          {`From ${trip.pick_up} to ${trip.drop_off}`}
        </p>
      </div>
    </div>
  );
};

export default Trip;
