import { useSelector } from "react-redux";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { ShopLocation } from "@/models/cart";
import { RootState } from "@/redux/store";

interface MapProps {
  userLocation: ShopLocation;
  isLoaded: boolean;
}

export const Map = ({ userLocation, isLoaded }: MapProps) => {
  const shopLocation = useSelector(
    (state: RootState) => state.cart.shopLocation
  );

  const HomeIcon = {
    url: "/img/home.png",
  };
  const ShopIcon = {
    url: "/img/retail-store-icon.jpg",
  };

  return (
    <>
      {isLoaded && (
        <GoogleMap
          options={{
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: false,
          }}
          id="map"
          mapContainerStyle={{
            height: "220px",
            width: "100%",
            borderRadius: "6px",
            marginBottom: "10px",
          }}
          zoom={9}
          center={{
            lat: 50.445607,
            lng: 30.528437,
          }}
        >
          <MarkerF
            icon={ShopIcon}
            position={{
              lat: parseFloat(shopLocation.lat),
              lng: parseFloat(shopLocation.lng),
            }}
          />
          {userLocation && (
            <MarkerF
              icon={HomeIcon}
              position={{
                lat: parseFloat(userLocation.lat),
                lng: parseFloat(userLocation.lng),
              }}
            />
          )}
        </GoogleMap>
      )}
    </>
  );
};
