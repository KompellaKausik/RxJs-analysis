import React, {useState, useEffect} from 'react';
import { NativeSelect,FormControl, Grid } from '@material-ui/core'
import { fetchCountries } from '../../api/apiCalls';

const CountryPicker = ({handleCountryChange}) =>{
    const [fetchedCountries,setFetchedCountries] = useState([])
    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries())
        }
        fetchAPI()
        console.log(fetchedCountries)
    }, [])
    return(
        <Grid container justify="center" style={{marginTop:"5%"}}>
        <FormControl style={{width:"35%"}}>
            <NativeSelect defaultValue="" onChange={(e) => {handleCountryChange(e.target.value)}}>
                <option value="">global</option>
                {fetchedCountries.map((country,i)=><option key={i}>{country}</option>)}
            </NativeSelect>
        </FormControl>
        </Grid>
    )
}

export default CountryPicker;