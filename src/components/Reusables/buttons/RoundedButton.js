import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { getStyleSheet, ORANGE, DISABLED } from './../styles';
import { WHITE, SITE_COLOR } from '../../../style/colors';


const RoundedButton = ({ onPress, disabled, style, children}) => {

    
    return (
        <TouchableOpacity activeOpacity={0.75} disabled={disabled} onPress={onPress} style={[styles.roundedButtonStyle, style]}>
            {children}
        </TouchableOpacity >
    );
};


const styles = {

    roundedButtonStyle: {
        backgroundColor: SITE_COLOR,
        borderRadius: 25,
        padding: 12,
        elevation: 1.2,

    },

    buttonTextStyle: {
        color: WHITE
    }

}

export { RoundedButton };
