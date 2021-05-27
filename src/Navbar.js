import React from 'react';
import {Text, View, StyleSheet} from "react-native";

const Navbar = ({title}) => {
    return (
        <View style={styles.navbar}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar:{
        height:90,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#f17e0e',
        paddingBottom: 25
    },
    title:{
        color: 'white',
        fontSize: 22
    }
});

export default Navbar;