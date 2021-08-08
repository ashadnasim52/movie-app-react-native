import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES } from '../constants';

const ProgressBar = ({ containerStyle, barStyle, barPercentage }) => {
	return (
		<View
			style={{
				...containerStyle,
			}}
		>
			<View
				style={{
					position: 'absolute',
					width: '100%',
					left: 0,
					bottom: 0,
					marginTop: SIZES.base,
					backgroundColor: COLORS.gray,
					...barStyle,
				}}
			></View>
			<View
				style={{
					position: 'absolute',
					width: barPercentage,
					left: 0,
					bottom: 0,
					marginTop: SIZES.base,
					backgroundColor: COLORS.primary,
					...barStyle,
				}}
			></View>
		</View>
	);
};

export default ProgressBar;

const styles = StyleSheet.create({});
