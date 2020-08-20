import {
  COLOR_WHITE, // id 1
  COLOR_BLACK, // id 2
  COLOR_BLUE, // id 3
  COLOR_YELLOW, // id 4
  COLOR_GRAY, // id 5
  COLOR_GREEN, // id 6
  COLOR_ORANGE, // id 7

  MEMORY_32GB, // 1
  MEMORY_64GB, // 2
  MEMORY_128GB, // 3
} from "../helpers/constans";

export default [
  {
    id: 1,
    categoryId: 4,
    title: "Радионяня Motorola MBP16",
    price: 3690,
    image: "/img/radio.jpg",
    colors: [
      {
        id: 3,
        value: COLOR_BLUE,
        checked: true,
      },
      {
        id: 6,
        value: COLOR_GREEN,
        checked: false,
      },
      {
        id: 2,
        value: COLOR_BLACK,
        checked: false,
      },
    ],
  },
  {
    id: 2,
    categoryId: 1,
    title: "Ультразвуковая зубная щётка Playbrush Smart Sonic",
    price: 5660,
    image: "/img/toothbrush.jpg",
    colors: [
      {
        id: 1,
        value: COLOR_WHITE,
        checked: true,
      },
      {
        id: 3,
        value: COLOR_BLUE,
        checked: false,
      },
    ],
  },
  {
    id: 3,
    categoryId: 2,
    title: "Смартфон Xiaomi Mi Mix 3 6/128GB",
    price: 21790,
    image: "/img/phone.jpg",
    colors: [
      {
        id: 1,
        value: COLOR_WHITE,
        checked: true,
      },
      {
        id: 2,
        value: COLOR_BLACK,
        checked: false,
      },
    ],
    memories: [
      {
        id: 1,
        value: MEMORY_32GB,
        checked: false,
      },
      {
        id: 2,
        value: MEMORY_64GB,
        checked: false,
      },
      {
        id: 3,
        value: MEMORY_128GB,
        checked: true,
      },
    ],
  },
  {
    id: 4,
    categoryId: 3,
    title: "Электроскейт Razor Cruiser",
    price: 24690,
    image: "/img/board.jpg",
  },
  {
    id: 5,
    categoryId: 2,
    title: "Смартфон Xiaomi Mi A3 4/64GB Android One",
    price: 14960,
    image: "/img/phone-2.jpg",
    colors: [
      {
        id: 2,
        value: COLOR_BLACK,
        checked: true,
      },
      {
        id: 1,
        value: COLOR_WHITE,
        checked: false,
      },
      {
        id: 5,
        value: COLOR_GRAY,
        checked: false,
      },
    ],
    memories: [
      {
        id: 1,
        value: MEMORY_32GB,
        checked: false,
      },
      {
        id: 2,
        value: MEMORY_64GB,
        checked: true,
      },
    ],
  },
  {
    id: 6,
    categoryId: 2,
    title: "Смартфон Xiaomi Redmi 6/128GB",
    price: 8960,
    image: "/img/phone-2.jpg",
    colors: [
      {
        id: 2,
        value: COLOR_BLACK,
        checked: true,
      },
      {
        id: 1,
        value: COLOR_WHITE,
        checked: false,
      },
    ],
    memories: [
      {
        id: 2,
        value: MEMORY_64GB,
        checked: false,
      },
      {
        id: 3,
        value: MEMORY_128GB,
        checked: true,
      },
    ],
  },
  {
    id: 7,
    categoryId: 3,
    title: "Электрический дрифт-карт Razor Crazy Cart",
    price: 39900,
    image: "/img/bicycle.jpg",
    colors: [
      {
        id: 4,
        value: COLOR_YELLOW,
        checked: true,
      },
      {
        id: 7,
        value: COLOR_ORANGE,
        checked: false,
      },
      {
        id: 2,
        value: COLOR_BLACK,
        checked: false,
      },
    ],
  },
  {
    id: 8,
    categoryId: 3,
    title: "Гироскутер Razor Hovertrax 2.0",
    price: 34900,
    image: "/img/wheels.jpg",
    colors: [
      {
        id: 5,
        value: COLOR_GRAY,
        checked: true,
      },
      {
        id: 2,
        value: COLOR_BLACK,
        checked: false,
      },
      {
        id: 3,
        value: COLOR_BLUE,
        checked: false,
      },
    ],
  },
  {
    id: 9,
    categoryId: 3,
    title: "Детский трюковой самокат Razor Grom",
    price: 4990,
    image: "/img/scooter.jpg",
  },
  {
    id: 10,
    categoryId: 3,
    title: "Роллерсёрф Razor RipStik Air Pro",
    price: 6990,
    image: "/img/ripstik.jpg",
    colors: [
      {
        id: 2,
        value: COLOR_BLACK,
        checked: true,
      },
      {
        id: 1,
        value: COLOR_WHITE,
        checked: false,
      },
      {
        id: 3,
        value: COLOR_BLUE,
        checked: false,
      },
      {
        id: 4,
        value: COLOR_YELLOW,
        checked: false,
      },
      {
        id: 5,
        value: COLOR_GRAY,
        checked: false,
      },
      {
        id: 6,
        value: COLOR_GREEN,
        checked: false,
      },
      {
        id: 7,
        value: COLOR_ORANGE,
        checked: false,
      },
    ],
  },
  {
    id: 11,
    categoryId: 5,
    title: "Наушники AirPods с беспроводным зарядным футляром",
    price: 16560,
    image: "/img/airpods.jpg",
  },
  {
    id: 12,
    categoryId: 5,
    title: "Наушники Sony",
    price: 30690,
    image: "/img/headphones.jpg",
    colors: [
      {
        id: 1,
        value: COLOR_WHITE,
        checked: true,
      },
      {
        id: 2,
        value: COLOR_BLACK,
        checked: false,
      },
      {
        id: 7,
        value: COLOR_ORANGE,
        checked: false,
      },
    ],
  },
];
