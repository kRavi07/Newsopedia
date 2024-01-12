import {
  API_KEY,
  API_KEY_1,
  API_KEY_2,
  API_KEY_3,
  API_KEY_4,
  API_KEY_5,
} from "react-native-dotenv";
export const categories = [
  {
    code: "",
    pic: "https://img.icons8.com/fluent/96/000000/news.png",
    name: "general",
  },
  {
    code: "",
    pic: "https://img.icons8.com/fluent/96/000000/hard-working.png",
    name: "business",
  },
  {
    code: "",
    pic: "https://img.icons8.com/fluent/96/000000/movie-projector.png",
    name: "entertainment",
  },
  {
    pic: "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/256/external-health-hygiene-flaticons-lineal-color-flat-icons-4.png",
    name: "health",
  },
  {
    pic: "https://img.icons8.com/fluent/96/000000/microscope.png",
    name: "science",
  },
  {
    pic: "https://img.icons8.com/fluent/96/000000/trophy.png",
    name: "sports",
  },
  {
    pic: "https://img.icons8.com/fluent/96/000000/artificial-intelligence.png",
    name: "technology",
  },
];

export const country = [
  {
    code: "in",
    name: "India",
    flag: "https://img.icons8.com/color/256/india.png",
  },
  {
    code: "us",
    name: "USA",
    flag: "https://img.icons8.com/color/256/usa.png",
  },
  {
    code: "au",
    name: "Australia",
    flag: "https://img.icons8.com/color/256/australia-flag--v1.png",
  },
  {
    code: "ru",
    name: "Russia",
    flag: "https://img.icons8.com/external-flat-icons-inmotus-design/256/external-europe-europe-flags-flat-icons-inmotus-design-8.png",
  },
  {
    code: "fr",
    name: "France",
    flag: "https://img.icons8.com/color/256/france.png",
  },
  {
    code: "gb",
    name: "United Kingdom",
    flag: "https://img.icons8.com/emoji/256/united-kingdom-emoji.png",
  },
];

export const sources = [
  {
    id: "bbc-news",
    name: "BBC News",
    pic: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/1200px-BBC_News_2019.svg.png",
  },
  {
    id: "cnn",
    name: "CNN",
    pic: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/CNN_International_logo.svg/240px-CNN_International_logo.svg.png",
  },
  {
    id: "the-times-of-india",
    name: "Times of India",
    pic: "https://static.wikia.nocookie.net/logopedia/images/2/28/ToI.png/revision/latest?cb=20200720073717",
  },
  {
    id: "espn",
    name: "ESPN",
    pic: "https://1000logos.net/wp-content/uploads/2021/05/ESPN-logo.png",
  },
];

const BASE_URL = "https://newsapi.org/v2";

const apiKeys = [
  API_KEY,
  API_KEY_1,
  API_KEY_2,
  API_KEY_3,
  API_KEY_4,
  API_KEY_5,
];

const getKey = () => {
  const random = Math.floor(Math.random() * apiKeys.length);
  const randomKey = apiKeys[random];

  return randomKey;
};

const key = getKey();

export const getNewsAPI = (category = "general", country = "in") => {
  return `${BASE_URL}/top-headlines?country=${country}&category=${category}&apiKey=${key}`;
};

export const getSourceAPI = (source) => {
  return `${BASE_URL}/top-headlines?sources=${source}&apiKey=${key}`;
};

export const getCountryNewsAPI = (country, category) => {
  return `${BASE_URL}/top-headlines?country=${country}&category=${category}&apiKey=${key}`;
};

export const getSources = () => {
  return `${BASE_URL}/top-headlines/sources?apiKey=${key}`;
};

export const getSearchAPI = (query) => {
  return `${BASE_URL}/everything?q=${query}&searchIn=title,description&sortBy=popularity&apiKey=${key}`;
};
