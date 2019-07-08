import Toaster, { ToastStyles } from 'react-native-toaster'
import React from 'react';
import { View, Text } from 'react-native'
import { SITE_COLOR } from '../../../style';


const Toastr = ({ style, text, toastStyle }) => {
    return (
        <View>
            <Toaster message={{text, styles: ToastStyles[toastStyle]}} />
        </View>
    )
};

const styles = {

};

export { Toastr }