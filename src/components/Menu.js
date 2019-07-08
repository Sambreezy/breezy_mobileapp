import React, { Component } from 'react';
import { View, ScrollView, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Content, List, ListItem, Thumbnail } from 'native-base';
import { logoutUser, } from './../redux/actions';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Text, Hr } from './../components/Reusables';
import { logo, avatar, backdrop } from './../style';
import { AVATAR, TRIANGLE, LOCATION, STORE, PACKAGES, WALLET, PROFILE, FAQ, PRIVACY, TOS } from '../style/images';
import { SITE_COLOR, WHITE, GRAY } from '../style/colors';
import { MenuSection } from './Presenters/Menu/MenuSection';
import { calculateOpacity } from '../Helper';
import { NUNITO_SEMIBOLD, NUNITO_BOLD } from '../style/font';

class Menu extends Component {
    constructor() {
        super();
        this.state = {
            theme: false
        }
    }

    render() {

        return (

            <ScrollView style={{ marginBottom: 15 }}>
                <View style={{backgroundColor: SITE_COLOR}}>
                    <View style={{flexDirection: 'row', paddingLeft: 15, paddingRight: 15, justifyContent: 'space-between'}}>
                        <View style={{justifyContent: 'center', paddingLeft: 20}}>
                            <Image
                                style={{width: 70, height: 70, borderRadius: 50}}
                                resizeMode={'contain'}
                                source={AVATAR}
                            />
                        </View>
                        <Image
                            source={TRIANGLE}
                            style={{width: 160, height: 160}}
                            resizeMode={'contain'}
                        />
                    </View>
                    <View style={{paddingLeft: 20, paddingBottom: 15}}>
                        <Text style={{fontSize: 19, color: WHITE, fontFamily: NUNITO_SEMIBOLD}}>Chibuzor Miller</Text>
                        <Text style={{fontSize: 14, color: WHITE, fontFamily: NUNITO_BOLD}}>example@gmail.com</Text>
                    </View>
                </View>
                <View style={{paddingTop: 15, paddingLeft: 23}}>
                    <MenuSection onPress={() => Actions.reset('location')} icon={LOCATION} title={'Your Location'} color={TEXTCOLOR}/>
                    <MenuSection icon={STORE} title={'Food Store'} color={TEXTCOLOR}/>
                    <MenuSection icon={PACKAGES} title={'Food Packages'} color={TEXTCOLOR}/>
                    
                    <Hr style={{marginTop: 25, marginBottom: 25, marginLeft: 40,}}/>

                    <MenuSection icon={PROFILE} title={'Profile'} color={TEXTCOLOR}/>
                    <MenuSection icon={WALLET} title={'Wallet'} color={TEXTCOLOR}/>
                    
                    <Hr style={{marginTop: 25, marginBottom: 25, marginLeft: 40,}}/>

                    <MenuSection icon={FAQ} title={'FAQ'} color={TEXTCOLOR}/>
                    <MenuSection icon={PRIVACY} title={'Privacy'} color={TEXTCOLOR}/>
                    <MenuSection icon={TOS} title={'Terms & Conditions'} color={TEXTCOLOR}/>
                </View>
            </ScrollView>
        );
    }
}

const TEXTCOLOR = '#585555';

const styles = {
    backgroundImageStyle: {
        width: '100%',
        height: 400,
        backgroundColor: 'transparent',
        opacity: 1,
        marginBottom: -100

    },

    listItemStyle: {
        borderBottomWidth: 0,
        paddingLeft: 15,
        marginLeft: 0
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
    }
}

const mapStateToProps = (state) => {

    return {}
};

export default connect(mapStateToProps, { logoutUser })(Menu); 