import React, { useState, useRef } from 'react';
import {
	Container,
	Text,
	Image,
	StyleSheet,
	View,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import PhoneNumber from '../components/PhoneNumber';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import OTPTextView from 'react-native-otp-textinput';

export const PhoneSignIn = () => {
	console.log('Phoern signin');
	const otpInputRef = useRef(null);

	// If null, no SMS has been sent
	const [confirm, setConfirm] = useState(null);
	const [code, setCode] = useState(null);

	const [number, setNumber] = useState('');
	// Handle the button press
	async function signInWithPhoneNumber(phoneNumber) {
		console.log(phoneNumber);
		setNumber(phoneNumber);
		const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
		console.log(confirmation);
		setConfirm(confirmation);
	}

	async function confirmCode() {
		try {
			await confirm.confirm(code);
		} catch (error) {
			console.warn(error);
			console.log('Invalid code.');
			alert('Invalid code');
		}
	}

	if (!confirm) {
		return <PhoneNumber signInWithPhoneNumber={signInWithPhoneNumber} />;
	}

	return (
		<ScrollView
			contentContainerStyle={{
				flexGrow: 1,
			}}
		>
			<View
				style={{
					flex: 1,
					backgroundColor: 'black',
				}}
			>
				<View
					style={{
						flexGrow: 1,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Image
						source={require('../assets/images/search.png')}
						style={{
							height: 300,
							width: '80%',
							resizeMode: 'contain',
						}}
					/>
				</View>
				<View
					style={{
						marginHorizontal: 20,
						flex: 3,
					}}
				>
					<View>
						<View
							style={{
								flexDirection: 'row',
								paddingBottom: 10,
								marginBottom: 10,
							}}
						>
							<Text
								category='h2'
								style={{
									color: COLORS.primary,
									borderBottomColor: COLORS.primary,
									borderBottomWidth: 5,
									...FONTS.largeTitle,
								}}
							>
								OTP
							</Text>
							<Text
								category='h2'
								style={{
									color: COLORS.primary,
									...FONTS.largeTitle,
								}}
							>
								{' '}
								Verification
							</Text>
						</View>

						<Text
							style={{
								color: COLORS.primary,
								...FONTS.h4,
							}}
						>
							Enter the 6-digit code we sent to
						</Text>
						<Text
							category='h6'
							status='primary'
							style={{
								color: COLORS.primary,
								...FONTS.body1,
							}}
						>
							{number}
						</Text>
						<OTPTextView
							ref={otpInputRef}
							containerStyle={{
								marginVertical: 20,
							}}
							handleTextChange={(code) => {
								console.log(`Code is ${code}, you are good to go!`);
								setCode(code);
							}}
							inputCount={6}
							keyboardType='numeric'
							textInputStyle={styles.borderStyleBase}
						/>

						{code ? (
							<TouchableOpacity
								onPress={() => {
									confirmCode();
								}}
								style={{
									borderRadius: 25,
									height: 60,
									alignItems: 'center',
									justifyContent: 'center',
									marginBottom: 20,
									borderRadius: 15,
									backgroundColor: COLORS.primary,
									marginTop: 20,
								}}
							>
								<Text
									style={{
										color: COLORS.white,
										...FONTS.h2,
									}}
								>
									Continue
								</Text>
							</TouchableOpacity>
						) : null}

						<TouchableOpacity
							appearance='outline'
							status='basic'
							onPress={() => {
								setConfirm(null);
							}}
						>
							<Text
								style={{
									textAlign: 'center',
									color: '#EDEDED',
								}}
							>
								Want to Change Phone Number?
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default PhoneSignIn;

const styles = StyleSheet.create({
	borderStyleBase: {
		width: 30,
		height: 45,
		borderColor: COLORS.primary,
		color: COLORS.white,
	},

	borderStyleHighLighted: {
		borderColor: COLORS.black,
		color: COLORS.primary,
	},

	underlineStyleBase: {
		width: 30,
		height: 45,
		borderWidth: 0,
		borderBottomWidth: 1,
	},

	underlineStyleHighLighted: {
		borderColor: '#03DAC6',
	},
});
