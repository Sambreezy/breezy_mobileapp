import React, { Component } from 'react';
import { View, Text, ScrollView, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { Content, List, ListItem, Card, Left, Right, Switch } from 'native-base';
import {updateUserSetting, toggleCreatePinModal, toggleChangePinModal, settingUpdate } from './../../redux/actions';
import {  SITE_COLOR, PINK, GREEN, WHITE, RED } from './../../style';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class Privacy extends Component {
    constructor() {
        super();
        this.state = {
            enablePushNotification: false,
            enableEmailNotification: false
        }
    }

    handleSettingsChange(){
        setTimeout(() => {
            let data = {
                push_notification: this.state.enablePushNotification,
                email_notification: this.state.enableEmailNotification
            };

            this.props.updateUserSetting(data);
        },
        500);
        
    }

    renderSuccess(){
        
        if(this.props.success){
            
            setTimeout(() => this.props.settingUpdate({prop: 'success', value: false}), 3000);
            
                return (
                    <View style={{ backgroundColor: GREEN, justifyContent: 'center', position: 'absolute', left: 0, zIndex: 1000, right: 0, height: 45}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 16}}>Pin Action Successful</Text>
                    </View>
                );
            
            
        }
    }

    componentDidMount(){
        if(this.props.setting.push_notification){
            this.setState({
                enablePushNotification: this.props.setting.push_notification,
                enableEmailNotification: this.props.setting.email_notification
            })
        }
        
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            enablePushNotification: nextProps.setting.push_notification,
            enableEmailNotification: nextProps.setting.email_notification
        })
    }

    
    render() {

        return (

            <ScrollView contentContainerStyle={{flexGrow: 1}} style={{backgroundColor: SITE_COLOR}}>
           
                <Card style={{ flex: 1, padding: 15, marginLeft: 0, marginTop: 0, marginBottom: 0, marginRight: 0 }}>
                    <Text style={{fontSize: 22, marginTop: 10, color: "#05050F", fontFamily: "Segoe UI Bold"}}>
                        PredictPal Privacy Policy
                    </Text>

                    <Text style={{paddingTop: 15, lineHeight: 22, fontSize: 14, color: "#05050F"}}>
                        OUR APPROACH TO POLICY
                    </Text>

                    <Text style={{paddingTop: 30, lineHeight: 22, fontSize: 16, color: "#05050F"}}>
                        1. Acceptance of terms and conditions?
                    </Text>

                    <Text style={{paddingTop: 5, lineHeight: 22, fontSize: 14, color: "#05050F"}}>
                        Aliquip in veniam elit consequat in anim est. Velit officia occaecat Lorem sint incididunt nulla ipsum ad incididunt ad reprehenderit eu ea magna. Commodo non Lorem minim commodo eiusmod non culpa qui dolor nisi ad cillum commodo. Elit ea Lorem et sint id occaecat nisi incididunt esse elit ad culpa. Elit amet eiusmod ut ut aute deserunt duis labore tempor qui esse labore. Irure cupidatat irure aliqua laboris adipisicing nostrud exercitation. Ex excepteur voluptate qui qui velit eiusmod dolor consectetur amet nisi labore ad.
                    </Text>

                    <Text style={{paddingTop: 30, lineHeight: 22, fontSize: 16, color: "#05050F"}}>
                        2. Eligibility?
                    </Text>

                    <Text style={{paddingTop: 5, lineHeight: 22, fontSize: 14, color: "#05050F"}}>
                        Esse voluptate aliquip et consectetur aliquip do aliqua aliquip incididunt nulla reprehenderit esse ullamco. Ipsum velit non ut consequat duis eiusmod. Velit eu sunt adipisicing laborum consequat commodo minim. Qui ipsum aute ut aute ut irure ea adipisicing sint consectetur adipisicing ut mollit enim. Ut dolor Lorem nostrud culpa fugiat aute fugiat nulla qui amet sit. Pariatur culpa id ea sint pariatur veniam minim est eu non sint. Proident eu eu excepteur aliquip ullamco nisi adipisicing in id in aliqua pariatur.
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

export default connect(mapStateToProps, {updateUserSetting, settingUpdate, toggleCreatePinModal, toggleChangePinModal})(Privacy); 