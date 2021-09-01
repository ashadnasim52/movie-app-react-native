import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import YouTube from 'react-native-youtube';
import VideoPlayer from 'react-native-video-controls';

const Player = () => {
	return (
		<View
			style={{
				flex: 1,
			}}
		>
			{/* <YouTube
				videoId='KVZ-P-ZI6W4' // The YouTube video ID
				play // control playback of video with true/false
				// fullscreen // control whether the video should play in fullscreen or inline
				loop // control whether the video should loop when ended
				// onReady={(e) => this.setState({ isReady: true })}
				// onChangeState={(e) => this.setState({ status: e.state })}
				// onChangeQuality={(e) => this.setState({ quality: e.quality })}
				controls={1}
				onError={(e) => console.log(e.error)}
				style={{ alignSelf: 'stretch', height: 300 }}
				apiKey='AIzaSyAb9D7dU2qlGLOBnx_k4NylBWk1V4yXq3M'
			/> */}
			<VideoPlayer
				source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
				// navigator={this.props.navigator}
				onError={(e) => console.log(e)}
				style={{
					flex: 1,
				}}
			/>
		</View>
	);
};

export default Player;

const styles = StyleSheet.create({});
