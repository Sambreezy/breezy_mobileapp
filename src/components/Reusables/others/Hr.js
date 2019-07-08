import React from 'react';
import { View} from 'react-native'
import { calculateOpacity } from '../../../Helper';


const Hr = ({ style }) => {
    return (
        <View style={[{height: 1, backgroundColor: '#707070'+calculateOpacity(20)}, style]}></View>
                    
    )
};


export { Hr }