import React from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native'
import { calculateOpacity } from '../../../Helper';


const {height, width} = Dimensions.get('window');

const Spinner = ({ size, style }) => {
    return (
        <View style={[styles.spinnerStyle, style]}>
            <ActivityIndicator size={size || 'large'} />
        </View>
    )
};

const styles = {
    spinnerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333333'+calculateOpacity(50),
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 200000,
    }
};

export { Spinner }