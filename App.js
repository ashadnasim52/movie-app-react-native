import React, { useState, useEffect } from 'react';
import { MovieDetail } from './screens';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, ActivityIndicator } from 'react-native';

import Tabs from './navigation/tabs';
import Player from './screens/Player';
import { PhoneSignIn } from './screens/Login';
import CustomVideoPlayer from './screens/CustomVideoPlayer';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const App = () => {
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState();

	// Handle user state changes
	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	if (initializing)
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
	if (!user) {
		return <PhoneSignIn />;
	}

	return (
		<>
			{/* <StatusBar backgroundColor={""} /> */}

			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
					initialRouteName={'Home'}
				>
					<Stack.Screen name='Home' component={Tabs} />

					<Stack.Screen name='MovieDetail' component={MovieDetail} />
					<Stack.Screen name='Player' component={Player} />
					<Stack.Screen
						name='CustomVideoPlayer'
						component={CustomVideoPlayer}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
};

export default App;
