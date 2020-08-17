import React, {useState, useEffect} from 'react';
import { NativeSelect,FormControl, Grid } from '@material-ui/core'
import { fetchCountries } from '../../api/apiCalls';
import { from } from 'rxjs';

const CountryPicker = ({handleCountryChange}) =>{
    const [fetchedCountries,setFetchedCountries] = useState([])
    useEffect(() => {
        // const fetchAPI = async () => {
        //     setFetchedCountries(await fetchCountries())
        // }
        // fetchAPI()
        // console.log(fetchedCountries)
        const ModifiedData$ = from(fetchCountries())
        ModifiedData$.subscribe({
            next: (result) => setFetchedCountries(result),
            complete: console.log("modified data")
        })
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