import React, { Component } from 'react';
import { Scene, Router, Actions, Modal } from 'react-native-router-flux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import {logo, WHITE, YELLOW, LIGHT_PURPLE, LIGHT_GRAY, ARROW_COLOR } from './style';
import {Image, View, Text, TouchableOpacity, Platform, Dimensions, Linking} from 'react-native';
import {hasReceivedNotification, getCategories, isPushNotification, validateToken, setNotificationData } from './redux/actions';
import { calculateOpacity } from './Helper';
import PushService from './PushService';
import Location from './components/Containers/Location/Location';
import { MENUICON } from './style/images';
import Menu from './components/Menu';
import { SITE_COLOR } from './style/colors';
import SelectCity from './components/Containers/Location/SelectCity';
import SelectArea from './components/Containers/Location/SelectArea';
import Restaurants from './components/Containers/Restaurant/Restaurants';

const FRIEND_REQUEST_ACCEPTED = "friend_request_accepted";
const FRIEND_REQUEST_RECEIVED = "friend_request_received";

class TabIcon extends Component {
    render() {
   
      return (
        <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
          <MaterialCommunityIcon color={this.props.tintColor != '#ffffff' ? '#ffffff85': this.props.tintColor} name={this.props.iconName || "circle"} size={30}/>
          
        </View>
      );
    }
  }

class RouterComponent extends Component {
    constructor(props) {
        super();
        // this.handleOpenURL = this.handleOpenURL.bind(this);
    }

    AppLogo = () => {
        return (
            <View style={{flexDirection: 'row', flex: 1}}>
                <Image
                    source={logo}
                    style={{ width: 35, height: 35, marginLeft: 10 }}
                />
                <View style={{justifyContent: 'center'}}>
                    <Text style={{fontSize: 22, marginLeft: 15, color: WHITE, fontWeight: 'bold'}}>Predict<Text style={{color: WHITE}}>pal</Text></Text>
                </View>
            </View>

        );
    }


    renderRightButton = () => {
        return (
            <View style={{flexDirection: 'row', paddingRight: 10}}>
                <TouchableOpacity>
                    <MaterialCommunityIcon color={WHITE} name="magnify" size={25} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.getCategories()} style={{marginLeft: 15}}>
                    <MaterialCommunityIcon color={WHITE} name="history" size={25} />
                </TouchableOpacity>
            </View>
        );
    }

    handleOpenURL(event) {
        
        if(event.url.includes('password/reset')){
            let array = event.url.split('/');
            let resetToken= array[array.length - 1];
            Actions.reset('resetPassword',{resetToken});
        }
        
      }

    componentDidMount(){
       
        PushService.setCallbacks((device) => console.log(device), 
            (notification) => {
                console.log(notification);
            if(notification.userInteraction){
                
                if(notification.type){
                    const {notification_data} = notification;
                    switch(notification.type){
                        case FRIEND_REQUEST_ACCEPTED:
                            Actions.friends();
                            break;

                        case FRIEND_REQUEST_RECEIVED:
                            
                            let data = JSON.parse(notification_data);
                            this.props.setNotificationData({requestId: data.id, friend: data.friend});
                            this.props.hasReceivedNotification(true);
                            
                            break;

                        default:
                            
                            Actions.friends();
                    }
                }
            }
        });
    }

    render() {
        const {width} = Dimensions.get('screen');
        return (
            <Router uriPrefix={'https://predictpal.com'}>
              
                <Scene key="root" hideNavBar>
                    <Scene
                        drawer
                        drawerIcon={<MaterialCommunityIcon style={{paddingTop: 50}} name="menu" size={40} color={SITE_COLOR}/>}
                        key={"location"}
                        contentComponent={Menu}
                        drawerWidth={width * 0.77}
                    >
                        <Scene
                            key={'location'}
                            title={'Delivery Location'}
                            titleStyle={{fontWeight: 'bold', paddingTop: 50,  color: SITE_COLOR}}
                            navTransparent={true}
                            navigationBarStyle={{ backgroundColor: 'transparent', elevation: 0}}
                            component={Location}
                        />

                    </Scene>
                    <Scene
                        key={'selectCity'}
                        title={'City'}
                        back={true}
                        hideNavBar={false}
                        backButtonTintColor={SITE_COLOR}
                        titleStyle={{color: SITE_COLOR}}
                        component={SelectCity}
                    />
                    <Scene
                        key={'selectArea'}
                        title={'Area'}
                        back={true}
                        hideNavBar={false}
                        backButtonTintColor={SITE_COLOR}
                        titleStyle={{color: SITE_COLOR}}
                        component={SelectArea}
                    />
                    <Scene
                        key={'restaurants'}
                        title={'Restaurants'}
                        backButtonTintColor={'#585555'}
                        titleStyle={{fontWeight: 'normal', color: '#585555'}}
                        navigationBarStyle={{elevation: 0}}
                        back={true}
                        initial
                        hideNavBar={false}
                        component={Restaurants}
                    />
                </Scene>

            </Router>

        );
    }
}

const styles = {
    navigationBarTitleImageStyle: {
        width: 150,
        height: 40,
        flex: 1,
        alignSelf: 'center'
    },

    commonNavigationBarStyle: {
        elevation: 0,
        borderBottomWidth: 0.8,
        borderBottomColor: '#C4C4C4'
    },

    titleStyle: {
        textAlign: 'center',
        fontWeight: 'normal',
        marginLeft: -15,
        flex: 1,
        color: SITE_COLOR
    }

}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps, { getCategories, validateToken, isPushNotification, hasReceivedNotification, setNotificationData})(RouterComponent);
