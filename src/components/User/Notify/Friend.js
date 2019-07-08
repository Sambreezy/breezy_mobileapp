import React, { Component } from 'react';
import { Content, Button, List, ListItem, Left, Right, Body, Text, Container, TabHeading, Tab, Tabs, Thumbnail} from 'native-base';
import { ImageBackground, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {unfriend} from './../../../redux/actions';
import { Menu as Menup, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { GRAY, SITE_COLOR, YELLOW, WHITE, avatar, LIGHT_GRAY, GREEN, LIGHT_GREEN } from '../../../style';

class Friend extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    RightIcon = () => {
        return (
            <Menup>
                <MenuTrigger>
                    <MaterialCommunityIcons name="dots-vertical" color={GRAY} size={30} />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{ paddingTop: 8, paddingBottom: 8 }}>
                    <MenuOption onSelect={() => this.props.unfriend(this.props.id)}>
                        <Text style={{paddingLeft: 5, fontSize: 12}}>Unfriend</Text>
                    </MenuOption>
                    
                </MenuOptions>
            </Menup>
        );
    };

    render() {
        const {name, pix, onPress} = this.props;

        return (
            

                <View style={{flexDirection: 'row',  justifyContent: 'space-between', paddingBottom: 10, borderTopWidth: 0.3, borderTopColor: LIGHT_GRAY}}>
                    <View style={{flexDirection: 'row',  flex: 8}}>
                        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{flexDirection: 'row', flex: 1, marginTop: 15, paddingLeft: 20}}>
                            <Thumbnail
                                source={pix ? {uri: pix} : avatar} 
                                small
                            />
                            <View style={{marginLeft: 15, justifyContent: 'center'}}>
                                <Text style={{fontWeight: 'bold', color: '#020B0F'}}>{name}</Text>
                                <Text style={{fontSize: 12}}>Tap to chat</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{justifyContent: 'center', flex: 1}}>
                        {this.RightIcon()}
                    </View>
                </View>
                
                 

        );


    }
}

const BORDER_COLOR = '#C4C4C4';

const styles = {

}

const mapStateToProps = (state) => {
   
    return {  };
};

export default connect(mapStateToProps, {unfriend})(Friend);

