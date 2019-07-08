import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import {Thumbnail} from 'native-base';
import { BARCA, LIGHT_GRAY } from '../../style';
import { formatMoney } from '../../Helper';


const Players = (props) => {
    let {image, amount, name} = props;
    amount = parseInt(amount);
    return (
        <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Thumbnail
                source={image}
                style={{width: 15, height: 15}}
            />
            <Text style={{paddingLeft: 5, fontSize: 10}}>{name}</Text>
            
            <View style={{marginLeft: 5,backgroundColor: LIGHT_GRAY, paddingTop: 3, paddingBottom: 3, paddingLeft: 2, paddingRight: 5, borderRadius: 20, }}>
                <Text style={{ fontSize: 10, paddingLeft: 3, paddingRight: 3}}>
                    ₦ {formatMoney(amount, ',','.')}
                </Text>
            </View>
            
            
        </View>
    );


};

const styles = {
 

}

export { Players };
