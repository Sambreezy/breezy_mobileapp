import React, { Component } from 'react';
import { Modal, ScrollView, View, ImageBackground, StatusBar, Alert, TouchableOpacity, Text, Image} from 'react-native';
import { connect } from 'react-redux';
import {Item, Input, Picker, Icon, Textarea, Thumbnail} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatMoney, calculateOpacity } from '../../Helper';
import {createGame, clearCreateGameError, createGameUpdate, gameUpdate} from './../../redux/actions';
import moment from 'moment';
import { Card, Spinner } from '../Reusables';
import { PINK, LIGHT_GRAY, WHITE, SITE_COLOR, avatar, GAME, GAMEBG, SIDEBCOLOR, SIDEAIMAGE, SIDEBIMAGE, GRAY } from '../../style';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-picker';
import Carousel from './Carousel';
import { Actions } from 'react-native-router-flux';

class Start extends Component { 
    
    constructor() {
        super();
        this.state = {
            category: '',
            description: '',
            start_time: 'Start Time',
            stake_end_time: 'Stake End Time',
            completion_time: 'Completion Time',
            sides: [{name: '', description: '', icon: null}, {name: '', description: '', icon: null}],
            isStartTimeVisible: false,
            isStakeEndTimeVisible: false,
            isCompletionTimeVisible: false,
            private: false,
            tried: false
        }
    }

