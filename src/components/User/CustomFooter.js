import React, { Component } from 'react';
import { Content, Button, Footer, FooterTab} from 'native-base';
import { ImageBackground, View, ScrollView, Image, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {switchView} from './../../redux/actions';

import { GRAY, SITE_COLOR, YELLOW, WHITE, avatar, LIGHT_GRAY, GREEN, LIGHT_GREEN } from './../../style';

class CustomFooter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {

        return (
            <Footer style={{borderTopWidth: 0}}>
                <FooterTab style={{backgroundColor: '#2B2D7B'}}>
                    <Button onPress={() => this.props.switchView(HOME)}>
                        <MaterialCommunityIcon size={30} color={'#AEB4C8'} name="arrow-all" />
                    </Button>
                    <Button onPress={() => this.props.switchView(NOTIFICATION)}>
                        <MaterialCommunityIcon size={30} color={'#AEB4C8'} name="bell-outline" />
                    </Button>
                    <Button onPress={() => this.props.switchView(WALLET)}>
                        <MaterialCommunityIcon size={30} color={'#AEB4C8'} active name="wallet" />
                    </Button>
                    <Button onPress={() => this.props.switchView(PROFILE)}>
                        <MaterialCommunityIcon size={30} color={'#AEB4C8'} name="account-outline" />
                    </Button>
                </FooterTab>
            </Footer>
        );


    }
}

const HOME = 1;

const NOTIFICATION = 2;

const WALLET = 3;

const PROFILE = 4;

const styles = {

}

const mapStateToProps = (state) => {
    const {activeView} = state.view;
    return { activeView };
};

export default connect(mapStateToProps, {switchView })(CustomFooter);