// import {
// 	View,
// 	Text,
// 	FlatList,
// 	ListRenderItem,
// 	Image,
// 	TouchableOpacity,
// 	ActivityIndicator,
// } from 'react-native';
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { Link } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';

// interface Props {
// 	listings: any[];
// 	category: string;
// }

// const Listings = ({ listings: items, category }: Props) => {
// 	const [loading, setLoading] = useState(false);
// 	const listRef = useRef<FlatList>(null);

// 	useEffect(() => {
// 		setLoading(true);
// 		setTimeout(() => {
// 			setLoading(false);
// 		}, 2000);
// 	}, [category]);

// 	const LoadingAnimation = () => {
// 		return (
// 			<View className="flex-1 items-center justify-center">
// 				<ActivityIndicator size="large" />
// 				<Text className="text-lg mt-3">Loading...</Text>
// 			</View>
// 		);
// 	};

// 	const renderRow: ListRenderItem<any> = useCallback(
// 		({ item }) => (
// 			<Link
// 				href={`/listing/${item.id}`}
// 				className="w-full"
// 				asChild
// 			>
// 				<TouchableOpacity className="w-full">
// 					<View className="p-4 flex-1 w-full h-fit">
// 						<Image
// 							source={{
// 								uri: item.medium_url,
// 							}}
// 							style={{
// 								width: '100%',
// 								height: 200,
// 							}}
// 							className="rounded-lg"
// 						/>
// 						<TouchableOpacity className="absolute top-4 right-4">
// 							<Ionicons
// 								name="heart-outline"
// 								size={24}
// 								color="black"
// 							/>
// 						</TouchableOpacity>
// 					</View>
// 				</TouchableOpacity>
// 			</Link>
// 		),
// 		[]
// 	);

// 	return (
// 		<View className="flex-1 bg-[#FDFFFF]">
// 			{loading ? (
// 				<LoadingAnimation />
// 			) : (
// 				<FlatList
// 					ref={listRef}
// 					data={items}
// 					renderItem={renderRow}
// 					keyExtractor={(item) => item.id}
// 				/>
// 			)}
// 		</View>
// 	);
// };

// export default Listings;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	View,
	Text,
	FlatList,
	ListRenderItem,
	Image,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';

interface Props {
	listings: any[];
	category: string;
}

const Listings = ({ listings: items, category }: Props) => {
	const [loading, setLoading] = useState(false);
	const listRef = useRef<FlatList>(null);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, [category, items]);

	const renderRow: ListRenderItem<any> = useCallback(({ item }) => {
		return (
			<Link
				href={`/listing/${item.id}`}
				className="w-full"
				asChild
			>
				<TouchableOpacity className="w-full">
					<Animated.View
						className="p-4 flex-1 w-full h-fit"
						entering={FadeInRight}
						exiting={FadeInLeft}
					>
						<Image
							source={{
								uri: item.medium_url,
							}}
							style={{
								width: '100%',
								height: 200,
							}}
							className="rounded-lg"
						/>
						<TouchableOpacity className="absolute top-7 right-7">
							<Ionicons
								name="heart-outline"
								size={26}
								color="black"
							/>
						</TouchableOpacity>
						<View className=" flex-row items-center justify-between px-1 py-2.5">
							<View className="w-[90%] flex-col items-start justify-start">
								<Text
									className="font-semibold"
									style={{ fontFamily: 'mon-sb' }}
								>
									{item.name}
								</Text>
								<Text style={{ fontFamily: 'mon-r' }}>
									{item.room_type}
								</Text>
								<Text
									className="text-base font-bold"
									style={{ fontFamily: 'mon-m' }}
								>
									${item.price}{' '}
									<Text className="font-normal">night</Text>
								</Text>
							</View>
							<View className="flex-row gap-1">
								<TouchableOpacity>
									<Ionicons
										name="star"
										size={16}
										color="black"
									/>
								</TouchableOpacity>
								<Text>{item.review_scores_rating / 20}</Text>
							</View>
						</View>
					</Animated.View>
				</TouchableOpacity>
			</Link>
		);
	}, []);

	return (
		<View className="flex-1 bg-[#FDFFFF]">
			<FlatList
				ref={listRef}
				data={items}
				renderItem={renderRow}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

export default Listings;
