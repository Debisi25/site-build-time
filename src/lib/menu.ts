import jollof from "@/assets/dish-jollof.jpg";
import prawns from "@/assets/dish-prawns.jpg";
import plantain from "@/assets/dish-plantain.jpg";
import zobo from "@/assets/dish-zobo.jpg";
import peppersoup from "@/assets/dish-peppersoup.jpg";
import fish from "@/assets/dish-fish.jpg";
import egusi from "@/assets/dish-egusi.jpg";
import dessert from "@/assets/dish-dessert.jpg";
import suya from "@/assets/story.jpg";

export type Category = "starters" | "mains" | "sides" | "desserts" | "drinks";

export interface Dish {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  image: string;
  notes?: string;
}

export const CATEGORIES: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "starters", label: "Starters" },
  { id: "mains", label: "Mains" },
  { id: "sides", label: "Sides" },
  { id: "desserts", label: "Desserts" },
  { id: "drinks", label: "Drinks" },
];

export const DISHES: Dish[] = [
  { id: "coconut-prawns", name: "Coconut Prawns", category: "starters", price: 14500, image: prawns, description: "Tiger prawns served with Lagos-style pepper sauce, toasted coconut and lime.", notes: "Shellfish · Medium heat" },
  { id: "beef-suya", name: "Beef Suya Skewers", category: "starters", price: 9500, image: suya, description: "Flame-grilled beef in house yaji spice, with ata dindin and fresh herbs.", notes: "Contains peanut · Spicy" },
  { id: "goat-pepper-soup", name: "Goat Pepper Soup", category: "starters", price: 8000, image: peppersoup, description: "Slow-simmered goat in a fragrant broth of uziza, calabash nutmeg and scent leaf.", notes: "Spicy · Gluten free" },
  { id: "party-jollof", name: "Smoky Party Jollof", category: "mains", price: 16000, image: jollof, description: "Wood-smoked jollof rice with charred chicken thigh and pepper glaze.", notes: "Gluten free" },
  { id: "grilled-croaker", name: "Grilled Croaker", category: "mains", price: 24000, image: fish, description: "Whole croaker fish rubbed in yaji, grilled over coals with burnt onions.", notes: "Fish · Medium heat" },
  { id: "egusi-pounded-yam", name: "Egusi & Pounded Yam", category: "mains", price: 18500, image: egusi, description: "Melon seed soup with ugu, assorted meats and hand-pounded yam.", notes: "Contains seeds" },
  { id: "dodo-puff", name: "Dodo & Puff Puff", category: "sides", price: 6000, image: plantain, description: "Caramelised ripe plantain and warm puff puff with a chilli tomato dip.", notes: "Vegetarian" },
  { id: "puff-puff-sundae", name: "Puff Puff Sundae", category: "desserts", price: 7500, image: dessert, description: "Sugared puff puff, vanilla bean ice cream and salted palm caramel.", notes: "Vegetarian · Contains dairy" },
  { id: "zobo-coconut", name: "Zobo & Coconut Cake", category: "desserts", price: 8500, image: zobo, description: "A slice of coconut sponge served with chilled hibiscus zobo.", notes: "Vegetarian" },
  { id: "zobo-spritz", name: "Zobo Spritz", category: "drinks", price: 5500, image: zobo, description: "Hibiscus, ginger, pineapple peel and lime over ice. Non-alcoholic.", notes: "Non-alcoholic" },
];

export const formatPrice = (n: number) => `₦${n.toLocaleString("en-NG")}`;
