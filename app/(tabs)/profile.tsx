import { View, Text, Button } from 'react-native';
import React from 'react';
import { useAuth } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';

const profile = () => {
	const { signOut, isSignedIn } = useAuth();
	return (
		<View>
			{!isSignedIn ? (
				<Link
					href={'/(modals)/login'}
					asChild
				>
					<Button
						title="Log In"
						color={Colors.dark}
					/>
				</Link>
			) : (
				<Button
					title="Log Out"
					onPress={() => signOut()}
					color={Colors.dark}
				/>
			)}
		</View>
	);
};

export default profile;
