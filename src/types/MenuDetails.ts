import { RoutesEnum } from "../router/RoutesEnum";

interface MenuItem {
  title: string;
  key?: string;
  img: string;
  link?: string;
  price?: number;
  id?: number;
  description?: string;
  calories?: number;
}

interface MenuDetails {
  burgers: MenuItem[];
  chicken: MenuItem[];
  combos: MenuItem[];
}

interface VerticalMenuType {
  Items: MenuItem[];
}

export const menu: MenuDetails = {
  burgers: [
    {
      id: 1,
      title: "Quarter Pounder ®✶ with Cheese",
      img: "src/assets/MenuBurgers/QuarterPoundCheese.svg",
      link: RoutesEnum.BURGERS,
      price: 6.49,
      description:
        "A juicy quarter pound beef patty with cheese, pickles, onions, ketchup and mustard.",
      calories: 520,
    },
    {
      id: 2,
      title: "McDouble®",
      img: "src/assets/MenuBurgers/McDouble.svg",
      link: RoutesEnum.BURGERS,
      price: 3.99,
      description:
        "Two beef patties with one slice of cheese, pickles, onions, ketchup and mustard.",
      calories: 400,
    },
    {
      id: 3,
      title: "Big Mac®",
      img: "src/assets/MenuBurgers/BigMac.svg",
      link: RoutesEnum.BURGERS,
      price: 5.99,
      description:
        "Two beef patties, lettuce, pickles, onions, cheese, and Big Mac® sauce on a triple bun.",
      calories: 580,
    },
    {
      id: 4,
      title: "Cheeseburger",
      img: "src/assets/MenuBurgers/CheeseBurger.svg",
      link: RoutesEnum.BURGERS,
      price: 2.89,
      description:
        "A classic cheeseburger with pickles, onions, ketchup and mustard.",
      calories: 300,
    },
    {
      id: 5,
      title: "Classic McDonald's Burger",
      img: "src/assets/MenuBurgers/ClassicBurger.svg",
      link: RoutesEnum.BURGERS,
      price: 3.49,
      description:
        "A timeless McDonald’s favorite with beef, onions, and simple toppings.",
      calories: 320,
    },
    {
      id: 6,
      title: "McBacon",
      img: "src/assets/MenuBurgers/McBacon.svg",
      link: RoutesEnum.BURGERS,
      price: 5.29,
      description:
        "Beef patty with crispy bacon, cheese, and smoky sauce on a toasted bun.",
      calories: 540,
    },
    {
      id: 7,
      title: "Double Quarter Pounder®✶ with Cheese",
      img: "src/assets/MenuBurgers/DoubleQuarter.svg",
      link: RoutesEnum.BURGERS,
      price: 7.29,
      description:
        "Two quarter-pound beef patties with cheese, pickles, onions, ketchup and mustard.",
      calories: 740,
    },
    {
      id: 8,
      title: "Double Cheeseburger",
      img: "src/assets/MenuBurgers/DoubleCheese.svg",
      link: RoutesEnum.BURGERS,
      price: 4.49,
      description:
        "Two beef patties, two slices of cheese, pickles, onions, ketchup and mustard.",
      calories: 440,
    },
    {
      id: 9,
      title: "BBQ Burger",
      img: "src/assets/MenuBurgers/BbqBurger.svg",
      link: RoutesEnum.BURGERS,
      price: 5.49,
      description:
        "Beef patty with BBQ sauce, crispy onions, and smoky flavor in every bite.",
      calories: 510,
    },
  ],

  chicken: [
    {
      title: "McPollo",
      img: "src/assets/MenuChicken/McPollo.svg",
      link: RoutesEnum.BURGERS,
    },
    {
      title: "McCrispy Deluxe",
      img: "src/assets/MenuChicken/McCrispyDeluxe.svg",
      link: RoutesEnum.BURGERS,
    },
    {
      title: "McCrispy Spicy",
      img: "src/assets/MenuChicken/McCrispySpicy.svg",
      link: RoutesEnum.BURGERS,
    },
    {
      title: "McCrispy CBO",
      img: "src/assets/MenuChicken/McCrispyCBO.svg",
      link: RoutesEnum.BURGERS,
    },
    {
      title: "McNuggets 4",
      img: "src/assets/MenuChicken/Nuggets4.svg",
      link: RoutesEnum.NUGGETS,
    },
    {
      title: "McNuggets 6",
      img: "src/assets/MenuChicken/Nuggets6.svg",
      link: RoutesEnum.NUGGETS,
    },
    {
      title: "McNuggets 10",
      img: "src/assets/MenuChicken/Nuggets10.svg",
      link: RoutesEnum.NUGGETS,
    },
    {
      title: "McNuggets 20",
      img: "src/assets/MenuChicken/Nuggets20.svg",
      link: RoutesEnum.NUGGETS,
    },
    {
      title: "Jalapeño Chicken",
      img: "src/assets/MenuChicken/McJalapeño.svg",
      link: RoutesEnum.BURGERS,
    },
  ],
  combos: [
    {
      title: "McCrispy Deluxe Combo",
      img: "src/assets/MenuCombos/McCrispyDeluxe.svg",
    },
    {
      title: "McCrispy Spicy Combo",
      img: "src/assets/MenuCombos/McCrispySpicy.svg",
    },
    {
      title: "Cheeseburger Combo",
      img: "src/assets/MenuCombos/CheeseBurger.svg",
    },
    {
      title: "Double Quarter Pounder® Combo",
      img: "src/assets/MenuCombos/DoubleQuarter.svg",
    },
    {
      title: "Big Mac® Combo",
      img: "src/assets/MenuCombos/BigMac.svg",
    },
    {
      title: "McBacon Combo",
      img: "src/assets/MenuCombos/McBacon.svg",
    },
    {
      title: "Quarter Pounder® with Cheese Combo",
      img: "src/assets/MenuCombos/QuaterPound.svg",
    },
    {
      title: "BBQ Burger Combo",
      img: "src/assets/MenuCombos/BbqBurger.svg",
    },
    {
      title: "Double Cheeseburger Combo",
      img: "src/assets/MenuCombos/DoubleCheese.svg",
    },
  ],
};

export const findMenuItemByTitle = (title: string) => {
  const categories = Object.keys(menu) as Array<keyof typeof menu>;

  for (const category of categories) {
    const item = menu[category].find((entry) => entry.title === title);
    if (item) return item;
  }
};

export const verticalMenuItems: VerticalMenuType = {
  Items: [
    {
      title: "Beverages",
      key: "beverages",
      img: "src/assets/MenuItems/Beverages.svg",
    },
    {
      title: "Chicken",
      key: "chicken",
      img: "src/assets/MenuItems/Chicken.svg",
    },
    {
      title: "Burgers",
      key: "burgers",
      img: "src/assets/MenuItems/Burgers.svg",
    },
    {
      title: "Combos Meal",
      key: "combos",
      img: "src/assets/MenuItems/Combos.svg",
    },
    {
      title: "Fries",
      key: "fries",
      img: "src/assets/MenuItems/McFries.svg",
    },
    {
      title: "Desserts",
      key: "desserts",
      img: "src/assets/MenuItems/Desserts.svg",
    },
    {
      title: "Happy Meal®",
      key: "happy",
      img: "src/assets/MenuItems/HappyMeal.svg",
    },
  ],
};
