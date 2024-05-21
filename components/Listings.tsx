import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
	useMemo,
	memo,
} from 'react';
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
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

interface Props {
	listings: any[];
	category: string;
	refresh?: number;
}

const Listings = memo(({ listings: items, category, refresh }: Props) => {
	const [loading, setLoading] = useState(false);
	const bottomSheetRef = useRef<BottomSheet>(null);
	const listRef = useRef<BottomSheetFlatList>(null);

	useEffect(() => {
		if (refresh) {
			listRef.current?.scrollToOffset({ animated: true, offset: 0 });
		}
	}, [refresh]);

	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => {
			setLoading(false);
		}, 700);
		return () => clearTimeout(timer);
	}, [category]);

	const memoizedItems = useMemo(() => items, [items]);

	const renderRow: ListRenderItem<any> = useCallback(({ item }) => {
		return (
			<Link
				href={`/listing/${item.id}`}
				className="w-full flex-1"
				asChild
			>
				<TouchableOpacity className="w-full">
					<Animated.View
						className="p-4 flex-1 w-full h-fit"
						entering={FadeInRight}
						exiting={FadeInLeft}
					>
						<Image
							source={{ uri: item.medium_url }}
							style={{ width: '100%', height: 200 }}
							className="rounded-lg"
						/>
						<TouchableOpacity className="absolute top-7 right-7">
							<Ionicons
								name="heart-outline"
								size={26}
								color="black"
							/>
						</TouchableOpacity>
						<View className="flex-row items-center justify-between px-1 py-2.5">
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

	if (loading) {
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator size="large" />
				<Text className="text-lg mt-3">Loading...</Text>
			</View>
		);
	}
	console.log(`item count ${items.length}`);

	return (
		<View className="flex-1 bg-[#FDFFFF]">
			<BottomSheetFlatList
				ref={listRef}
				data={memoizedItems}
				renderItem={renderRow}
				keyExtractor={(item) => item.id}
				ListHeaderComponent={
					<Text
						className="font-bold text-center"
						style={{ fontFamily: 'mon-m' }}
					>
						{items.length} homes
					</Text>
				}
			/>
		</View>
	);
});

export default Listings;
