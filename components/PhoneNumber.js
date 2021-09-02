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
import { COLORS } from '../constants';

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
				}}
			>
				<ActivityIndicator size='large' color='red' />
			</View>
		);
	}
	return (
		<KeyboardAwareScrollView
			contentContainerStyle={{
				flexGrow: 1,
				backgroundColor: 'red',
			}}
		>
			<View style={styles.container} level='1'>
				<View style={styles.imageContainer}>
					<Image
						source={require('../assets/images/imaaa.png')}
						style={styles.image}
					></Image>
				</View>
				<View level='2' style={styles.bottomLayout}>
					<Text
						category='h5'
						style={{
							paddingBottom: 5,
							textAlign: 'center',
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
						}}
						textContainerStyle={{
							borderWidth: 1,
							borderColor: COLORS.primary,
						}}
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
						<Text>Verify</Text>
					</TouchableOpacity>
					<Text
						category='c1'
						appearance='hint'
						style={{
							textAlign: 'center',
						}}
					>
						By tapping Verify, you are indicating that you accept our Terms of
						Service and Privacy Policy. An SMS may be sent. Message & data rates
						may apply.
					</Text>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default PhoneNumber;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
	imageContainer: {
		flexBasis: 1.5,
		justifyContent: 'center',
		alignItems: 'center',
	},

	bottomLayout: {
		flexGrow: 5,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		overflow: 'hidden',
		justifyContent: 'space-around',
		paddingHorizontal: 20,
		paddingVertical: 10,
		flexGrow: 1,
	},
	image: {
		flex: 1,
		width: '80%',
		resizeMode: 'contain',
	},
	button: {
		borderRadius: 25,
	},
});
