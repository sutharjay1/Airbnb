import { View, Text, Button, Modal, TouchableOpacity } from 'react-native';
import React, { useMemo, useState, useRef } from 'react';
import { Link, Stack, useNavigation } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import listingsData from '@/assets/data/airbnb-listings.json';
import listingsDataGeo from '@/assets/data/airbnb-listings-geo.json';
import MapView from 'react-native-maps';
import ListingsMap from '@/components/ListingsMap';
import ListingBottomSheet from '@/components/ListingBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';

const index = () => {
	const [category, setCategory] = useState('Tiny homes');
	const [isModalVisible, setModalVisible] = useState(false);

	const items = useMemo(() => listingsData as any, []);
	const geoItems = useMemo(() => listingsDataGeo as any, []);

	const onDataChanged = (category: string) => {
		setCategory(category);
	};

	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ['20%', '100%'], []);

	return (
		<>
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

				{/* <ListingBottomSheet
					listings={items}
					category={category}
				/> */}
			</View>
		</>
	);
};

export default index;
