import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import { ListingProps } from '@/interfaces/listing';
import BottomSheet from '@gorhom/bottom-sheet';
import Listings from '@/components/Listings';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface Props {
	listings: ListingProps[];
	category: string;
}

const ListingBottomSheet = ({ listings, category }: Props) => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ['10%', '100%'], []);

	const [refresh, setRefresh] = useState(0);

	const showMap = () => {
		bottomSheetRef.current?.collapse();
		setRefresh(refresh + 1);
	};

	return (
		<BottomSheet
			snapPoints={snapPoints}
			index={1}
			ref={bottomSheetRef}
			enablePanDownToClose={false}
			handleIndicatorStyle={{
				backgroundColor: Colors.grey,
			}}
			style={{
				backgroundColor: 'white',
				elevation: 4,
				shadowColor: Colors.grey,
				shadowOffset: { width: 1, height: 1 },
				shadowOpacity: 0.3,
				shadowRadius: 4,
			}}
		>
			<View className="flex-1">
				<Listings
					listings={listings}
					category={category}
					refresh={refresh}
				/>
				<View className="absolute bottom-7 w-full items-center">
					<TouchableOpacity
						onPress={showMap}
						className={`bg-[#1A1A1A] rounded-3xl flex flex-row px-4 py-3  items-center justify-center`}
					>
						<Text
							style={{ fontFamily: 'mon-sb', color: 'white' }}
							className="pr-1.5"
						>
							Map
						</Text>
						<Ionicons
							name="map"
							size={20}
							color="white"
						/>
					</TouchableOpacity>
				</View>
			</View>
		</BottomSheet>
	);
};

export default ListingBottomSheet;
