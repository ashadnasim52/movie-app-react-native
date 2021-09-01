import React from 'react';
import { MovieDetail } from './screens';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Tabs from './navigation/tabs';
import Player from './screens/Player';
import CustomVideoPlayer from './screens/CustomVideoPlayer';

const Stack = createStackNavigator();

const App = () => {
	return (
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
				<Stack.Screen name='CustomVideoPlayer' component={CustomVideoPlayer} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
