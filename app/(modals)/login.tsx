import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
// import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import defaultStyles from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

enum Strategy {
	Google = 'oauth_google',
	Apple = 'oauth_apple',
	Facebook = 'oath_facebook',
}

const login = () => {
	// useWarmUpBrowser();

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
				router.replace('/(tabs)/index');
			}
		} catch (error) {
			console.log(`OAuth error: ${error}`);
		}
	};

	return (
		<View className="flex-1 bg-white p-2">
			<TextInput
				autoCapitalize="none"
				placeholder="Email"
				autoComplete="email"
				className={`my-4 h-11 border border-[#ABABAB] rounded-lg p-2.5 bg-white`}
			/>
			<TouchableOpacity className="bg-[#FF385C] h-12 rounded-lg flex items-center justify-center">
				<Text className="text-white text-base font-bold">Continue</Text>
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
	);
};

export default login;
