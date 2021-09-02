import React, { useEffect, useState } from 'react';
import {
	Dimensions,
	StatusBar,
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	TouchableOpacity,
	BackHandler,
} from 'react-native';
import Video from 'react-native-video';
// import {Container} from 'native-base';
import Orientation from 'react-native-orientation-locker';
import { useFocusEffect } from '@react-navigation/native';

const CustomVideoPlayer = ({ navigation }) => {
	const videoRef = React.createRef();
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [isFullScreen, setIsFullScreen] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [paused, setPaused] = useState(false);
	const [playerState, setPlayerState] = useState(null);
	const [videoTrack, setVideoTrack] = useState(144);
	// useEffect(() => {
	// 	Orientation.lockToLandscapeLeft();
	// 	// videoRef.current.

	// 	console.log(videoRef.current);

	// 	return () => {
	// 		Orientation.unlockAllOrientations();
	// 	};
	// }, []);

	// useEffect(() => {
	// 	const onBackPress = () => {
	// 		console.log('back presssed...');
	// 		navigation.goBack();
	// 	};

	// 	BackHandler.addEventListener('hardwareBackPress', onBackPress);

	// 	return () =>
	// 		BackHandler.removeEventListener('hardwareBackPress', onBackPress);
	// }, []);
	return (
		<View style={{ flexGrow: 1, flex: 1 }}>
			<Video
				ref={videoRef}
				source={{
					uri: 'https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8',
					isNetwork: true,
					shouldCache: true,
				}}
				resizeMode={'contain'}
				style={styles.backgroundVideo}
				fullscreen={true}
				hls={true}
				rate={1.0}
				controls={true}
				volume={1}
				muted={false}
				repeat={false}
				// currentPlaybackTime={1000}
				playInBackground={true}
				// fullscreenAutorotate
				// fullscreenOrientation='landscape'
				playWhenInactive={false}
				// maxBitRate={2000000}
				minLoadRetryCount={5}
				onError={(err) => {
					console.error(err);
				}}
				onSeek={(data) => {
					console.log(`seeked data `, data);
				}}
				onBuffer={(data) => {
					console.log('buffer data is ', data);
				}}
				reportBandwidth={true}
				onBandwidthUpdate={(data) => console.log('bandwidth updated', data)}
				selectedVideoTrack={{
					type: 'resolution',
					value: 144,
				}}

				// fullscreenAutorotate={false}
			/>

			{/* <MediaControls
          isFullScreen={isFullScreen}
          duration={duration}
          isLoading={isLoading}
          mainColor="#fff"
          onPaused={onPaused}
          onReplay={onReplay}
          onSeek={onSeek}
          onSeeking={onSeeking}
          playerState={playerState}
          progress={currentTime}>
          <MediaControls.Toolbar>
            <View style={styles.toolbar}>
              <Text>I'm a custom toolbar </Text>
            </View>
          </MediaControls.Toolbar>
        </MediaControls> */}
		</View>
	);
};

export default CustomVideoPlayer;

const styles = StyleSheet.create({
	fullscreenVideo: {
		backgroundColor: 'black',
		height: '100%',
		width: '100%',
	},
	controlOverlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#000000c4',
		justifyContent: 'space-between',
	},

	backgroundVideo: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
});
