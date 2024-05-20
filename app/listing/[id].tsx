import { View, Text, Dimensions, Image, Share } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import listingsData from '@/assets/data/airbnb-listings.json';
import Animated, {
	SlideInDown,
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset,
} from 'react-native-reanimated';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const IMG_HEIGHT = 300;

const Page = () => {
	const { width } = Dimensions.get('window');
	const { id } = useLocalSearchParams<{ id: string }>();
	const listing = (listingsData as any[]).find((item) => item.id === id);

	if (!listing) {
		return (
			<View className="flex-1 justify-center items-center">
				<Text className="text-red-500 text-lg">Listing not found</Text>
			</View>
		);
	}

	const navigation = useNavigation();
	const scrollRef = useAnimatedRef<Animated.ScrollView>();

	const scrollOffset = useScrollViewOffset(scrollRef);

	const shareListing = async () => {
		try {
			await Share.share({
				title: listing.name,
				message: `Check out ${listing.name} on Airbnb`,
				url: `https://www.airbnb.com/rooms/${listing.id}`,
			});
		} catch (error) {
			console.log(`Share error: ${error}`);
		}
	};

	const headerAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				scrollOffset.value,
				[0, IMG_HEIGHT / 1.5],
				[0, 1]
			),
		};
	});

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackground: () => (
				<Animated.View
					className={'bg-white h-20 '}
					style={headerAnimatedStyle}
				></Animated.View>
			),
			headerRight: () => (
				<View className="flex-row gap-2">
					<TouchableOpacity
						onPress={shareListing}
						className="flex items-center justify-center mt-1 p-2 rounded-full bg-white "
					>
						<Ionicons
							name="share-outline"
							size={24}
							color={Colors.dark}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('wishlists');
						}}
						className="flex items-center justify-center mt-1 p-2 rounded-full bg-white "
					>
						<Ionicons
							name="heart-outline"
							size={24}
							color={Colors.dark}
						/>
					</TouchableOpacity>
				</View>
			),
			headerLeft: () => (
				<TouchableOpacity
					onPress={() => {
						navigation.goBack();
					}}
					className="flex items-center justify-center mt-1 p-2 rounded-full bg-white "
				>
					<Ionicons
						name="chevron-back"
						size={24}
						color={Colors.dark}
						className="rotate-180"
					/>
				</TouchableOpacity>
			),
		});
	}, []);

	const imageAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollOffset.value,
						[-IMG_HEIGHT, 0],
						[-IMG_HEIGHT / 4, 0, IMG_HEIGHT * 0.75]
					),
				},
				{
					scale: interpolate(
						scrollOffset.value,
						[-IMG_HEIGHT, 0, IMG_HEIGHT],
						[2, 1, 1]
					),
				},
			],
		};
	});

	return (
		<View className='flex-1 bg-white'>
			<Animated.ScrollView
				className="flex-1 bg-white"
				ref={scrollRef}
				// contentContainerStyle={{ paddingTop: 100 }}
				scrollEventThrottle={16}
			>
				<Animated.Image
					source={{ uri: listing?.xl_picture_url }}
					style={[{ width, height: IMG_HEIGHT }, imageAnimatedStyle]}
					className="w-full"
				/>
				<View className="p-3 pb-8 bg-white">
					<Text className="text-2xl font-bold mb-0">
						{listing?.name}
					</Text>
					<Text className="text-lg text-[#5E5D5E] ">
						{listing?.room_type} in {listing?.smart_location}
					</Text>
					<Text className="text-base text-[#5E5D5E] ">
						{listing?.guests_included} guests · {listing?.bedrooms}{' '}
						bedrooms · {listing?.beds} bed · {listing?.bathrooms}{' '}
						bathrooms
					</Text>
					<View className="flex flex-row gap-1 items-center  mb-2">
						<Ionicons
							name="star"
							size={16}
						/>
						<Text className="text-base font-semibold">
							{listing?.review_scores_rating / 20} ·{' '}
							{listing?.number_of_reviews} reviews
						</Text>
					</View>
					<View className="border-b border-gray-300 mb-4" />
					<View className="flex flex-row items-center gap-4 mb-4">
						<Image
							source={{ uri: listing?.host_picture_url }}
							className="w-12 h-12 rounded-full"
						/>
						<View>
							<Text className="font-semibold text-base">{`Hosted by ${listing?.host_name}`}</Text>
							<Text>{`Host since ${listing?.host_since}`}</Text>
						</View>
					</View>
					<View className="border-b border-gray-300 mb-4" />
					<Text className="text-base text-[#5E5D5E] mb-12">
						{listing?.description}
					</Text>
				</View>

				<Animated.View
					className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-300"
					entering={SlideInDown.delay(200)}
				>
					<View className="flex flex-row justify-between items-center">
						<TouchableOpacity className="flex flex-row items-center gap-2">
							<Text className="text-xl font-semibold text-[#1A1A1A]">{`€${listing?.price}`}</Text>
							<Text className="text-base text-[#5E5D5E]">
								night
							</Text>
						</TouchableOpacity>
						<TouchableOpacity className="px-4 py-2 bg-[#FF385C] rounded-md">
							<Text className="text-white font-semibold">
								Reserve
							</Text>
						</TouchableOpacity>
					</View>
				</Animated.View>
			</Animated.ScrollView>
		</View>
	);
};

export default Page;
