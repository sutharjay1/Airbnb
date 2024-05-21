import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';

const ModalHeaderText = () => {
	const [active, setActive] = useState(0);

	return (
		<View className="flex-row  justify-center gap-10">
			<TouchableOpacity onPress={() => setActive(0)}>
				<Text
					style={{
						fontFamily: 'mon-sb',
						color: active === 0 ? 'black' : Colors.grey,
						textDecorationLine: active === 0 ? 'underline' : 'none',
					}}
				>
					Stays
				</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => setActive(1)}>
				<Text
					style={{
						fontFamily: 'mon-sb',
						color: active === 1 ? 'black' : Colors.grey,
						textDecorationLine: active === 1 ? 'underline' : 'none',
					}}
				>
					Experiences
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ModalHeaderText;
