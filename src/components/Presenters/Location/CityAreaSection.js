import React, { Component } from 'react';
import {TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, Hr} from './../../Reusables';
import { calculateOpacity } from '../../../Helper';

const CityAreaSection = ({ onPress, style, name}) => {

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={{ paddingBottom: 15}}>
            <Text style={{paddingLeft: 30, color: '#403E3E', fontSize: 20}}>{name}</Text>
            <Hr style={{marginTop: 15, backgroundColor: '#707070'+calculateOpacity(53), marginLeft: 20}}/>
        </TouchableOpacity>
    );
};


export { CityAreaSection };
