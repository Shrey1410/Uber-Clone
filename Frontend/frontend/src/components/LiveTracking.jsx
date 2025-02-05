import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";

const center = { lat: 48.8584, lng: 2.2945 };
function LiveTracking() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AlzaSyFZ9A9ACiclWTgEhQvQfmEH7Zs-d6-gErU",
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef();
  const destinationRef = useRef();

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }

    // Ensure `google` is available
    if (!google || !google.maps) {
      console.error("Google Maps API not loaded yet");
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <div className="w-full h-full">
      <div className="h-full w-full">
        <GoogleMap
          center={{ lat: 48.8584, lng: 2.2945 }}
          zoom={15}
          mapContainerStyle={{ height: "100%", width: "100%" }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={{ lat: 48.8584, lng: 2.2945 }} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

export default LiveTracking;
