import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../screens/Home';
import Search from '../screens/Search';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={'Home'}
        >
            <Stack.Screen name="Home"  component={Home} />
            <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
    )
}

export default StackNavigator;