    selectSideAIcon(){
        const options = {
            title: 'Select Side A Icon',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            cropping: true,
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };

        ImagePicker.showImagePicker(options, (response) => {
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
            //   const source = { uri: response.uri };
              const source = { uri: 'data:image/jpeg;base64,' + response.data };
             
                let sides = {...this.props.creatingGame.sides};
                sides[0].icon = 'data:image/jpeg;base64,' + response.data;
                this.props.createGameUpdate({prop: 'sides', value: sides});
            }
          });
    }

    selectSideBIcon(){
        const options = {
            title: 'Select Side B Icon',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            cropping: true,
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              let sides = {...this.props.creatingGame.sides};
              sides[1].icon = 'data:image/jpeg;base64,' + response.data;
              this.props.createGameUpdate({prop: 'sides', value: sides});
            }
          });
    }

    setSideAValue(key, value){
        let sides = {...this.props.creatingGame.sides};
        sides[0][key] = value;
        this.props.createGameUpdate({prop: 'sides', value: sides});
    }

    setSideBValue(key, value){
        let sides = {...this.props.creatingGame.sides};
        sides[1][key] = value;
        this.props.createGameUpdate({prop: 'sides', value: sides});
    }

    createMyGame(){
        this.props.createGame(this.state);
    }


    renderProfileUpdateError(){
        
        if(this.props.profileUpdateError.length > 0){
            
            setTimeout(() => this.props.clearProfileUpdateError(), 3000);
            
                return (
                    <View style={{backgroundColor: PINK, justifyContent: 'center', position: 'absolute', left: 0, zIndex: 1000, right: 0, height: 45}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 16}}>{this.props.profileUpdateError}</Text>
                    </View>
                );
            
            
        }
    }

    componentWillMount(){
       
        if(this.props.edit){
            this.props.gameUpdate({prop: 'edit', value: true});
        }else{
            this.props.gameUpdate({prop: 'edit', value: false});
            
            this.props.gameUpdate({prop: 'creatingGame', value: {
                category: '',
                description: '',
                minimum_stake: '',
                start_time: '',
                stake_end_time: '',
                completion_time: '',
                sides: [{name: '', description: '', icon: null}, {name: '', description: '', icon: null}],
            }});
        }

    }

    componentWillReceiveProps(nextProps){
        const {sides, category, description, stake_end_time, start_time, completion_time, minimum_stake} = nextProps.mySingleGame;

        if(nextProps.mySingleGame.category && !this.state.tried && this.props.edit){
            this.props.gameUpdate({prop: 'creatingGame', value: {
                category: category.id+"",
                description,
                start_time,
                stake_end_time,
                completion_time,
                minimum_stake,
                sides: sides.length == 0 ? [{name: '', description: '', icon: null}, {name: '', description: '', icon: null}] : sides
            }});
            this.setState({tried: true});
        }
        
    }

    continue(){
        const {creatingGame} = this.props;
        if(creatingGame.sides[0].name.trim().length == 0 || creatingGame.sides[1].name.trim().length == 0){
            Alert.alert(
                'Oops!',
                'Enter names of both teams', [ {
                    text: 'OK',
                },], {
                    cancelable: false
                }
            )
            return;
        }
        Actions.chooseCategory();
    }

    render() {
        const {createGameError, creatingGame, mySingleGameLoading} = this.props;
        return (
            <ImageBackground source={GAMEBG} style={{width: null, flex: 1}}>
                <TouchableOpacity onPress={() => Actions.pop()} style={{margin: 15}}>
                    <MaterialCommunityIcons  name="arrow-left" color={WHITE} size={25} />
                </TouchableOpacity>
                {mySingleGameLoading ? <Spinner/> : null}
                <ScrollView 
                    contentContainerStyle={{flexGrow: 1}}
                    style={{ flex: 1}}>
                    <View style={{alignSelf: 'center'}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontWeight: 'bold', fontSize: 25}}>Earn up to 30% cash!</Text>
                        <Text style={{textAlign: 'center', color: WHITE+calculateOpacity(80), marginTop: 5}}>Make money from every game you create.</Text>
                        <Text style={{textAlign: 'center', color: WHITE+calculateOpacity(80), marginTop: 5}}>It's easy, fast and fun!</Text>
                    </View>

                    <View style={{marginTop: 30, flexDirection: 'row'}}>
                        <View style={{flex: 1, backgroundColor: SITE_COLOR, padding: 10}}>
                            <Text style={{textAlign: 'center', color: WHITE}}>Side A</Text>
                        </View>
                        <View style={{flex: 1, backgroundColor: SIDEBCOLOR, padding: 10}}>
                            <Text style={{textAlign: 'center', color: SITE_COLOR}}>Side B</Text>
                        </View>
                    </View>

                    <View style={{marginTop: 50, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-around'}}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.selectSideAIcon()}>
                            <Thumbnail
                                source={creatingGame.sides[0].icon ? {uri: creatingGame.sides[0].icon} : SIDEAIMAGE}
                                
                                scaleX={2} scaleY={2}
                            />
                        </TouchableOpacity>
                        
                        <View style={{justifyContent: 'center'}}>
                            <Text style={{textAlign: 'center', fontSize: 18, color: WHITE, fontWeight: 'bold'}}>vs</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.selectSideBIcon()}>
                            <Thumbnail
                                source={creatingGame.sides[1].icon ? {uri: creatingGame.sides[1].icon} : SIDEBIMAGE}
                                
                                scaleX={2} scaleY={2}
                            />
                        </TouchableOpacity>
                        
                    </View>
                    <View style={{marginTop: 30, paddingTop: 5, paddingBottom: 5, backgroundColor: WHITE, flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Input 
                            style={{textAlign: 'center', height: 40, fontSize: 15}} 
                            keyboardType={'numeric'}
                            onChangeText={(value) => this.setSideAValue('name', value)}
                            value={creatingGame.sides[0].name}
                            placeholderTextColor={'#d0cdcd'}
                            
                            placeholder={'Enter Name'}
                        />

                        <Input 
                            style={{textAlign: 'center',height: 40, borderLeftWidth: 1, borderColor: GRAY, fontSize: 15}} 
                            keyboardType={'numeric'}
                            onChangeText={(value) => this.setSideBValue('name', value)}
                            value={creatingGame.sides[1].name}
                            placeholderTextColor={'#d0cdcd'}
                            
                            placeholder={'Enter Name'}
                        />
                    </View>

                    <View style={{marginTop: 15, padding: 15}}>
                        <Text style={{textAlign: 'center', color: WHITE+calculateOpacity(80), fontSize: 12, lineHeight: 17, marginTop: 5}}>
                            A game consists of two sides e.g Obama vs Trump. Upload proper images and enter names to represent this two sides for other users to make predictions on.
                        </Text>
                    </View>

                    <View style={{marginLeft: 25, marginRight: 25}}>
                        <TouchableOpacity 
                            onPress={() => this.continue()}
                            style={{borderRadius: 25, marginTop: 20, padding: 13, backgroundColor: PINK}}>
                            <Text style={{textAlign: 'center', color: WHITE}}>CONTINUE</Text>
                        </TouchableOpacity>
                    </View>
                    
                </ScrollView>
                <Carousel current={1} />
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
    const {createGameLoading, mySingleGameLoading} = state.loading;
    const {categories} = state.category;
    const {createGameError} = state.errors;
    const {creatingGame, change, mySingleGame} = state.game;
    const {name, username, user} = state.auth;
    
    return {categories,createGameError, mySingleGameLoading, mySingleGame, change, user, creatingGame, createGameLoading, name, username};
};

export default connect(mapStateToProps,{ createGame, clearCreateGameError, gameUpdate, createGameUpdate})(Start);

