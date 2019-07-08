import React, { Component } from 'react';
import { View, Text, ScrollView, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { Content, List, ListItem, Card, Left, Right, Switch } from 'native-base';
import {updateUserSetting, toggleCreatePinModal, toggleChangePinModal, settingUpdate } from './../../redux/actions';
import {  SITE_COLOR, PINK, GREEN, WHITE, RED } from './../../style';
import CreatePin from '../Pin/CreatePin';
import ChangePin from '../Pin/ChangePin';
import DeviceInfo from 'react-native-device-info';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class Settings extends Component {
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
                {this.renderSuccess()}
                <CreatePin/>
                <ChangePin/>

                <Card style={{ flex: 1, marginLeft: 0, marginTop: 0, marginBottom: 0, marginRight: 0 }}>
                    <Content>
                        <List>
                     
                            <ListItem style={styles.listItemStyle}>
                                <Left>
                                    <Text style={styles.settingTextTitle}>Enable Push Notification</Text>
                                </Left>
                                <Right>
                                    <Switch thumbColor={SITE_COLOR} trackColor={SITE_COLOR} onValueChange={() => {this.setState({ enablePushNotification: !this.state.enablePushNotification }); this.handleSettingsChange()}} value={this.state.enablePushNotification} />
                                </Right>

                            </ListItem>

                            <ListItem style={[styles.listItemStyle, {borderBottomColor: '#efefef', borderBottomWidth: 1.5}]}>
                                <Left>
                                    <Text style={styles.settingTextTitle}>Enable Email Notification</Text>
                                </Left>
                                <Right>
                                    <Switch thumbColor={SITE_COLOR} trackColor={SITE_COLOR} onValueChange={() => {this.setState({ enableEmailNotification: !this.state.enableEmailNotification }); this.handleSettingsChange()}} value={this.state.enableEmailNotification} />
                                </Right>

                            </ListItem>
     

                            

                            {/* <ListItem onPress={() => this.props.toggleCreatePinModal(true)} style={styles.listItemStyle}>
                                <Left>
                                    <Text style={styles.settingTextTitle}>Create Withdrawal Pin</Text>
                                </Left>

                            </ListItem> */}

                            <ListItem onPress={() => this.props.toggleChangePinModal(true)} style={styles.listItemStyle}>
                                <Left>
                                    <Text style={styles.settingTextTitle}>Change Transaction Pin</Text>
                                </Left>

                            </ListItem>

                            <ListItem onPress={() => Actions.country()} style={[styles.listItemStyle, {borderBottomColor: '#efefef', borderBottomWidth: 1.5}]}>
                                <Left>
                                    <Text style={styles.settingTextTitle}>Change Country</Text>
                                </Left>

                            </ListItem>
                            <ListItem onPress={() => Actions.about()} style={styles.listItemStyle}>
                                <Left>
                                    <Text style={styles.settingTextTitle}>About Us</Text>
                                </Left>

                            </ListItem>

                            <ListItem onPress={() => Actions.faq()} style={styles.listItemStyle}>
                                <Left>
                                    <Text style={styles.settingTextTitle}>FAQ</Text>
                                </Left>

                            </ListItem>

                            <ListItem onPress={() => Actions.contact()} style={styles.listItemStyle}>
                                <Left>
                                    <Text style={styles.settingTextTitle}>Contact Us</Text>
                                </Left>

                            </ListItem>

                            <ListItem  style={[styles.listItemStyle, {borderBottomColor: '#efefef', borderBottomWidth: 1.5}]}>
                                <Left>
                                    <Text style={styles.settingTextTitle}>Rate this App</Text>
                                </Left>

                            </ListItem>

                            <ListItem onPress={() => Actions.tos()} style={styles.listItemStyle}>
                                <Left>
                                    <Text style={styles.settingTextTitle}>Terms & Conditions</Text>
                                </Left>

                            </ListItem>

                            <ListItem onPress={() => Actions.privacy()} style={styles.listItemStyle}>
                                <Left>
                                    <Text style={styles.settingTextTitle}>Privacy Policy</Text>
                                </Left>

                            </ListItem>
                        </List>
                        <View style={{alignSelf: 'center', marginTop: 20, marginBottom: 15}}>
                            <Text style={{textAlign: 'center', fontSize: 16}}>Predictpal v{DeviceInfo.getVersion()}</Text>
                            <Text style={{textAlign: 'center', fontSize: 16, marginTop: 10}}>Made with <MaterialCommunityIcon name="heart" color={RED} size={18}/> for you!</Text>
                        </View>
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

export default connect(mapStateToProps, {updateUserSetting, settingUpdate, toggleCreatePinModal, toggleChangePinModal})(Settings); 