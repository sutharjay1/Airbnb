import { View, Text } from 'react-native';
import React, { useMemo, useState } from 'react';
import { Link, Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import listingsData from '@/assets/data/airbnb-listings.json';

const index = () => {
	const [category, setCategory] = useState('Tiny homes');

	const items = useMemo(() => listingsData as any, []);

	const onDataChanged = (category: string) => {
		// Here we are getting the category from ExploreHeader component we are not passing it here we are accessing it from here
		console.log(`onDataChanged: ${category}`);
		setCategory(category);
	};

	return (
		<View className="flex-1">
			<Stack.Screen
				options={{
					title: 'Home',
					header: () => (
						<ExploreHeader onCategoryChanged={onDataChanged} />
					),
				}}
			/>
			<Listings
				listings={items}
				category={category}
			/>
		</View>
	);
};

export default index;
