import React, { useState } from 'react';

import PhoneInput from 'react-native-phone-number-input';
import {
	ImageBackground,
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
	Text,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS, FONTS } from '../constants';

const PhoneNumber = ({ signInWithPhoneNumber }) => {
	console.log('PhoneNumberPhoneNumber');
	const [value, setValue] = useState('');
	const [formattedValue, setFormattedValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	if (isLoading) {
		console.log('Loaduingnnn');
		return (
			<View
				style={{
					flexGrow: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'black',
				}}
			>
				<ActivityIndicator size='large' color='red' />
			</View>
		);
	}
	return (
		<ScrollView
			contentContainerStyle={{
				flexGrow: 1,
			}}
		>
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image
						source={require('../assets/images/imaaa.png')}
						style={styles.image}
					></Image>
				</View>
				<View level='2' style={styles.bottomLayout}>
					<Text
						style={{
							paddingBottom: 25,
							textAlign: 'center',
							...FONTS.h4,
							fontSize: 18,
							color: COLORS.primary,
							textTransform: 'uppercase',
						}}
					>
						Enter your phone number
					</Text>
					<PhoneInput
						defaultValue={value}
						defaultCode='IN'
						layout='first'
						onChangeText={(text) => {
							setValue(text);
						}}
						onChangeFormattedText={(text) => {
							setFormattedValue(text);
						}}
						containerStyle={{
							width: '100%',
							// height: 50,
							padding: 0,
						}}
						textContainerStyle={
							{
								// borderColor: COLORS.primary,
							}
						}
						textInputStyle={{}}
						// withDarkTheme
						// autoFocus
					/>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							try {
								setIsLoading(true);
								signInWithPhoneNumber(formattedValue);
							} catch (e) {
								console.warn(e);
							}
						}}
					>
						<Text
							style={{
								color: COLORS.white,
								...FONTS.h2,
							}}
						>
							Verify
						</Text>
					</TouchableOpacity>
					<Text
						category='c1'
						appearance='hint'
						style={{
							textAlign: 'center',
							color: '#EDEDED',
						}}
					>
						By tapping Verify, you are indicating that you accept our Terms of
						Service and Privacy Policy. An SMS may be sent. Message & data rates
						may apply.
					</Text>
				</View>
			</View>
		</ScrollView>
	);
};

export default PhoneNumber;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#171717',
	},
	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},

	bottomLayout: {
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		overflow: 'hidden',
		justifyContent: 'space-around',
		paddingHorizontal: 20,
		paddingVertical: 30,
		backgroundColor: 'black',
	},
	image: {
		height: 300,
		width: '100%',
		resizeMode: 'contain',
	},
	button: {
		borderRadius: 25,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
		borderRadius: 15,
		backgroundColor: COLORS.primary,
		marginTop: 10,
	},
});
