"use client";
import { useAppDispatch, useAppSelector } from "@/hooks";
import css from "./styles.module.css";
import { useState } from "react";
import { usePlaceOrderMutation } from "../../redux/ordersAPI";
import { cartSlice } from "../../redux/cartReducer";
import { useMediaQuery } from "react-responsive";
import { Map } from "../../components/map/Map";
import { useJsApiLoader } from "@react-google-maps/api";

//Components
import { Container } from "../../components/container/Container";
import { UserForm } from "../../components/userForm/UserForm";
import { CartBlock } from "../../components/cartBlock/CartBlock";
import { MainButton } from "../../components/mainButton/MainButton";
import { RootState } from "@/redux/store";

const { NEXT_PUBLIC_MAPS_API_KEY } = process.env;
const libraries = ["places"] as any;

export default function Page() {
  const initialValue = {
    name: "",
    email: "",
    phone: "",
    address: "",
  };
  const dispatch = useAppDispatch();
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [userData, setUserData] = useState(initialValue);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isSucccess, setIsSuccess] = useState(false);
  const cart = useAppSelector((state: RootState) => state.cart.cart);
  const sum = useAppSelector((state: RootState) => state.cart.sum);
  const [placeOrder] = usePlaceOrderMutation();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: NEXT_PUBLIC_MAPS_API_KEY,
    libraries: libraries,
  });

  const handleSubmitBtn = async () => {
    if (
      userData.name.trim() !== "" &&
      userData.email.trim() !== "" &&
      userData.phone.trim() !== "" &&
      userData.address.trim() !== "" &&
      cart.length !== 0
    ) {
      setIsFormValid(true);
      try {
        await placeOrder({ cart, sum, userData });
        setIsSuccess(true);
      } catch (error) {}
      setUserData(initialValue);
      dispatch(cartSlice.actions.resetCart());
    } else {
      setIsFormValid(false);
    }
  };

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <Container>
      <div className={css.pageContent}>
        <div className={css.mainContentWrap}>
          <div className={css.userWrap}>
            <Map isLoaded={isLoaded} userLocation={location} />
            <UserForm
              userData={userData}
              setUserData={setUserData}
              setLocation={setLocation}
              isLoaded={isLoaded}
              isFormValid={isFormValid}
            />
          </div>
          {isMobile && (
            <p style={{ marginBottom: 15 }} className={css.mainText}>
              Total price: {sum.toFixed(2)} $
            </p>
          )}
          <div className={css.productsWrap}>
            {<CartBlock />}
            {isSucccess && (
              <p className={css.successText}>
                Your order is successfully sent!
              </p>
            )}
          </div>
        </div>
        <div className={css.orderResume}>
          <p className={css.mainText}>Total price: {sum.toFixed(2)} $</p>
          <MainButton onClick={handleSubmitBtn}>Submit</MainButton>
        </div>
      </div>
    </Container>
  );
}
