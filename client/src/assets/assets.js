// Import images
import dosa from "./images/Indian/dosa.png";
import noodles from "./images/chinese/noodles.jpg";
import pizza from "./images/italian/pizza.jpg";
import penne from "./images/italian/penne.jpg";
import spaghetti from "./images/italian/spaghetti.jpg";

// Optional: create a flat assets object if you want direct access
export const assets = {
  dosa,
  noodles,
  pizza,
  penne,
  spaghetti,
};

// Define categories (for grid/cards display etc.)
export const categories = [
  {
    text: "Indian Delights",
    path: "indian",
    image: dosa,
    bgColor: "#FFF0E5", // light saffron
  },
  {
    text: "Chinese Cuisine",
    path: "chinese",
    image: noodles,
    bgColor: "#E5F4FF", // light blue
  },
  {
    text: "Italian Favorites",
    path: "italian",
    image: [pizza, penne, spaghetti],
    bgColor: "#F5E5FF", // light lavender
  },
];
