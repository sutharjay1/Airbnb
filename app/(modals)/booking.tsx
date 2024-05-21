import { View, Text, Image } from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import Animated, {
	FadeIn,
	FadeOut,
	SlideInDown,
	SlideInLeft,
} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { places } from './../../assets/data/places';

// @ts-ignore
import DatePicker from 'react-native-modern-datepicker';
import { namespace } from './../../.expo/types/router.d';

const AnimatedTouchableOpacity =
	Animated.createAnimatedComponent(TouchableOpacity);

const guestsGropus = [
	{
		name: 'Adults',
		text: 'Ages 13 or above',
		count: 0,
	},
	{
		name: 'Children',
		text: 'Ages 2-12',
		count: 0,
	},
	{
		name: 'Infants',
		text: 'Under 2',
		count: 0,
	},
	{
		name: 'Pets',
		text: 'Pets allowed',
		count: 0,
	},
];

const Booking = () => {
	const [openCard, setOpenCard] = useState<number>(0);
	const [selectedPlace, setSelectedPlace] = useState<number>(0);

	const [groups, setGroups] = useState<any>(guestsGropus);

	const router = useRouter();

	const today = new Date().toISOString().substring(0, 10);

	const clearAll = () => {
		setOpenCard(0);
		setSelectedPlace(0);
	};

	return (
		<BlurView
			intensity={50}
			className="flex-1"
			// tint="dark"
			experimentalBlurMethod="dimezisBlurView"
		>
			<SafeAreaView className="flex-1 py-12">
				{/* Where */}
				<View
					style={{
						backgroundColor: '#fff',
						borderRadius: 14,
						margin: 10,
						elevation: 4,
						shadowColor: '#000',
						shadowOpacity: 0.3,
						shadowRadius: 4,
						shadowOffset: {
							width: 2,
							height: 2,
						},
					}}
				>
					{openCard != 0 && (
						<AnimatedTouchableOpacity
							onPress={() => setOpenCard(0)}
							entering={FadeIn.duration(200)}
							className="flex-row justify-between p-4"
						>
							<Text
								style={{
									fontFamily: 'mon-sb',
									color: Colors.grey,
									fontSize: 12,
								}}
							>
								Where
							</Text>
							<Text
								style={{
									fontFamily: 'mon-sb',
									color: Colors.grey,
									fontSize: 12,
								}}
							>
								I'm flexible
							</Text>
						</AnimatedTouchableOpacity>
					)}
					{openCard == 0 && (
						<>
							<Animated.View
								entering={FadeIn.duration(10)}
								className="flex-row  items-start justify-start pb-1"
							>
								<Text
									style={{
										fontFamily: 'mon-sb',
										paddingHorizontal: 20,
										paddingTop: 20,
									}}
									className="text-lg"
								>
									Where to?
								</Text>
							</Animated.View>
							<Animated.View
								entering={FadeIn.duration(10)}
								className="flex-col  items-start justify-start px-4 py-5"
							>
								<View className="w-full flex-row items-center justify-start space-x-2 border border-[#ABABAB] rounded-lg p-2.5">
									<Ionicons
										name="search-outline"
										size={24}
										color="black"
									/>
									<TextInput
										autoCapitalize="none"
										placeholder="Search destination"
										autoComplete="email"
										className="w-full"
									/>
								</View>
							</Animated.View>
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								className="flex-row space-x-3  pb-5 px-4"
							>
								{places.map((place, index) => (
									<View className="items-center justify-center space-y-2">
										<TouchableOpacity
											key={index}
											className="items-center justify-center space-y-2"
											onPress={() =>
												setSelectedPlace(index)
											}
										>
											<Image
												source={place.img}
												style={
													selectedPlace == index
														? {
																width: 100,
																height: 100,
																borderRadius: 10,
																borderWidth: 1,
																borderColor:
																	Colors.primary,
														  }
														: {
																width: 100,
																height: 100,
																borderRadius: 10,
														  }
												}
											/>
										</TouchableOpacity>
										<Text
											className="text-center"
											style={
												selectedPlace === index
													? { fontFamily: 'mon-sb' }
													: {
															fontFamily: 'mon-m',
															color: Colors.grey,
													  }
											}
										>
											{place.title}
										</Text>
									</View>
								))}
							</ScrollView>
						</>
					)}
				</View>
				{/* Where */}

				{/* When */}
				<View
					style={{
						backgroundColor: '#fff',
						borderRadius: 14,
						margin: 10,
						elevation: 4,
						shadowColor: '#000',
						shadowOpacity: 0.3,
						shadowRadius: 4,
						shadowOffset: {
							width: 2,
							height: 2,
						},
						gap: 20,
					}}
				>
					{openCard != 1 && (
						<AnimatedTouchableOpacity
							onPress={() => setOpenCard(1)}
							entering={FadeIn.duration(200)}
							className="flex-row justify-between p-4"
						>
							<Text
								style={{
									fontFamily: 'mon-sb',
									color: Colors.grey,
									fontSize: 12,
								}}
							>
								When
							</Text>
							<Text
								style={{
									fontFamily: 'mon-sb',
									color: Colors.grey,
									fontSize: 12,
								}}
							>
								Any week
							</Text>
						</AnimatedTouchableOpacity>
					)}
					{openCard == 1 && (
						<>
							<Animated.View
								entering={FadeIn.duration(10)}
								className="flex-row  items-start justify-start "
							>
								<Text
									style={{
										fontFamily: 'mon-sb',
										padding: 20,
									}}
									className="text-lg"
								>
									When?
								</Text>
							</Animated.View>
							<Animated.View
								entering={FadeIn.duration(10)}
								className="flex-col  items-start justify-start px-4 pb-5"
							>
								{/* <DatePicker
									options={{ defaultFont: 'mon-sb' }}
								/> */}
								<DatePicker
									options={{
										// backgroundColor: '#1A1A1A',
										textHeaderColor: '#1A1A1A',
										textDefaultColor: '#1A1A1A',
										selectedTextColor: '#fff',
										mainColor: '#FF385C',
										textSecondaryColor: '#1A1A1A',
										// borderColor: '#5E5D5E',
									}}
									current={today}
									selected={today}
									mode="calendar"
									minuteInterval={30}
									style={{
										borderRadius: 10,
										borderWidth: 1,
										borderColor: Colors.grey,
										fontFamily: 'mon-m',
									}}
								/>
							</Animated.View>
						</>
					)}
				</View>
				{/* When */}

				{/* Who */}
				<View
					style={{
						backgroundColor: '#fff',
						borderRadius: 14,
						margin: 10,
						elevation: 4,
						shadowColor: '#000',
						shadowOpacity: 0.3,
						shadowRadius: 4,
						shadowOffset: {
							width: 2,
							height: 2,
						},
						gap: 20,
					}}
				>
					{openCard != 2 && (
						<AnimatedTouchableOpacity
							onPress={() => setOpenCard(2)}
							entering={FadeIn.duration(200)}
							className="flex-row justify-between p-4"
						>
							<Text
								style={{
									fontFamily: 'mon-sb',
									color: Colors.grey,
									fontSize: 12,
								}}
							>
								Who
							</Text>
							<Text
								style={{
									fontFamily: 'mon-sb',
									color: Colors.grey,
									fontSize: 12,
								}}
							>
								Add guests
							</Text>
						</AnimatedTouchableOpacity>
					)}
					{openCard == 2 && (
						<>
							<Animated.View
								entering={FadeIn.duration(10)}
								className="flex-row  items-start justify-start "
							>
								<Text
									style={{
										fontFamily: 'mon-sb',
										padding: 20,
									}}
									className="text-lg"
								>
									Who's going?
								</Text>
							</Animated.View>
							<Animated.View
								entering={FadeIn.duration(10)}
								className="flex-col  items-start justify-start px-4 pb-5"
							>
								{groups.map((group, index) => (
									<View
										key={index}
										className={`w-full flex-row items-center justify-between py-2 ${
											index + 1 < groups.length
												? 'border-b-[0.2px] border-[#ABABAB]'
												: ''
										}`}
									>
										<View className="flex-col items-start justify-start">
											<Text
												className="text-base"
												style={{ fontFamily: 'mon-sb' }}
											>
												{group.name}
											</Text>
											<Text
												className="text-sm"
												style={{ fontFamily: 'mon-r' }}
											>
												{group.text}
											</Text>
										</View>

										<View className="flex-row items-center justify-center">
											<TouchableOpacity
												onPress={() => {
													const newGroups = [
														...groups,
													];
													if (
														newGroups[index].count >
														0
													) {
														newGroups[index]
															.count--;
													}
													setGroups(newGroups);
												}}
											>
												<Ionicons
													name="remove-circle-outline"
													size={20}
													color={
														groups[index].count > 0
															? Colors.grey
															: '#cdcdcd'
													}
												/>
											</TouchableOpacity>
											<Text
												className="px-2 text-center"
												style={{
													fontFamily: 'mon-m',
													minWidth: 18,
												}}
											>
												{group.count}
											</Text>
											<TouchableOpacity
												onPress={() => {
													const newGroups = [
														...groups,
													];
													newGroups[index].count++;
													setGroups(newGroups);
												}}
											>
												<Ionicons
													name="add-circle-outline"
													size={20}
												/>
											</TouchableOpacity>
										</View>
									</View>
								))}
							</Animated.View>
						</>
					)}
				</View>
				{/* Who */}

				<Animated.View
					entering={SlideInDown.delay(15)}
					className="absolute bottom-0 left-0 right-0 bg-white py-7 px-5 border-t border-t-[#5E5D5E]"
				>
					<View className="flex-row justify-between items-center absolute top-2 px-4 left-0 right-0">
						<TouchableOpacity onPress={clearAll}>
							<Text
								className={`text-[${Colors.dark}] text-lg underline `}
								style={{ fontFamily: 'mon-sb' }}
							>
								Clear All
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => router.back()}
							className="flex-row items-center justify-center text-center  space-x-1 px-3 py-2 bg-[#FF385C] rounded-md"
						>
							<Ionicons
								name="search-outline"
								size={20}
								color="white"
							/>
							<Text
								className={`text-white text-lg align-center`}
								style={{ fontFamily: 'mon-m' }}
							>
								Search
							</Text>
						</TouchableOpacity>
					</View>
				</Animated.View>
			</SafeAreaView>
		</BlurView>
	);
};

export default Booking;
