import React, { Component } from 'react';
import { Content, Button, Footer, FooterTab} from 'native-base';
import { ImageBackground, View, ScrollView, Image, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {switchView} from './../../redux/actions';

import { GRAY, SITE_COLOR, YELLOW, WHITE, avatar, LIGHT_GRAY, GREEN, LIGHT_GREEN } from './../../style';
import { calculateOpacity } from '../../Helper';

class Carousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        const {current, hasBack, hasNext, nextText, onBackPress, onFrontPress, nextDisabled = false} = this.props;
        return (
            <View style={{justifyContent: 'space-between', marginBottom: 15, flexDirection: 'row'}}>
                <TouchableOpacity onPress={onBackPress} disabled={!hasBack} style={{marginLeft: 10,  justifyContent: 'center'}}>
                    <Text style={{color: WHITE, marginBottom: 5, fontSize: 14}}>{hasBack ? 'BACK' : ''}</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', marginTop: 7, justifyContent: 'center'}}>
                    <MaterialCommunityIcon style={{marginLeft: 7}} size={9} color={current == 1 ? WHITE : WHITE+calculateOpacity(50)} name="checkbox-blank-circle"/>
                    <MaterialCommunityIcon style={{marginLeft: 7}} size={9} color={current == 2 ? WHITE : WHITE+calculateOpacity(50)} name="checkbox-blank-circle"/>
                    <MaterialCommunityIcon style={{marginLeft: 7}} size={9} color={current == 3 ? WHITE : WHITE+calculateOpacity(50)} name="checkbox-blank-circle"/>
                    <MaterialCommunityIcon style={{marginLeft: 7}} size={9} color={current == 4 ? WHITE : WHITE+calculateOpacity(50)} name="checkbox-blank-circle"/>
                </View>
                <TouchableOpacity onPress={onFrontPress} disabled={!hasNext || nextDisabled} style={{marginRight: 10, justifyContent: 'center'}}>
                    <Text style={{color: !hasNext || nextDisabled ? WHITE+calculateOpacity(50): WHITE, marginBottom: 5, fontSize: 14}}>{hasNext ? nextText ? nextText : 'NEXT' : ''}</Text>
                </TouchableOpacity>
            </View>
        );


    }
}

const styles = {

}

const mapStateToProps = (state) => {
    return {  };
};

export default connect(mapStateToProps, {switchView })(Carousel);