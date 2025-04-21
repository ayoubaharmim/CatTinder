import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Chat, Home, Profile } from "../screens";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown: false}} />
            <Stack.Screen
                name="Chat"
                component={Chat}
                options={{headerShown: false}} />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{headerShown: false}} />
        </Stack.Navigator>
    );
};

export default AppNavigator;