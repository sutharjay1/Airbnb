import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import * as Haptics from 'expo-haptics';

const categories = [
	{
		name: 'Tiny homes',
		icon: 'home',
	},
	{
		name: 'Cabins',
		icon: 'house-siding',
	},
	{
		name: 'Trending',
		icon: 'local-fire-department',
	},
	{
		name: 'Play',
		icon: 'videogame-asset',
	},
	{
		name: 'City',
		icon: 'apartment',
	},
	{
		name: 'Beachfront',
		icon: 'beach-access',
	},
	{
		name: 'Countryside',
		icon: 'nature-people',
	},
];

interface Props {
	onCategoryChanged: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
	const itemRef = useRef<Array<TouchableOpacity | null>>([]);
	const scrollRef = useRef<ScrollView | null>(null);

	const [activeIndex, setActiveIndex] = useState(2);

	const selectCategory = (index: number) => {
		const selected = itemRef.current[index];
		setActiveIndex(index);

		selected?.measure((x, y) => {
			scrollRef?.current?.scrollTo({
				x: x + 24,
				y: 0,
				animated: true,
			});
		});

		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		onCategoryChanged(categories[index].name);
	};

	return (
		<SafeAreaView className=" bg-white shadow-xl">
			<View className="h-fit pb-2">
				<View className=" flex-row items-center justify-between px-4 py-2">
					<Link
						href="/(modals)/booking"
						className={`w-full flex-1 mr-3 px-2 py-1 items-center  border-[1px] border-[#bbbbbb] rounded-full shadow-xl`}
						asChild
					>
						<TouchableOpacity className="flex-row space-x-2">
							<Ionicons
								name="search-outline"
								size={24}
								color="black"
								onLongPress={() => console.log('hi')}
							/>
							<View>
								<Text style={{ fontFamily: 'mon-sb' }}>
									Where to?
								</Text>
								<Text style={{ fontFamily: 'mon-m' }}>
									Anywhere • Any week
								</Text>
							</View>
						</TouchableOpacity>
					</Link>
					<TouchableOpacity
						className={`p-2 border-[1px] border-[#bbbbbb] rounded-full`}
					>
						<Ionicons
							name="options-outline"
							size={24}
							color="black"
						/>
					</TouchableOpacity>
				</View>
				<ScrollView
					horizontal
					className="scroll-smooth gap-2"
					ref={scrollRef}
				>
					{categories.map((category, index) => (
						<TouchableOpacity
							key={index}
							className="p-2 items-center"
							ref={(el) => (itemRef.current[index] = el)}
							style={
								activeIndex === index
									? styles.categoriesBtnActive
									: styles.categoriesBtn
							}
							onPress={() => selectCategory(index)}
						>
							<MaterialIcons
								name={category.icon as any}
								size={24}
								color={
									activeIndex === index ? '#000' : Colors.grey
								}
							/>
							<Text
								style={
									activeIndex === index
										? styles.categoryTextActive
										: styles.categoryText
								}
							>
								{category.name}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	categoryText: {
		fontSize: 12,
		fontFamily: 'mon-sb',
		color: Colors.grey,
	},
	categoryTextActive: {
		fontSize: 12.5,
		fontFamily: 'mon-sb',
		color: '#000',
	},
	categoriesBtn: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 8,
	},
	categoriesBtnActive: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomColor: '#000',
		borderBottomWidth: 2,
		paddingBottom: 8,
	},
});

export default ExploreHeader;
