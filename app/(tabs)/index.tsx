import { View, Text, Button, Modal, TouchableOpacity } from 'react-native';
import React, { useMemo, useState } from 'react';
import { Link, Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import listingsData from '@/assets/data/airbnb-listings.json';
import listingsDataGeo from '@/assets/data/airbnb-listings-geo.json';
import MapView from 'react-native-maps';
import ListingsMap from '@/components/ListingsMap';

const index = () => {
	const [category, setCategory] = useState('Tiny homes');
	const [isModalVisible, setModalVisible] = useState(false);

	const items = useMemo(() => listingsData as any, []);
	const geoItems = useMemo(() => listingsDataGeo as any, []);

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

			<ListingsMap listings={geoItems} />

			{/* <Listings
				listings={items}
				category={category}
			/> */}

			{/*  */}
			{/* <Button
				title="Show Listings"
				onPress={() => setModalVisible(true)}
			/>

			<View className="">
				<Modal
					visible={isModalVisible}
					animationType="slide"
					tvParallaxShiftDistanceY={100}
					onRequestClose={() => setModalVisible(false)}
					className="flex-col items-end justify-center h-[90%]"
				>
					<View className="flex-1">
						<TouchableOpacity
							onPress={() => setModalVisible(false)}
						>
							<Text>Close</Text>
						</TouchableOpacity>
						<Listings
							listings={items}
							category={category}
						/>
					</View>
				</Modal>
			</View> */}
			{/*  */}
		</View>
	);
};

export default index;
