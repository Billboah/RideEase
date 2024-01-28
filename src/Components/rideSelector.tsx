import React from "react";
import { carList } from "./data/carList";

import CarType from "./CarType";

const RideSelector = ({
  pickupCoordinates,
  dropoffCoordinates,
}: {
  pickupCoordinates: number[];
  dropoffCoordinates: number[];
}) => {
  return (
    <div className="flex flex-1 flex-col overflow-y-scroll">
      <div className="border-b py-2 text-center text-xs text-gray-500">
        Choose a ride, or swipe up for more{" "}
      </div>
      <div className="overflow-y-scroll">
        {carList.map((car, index) => (
          <CarType
            key={index}
            car={car}
            pickupCoordinates={pickupCoordinates}
            dropoffCoordinates={dropoffCoordinates}
          />
        ))}
      </div>
    </div>
  );
};

export default RideSelector;
