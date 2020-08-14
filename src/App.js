import React, {useEffect,useState} from "react";
import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import { fromFetch } from "rxjs/fetch";
import { fetchData } from "./api/apiCalls";


function App() {
  const [overview,setOverview] = useState({})
  const [country,setCountry] = useState("")
  useEffect(() => {
    const loadData= async() =>{
   const data = await fetchData();
   setOverview(data)
  }

  loadData();
  }, []);

  const handleCountryChange = async (country) => {
      console.log(country)
      setCountry(country)
    
      const data = await fetchData(country);
      setOverview(data)
  }

  return (
    <div className="App">
      <Cards data={overview}/>
      <CountryPicker handleCountryChange={handleCountryChange}/>
      <Chart data={overview} country={country}/>
      
    </div>
  );
}

export default App;
