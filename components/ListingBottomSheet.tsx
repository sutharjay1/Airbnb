import { View, Text } from 'react-native';
import React, { useMemo, useRef } from 'react';
import { ListingProps } from '@/interfaces/listing';
import BottomSheet from '@gorhom/bottom-sheet';

interface Props {
	listings: ListingProps[];
	category: string;
}

const ListingBottomSheet = ({ listings, category }: Props) => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ['10%', '50%', '100%'], []);
	return (
		<BottomSheet
			ref={bottomSheetRef}
			snapPoints={snapPoints}
		>
			<View></View>
		</BottomSheet>
	);
};

export default ListingBottomSheet;
