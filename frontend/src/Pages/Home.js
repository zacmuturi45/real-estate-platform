import React, { useState, useEffect } from "react";
import HomeCards from "../Components/HomeCards";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
/* import Footer from "../Components/Footer";*/

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = () => {
    fetch('/properties')
      .then(response => response.json())
      .then(data => setProperties(data))
      .catch(error => console.error('Error fetching properties:', error));
  };

  const handleSearch = (searchData) => {
    const { location, price, type } = searchData;
    let searchUrl = `/properties/search`;

    const queryParams = [];

    if (location) {
      queryParams.push(`location=${location}`);
    }
    if (price) {
      queryParams.push(`price_min=${price}`);
    }
    if (type) {
      queryParams.push(`type=${type}`);
    }
  
    if (queryParams.length > 0) {
      searchUrl += `?${queryParams.join("&")}`;
    }
  
    console.log("Search URL:", searchUrl);
    
    fetch(searchUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log("Search results:", data);
      setSearchResults(data);
    })
    .catch(error => {
      console.error('Error searching properties:', error);
    });
  };

  return (
    <>
      <Navbar />
      <Search onSearch={handleSearch}/>
      <HomeCards properties={searchResults.length > 0 ? searchResults : properties}/>
      {/* <Footer /> */}
    </>
  );
}
