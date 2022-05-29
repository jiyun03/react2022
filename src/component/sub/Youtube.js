import Layout from '../common/Layout';
import {useEffect, useState} from 'react';
import axios from 'axios';

function Youtube() {
	const key = 'AIzaSyCCs-4zoiklCU1ygt2QFrB2Jy7nrfJc-dY';
	const playlist = 'PL4wM-rifmHleEgufghHbslM5lnMBYdz1v';
	const num = 5;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

	useEffect(() => {
		axios.get(url).then((json) => console.log(json.data.items))
	}, [])

	return (
		<Layout name={'Youtube'}>
			<p>Youtube</p>
		</Layout>
	);
}

export default Youtube;
