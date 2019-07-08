import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import {Card} from 'native-base';
import {updateUserSetting, toggleCreatePinModal, toggleChangePinModal, settingUpdate } from './../../redux/actions';
import {  SITE_COLOR, GREEN, WHITE } from './../../style';
import {Text} from './../Reusables';


class About extends Component {
    constructor() {
        super();
        this.state = {
            
        }
    }

    
    render() {

        return (

            <ScrollView contentContainerStyle={{flexGrow: 1}} style={{backgroundColor: SITE_COLOR}}>
           
                <Card style={{ flex: 1, padding: 15, marginLeft: 0, marginTop: 0, marginBottom: 0, marginRight: 0 }}>
                    <Text style={{fontSize: 22, color: "#05050F", fontFamily: "Segoe UI Bold"}}>
                        About Predictpal
                    </Text>

                    
                        <Text style={{paddingTop: 30, lineHeight: 22, fontSize: 14, color: "#05050F"}}>
                            Aliquip in veniam elit consequat in anim est. Velit officia occaecat Lorem sint incididunt nulla ipsum ad incididunt ad reprehenderit eu ea magna. Commodo non Lorem minim commodo eiusmod non culpa qui dolor nisi ad cillum commodo. Elit ea Lorem et sint id occaecat nisi incididunt esse elit ad culpa. Elit amet eiusmod ut ut aute deserunt duis labore tempor qui esse labore. Irure cupidatat irure aliqua laboris adipisicing nostrud exercitation. Ex excepteur voluptate qui qui velit eiusmod dolor consectetur amet nisi labore ad.
                        </Text>
                        <Text style={{paddingTop: 30, lineHeight: 22, fontSize: 14, color: "#05050F"}}>
                            Ex sunt duis enim incididunt culpa veniam tempor officia. Fugiat consequat est ea elit elit Lorem et sunt minim. Laboris dolor deserunt amet exercitation aute elit.
                        </Text>
                        <Text style={{paddingTop: 30, lineHeight: 22, fontSize: 14, color: "#05050F"}}>
                            Velit mollit ad esse et aliqua. Tempor aliqua pariatur enim esse consequat. Ullamco voluptate deserunt exercitation culpa exercitation ex laboris minim quis adipisicing. Minim consectetur non cillum irure duis enim.
                        </Text>
                        <Text style={{paddingTop: 30, lineHeight: 22, fontSize: 14, color: "#05050F"}}>
                            Aliqua irure nostrud nulla magna culpa et excepteur duis enim laborum aute in. Nisi ex tempor esse exercitation. Officia aliqua minim ad ex laboris.
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

export default connect(mapStateToProps, {updateUserSetting, settingUpdate, toggleCreatePinModal, toggleChangePinModal})(About); 