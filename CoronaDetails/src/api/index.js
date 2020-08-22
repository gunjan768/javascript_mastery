import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country = null) => 
{
	let changeableUrl = url;

	if(country) 
	{
		changeableUrl = `${url}/countries/${country}`;
	}

	try 
	{
		const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

		return { confirmed, recovered, deaths, lastUpdate };
	} 
	catch(error) 
	{
		return error;
	}
}

export const fetchDailyData = async () => 
{
	try 
	{
		const { data } = await axios.get(`${url}/daily`);
		
		// reportDate: date : We are taking out the reportDate prop from the data array and storing it in a new variable called date.
		// We are traversing the whole data array and returning a new array ( as map always return a new array ) which consists of equal
		// number of elements to that of 'data' array. Each element of a new array will be an object which consists of three key-value
		// pairs : confirmed , deaths and date.
		return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
	} 
	catch(error) 
	{
		return error;
	}
}

export const fetchCountries = async () => 
{
	try 
	{
		const { data: { countries } } = await axios.get(`${url}/countries`);

		return countries.map(country => country.name);
	} 
	catch(error) 
	{
		return error;
	}
}