import React, { Component } from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GRAY } from '../../../style/colors';
import {Text} from './../../Reusables';
import { NUNITO_SEMIBOLD } from '../../../style/font';

const MenuSection = ({ onPress, style, title, icon, color}) => {

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[style, {paddingTop: 15, paddingBottom: 15, flexDirection: 'row'}]}>
            <View style={{justifyContent: 'center'}}>
                <Image
                    source={icon}
                    style={{width: 22, height: 22}}
                    resizeMode={'contain'}
                />
            </View>
            
            <View style={{paddingLeft: 20, justifyContent: 'center'}}>
                <Text style={{ fontSize: 16, color, fontFamily: NUNITO_SEMIBOLD}}>{title}</Text>
            </View>            
        </TouchableOpacity>
    );
};


export { MenuSection };
