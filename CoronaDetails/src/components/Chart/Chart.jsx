import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => 
{
	const [dailyData, setDailyData] = useState([]);

	useEffect(() => 
	{
		const fetchMyAPI = async () => 
		{
			const initialDailyData = await fetchDailyData();

			// console.log({initialDailyData});

			setDailyData(initialDailyData);
		};

		fetchMyAPI();

	}, []);

	const barChart = (
		confirmed ? 
		(
			<Bar
				data = 
				{{
					labels: ['Infected', 'Recovered', 'Deaths'],
					datasets: 
					[
						{
							label: 'People',
							backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
							data: [confirmed.value, recovered.value, deaths.value],
						},
					],
				}}
				options = 
				{{
					legend: { display: true },
					title: { display: true, text: `Current state in ${country}` },
				}}
			/>
		) : null
	);

	const lineChart = (
		dailyData[0] ? 
		(
			<Line
				data = 
				{{
					labels: dailyData.map(({ date }) => date), 		// labels means data of the x-axis.
					datasets: 
					[
						{
							data: dailyData.map(({ confirmed }) => confirmed),
							label: 'Infected',
							borderColor: '#3333ff',
							fill: true,
						}, 
						{
							data: dailyData.map(({ deaths }) => deaths),
							label: 'Deaths',
							borderColor: 'red',
							backgroundColor: 'rgba(255, 0, 0, 0.5)',
							fill: true,
						},
					],
				}}
			/>
		) : null
	);

	return (
		<div className = { styles.container }>
			{ country ? barChart : lineChart }
		</div>
	);
}

export default Chart;