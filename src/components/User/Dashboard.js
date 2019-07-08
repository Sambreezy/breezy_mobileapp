import React, { Component } from 'react';
import { Container, Text, Button, Tab, Tabs, TabHeading, Badge, Thumbnail, ScrollableTab, Footer, FooterTab, Icon } from 'native-base';
import { Image, View, TouchableOpacity, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { BoxInput, Header } from './../Reusables';
import { switchView } from './../../redux/actions';
import CustomFooter from './CustomFooter';
import Games from './Games';
import Home from './Home';
import Notification from './Notification';
import Wallet from './Wallet';
import Profile from './Profile';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }
    renderView(){
        switch(this.props.activeView){
            case HOME:
                return <Home/>;

            case NOTIFICATION:
                return <Notification/>;

            case WALLET:
                return <Wallet/>;

            case PROFILE:
                return <Profile/>;
        }
    }


    render() {

        return (
           <View style={{flex: 1}}>
                {this.renderView()}
               <CustomFooter/>
           </View>
        );


    }
}

const styles = {
  
}

const HOME = 1;

const NOTIFICATION = 2;

const WALLET = 3;

const PROFILE = 4;




const mapStateToProps = (state) => {
   const {activeView} = state.view;
    return {activeView };
};

export default connect(mapStateToProps, { switchView})(Dashboard);

