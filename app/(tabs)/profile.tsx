import {
	View,
	Text,
	Button,
	SafeAreaView,
	TouchableOpacity,
	Image,
	TextInput,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { Link, useNavigation } from 'expo-router';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';

enum Strategy {
	Google = 'oauth_google',
	Apple = 'oauth_apple',
	Facebook = 'oath_facebook',
}

const Profile = () => {
	const { signOut, isSignedIn } = useAuth();
	const { user } = useUser();

	const [firstName, setFirstName] = useState(user?.firstName || '');
	const [lastName, setLastName] = useState(user?.lastName || '');
	const [email, setEmail] = useState(
		user?.emailAddresses[0]?.emailAddress || ''
	);
	const [edit, setEdit] = useState(false);

	const navigation = useNavigation();

	useEffect(() => {
		if (user) {
			setFirstName(user.firstName || '');
			setLastName(user.lastName || '');
			setEmail(user.emailAddresses[0]?.emailAddress || '');
		}
	}, [user]);

	const onSaveUser = async () => {
		try {
			await user?.update({ firstName, lastName });
		} catch (error) {
			console.log(`Error saving user: ${error}`);
		} finally {
			setEdit(false);
		}
	};

	const onCaptureImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 0.75,
			base64: true,
		});

		if (!result.canceled) {
			const base64 = `data:image/jpg;base64,${result.assets[0].base64}`;
			await user?.setProfileImage({ file: base64 });
		}
	};

	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ['1%', '92%'], []);

	const router = useRouter();

	const { startOAuthFlow: googleAuth } = useOAuth({
		strategy: 'oauth_google',
	});
	const { startOAuthFlow: appleAuth } = useOAuth({
		strategy: 'oauth_apple',
	});
	const { startOAuthFlow: facebookAuth } = useOAuth({
		strategy: 'oauth_facebook',
	});

	const onSelectAuth = async (strategy: Strategy) => {
		const selectedAuth = {
			[Strategy.Google]: googleAuth,
			[Strategy.Apple]: appleAuth,
			[Strategy.Facebook]: facebookAuth,
		}[strategy];

		try {
			const { createdSessionId, setActive } = await selectedAuth();
			console.log(`createdSessionId: ${createdSessionId}`);
			if (createdSessionId) {
				setActive!({ session: createdSessionId });
				router.back();
			}
		} catch (error) {
			console.log(`OAuth error: ${error}`);
		}
	};

	useEffect(() => {
		if (!isSignedIn) {
			showLogin();
		} else {
			bottomSheetRef.current?.close();
		}
	}, [user, isSignedIn]);

	const showLogin = () => {
		bottomSheetRef.current?.expand();
	};

	return (
		<SafeAreaView className="flex-1 bg-white pt-2">
			<View className="flex-row p-6 items-center justify-between">
				<Text
					className="text-lg"
					style={{ fontFamily: 'mon-b' }}
				>
					Profile
				</Text>
				<Ionicons
					name="notifications-outline"
					size={24}
				/>
			</View>

			{user && (
				<View
					className="flex bg-white p-6 rounded-2xl mx-3 mt-3 mb-3 items-center"
					style={{
						elevation: 2,
						shadowColor: Colors.dark,
						shadowRadius: 6,
						shadowOffset: { width: 1, height: 2 },
						shadowOpacity: 0.2,
					}}
				>
					<TouchableOpacity onPress={onCaptureImage}>
						<Image
							source={{ uri: user.imageUrl }}
							className="w-28 h-28 rounded-full"
							style={{ resizeMode: 'cover' }}
						/>
					</TouchableOpacity>
					{edit ? (
						<View className="flex-row space-x-3 pt-4 items-center">
							<TextInput
								placeholder="First Name"
								value={firstName}
								onChangeText={setFirstName}
								className="h-11 border border-[#ABABAB] rounded-lg p-2.5 bg-white"
								style={{ flex: 1 }}
							/>
							<TextInput
								placeholder="Last Name"
								value={lastName}
								onChangeText={setLastName}
								className="h-11 border border-[#ABABAB] rounded-lg p-2.5 bg-white"
								style={{ flex: 1 }}
							/>
							<TouchableOpacity onPress={onSaveUser}>
								<Ionicons
									name="checkmark-outline"
									size={24}
									color={Colors.dark}
								/>
							</TouchableOpacity>
						</View>
					) : (
						<View className="flex-row space-x-3 pt-4 items-center">
							<Text
								className="text-lg"
								style={{ fontFamily: 'mon-b' }}
							>
								{firstName} {lastName}
							</Text>
							<TouchableOpacity onPress={() => setEdit(true)}>
								<Ionicons
									name="create-outline"
									size={24}
									color={Colors.dark}
								/>
							</TouchableOpacity>
						</View>
					)}
					<View className="pt-4 items-center">
						<Text>{email}</Text>
						<Text>
							Since {user?.createdAt?.toLocaleDateString()}
						</Text>
					</View>
				</View>
			)}

			{!isSignedIn ? (
				// <Link
				// 	href={'/(modals)/login'}
				// 	asChild
				// >
				// </Link>
				<TouchableOpacity
					className="flex bg-[#FF385C] text-white text-center px-4 py-3 rounded-2xl mx-3 mt-3 mb-6 items-center"
					onPress={showLogin}
				>
					<Text className="text-base text-white">Log In</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					className="flex bg-[#1A1A1A] text-white text-center px-4 py-3 rounded-2xl mx-3 mt-3 mb-6 items-center"
					onPress={() => signOut()}
				>
					<Text className="text-base text-white">Log Out</Text>
				</TouchableOpacity>
			)}
			<BottomSheet
				snapPoints={snapPoints}
				ref={bottomSheetRef}
			>
				<View className="flex-1 bg-white p-2">
					<TextInput
						autoCapitalize="none"
						placeholder="Email"
						autoComplete="email"
						className={`my-4 h-11 border border-[#ABABAB] rounded-lg p-2.5 bg-white`}
					/>
					<TouchableOpacity className="bg-[#FF385C] h-12 rounded-lg flex items-center justify-center">
						<Text className="text-white text-base font-bold">
							Continue
						</Text>
					</TouchableOpacity>

					<View className="flex flex-row items-center my-4">
						<View className="flex-1 border-b border-gray-400" />
						<Text className="mx-2 text-gray-500">Or</Text>
						<View className="flex-1 border-b border-gray-400" />
					</View>

					<View className=" gap-3">
						<TouchableOpacity className=" bg-white border border-gray-400 h-12 rounded-lg flex items-center justify-between flex-row px-5 gap-1">
							<Ionicons
								name="mail-outline"
								size={24}
								className="absolute left-4"
							/>
							<Text className="flex-1 text-center  text-black text-base font-semibold">
								Continue with Phone
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className="bg-white border border-gray-400 h-12 rounded-lg flex items-center justify-between flex-row px-5 gap-1"
							onPress={() => onSelectAuth(Strategy.Apple)}
						>
							<Ionicons
								name="logo-apple"
								size={24}
								className="absolute left-4"
							/>
							<Text className="flex-1 text-center text-black text-base font-semibold">
								Continue with Apple
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className="bg-white border border-gray-400 h-12 rounded-lg flex items-center justify-between flex-row px-5 gap-1"
							onPress={() => onSelectAuth(Strategy.Google)}
						>
							<Ionicons
								name="logo-google"
								size={24}
								className="absolute left-4"
							/>
							<Text className="flex-1 text-center text-black text-base font-semibold">
								Continue with Google
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className="bg-white border border-gray-400 h-12 rounded-lg flex items-center justify-between flex-row px-5 gap-1"
							onPress={() => onSelectAuth(Strategy.Facebook)}
						>
							<Ionicons
								name="logo-facebook"
								size={24}
								className="absolute left-4"
							/>
							<Text className="flex-1 text-center text-black text-base font-semibold">
								Continue with Facebook
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</BottomSheet>
		</SafeAreaView>
	);
};

export default Profile;
