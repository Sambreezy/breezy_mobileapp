import React from 'react';
import { Text as UText } from 'react-native'
import { FONT_FAMILY } from '../../../style';


const Text = (props) => {

    return (
        <UText style={[styles.textStyle, props.style]}>
            {props.children}
        </UText>
    )
};

const styles = {
    textStyle: {
       fontFamily: 'Nunito Regular'
    }
};

export { Text }