import React, { Component } from 'react';
import { View, ScrollView, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { Content, List, ListItem, Card, Left, Right, Switch } from 'native-base';
import {updateUserSetting, toggleCreatePinModal, toggleChangePinModal, settingUpdate } from './../../redux/actions';
import {  SITE_COLOR, PINK, GREEN, WHITE, RED } from './../../style';
import {Text} from './../Reusables';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class Faq extends Component {
    constructor() {
        super();
        this.state = {
            
        }
    }

    render() {

        return (

            <ScrollView contentContainerStyle={{flexGrow: 1}} style={{backgroundColor: SITE_COLOR}}>
           
                <Card style={{ flex: 1, padding: 15, marginLeft: 0, marginTop: 0, marginBottom: 0, marginRight: 0 }}>
                    <Text style={{fontSize: 22, marginTop: 10, color: "#05050F", fontFamily: "Segoe UI Bold"}}>
                        FAQ About Predictpal
                    </Text>

                    <Text style={{paddingTop: 30, fontFamily: "Segoe UI Bold", lineHeight: 22, fontSize: 16, color: "#05050F"}}>
                        How do I play Predictpal?
                    </Text>

                    <Text style={{paddingTop: 5, lineHeight: 22, fontSize: 14, color: "#05050F"}}>
                        Aliquip in veniam elit consequat in anim est. Velit officia occaecat Lorem sint incididunt nulla ipsum ad incididunt ad reprehenderit eu ea magna. Commodo non Lorem minim commodo eiusmod non culpa qui dolor nisi ad cillum commodo. Elit ea Lorem et sint id occaecat nisi incididunt esse elit ad culpa. Elit amet eiusmod ut ut aute deserunt duis labore tempor qui esse labore. Irure cupidatat irure aliqua laboris adipisicing nostrud exercitation. Ex excepteur voluptate qui qui velit eiusmod dolor consectetur amet nisi labore ad.
                    </Text>

                    <Text style={{paddingTop: 30, fontFamily: "Segoe UI Bold", lineHeight: 22, fontSize: 16, color: "#05050F"}}>
                        How do I play Predictpal?
                    </Text>

                    <Text style={{paddingTop: 5, lineHeight: 22, fontSize: 14, color: "#05050F"}}>
                        Aliquip in veniam elit consequat in anim est. Velit officia occaecat Lorem sint incididunt nulla ipsum ad incididunt ad reprehenderit eu ea magna. Commodo non Lorem minim commodo eiusmod non culpa qui dolor nisi ad cillum commodo. Elit ea Lorem et sint id occaecat nisi incididunt esse elit ad culpa. Elit amet eiusmod ut ut aute deserunt duis labore tempor qui esse labore. Irure cupidatat irure aliqua laboris adipisicing nostrud exercitation. Ex excepteur voluptate qui qui velit eiusmod dolor consectetur amet nisi labore ad.
                    </Text>
                    
                </Card>
            </ScrollView>
        );
    }
}

const styles = {

    listItemStyle: {
        height: 60,
        paddingLeft: 15,
        marginLeft: 0,
        borderBottomWidth: 0,
        borderBottomColor: '#efefef'
    },

    listItemViewStyle: {
        flex: 1,
        flexDirection: 'row'
    },

    listItemTextStyle: {
        paddingLeft: 25,
        fontSize: 18
    },

    listIconStyle: {
        width: 18,
        height: 18
    },

    settingTextTitle: {
        fontSize: 15,
        color: '#05050F'
        
    }
}

const mapStateToProps = (state) => {
    const {setting, success} = state.setting;
    return {setting, success}
};

export default connect(mapStateToProps, {updateUserSetting, settingUpdate, toggleCreatePinModal, toggleChangePinModal})(Faq); 