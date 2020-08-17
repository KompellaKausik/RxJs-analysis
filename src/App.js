import React, {useEffect,useState} from "react";
import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import { fetchData } from "./api/apiCalls";
import { from } from 'rxjs';


function App() {
  const [overview,setOverview] = useState({})
  const [country,setCountry] = useState("")
  useEffect(() => {
  const ModifiedData$ = from(fetchData())
  ModifiedData$.subscribe({
      next: (result) => setOverview(result),
      error: error => console.log(error),
      complete: console.log("modified overview data")
  })
  }, []);


  const handleCountryChange = async (country) => {
      console.log(country)
      setCountry(country)
    
      const ModifiedData$ = from(fetchData(country))
      ModifiedData$.subscribe({
      next: (result) => setOverview(result),
      error: error => console.log(error),
      complete: console.log("modified overview data")
  })
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
