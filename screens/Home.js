import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	Image,
	ScrollView,
	Animated,
	TouchableWithoutFeedback,
	ImageBackground,
	FlatList,
} from 'react-native';
import { icons, images } from '../constants';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import dummyData from '../constants/dummy';
import Profiles from '../components/Profiles';
import ProgressBar from '../components/ProgressBar';
import auth from '@react-native-firebase/auth';

const Home = ({ navigation }) => {
	const newSeasonScrollX = React.useRef(new Animated.Value(0)).current;
	const renderNewSeasonSection = () => {
		return (
			<Animated.FlatList
				horizontal
				paddingEnabled
				snapToInterval={SIZES.width}
				snapToAlignment='center'
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={16}
				decelerationRate={0}
				contentContainerStyle={{
					marginTop: SIZES.radius,
				}}
				data={dummyData.newSeason}
				keyExtractor={(item) => `${item.id}`}
				renderItem={({ item, index }) => (
					<TouchableWithoutFeedback
						onPress={() => {
							navigation.navigate('MovieDetail', {
								selectedMovie: item,
							});
						}}
					>
						<View
							style={{
								width: SIZES.width,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<ImageBackground
								source={item.thumbnail}
								resizeMode='cover'
								style={{
									width: SIZES.width * 0.85,
									height: SIZES.width * 0.85,
									justifyContent: 'flex-end',
								}}
								imageStyle={{
									borderRadius: 40,
								}}
							>
								<View
									style={{
										flexDirection: 'row',
										width: '100%',
										height: 60,
										marginBottom: SIZES.radius,
										paddingHorizontal: SIZES.radius,
									}}
								>
									<View
										style={{
											flex: 1,
											flexDirection: 'row',
											alignItems: 'center',
										}}
									>
										<View
											style={{
												alignItems: 'center',
												justifyContent: 'center',
												width: 40,
												height: 40,
												backgroundColor: COLORS.transparentWhite,
												borderRadius: 20,
											}}
										>
											<Image
												source={icons.play}
												resizeMode='contain'
												style={{
													height: 15,
													width: 15,
													tintColor: COLORS.white,
												}}
											/>
										</View>
										<Text
											style={{
												marginLeft: SIZES.base,
												color: COLORS.white,
												...FONTS.h3,
											}}
										>
											{' '}
											Play Now{' '}
										</Text>
									</View>

									{/* people watching.... */}
									{item.stillWatching.length > 0 && (
										<View
											style={{
												justifyContent: 'center',
												alignItems: 'center',
											}}
										>
											<Text
												style={{
													color: COLORS.white,
													...FONTS.h4,
												}}
											>
												Still Watching
											</Text>
											<Profiles profiles={item.stillWatching} />
										</View>
									)}
								</View>
							</ImageBackground>
						</View>
					</TouchableWithoutFeedback>
				)}
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: {
									x: newSeasonScrollX,
								},
							},
						},
					],
					{ useNativeDriver: false }
				)}
			></Animated.FlatList>
		);
	};
	const renderHeader = () => {
		return (
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<TouchableOpacity
					onPress={() => console.log('profile...')}
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						width: 50,
						height: 50,
					}}
				>
					<Image
						source={images.profile_photo}
						style={{
							height: 40,
							width: 40,
							borderRadius: 20,
						}}
					/>
				</TouchableOpacity>

				<TouchableOpacity
					style={{
						width: 50,
						height: 50,
						justifyContent: 'center',
						alignItems: 'center',
					}}
					onPress={() => {
						auth()
							.signOut()
							.then(() => console.log('User signed out!'));
					}}
				>
					<Image
						source={icons.logout}
						style={{
							height: 25,
							width: 25,
							tintColor: COLORS.primary,
						}}
					/>
				</TouchableOpacity>
			</View>
		);
	};

	const renderDots = () => {
		const dotPosition = Animated.divide(newSeasonScrollX, SIZES.width);
		return (
			<View
				style={{
					marginTop: SIZES.padding,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{dummyData.newSeason.map((item, index) => {
					const opacity = dotPosition.interpolate({
						inputRange: [index - 1, index, index + 1],
						outputRange: [0.3, 1, 0.3],
						extrapolate: 'clamp',
					});
					const dotWidth = dotPosition.interpolate({
						inputRange: [index - 1, index, index + 1],
						outputRange: [6, 20, 6],
						extrapolate: 'clamp',
					});
					const colors = dotPosition.interpolate({
						inputRange: [index - 1, index, index + 1],
						outputRange: [COLORS.lightGray, COLORS.primary, COLORS.lightGray],
						extrapolate: 'clamp',
					});
					return (
						<Animated.View
							key={`dot-${index}`}
							opacity={opacity}
							style={{
								borderRadius: SIZES.radius,
								marginHorizontal: 3,
								width: dotWidth,
								height: 6,
								backgroundColor: colors,
							}}
						></Animated.View>
					);
				})}
			</View>
		);
	};

	const renderContinueWatchingSection = () => {
		return (
			<View
				style={{
					marginTop: SIZES.padding,
				}}
			>
				{/* header */}
				<View
					style={{
						flexDirection: 'row',
						paddingHorizontal: SIZES.padding,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Text
						style={{
							color: COLORS.white,
							flex: 1,
							...FONTS.h2,
						}}
					>
						Continue Watching
					</Text>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Image
							source={icons.right_arrow}
							style={{
								width: 20,
								height: 20,
								tintColor: COLORS.primary,
							}}
						/>
					</View>
				</View>

				{/* list */}
				<FlatList
					data={dummyData.continueWatching}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						marginTop: SIZES.padding,
					}}
					keyExtractor={(item) => `item-${item.id}`}
					renderItem={({ item, index }) => {
						return (
							<TouchableWithoutFeedback
								onPress={() => console.log('Movie Details')}
							>
								<View
									style={{
										marginLeft: index == 0 ? SIZES.padding : 20,
										marginRight:
											dummyData.continueWatching.length - 1 == index
												? SIZES.padding
												: 0,
									}}
								>
									<Image
										source={item.thumbnail}
										style={{
											width: SIZES.width / 3,
											height: SIZES.width / 3 + 60,
											borderRadius: 20,
										}}
										resizeMode='cover'
									/>
									<Text
										style={{
											marginTop: SIZES.base,
											color: COLORS.white,
											...FONTS.h4,
										}}
									>
										{item.name}
									</Text>
									<ProgressBar
										barPercentage={item.overallProgress}
										containerStyle={{
											marginTop: SIZES.radius,
										}}
										barStyle={{
											height: 3,
										}}
									/>
								</View>
							</TouchableWithoutFeedback>
						);
					}}
				/>
			</View>
		);
	};
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: COLORS.black,
			}}
		>
			{renderHeader()}
			<ScrollView
				contentContainerStyle={{
					paddingBottom: 80,
				}}
			>
				{renderNewSeasonSection()}
				{renderDots()}
				{renderContinueWatchingSection()}
			</ScrollView>
		</SafeAreaView>
	);
};

export default Home;
