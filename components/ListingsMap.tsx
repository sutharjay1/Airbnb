import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { ListingsGeoProps } from '@/interfaces/listingsGeo';
import { useRouter } from 'expo-router';
import MapView from 'react-native-map-clustering';

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

	const renderCluster = (cluster: any) => {
		const { id, geometry, onPress, properties } = cluster;
		const points = properties.point_count;

		return (
			<Marker
				key={`cluster-${id}`}
				onPress={onPress}
				coordinate={{
					longitude: geometry.coordinates[0],
					latitude: geometry.coordinates[1],
				}}
			>
				<View className="p-2 bg-white rounded-2xl">
					<Text className="text-black text-center">{points}</Text>
				</View>
			</Marker>
		);
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
				clusterColor="#FF385C"
				clusterTextColor="#000"
				renderCluster={renderCluster}
			>
				{listings.map<any>((listing: ListingsGeoProps) => (
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
