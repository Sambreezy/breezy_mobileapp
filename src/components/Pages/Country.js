import React, { Component } from 'react';
import { View, Text, ScrollView, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { Content, List, ListItem, Card, Left, Right, Switch } from 'native-base';
import {updateUserSetting, toggleCreatePinModal, toggleChangePinModal, settingUpdate } from './../../redux/actions';
import {  SITE_COLOR, PINK, GREEN, WHITE, RED } from './../../style';
import DeviceInfo from 'react-native-device-info';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class Country extends Component {
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
             
                <Card style={{ flex: 1, marginLeft: 0, marginTop: 0, marginBottom: 0, marginRight: 0 }}>
                    <Content>
                        <List>
                     
                            <ListItem onPress={() => Actions.country()} style={[styles.listItemStyle, {borderBottomColor: '#efefef', borderBottomWidth: 1.5}]}>
                                <Left>
                                    <Text style={styles.settingTextTitle}>Change Country</Text>
                                </Left>

                            </ListItem>
                          
                        </List>
                      
                    </Content>
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

export default connect(mapStateToProps, {updateUserSetting, settingUpdate, toggleCreatePinModal, toggleChangePinModal})(Country); 