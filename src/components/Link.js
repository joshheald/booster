import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Spacer from './Spacer';
import { withNavigation } from 'react-navigation';


const Link = ({ navigation, targetScreen, linkText }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate(targetScreen)}>
            <Spacer>
                <Text style={styles.link}>{linkText}</Text>
            </Spacer>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    link: {
        color: 'blue'
    }
});

export default withNavigation(Link);