import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import {
  getNewsAPI,
  getSearchAPI,
  getSourceAPI,
  getCountryNewsAPI,
} from "./util";

export const NewsContext = createContext();

const Context = ({ children }) => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("general");
  const [country, setCountry] = useState("in");
  const [source, setSource] = useState();
  const [index, setIndex] = useState(1);
  const [darkTheme, setDarkTheme] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchSource, setSearchSource] = useState("");

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchNews = async (reset = category) => {
    try {
      setIsLoading(true);
      setIndex(1);
      const url = await getNewsAPI(reset);
      const { data } = await axios.get(url);

      setIsLoading(false);
      setNews(data.articles);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
      setIsError(true);
      setErrorMessage("Something went wrong, please try again later");
    }
  };

  const fetchNewsfromSource = async () => {
    try {
      setIsLoading(true);
      setIndex(1);
      const url = await getSourceAPI(source);
      const { data } = await axios.get(url);
      setNews(data.articles);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const fecthNewsByCountry = async () => {
    try {
      setIsLoading(true);
      setIndex(1);
      const url = await getCountryNewsAPI(country, category);
      const { data } = await axios.get(url);

      setNews(data.articles);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const fetchNewsBySearch = async () => {
    try {
      setIsLoading(true);
      setIndex(1);
      const url = await getSearchAPI(query);
      const { data } = await axios.get(url);
      const filteredData = data.articles?.slice(0, 50);
      setNews(filteredData);
      setIsLoading(false);
      setSearchText("");
      setSearchSource("");
      setQuery("");
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fecthNewsByCountry();
  }, [country]);

  useEffect(() => {
    if (query !== "") {
      fetchNewsBySearch();
    }
  }, [query]);

  useEffect(() => {
    fetchNews();
  }, [category]);

  useEffect(() => {
    fetchNewsfromSource();
  }, [source]);

  return (
    <NewsContext.Provider
      value={{
        news,
        setCategory,
        index,
        setIndex,
        setSource,
        darkTheme,
        setDarkTheme,
        fetchNews,
        country,
        setCountry,
        fecthNewsByCountry,
        isLoading,
        setIsLoading,
        query,
        setQuery,
        searchText,
        setSearchText,
        searchSource,
        setSearchSource,
        errorMessage,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export default Context;
