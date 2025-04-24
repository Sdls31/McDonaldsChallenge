import { Route, Routes as RoutesFromRouter } from "react-router-dom";
import { HomePage } from "../components/HomePage";
import { RoutesEnum } from "./RoutesEnum";
import { Menu } from "../pages/Menu";
import { Burger } from "../components/Burger";
import { Personalize } from "../components/Personalize";
import { NuggetsProcess } from "../components/NuggetsPage";
import { CartProvider } from "../context/CartContext";
import { OrderType } from "../components/OrderType";
import { FriesProcess } from "../components/FriesPage";
import { HappyMealPage } from "../components/HappyMealPage";
import { Checkout } from "../components/Checkout";
import { Qr } from "../components/Qr";
import { AvatarProvider } from "../context/AvatarContext";
import SwipeAnimation from "../components/SwipeAnimation";

export const Routes = () => {
  return (
    <RoutesFromRouter>
      <Route path={RoutesEnum.HOME} element={<HomePage />} />
      <Route
        path={RoutesEnum.TYPE}
        element={
          <AvatarProvider>
            <OrderType />
          </AvatarProvider>
        }
      />
      <Route
        path={RoutesEnum.CHECKOUT}
        element={
          <AvatarProvider>
            <Checkout />
          </AvatarProvider>
        }
      />
      <Route path={RoutesEnum.QR} element={<Qr />} />
      <Route path={RoutesEnum.DEDO} element={< SwipeAnimation/>} />
      <Route
        path={RoutesEnum.MAIN}
        element={
          <AvatarProvider>
            <CartProvider>
              <Menu />
            </CartProvider>
          </AvatarProvider>
        }
      />
      <Route
        path={RoutesEnum.BURGERS}
        element={
          <AvatarProvider>
            <CartProvider>
              <Burger />
            </CartProvider>
          </AvatarProvider>
        }
      />
      <Route
        path={RoutesEnum.PERSONALIZE}
        element={
          <AvatarProvider>
            <CartProvider>
              <Personalize />
            </CartProvider>
          </AvatarProvider>
        }
      />
      <Route
        path={RoutesEnum.NUGGETS}
        element={
          <AvatarProvider>
            <CartProvider>
              <NuggetsProcess />
            </CartProvider>
          </AvatarProvider>
        }
      />
      <Route
        path={RoutesEnum.FRIES}
        element={
          <AvatarProvider>
            <CartProvider>
              <FriesProcess />
            </CartProvider>
          </AvatarProvider>
        }
      />
      <Route
        path={RoutesEnum.HAPPY_MEAL}
        element={
          <CartProvider>
            <HappyMealPage />
          </CartProvider>
        }
      />

    </RoutesFromRouter>
  );
};
