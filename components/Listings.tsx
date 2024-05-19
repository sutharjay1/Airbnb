import { View, Text } from 'react-native';
import React, { useEffect } from 'react';

interface Props {
	listings: any[];
	category: string;
}

const Listings = ({ listings, category }: Props) => {
	useEffect(() => {
		console.log(`Reload Listings: ${listings.length}`);
	}, [category]);

	return (
		<View>
			<Text>{category}</Text>
		</View>
	);
};

export default Listings;
