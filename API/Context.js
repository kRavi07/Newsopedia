import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { getNewsAPI,getSearchAPI, getSourceAPI,getCountryNewsAPI } from "./util";


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

        
        const { data } = await axios.get(getNewsAPI(reset));

        setIsLoading(false);
        setNews(data.articles);
    
    
    } catch (error) {
        
        

        setIsLoading(false);
        setIsError(true);
        setErrorMessage("Something went wrong, please try again later");
        


    }
  };

  const fetchNewsfromSource = async () => {
    try {
      setIsLoading(true);  
      setIndex(1);
      const { data } = await axios.get(getSourceAPI(source));
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
        const {data} = await axios.get(getCountryNewsAPI( country,category));

        
    
        setNews(data.articles);
        setIsLoading(false);
        
    } catch (error) {
        
        setIsLoading(false);
    }
    }


    const fetchNewsBySearch = async () => {
        try {
            setIsLoading(true);
            setIndex(1);
            const {data} = await axios.get(getSearchAPI(query));
            //select the first 50 articles
            const filteredData = data.articles.slice(0,30);
            setNews(filteredData);
            setIsLoading(false);
            setSearchText("");
            setSearchSource("");
            setQuery("");
        } catch (error) {
            setIsLoading(false);
        }
    }

    



    useEffect(() => {
    fecthNewsByCountry();
    }, [country]);

    useEffect(() => {

      if(query!==""){
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
        errorMessage
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export default Context;
