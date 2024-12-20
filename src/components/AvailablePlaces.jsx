import { useState } from "react";
import Places from "./Places.jsx";
import { useEffect } from "react";
import Error from "./Error";

export default function AvailablePlaces(props) {
  const { onSelectPlace } = props;
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsFetching(true);
    async function fetchPlaces() {
      try {
        const response = await fetch("http://localhost:3000/placesss");

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();

        setAvailablePlaces(data.places);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places. please try again later",
        });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error Occured" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText={"Is loading ..."}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
