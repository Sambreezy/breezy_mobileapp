import React, { Component } from 'react';
import { Modal, ScrollView, View, ImageBackground, StatusBar, TouchableOpacity, Text, Image} from 'react-native';
import { connect } from 'react-redux';
import {Item, Input, Picker, Icon, Textarea, Thumbnail} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatMoney, calculateOpacity } from '../../Helper';
import {createGame, clearCreateGameError, createGameUpdate} from './../../redux/actions';
import moment from 'moment';
import { Card, Spinner } from '../Reusables';
import { PINK, LIGHT_GRAY, WHITE, SITE_COLOR, avatar, GAME, GAMEBG, SIDEBCOLOR, SIDEAIMAGE, SIDEBIMAGE, GRAY } from '../../style';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-picker';
import Carousel from './Carousel';
import { Actions } from 'react-native-router-flux';

class AddStake extends Component { 
    
    constructor() {
        super();
        this.state = {

        }
    }

    createMyGame(){
        this.props.createGame(this.state);
    }

    render() {
        const {createGameError, creatingGame} = this.props;
        return (
            <ImageBackground source={GAMEBG} style={{width: null, flex: 1}}>
                
                <ScrollView 
                    contentContainerStyle={{flexGrow: 1}}
                    style={{ flex: 1}}>
                    <View style={{alignSelf: 'center', marginTop: 30}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontWeight: 'bold', fontSize: 25}}>Almost there...</Text>
                        <Text style={{textAlign: 'center', color: WHITE+calculateOpacity(80), marginTop: 5}}>Enter short description, minimum and </Text>
                        <Text style={{textAlign: 'center', color: WHITE+calculateOpacity(80), marginTop: 5}}>maximum stakes for this game</Text>
                    </View>

                    <View style={{marginTop: 20, paddingTop: 5, marginLeft: 25, marginRight: 25, paddingBottom: 5}}>
                       
                        <Item rounded style={{backgroundColor: WHITE, marginTop: 25, height: 55}}>
                            <Input 
                                style={{textAlign: 'left', height: 50, fontSize: 15}} 
                                keyboardType={'numeric'}
                                onChangeText={(value) => this.props.createGameUpdate({prop: 'minimum_stake', value})}
                                value={creatingGame.minimum_stake}
                                placeholderTextColor={'#d0cdcd'}
                                placeholder={' Minimum Stake'}
                            />
                        </Item>

                        <Item rounded style={{backgroundColor: WHITE, marginTop: 25, height: 55}}>
                            <Input 
                                style={{textAlign: 'left', height: 50, fontSize: 15}} 
                                onChangeText={(value) => this.props.createGameUpdate({prop: 'description', value})}
                                value={creatingGame.description}
                                placeholderTextColor={'#d0cdcd'}
                                placeholder={'Description'}
                                maxLength={120}
                            />
                        </Item>
                        <Text style={{ marginTop: 5, marginRight: 15, textAlign: 'right', color: WHITE+calculateOpacity(80)}}>{creatingGame.description ? creatingGame.description.length : "".length}/120</Text>
                    </View>

                </ScrollView>
                <Carousel 
                    nextDisabled={creatingGame.minimum_stake == ''}
                    onBackPress={() => Actions.pop()} 
                    onFrontPress={() => Actions.chooseTime()} 
                    hasBack={true} 
                    hasNext={true} 
                    current={3} 
                />
             </ImageBackground>
        );
    }
}


const styles = {

    cardStyle:{
        height: 320,
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 5,
        flex: 0,
        justifyContent: 'space-around'
    },

    detailViewStyle:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 20
    }
}

const mapStateToProps = (state) => {
    const {createGameLoading} = state.loading;
    const {categories} = state.category;
    const {createGameError} = state.errors;
    const {name, username, user} = state.auth;
    const {creatingGame, change} = state.game;
    return {categories,createGameError, creatingGame, change, user, createGameLoading, name, username};
};

export default connect(mapStateToProps,{ createGame, clearCreateGameError, createGameUpdate})(AddStake);

