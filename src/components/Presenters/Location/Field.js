import React, { Component } from 'react';
import {TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GRAY } from '../../../style/colors';
import {Text} from './../../Reusables';

const Field = ({ onPress, style, name}) => {

    return (
        <TouchableOpacity onPress={onPress} style={{marginTop: 50}}>
            <View style={{ width: '100%', height: 40 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', flex: 9}}>
                        <MaterialCommunityIcon name={'map-marker'} color={GRAY} size={25} />
                        <Text style={{fontSize: 15, marginLeft: 8, marginTop: 3, color: "#211414", opacity: 0.6}}>{name}</Text>
                    
                    </View>
                    <MaterialCommunityIcon name={'chevron-down'} size={25} style={{ flex: 1, marginLeft: 100 }} color={GRAY}/>
                </View>
                <View style={{ height: 1, backgroundColor: "#585555", marginTop: 15, opacity: 0.6}}></View>
            </View>
        </TouchableOpacity>
    );
};


export { Field };
