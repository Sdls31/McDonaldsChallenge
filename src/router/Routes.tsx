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
import { Checkout } from "../components/Checkout";
import { Qr } from "../components/Qr";
import { AvatarApp } from "../components/AvatarApp";

export const Routes = () => {
  return (
    <RoutesFromRouter>
      <Route path={RoutesEnum.HOME} element={<HomePage />} />
      <Route path={RoutesEnum.TYPE} element={<OrderType />} />
      <Route path={RoutesEnum.CHECKOUT} element={<Checkout />} />
      <Route path={RoutesEnum.QR} element={<Qr />} />
      <Route
        path={RoutesEnum.MAIN}
        element={
          <CartProvider>
            <Menu />
          </CartProvider>
        }
      />
      <Route
        path={RoutesEnum.BURGERS}
        element={
          <CartProvider>
            <Burger />
          </CartProvider>
        }
      />
      <Route
        path={RoutesEnum.PERSONALIZE}
        element={
          <CartProvider>
            <Personalize />
          </CartProvider>
        }
      />
      <Route
        path={RoutesEnum.NUGGETS}
        element={
          <CartProvider>
            <NuggetsProcess />
          </CartProvider>
        }
      />
      <Route
        path={RoutesEnum.FRIES}
        element={
          <CartProvider>
            <FriesProcess />
          </CartProvider>
        }
      />
    </RoutesFromRouter>
  );
};
