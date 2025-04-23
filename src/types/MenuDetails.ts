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
  beverages: MenuItem[];
  fries: MenuItem[];
}

interface VerticalMenuType {
  Items: MenuItem[];
}

export const menu: MenuDetails = {
  burgers: [
    {
      id: 1,
      title: "Quarter Pounder ®",
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
      title: "Classic McDonald's",
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
      title: "Dbl Quarter Pounder®",
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
      id: 1,
      title: "McPollo",
      img: "src/assets/MenuChicken/McPollo.svg",
      link: RoutesEnum.BURGERS,
      price: 3.99,
      description:
        "Delicious breaded chicken with lettuce and mayo on a soft bun.",
      calories: 410,
    },
    {
      id: 2,
      title: "McCrispy Deluxe",
      img: "src/assets/MenuChicken/McCrispyDeluxe.svg",
      link: RoutesEnum.BURGERS,
      price: 4.79,
      description:
        "Crispy chicken fillet with tomato, lettuce and creamy sauce.",
      calories: 470,
    },
    {
      id: 3,
      title: "McCrispy Spicy",
      img: "src/assets/MenuChicken/McCrispySpicy.svg",
      link: RoutesEnum.BURGERS,
      price: 4.89,
      description: "Spicy crispy chicken with bold flavor and crunchy texture.",
      calories: 490,
    },
    {
      id: 4,
      title: "McCrispy CBO",
      img: "src/assets/MenuChicken/McCrispyCBO.svg",
      link: RoutesEnum.BURGERS,
      price: 5.29,
      description:
        "Crispy chicken with bacon, cheese, and onions on a toasted bun.",
      calories: 520,
    },
    {
      id: 5,
      title: "McNuggets 4",
      img: "src/assets/MenuChicken/Nuggets4.svg",
      link: RoutesEnum.NUGGETS,
      price: 2.49,
      description: "4 tender chicken nuggets, golden and crispy.",
      calories: 170,
    },
    {
      id: 6,
      title: "McNuggets 6",
      img: "src/assets/MenuChicken/Nuggets6.svg",
      link: RoutesEnum.NUGGETS,
      price: 3.49,
      description: "6 crispy chicken nuggets perfect for a snack or meal.",
      calories: 250,
    },
    {
      id: 7,
      title: "McNuggets 10",
      img: "src/assets/MenuChicken/Nuggets10.svg",
      link: RoutesEnum.NUGGETS,
      price: 4.89,
      description: "10 chicken nuggets with a crispy outside and juicy inside.",
      calories: 420,
    },
    {
      id: 8,
      title: "McNuggets 20",
      img: "src/assets/MenuChicken/Nuggets20.svg",
      link: RoutesEnum.NUGGETS,
      price: 7.99,
      description: "20-piece nuggets perfect for sharing or big appetites.",
      calories: 840,
    },
    {
      id: 9,
      title: "Jalapeño Chicken",
      img: "src/assets/MenuChicken/McJalapeño.svg",
      link: RoutesEnum.BURGERS,
      price: 4.59,
      description:
        "Spicy jalapeño chicken burger with melted cheese and zesty sauce.",
      calories: 460,
    },
  ],
  combos: [
    {
      id: 1,
      title: "McCrispy Deluxe Combo",
      img: "src/assets/MenuCombos/McCrispyDeluxe.svg",
      link: RoutesEnum.BURGERS,
      price: 7.99,
      description:
        "Crispy chicken fillet with lettuce and tomato, served with fries and drink.",
      calories: 870,
    },
    {
      id: 2,
      title: "McCrispy Spicy Combo",
      img: "src/assets/MenuCombos/McCrispySpicy.svg",
      link: RoutesEnum.BURGERS,
      price: 8.29,
      description:
        "Spicy crispy chicken sandwich combo with fries and a refreshing drink.",
      calories: 890,
    },
    {
      id: 3,
      title: "Cheeseburger Combo",
      img: "src/assets/MenuCombos/CheeseBurger.svg",
      link: RoutesEnum.BURGERS,
      price: 6.49,
      description:
        "Classic cheeseburger served with golden fries and your choice of drink.",
      calories: 790,
    },
    {
      id: 4,
      title: "Dbl Quarter Pounder® Combo",
      img: "src/assets/MenuCombos/DoubleQuarter.svg",
      link: RoutesEnum.BURGERS,
      price: 9.49,
      description:
        "Double beef patties with cheese, served with fries and a cold drink.",
      calories: 1050,
    },
    {
      id: 5,
      title: "Big Mac® Combo",
      img: "src/assets/MenuCombos/BigMac.svg",
      link: RoutesEnum.BURGERS,
      price: 8.19,
      description:
        "The iconic Big Mac® with fries and a drink to complete the experience.",
      calories: 950,
    },
    {
      id: 6,
      title: "McBacon Combo",
      img: "src/assets/MenuCombos/McBacon.svg",
      link: RoutesEnum.BURGERS,
      price: 7.89,
      description:
        "Juicy burger with crispy bacon, served with fries and a soft drink.",
      calories: 880,
    },
    {
      id: 7,
      title: "Quarter Pounder® Combo",
      img: "src/assets/MenuCombos/QuaterPound.svg",
      link: RoutesEnum.BURGERS,
      price: 8.69,
      description:
        "Classic Quarter Pounder® with Cheese, fries, and your favorite drink.",
      calories: 940,
    },
    {
      id: 8,
      title: "BBQ Burger Combo",
      img: "src/assets/MenuCombos/BbqBurger.svg",
      link: RoutesEnum.BURGERS,
      price: 7.59,
      description:
        "Grilled beef with smoky BBQ sauce, fries, and a chilled beverage.",
      calories: 910,
    },
    {
      id: 9,
      title: "Double Cheeseburger Combo",
      img: "src/assets/MenuCombos/DoubleCheese.svg",
      link: RoutesEnum.BURGERS,
      price: 7.29,
      description:
        "Double the cheese and beef, paired with fries and a cold drink.",
      calories: 870,
    },
  ],
  beverages: [
    {
      id: 1,
      title: "Coca-Cola",
      img: "src/assets/Soda.png",
      price: 1.69,
    },
    {
      id: 2,
      title: "Pepsi",
      img: "src/assets/Soda.png",
      price: 1.69,
    },
    {
      id: 3,
      title: "Sprite",
      img: "src/assets/Soda.png",
      price: 1.69,
    },
    {
      id: 4,
      title: "Fanta Naranja",
      img: "src/assets/Soda.png",
      price: 1.69,
    },
    {
      id: 5,
      title: "7Up",
      img: "src/assets/Soda.png",
      price: 1.69,
    },
    {
      id: 6,
      title: "Mountain Dew",
      img: "src/assets/Soda.png",
      price: 1.69,
    },
    {
      id: 7,
      title: "Dr Pepper",
      img: "src/assets/Soda.png",
      price: 1.69,
    },
    {
      id: 8,
      title: "Fresca",
      img: "src/assets/Soda.png",
      price: 1.69,
    },
    {
      id: 9,
      title: "Canada Dry",
      img: "src/assets/Soda.png",
      price: 1.69,
    },
  ],
  fries: [
    {
      id: 1,
      title: "Choose your size",
      img: "src/assets/MenuItems/McFries.svg", // MISMA IMAGEN DEL MENÚ VERTICAL
      link: RoutesEnum.FRIES,
      description: "Select the right portion of fries for your craving.",
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