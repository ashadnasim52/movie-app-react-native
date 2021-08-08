import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	ImageBackground,
	Image,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar } from '../components';
import { COLORS, FONTS, icons, SIZES } from '../constants';

const MovieDetail = ({ route, navigation }) => {
	const [selectedMovie, setSelectedMovie] = useState(null);
	useEffect(() => {
		setSelectedMovie(route.params.selectedMovie);
	}, []);

	const renderHEader = () => {
		const renderHEaderBAr = () => {
			return (
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						paddingHorizontal: 20,
						marginTop: 20,
					}}
				>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={{
							height: 40,
							width: 40,
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: SIZES.radius,
							backgroundColor: COLORS.transparentBlack,
						}}
					>
						<Image
							source={icons.left_arrow}
							style={{
								height: 15,
								width: 15,
								tintColor: COLORS.white,
							}}
						/>
					</TouchableOpacity>
					<View
						style={{
							height: 40,
							width: 40,
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: SIZES.radius,
							backgroundColor: COLORS.transparentBlack,
						}}
					>
						<Image
							source={icons.upload}
							style={{
								height: 15,
								width: 15,
								tintColor: COLORS.white,
							}}
						/>
					</View>
				</View>
			);
		};
		return (
			<ImageBackground
				source={selectedMovie?.details?.image}
				style={{
					width: '100%',
					height: SIZES.height < 700 ? SIZES.height * 0.6 : SIZES.height * 0.7,
				}}
				resizeMode='cover'
			>
				<View
					style={{
						flex: 1,
					}}
				>
					{renderHEaderBAr()}
					<View
						style={{
							flex: 1,
							justifyContent: 'flex-end',
						}}
					>
						<LinearGradient
							start={{ x: 0, y: 0 }}
							end={{ x: 0, y: 1 }}
							colors={['transparent', '#000']}
							style={{
								width: '100%',
								height: 150,
								alignItems: 'center',
								justifyContent: 'flex-end',
							}}
						>
							<Text style={{ color: COLORS.white, ...FONTS.body4 }}>
								{selectedMovie?.details?.season}
							</Text>
							<Text style={{ color: COLORS.white, ...FONTS.h1 }}>
								{selectedMovie?.name}
							</Text>
						</LinearGradient>
					</View>
				</View>
			</ImageBackground>
		);
	};
	const renderCategoryAndRating = () => {
		return (
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: SIZES.base,
				}}
			>
				<View
					style={[
						styles.categoryContainer,
						{
							marginLeft: 0,
						},
					]}
				>
					<Text
						style={{
							color: COLORS.white,
							...FONTS.h4,
						}}
					>
						{selectedMovie?.details?.age}
					</Text>
				</View>
				<View
					style={[
						styles.categoryContainer,
						{
							paddingHorizontal: SIZES.padding,
						},
					]}
				>
					<Text
						style={{
							color: COLORS.white,
							...FONTS.h4,
						}}
					>
						{selectedMovie?.details?.genre}
					</Text>
				</View>
				<View
					style={[
						styles.categoryContainer,
						{
							marginRight: 0,
						},
					]}
				>
					<Image
						source={icons.star}
						style={{
							height: 12,
							width: 12,
							tintColor: 'yellow',
						}}
						resizeMode='contain'
					/>
					<Text
						style={{
							color: COLORS.white,
							marginLeft: SIZES.base,

							...FONTS.h4,
						}}
					>
						{selectedMovie?.details?.ratings}
					</Text>
				</View>
			</View>
		);
	};
	const finalDetails = () => {
		return (
			<View
				style={{
					flex: 1,
					paddingHorizontal: SIZES.padding,
					marginTop: SIZES.padding,
					justifyContent: 'space-around',
				}}
			>
				<View
					style={{
						flex: 0.4,
					}}
				>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							justifyContent: 'space-around',
						}}
					>
						<Text
							style={{
								flex: 1,
								color: COLORS.white,
								...FONTS.h4,
							}}
						>
							{selectedMovie?.details?.currentEpisode}
						</Text>
						<Text
							style={{
								flex: 1,
								color: COLORS.white,
								...FONTS.body4,
							}}
						>
							{selectedMovie?.details?.runningTime}
						</Text>
					</View>
					<ProgressBar
						containerStyle={{
							marginTop: SIZES.radius,
						}}
						barStyle={{
							height: 5,
							borderRadius: 3,
						}}
						barPercentage={selectedMovie?.details?.progress}
					/>
				</View>

				<TouchableOpacity
					style={{
						height: 60,
						alignItems: 'center',
						justifyContent: 'center',
						marginBottom: 20,
						borderRadius: 15,
						backgroundColor: COLORS.primary,
					}}
				>
					<Text
						style={{
							color: COLORS.white,
							...FONTS.h2,
						}}
					>
						{selectedMovie?.details?.progress == 0
							? 'WATCH NOW'
							: 'CONTINUE WATCH'}
					</Text>
				</TouchableOpacity>
			</View>
		);
	};
	return (
		<ScrollView
			contentContainerStyle={{
				backgroundColor: 'black',
				flex: 1,
			}}
			style={{
				backgroundColor: 'black',
			}}
		>
			{/* header */}
			{renderHEader()}
			{renderCategoryAndRating()}
			{finalDetails()}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	categoryContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: SIZES.base,
		paddingHorizontal: SIZES.base,
		paddingVertical: 3,
		borderRadius: SIZES.radius,
		backgroundColor: COLORS.gray,
	},
});

export default MovieDetail;
