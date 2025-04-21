import React from "react";
import { StyleSheet, View } from "react-native";
import { BottomMenu } from "../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Profile = () => {
    const insets = useSafeAreaInsets();
    return (<View style={[styles.container, { 
        paddingTop: insets.top, 
        paddingBottom: insets.bottom, 
        paddingLeft: insets.left, 
        paddingRight: insets.right 
    }]}>
        <BottomMenu />
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f7fa",
        alignItems: "center",
        justifyContent: 'center'
    },
})