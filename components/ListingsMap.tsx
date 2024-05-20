import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { ListingsGeoProps } from '@/interfaces/listingsGeo';
import { useRouter } from 'expo-router';

interface Props {
	listings: any[];
	// category: string;
}

const INITIAL_REGION = {
	latitude: 52.52,
	longitude: 13.405,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421,
};

const ListingsMap = ({ listings }: Props) => {
	const router = useRouter();
	const onMarkerSelected = (event: ListingsGeoProps) => {
		router.push(`/listing/${event.properties.id}`);
	};

	return (
		<View className="flex-1 bg-[#FDFFFF]">
			<MapView
				style={StyleSheet.absoluteFill}
				showsUserLocation
				showsMyLocationButton
				showsCompass
				provider={PROVIDER_GOOGLE}
				initialRegion={INITIAL_REGION}
			>
				{listings.features.map<any>((listing: ListingsGeoProps) => (
					<Marker
						key={listing.properties.id}
						onPress={() => onMarkerSelected(listing)}
						coordinate={{
							latitude: listing.geometry.coordinates[1],
							longitude: listing.geometry.coordinates[0],
						}}
					/>
				))}
			</MapView>
		</View>
	);
};

export default ListingsMap;
