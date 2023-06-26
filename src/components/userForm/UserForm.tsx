import css from "./styles.module.css";
import { Autocomplete } from "@react-google-maps/api";
import { ShopLocation } from "@/models/cart";

import { formatingPhone } from "../../helpers/formatingPhone";
import { useState } from "react";

type UserData = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

interface UserFormProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  isFormValid: boolean;
  setLocation: React.Dispatch<React.SetStateAction<ShopLocation>>;
  isLoaded: boolean;
}

export const UserForm = ({
  userData,
  setUserData,
  isFormValid,
  setLocation,
  isLoaded,
}: UserFormProps) => {
  const [searchResult, setSearchResult] =
    useState<google.maps.places.PlaceResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const formatedPhone = formatingPhone(value);
      setUserData((prevData) => ({
        ...prevData,
        phone: formatedPhone,
      }));
      return;
    }
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setSearchResult(autocomplete.getPlace());
  };

  const onPlaceChanged = () => {
    if (searchResult) {
      const places = searchResult;
      if (
        places.geometry === undefined ||
        places.geometry.location === undefined
      ) {
        return;
      }
      const lat = places.geometry.location.lat().toString();
      const lng = places.geometry.location.lng().toString();
      setLocation({ lat, lng });
      setUserData((prevData) => ({
        ...prevData,
        address: places.formatted_address || "",
      }));
    }
  };

  return (
    <>
      <form className={css.form}>
        <div>
          <label>
            Name:
            <input
              autoComplete="off"
              placeholder="Mike"
              required
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              autoComplete="off"
              placeholder="example@gmail.com"
              required
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Phone:
            <input
              autoComplete="off"
              placeholder="(093)5555555"
              required
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
            />
          </label>
        </div>
        {isLoaded && (
          <>
            <label>
              Address:
              <Autocomplete
                options={{
                  types: ["address"],
                  componentRestrictions: { country: "ua" },
                }}
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  autoComplete="off"
                  name="address"
                  type="text"
                  placeholder="Start typing your address in Kiev region"
                  className={css.autocomplete}
                  onChange={handleChange}
                  value={userData.address}
                />
              </Autocomplete>
            </label>
          </>
        )}
      </form>
      {!isFormValid && <p className={css.invalidMsg}>Fill all fields!</p>}
    </>
  );
};
