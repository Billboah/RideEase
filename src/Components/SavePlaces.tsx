import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import { FadeLoading } from "@/config/appLoading";

interface SavePlacesProps {
  pickup: string;
  id: string;
  dropoff: string;
  deleteLocationItem: (id: string) => void;
  deletePlaceLoading: { [key: string]: boolean };
}

const SavePlaces: React.FC<SavePlacesProps> = ({
  pickup,
  id,
  dropoff,
  deleteLocationItem,
  deletePlaceLoading,
}) => {
  const router = useRouter();

  const findLocation = () => {
    router.push({
      pathname: "/confirm",
      query: {
        pickup: pickup,
        dropoff: dropoff,
      },
    });
  };

  return (
    <div className="h-[50px] w-full px-[20px] py-[5px] hover:bg-gray-100 active:bg-gray-200 flex items-center justify-between  ">
      <button onClick={findLocation} className="flex-1 flex items-center">
        <p className="text-left text-[18px]">
          <span className="font-bold">From:</span>
          <span className="mx-[7px] capitalize">{pickup}</span>
          <span className="ml-[15px] font-bold">To:</span>
          <span className="mx-[7px] capitalize">{dropoff}</span>
        </p>
      </button>
      <button
        className="w-fit"
        onClick={() => deleteLocationItem(id)}
        disabled={deletePlaceLoading[id]}
      >
        {deletePlaceLoading[id] ? (
          <div className="mb-[-20px] mr-[-20px] p-2">
            <FadeLoading height={6} width={3} margin={-12} />
          </div>
        ) : (
          <DeleteIcon />
        )}
      </button>
    </div>
  );
};

export default SavePlaces;
