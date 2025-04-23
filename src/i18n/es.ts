const es: { [key: string]: string } = {
  // UI
  "Touch to start": "Toca para iniciar",
  Language: "Lenguaje",
  "Eat in": "Comer aquí",
  "Take away": "Para llevar",
  "No items": "No hay elementos para mostrar",
  "add_to_cart": "Agregar al carrito",
  "personalize": "Personalizar",  
  proceed_to_cart: "Ir al carrito",
  my_order: "Mis pedidos",
  details: "Detalles",
  apply_promo_code: "Aplicar código promocional",
  total: "Total",
  checkout: "Pagar",
  "item_one": "ARTÍCULO",
  "item_other": "ARTÍCULOS",

  // Categories
  Beverages: "Bebidas",
  Chicken: "Pollo",
  Burgers: "Hamburguesas",
  "Combos Meal": "Combos",
  Fries: "Papas Fritas",
  Desserts: "Postres",
  "Happy Meal®": "Cajita Feliz®",
  "Coca-Cola": "Coca-Cola",
  "Pepsi": "Pepsi",
  "Sprite": "Sprite",
  "Fanta": "Fanta",
  "7Up": "7Up",
  "Mountain Dew": "Mountain Dew",
  "Dr Pepper": "Dr Pepper",
  "Fresca": "Fresca",
  "Canada Dry": "Canada Dry",

  "Choose your size": "Elige tu tamaño",
  "Small Fries": "Papas Fritas Pequeñas",
  "Medium Fries": "Papas Fritas Medianas",
  "Large Fries": "Papas Fritas Grandes",

  "Quarter Pounder ®": "Cuarto de Libra",
  "McDouble®": "McDoble®",
  "Big Mac®": "Big Mac®",
  Cheeseburger: "Hamburguesa con Queso",
  "Classic McDonald's": "Hamburguesa Clásica",
  McBacon: "McBacon",
  "Dbl Quarter Pounder®": "Doble Cuarto de Libra",
  "Double Cheeseburger": "Doble Hamburguesa",
  "BBQ Burger": "Hamburguesa BBQ",

  McPollo: "McPollo",
  "McCrispy Deluxe": "McCrispy Deluxe",
  "McCrispy Spicy": "McCrispy Picante",
  "McCrispy CBO": "McCrispy CBO",
  "McNuggets 4": "McNuggets 4 piezas",
  "McNuggets 6": "McNuggets 6 piezas",
  "McNuggets 10": "McNuggets 10 piezas",
  "McNuggets 20": "McNuggets 20 piezas",
  "Jalapeño Chicken": "Pollo con Jalapeño",

  "McCrispy Deluxe Combo": "Combo McCrispy Deluxe",
  "McCrispy Spicy Combo": "Combo McCrispy Picante",
  "Cheeseburger Combo": "Combo Hamburguesa con Queso",
  "Double Quarter Pounder® Combo": "Combo Doble Cuarto de Libra",
  "Big Mac® Combo": "Combo Big Mac®",
  "McBacon Combo": "Combo McBacon",
  "Quarter Pounder® with Cheese Combo": "Combo Cuarto de Libra con Queso",
  "BBQ Burger Combo": "Combo Hamburguesa BBQ",
  "Double Cheeseburger Combo": "Combo Doble con Queso",

  // Descriptions
  "A juicy quarter pound beef patty with cheese, pickles, onions, ketchup and mustard.":
    "Jugosa hamburguesa de cuarto de libra con queso, pepinillos, cebolla, kétchup y mostaza.",
  "Two beef patties with one slice of cheese, pickles, onions, ketchup and mustard.":
    "Dos carnes de res con una rebanada de queso, pepinillos, cebolla, kétchup y mostaza.",
  "Two beef patties, lettuce, pickles, onions, cheese, and Big Mac® sauce on a triple bun.":
    "Dos carnes de res, lechuga, pepinillos, cebolla, queso y salsa Big Mac® en pan triple.",
  "A classic cheeseburger with pickles, onions, ketchup and mustard.":
    "Hamburguesa clásica con queso, pepinillos, cebolla, kétchup y mostaza.",
  "A timeless McDonald’s favorite with beef, onions, and simple toppings.":
    "Favorita clásica de McDonald's con carne, cebolla y aderezos simples.",
  "Beef patty with crispy bacon, cheese, and smoky sauce on a toasted bun.":
    "Carne con tocino crujiente, queso y salsa ahumada en pan tostado.",
  "Two quarter-pound beef patties with cheese, pickles, onions, ketchup and mustard.":
    "Dos carnes de cuarto de libra con queso, pepinillos, cebolla, kétchup y mostaza.",
  "Two beef patties, two slices of cheese, pickles, onions, ketchup and mustard.":
    "Doble carne, doble queso, pepinillos, cebolla, kétchup y mostaza.",
  "Beef patty with BBQ sauce, crispy onions, and smoky flavor in every bite.":
    "Carne con salsa BBQ, cebolla crujiente y sabor ahumado en cada bocado.",

  "Delicious breaded chicken with lettuce and mayo on a soft bun.":
    "Pollo empanizado con lechuga y mayonesa en pan suave.",
  "Crispy chicken fillet with tomato, lettuce and creamy sauce.":
    "Filete de pollo crujiente con tomate, lechuga y salsa cremosa.",
  "Spicy crispy chicken with bold flavor and crunchy texture.":
    "Pollo crujiente y picante con mucho sabor.",
  "Crispy chicken with bacon, cheese, and onions on a toasted bun.":
    "Pollo crujiente con tocino, queso y cebolla en pan tostado.",
  "4 tender chicken nuggets, golden and crispy.": "4 nuggets de pollo dorados y crujientes.",
  "6 crispy chicken nuggets perfect for a snack or meal.": "6 nuggets crujientes ideales para un snack.",
  "10 chicken nuggets with a crispy outside and juicy inside.": "10 nuggets crujientes por fuera y jugosos por dentro.",
  "20-piece nuggets perfect for sharing or big appetites.": "20 piezas perfectas para compartir o para grandes apetitos.",
  "Spicy jalapeño chicken burger with melted cheese and zesty sauce.":
    "Hamburguesa picante de pollo con jalapeño, queso derretido y salsa.",

  "Crispy chicken fillet with lettuce and tomato, served with fries and drink.":
    "Filete de pollo crujiente con lechuga y tomate, acompañado de papas y bebida.",
  "Spicy crispy chicken sandwich combo with fries and a refreshing drink.":
    "Sándwich crujiente y picante con papas y bebida refrescante.",
  "Classic cheeseburger served with golden fries and your choice of drink.":
    "Hamburguesa con queso, papas doradas y bebida a elección.",
  "Double beef patties with cheese, served with fries and a cold drink.":
    "Doble carne con queso, papas y bebida fría.",
  "The iconic Big Mac® with fries and a drink to complete the experience.":
    "El icónico Big Mac® con papas y bebida para completar la experiencia.",
  "Juicy burger with crispy bacon, served with fries and a soft drink.":
    "Jugosa hamburguesa con tocino crujiente, papas y bebida suave.",
  "Classic Quarter Pounder® with Cheese, fries, and your favorite drink.":
    "Cuarto de libra con queso, papas y tu bebida favorita.",
  "Grilled beef with smoky BBQ sauce, fries, and a chilled beverage.":
    "Carne a la parrilla con salsa BBQ, papas y bebida fría.",
  "Double the cheese and beef, paired with fries and a cold drink.":
    "Doble queso y carne, con papas y bebida fría.",
 
};

export default es;
