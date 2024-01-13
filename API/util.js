import { supabase } from "./supabase";
import * as SecureStore from "expo-secure-store";

const BASE_URL = "https://newsapi.org/v2";

const apiKeys = [
  process.env.EXPO_PUBLIC_API_KEY,
  process.env.EXPO_PUBLIC_API_KEY1,
  process.env.EXPO_PUBLIC_API_KEY2,
  process.env.EXPO_PUBLIC_API_KEY3,
  process.env.EXPO_PUBLIC_API_KEY4,
  process.env.EXPO_PUBLIC_API_KEY5,
];

const save = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};
export const saveKey = async () => {
  try {
    const { data, error } = await supabase.from("secrets").select("value");
    if (!error) {
      const random = Math.floor(Math.random() * data?.length || 0);
      const randomKey = data[random]?.value;
      await save("keyString", randomKey);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getValueFor = async (key) => {
  try {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    } else {
      return new Error("No result found.");
    }
  } catch (error) {
    return new Error("Unable to fetch value");
  }
};

export const key = async () => {
  try {
    const val = await getValueFor("keyString");
    return val;
  } catch (error) {
    console.log(error);
  }
};

export const getNewsAPI = async (category = "general", country = "in") => {
  try {
    const apiKey = await key();
    const params = new URLSearchParams({
      country: country,
      category: category,
    });

    if (apiKey) {
      params.append("apiKey", apiKey);

      return `${BASE_URL}/top-headlines?${params.toString()}`;
    }
  } catch (error) {
    console.error(error);
    return `${BASE_URL}/top-headlines?country=${country}&category=${category}&apiKey=defaultKey`;
  }
};

export const getSourceAPI = async (source) => {
  try {
    const apiKey = await key();
    const params = new URLSearchParams({
      source: source,
    });

    if (apiKey) {
      return `${BASE_URL}/top-headlines?${params.toString()}`;
    } else {
      console.error("Failed to get API key");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getCountryNewsAPI = async (country, category) => {
  try {
    const apiKey = await key();
    const params = new URLSearchParams({
      country: country,
      category: category,
    });

    if (apiKey) {
      params.append("apiKey", apiKey);
      return `${BASE_URL}/top-headlines?${params.toString()}`;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSources = async () => {
  try {
    const apiKey = await key();
    const params = new URLSearchParams();

    if (apiKey) {
      params.append("apiKey", apiKey);

      return `${BASE_URL}/top-headlines/sources?${params.toString()}`;
    } else {
      console.error("Failed to get API key");
    }
  } catch {}
};

export const getSearchAPI = async (query) => {
  try {
    const apiKey = await key();
    const params = new URLSearchParams();

    if (apiKey) {
      params.append("apiKey", apiKey);

      return `${BASE_URL}/everything?q=${query}&searchIn=title,description&sortBy=popularity&${params.toString()}`;
    }
  } catch (error) {}
};
