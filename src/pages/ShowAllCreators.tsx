import { supabase } from "../client";
import { useEffect, useState } from "react";
import { Creator } from "../types";
import Card from "../components/CreatorCard";
import { rawCreatorDataToCreatorType } from "../util";

const ShowAllCreators = () => {

  const [creators, setCreators] = useState<Creator[]>([]);
  const [connection, setConnection] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status

  useEffect(() => {
    checkConnection();
  }, []);

  useEffect(() => {
    if (connection) {
      handleGetAllCreators();
      setConnection(false);
    }
  });


  const checkConnection = async () => {
    const { error } = await supabase
      .from("creators")
      .select("*")
      .limit(1);
    if (error) {
      console.error("Error connecting to Supabase:", error);
    } else {
      console.log("Successfully connected to Supabase");
      setConnection(true);
    }
  };

  const handleGetAllCreators = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("creators")
      .select("id, name, image_url");
    if (error) {
      console.error("Error obtainting creators: ", error);
    } else {
      console.log("Creators obtained succesfully");
      console.log(data);
      const formattedData = rawCreatorDataToCreatorType(data);
      setCreators(formattedData);
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto px-4 py-16 bg-gray-100 min-h-screen relative">
      <div className="absolute top-0 left-0 w-full h-auto -z-3">
        <svg
          className="w-full h-auto"
          width="574"
          height="93"
          viewBox="0 0 574 93"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 61.0907L16.889 60.485C32.778 59.8785 64.556 58.6671 96.333 63.2123C128.111 67.7575 159.889 78.0608 191.667 79.273C223.444 80.4852 255.222 72.6063 287 69.879C318.778 67.1517 350.556 69.5761 382.333 68.9697C414.111 68.3639 445.889 64.7273 477.667 68.0603C509.444 71.3941 541.222 81.6967 557.111 86.8483L574 92"
            stroke="#043A5F"
            strokeWidth="2"
          />
          <path
            d="M0 61.0907L16.889 60.485C32.778 59.8785 64.556 58.6671 96.333 63.2123C128.111 67.7575 159.889 78.0608 191.667 79.273C223.444 80.4852 255.222 72.6063 287 69.879C318.778 67.1517 350.556 69.5761 382.333 68.9697C414.111 68.3639 445.889 64.7273 477.667 68.0603C509.444 71.3941 541.222 81.6967 557.111 86.8483L574 92V0H0V61.0907Z"
            fill="#005792"
          />
        </svg>
      </div>
      <div className="relative">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-28 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-5">
            {creators.map((creator, index) => (
              <Card key={index} id={creator.id} creator={creator} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowAllCreators;
