import React, { Component } from 'react';
import { Modal, ScrollView, View, ImageBackground, StatusBar, TouchableOpacity, Text, Image} from 'react-native';
import { connect } from 'react-redux';
import {Item, Input, Picker, Icon, Textarea, Thumbnail} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatMoney, calculateOpacity } from '../../Helper';
import {createGame, clearCreateGameError, createGameUpdate} from './../../redux/actions';
import moment from 'moment';
import { Card, Spinner } from '../Reusables';
import { PINK, LIGHT_GRAY, WHITE, SITE_COLOR, avatar, GAME, GAMEBG, SIDEBCOLOR, SIDEAIMAGE, SIDEBIMAGE, GRAY, SPORTS } from '../../style';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-picker';
import Carousel from './Carousel';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

class ChooseCategory extends Component { 
    
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
            private: false
        }
    }

    _showStartTimePicker = () => this.setState({ isStartTimeVisible: true });

    _hideStartTimePicker = () => this.setState({ isStartTimeVisible: false });

    _handleStartTimePicked = (date) => {
        
        this.setState({start_time: moment(date).format('YYYY-MM-DD HH:mm:ss')});
        this._hideStartTimePicker();
    };

    _showStakeEndTimePicker = () => this.setState({ isStakeEndTimeVisible: true });

    _hideStakeEndTimePicker = () => this.setState({ isStakeEndTimeVisible: false });

    _handleStakeEndTimePicked = (date) => {
        this.setState({stake_end_time: moment(date).format('YYYY-MM-DD HH:mm:ss')});
        
        this._hideStakeEndTimePicker();
    };

    _showCompletionTimePicker = () => this.setState({ isCompletionTimeVisible: true });

    _hideCompletionTimePicker = () => this.setState({ isCompletionTimeVisible: false });

    _handleCompletionTimePicked = (date) => {
        
        this.setState({completion_time: moment(date).format('YYYY-MM-DD HH:mm:ss')});
        this._hideCompletionTimePicker();
    };

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
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log(source);
                let sides = {...this.state.sides};
                sides[0].icon = 'data:image/jpeg;base64,' + response.data;
                this.setState({sides});
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
            //   const source = { uri: response.uri };
              const source = { uri: 'data:image/jpeg;base64,' + response.data };
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              let sides = {...this.state.sides};
              sides[1].icon = 'data:image/jpeg;base64,' + response.data;
              this.setState({sides});
            }
          });
    }

    setSideAValue(key, value){
        let sides = {...this.state.sides};
        sides[0][key] = value;
        this.setState({sides});
    }

    setSideBValue(key, value){
        let sides = {...this.state.sides};
        sides[1][key] = value;
        this.setState({sides});
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
      
        
    }

    componentWillUnmount(){
        
    }

    renderCategory(){
        const {creatingGame} = this.props;
        let groupedCategories = _.chunk(this.props.categories, 3);
        let allCategories = [];
        for(let i = 0; i < groupedCategories.length; i++){
            let tempCategories = [];
            for(let j = 0;  j < groupedCategories[i].length; j++){
                let item = groupedCategories[i][j]
                tempCategories.push(
                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.createGameUpdate({prop: 'category', value: item.id})} key={Math.random().toString(36).substring(7)} style={{alignSelf: 'center', marginTop: 45}}>
                    
                        <ImageBackground
                            source={item.icon ? {uri: item.icon} : SPORTS}
                            style={{width: 80, height: 80}}
                            imageStyle={{ borderRadius: 100}}
                        >
                            {creatingGame.category == item.id ? 
                            <View style={{padding: 20, justifyContent:'center', alignItems: 'center', borderRadius: 100, flex:1, backgroundColor: PINK+calculateOpacity(80)}}>
                                <MaterialCommunityIcons name="check" color={WHITE} size={25} />
                            </View>
                            : null}
                        </ImageBackground>
                        <Text style={{color: WHITE, textAlign: 'center', marginTop: 10}}>{item.name}</Text>
                    </TouchableOpacity>
                    
                );
            }
            if(tempCategories.length < 3){
                for(let j = 0;  j < 3 - tempCategories.length; j++){
                    let item = groupedCategories[i][j]
                    tempCategories.push(
                        <TouchableOpacity disabled={true} key={Math.random().toString(36).substring(7)} style={{alignSelf: 'center', opacity: 0, marginTop: 25}}>
                            <ImageBackground
                                source={item.icon ? {uri: item.icon} : SPORTS}
                                style={{width: 80, height: 80}}
                                imageStyle={{ borderRadius: 100}}
                            >
                            { creatingGame == item.id ? 
                                <View style={{padding: 20, justifyContent:'center', alignItems: 'center', borderRadius: 100, flex:1, backgroundColor: PINK+calculateOpacity(70)}}>
                                    <MaterialCommunityIcons name="check" color={WHITE} size={25} />
                                </View>
                                : null}
                            </ImageBackground>
                            <Text style={{color: WHITE, textAlign: 'center', marginTop: 10}}>{item.name}</Text>
                        </TouchableOpacity>
                        
                    );
                }
            }
            allCategories.push(
                <View style={{flexDirection: 'row', marginLeft: 20, marginRight: 20, justifyContent: 'space-between'}} key={Math.random().toString(36).substring(7)}>
                    {tempCategories}
                </View>
            )
        }
        return allCategories;
    }

    render() {
        const {createGameError, creatingGame} = this.props;
        return (
            <ImageBackground source={GAMEBG} style={{width: null, flex: 1}}>
                
                <ScrollView 
                    contentContainerStyle={{flexGrow: 1}}
                    style={{ flex: 1}}>
                    <View style={{alignSelf: 'center', marginTop: 40}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontWeight: 'bold', fontSize: 25}}>Choose game category</Text>
                        <Text style={{textAlign: 'center', color: WHITE+calculateOpacity(80), marginTop: 5}}>Please select a game category that</Text>
                        <Text style={{textAlign: 'center', color: WHITE+calculateOpacity(80), marginTop: 5}}>best describes this game</Text>
                    </View>
                    {this.renderCategory()}
                </ScrollView>
                <Carousel nextDisabled={creatingGame.category == ''} onBackPress={() => Actions.pop()} onFrontPress={() => Actions.addStake()} hasBack={true} hasNext={true} current={2} />
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
    const {creatingGame, change} = state.game;
    const {name, username, user} = state.auth;
    
    return {categories,createGameError, creatingGame, change, user, createGameLoading, name, username};
};

export default connect(mapStateToProps,{ createGame, clearCreateGameError, createGameUpdate})(ChooseCategory);

