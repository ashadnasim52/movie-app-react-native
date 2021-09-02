import React, { useState, useRef } from 'react';
import {
	Container,
	Text,
	Image,
	StyleSheet,
	View,
	TouchableOpacity,
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
		<View
			style={{
				flex: 1,
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
						height: 100,
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
								borderBottomColor: COLORS.black,
								borderBottomWidth: 5,
							}}
						>
							OTP
						</Text>
						<Text
							category='h2'
							style={{
								color: COLORS.primary,
							}}
						>
							{' '}
							Verification
						</Text>
					</View>

					<Text category='h6' appearance='hint'>
						Enter the 6-digit code we sent to
					</Text>
					<Text category='h6' status='primary'>
						{number}
					</Text>
					<OTPTextView
						ref={otpInputRef}
						containerStyle={styles.textInputContainer}
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
								marginBottom: 10,
							}}
						>
							<Text>Continue</Text>
						</TouchableOpacity>
					) : null}

					<TouchableOpacity
						appearance='outline'
						status='basic'
						onPress={() => {
							setConfirm(null);
						}}
					>
						<Text>Want to Change Phone Number?</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default PhoneSignIn;

const styles = StyleSheet.create({
	borderStyleBase: {
		width: 30,
		height: 45,
		borderColor: COLORS.primary,
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
