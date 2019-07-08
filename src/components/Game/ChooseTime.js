import React, { Component } from 'react';
import { Modal, ScrollView, View, ImageBackground, StatusBar, TouchableOpacity, Text, Image} from 'react-native';
import { connect } from 'react-redux';
import {Item, Input, Picker, Icon, Textarea, Thumbnail} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatMoney, calculateOpacity } from '../../Helper';
import {createGame, clearCreateGameError, editGame, createGameUpdate} from './../../redux/actions';
import moment from 'moment';
import { Card, Spinner } from '../Reusables';
import { PINK, LIGHT_GRAY, WHITE, SITE_COLOR, avatar, GAME, GAMEBG, SIDEBCOLOR, SIDEAIMAGE, SIDEBIMAGE, GRAY } from '../../style';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-picker';
import Carousel from './Carousel';
import { Actions } from 'react-native-router-flux';

class ChooseTime extends Component { 
    
    constructor() {
        super();
        this.state = {
            isStartTimeVisible: false,
            isStakeEndTimeVisible: false,
            isCompletionTimeVisible: false,
        }
    }

    _showStartTimePicker = () => this.setState({ isStartTimeVisible: true });

    _hideStartTimePicker = () => this.setState({ isStartTimeVisible: false });

    _handleStartTimePicked = (date) => {
        
        this.props.createGameUpdate({prop: 'start_time', value: moment(date).format('YYYY-MM-DD HH:mm:ss')});
        this._hideStartTimePicker();
    };

    _showStakeEndTimePicker = () => this.setState({ isStakeEndTimeVisible: true });

    _hideStakeEndTimePicker = () => this.setState({ isStakeEndTimeVisible: false });

    _handleStakeEndTimePicked = (date) => {
        this.props.createGameUpdate({prop: 'stake_end_time', value:moment(date).format('YYYY-MM-DD HH:mm:ss')});
        
        this._hideStakeEndTimePicker();
    };

    _showCompletionTimePicker = () => this.setState({ isCompletionTimeVisible: true });

    _hideCompletionTimePicker = () => this.setState({ isCompletionTimeVisible: false });

    _handleCompletionTimePicked = (date) => {
        
        this.props.createGameUpdate({prop: 'completion_time', value:moment(date).format('YYYY-MM-DD HH:mm:ss')});
        this._hideCompletionTimePicker();
    };


    render() {
        const {createGameError, creatingGame, edit, mySingleGame, createGameLoading} = this.props;
        return (
            <ImageBackground source={GAMEBG} style={{width: null, flex: 1}}>
                {createGameLoading ? <Spinner/> : null}
                <ScrollView 
                    contentContainerStyle={{flexGrow: 1}}
                    style={{ flex: 1}}>
                    <View style={{alignSelf: 'center', marginTop: 30}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontWeight: 'bold', fontSize: 25}}>Set date and time</Text>
                        <Text style={{textAlign: 'center', color: WHITE+calculateOpacity(80), marginTop: 5}}>Set game/stake date and time. This is very </Text>
                        <Text style={{textAlign: 'center', color: WHITE+calculateOpacity(80), marginTop: 5}}>important to know when your gam starts.</Text>
                    </View>
                        <DateTimePicker
                            isVisible={this.state.isStartTimeVisible}
                            onConfirm={this._handleStartTimePicked}
                            onCancel={this._hideStartTimePicker}
                            mode={'datetime'}
                        />
                        <DateTimePicker
                            isVisible={this.state.isStakeEndTimeVisible}
                            onConfirm={this._handleStakeEndTimePicked}
                            onCancel={this._hideStakeEndTimePicker}
                            mode={'datetime'}
                        />
                        <DateTimePicker
                            isVisible={this.state.isCompletionTimeVisible}
                            onConfirm={this._handleCompletionTimePicked}
                            onCancel={this._hideCompletionTimePicker}
                            mode={'datetime'}
                        />

                    <View style={{marginTop: 20, paddingTop: 5, marginLeft: 25, marginRight: 25, paddingBottom: 5}}>
                        
                        <Item rounded style={{backgroundColor: WHITE, paddingRight: 15, marginTop: 25, height: 55}}>
                            <Input 
                                style={{textAlign: 'left', height: 50, fontSize: 15}} 
                                
                                value={creatingGame.start_time}
                                placeholderTextColor={'#C4C4C4'}
                                disabled
                                placeholder={' Game start time'}
                            />
                            <TouchableOpacity onPress={() => this.setState({isStartTimeVisible: true})}>
                                <MaterialCommunityIcons name="calendar-blank" size={30} />
                            </TouchableOpacity>
                            
                        </Item>
                        {createGameError.hasOwnProperty('start_time') ?
                            <Text style={{color: 'red', textAlign: 'right', paddingRight: 10, fontSize: 13, marginTop: 3}}>{createGameError['start_time'][0]}</Text>
                        : null
                        }

                        <Item rounded style={{backgroundColor: WHITE, paddingRight: 15, marginTop: 25, height: 55}}>
                            <Input 
                                style={{textAlign: 'left', height: 50, fontSize: 15}} 
                                keyboardType={'numeric'}
                                disabled
                                value={creatingGame.stake_end_time}
                                placeholderTextColor={'#C4C4C4'}
                                
                                placeholder={' Stake end time'}
                            />
                            <TouchableOpacity onPress={() => this.setState({isStakeEndTimeVisible: true})}>
                                <MaterialCommunityIcons name="calendar-blank" size={30} />
                            </TouchableOpacity>
                            
                        </Item>
                        {createGameError.hasOwnProperty('stake_end_time') ?
                            <Text style={{color: 'red', textAlign: 'right', paddingRight: 10, fontSize: 13, marginTop: 3}}>{createGameError['stake_end_time'][0]}</Text>
                        : null
                        }

                        <Item rounded style={{backgroundColor: WHITE, paddingRight: 15, marginTop: 25, height: 55}}>
                            <Input 
                                style={{textAlign: 'left', height: 50, fontSize: 15}} 
                                keyboardType={'numeric'}
                                
                                value={creatingGame.completion_time}
                                placeholderTextColor={'#C4C4C4'}
                                disabled
                                placeholder={' Game end time'}
                            />
                            <TouchableOpacity onPress={() => this.setState({isCompletionTimeVisible: true})}>
                                <MaterialCommunityIcons name="calendar-blank" size={30} />
                            </TouchableOpacity>
                            
                        </Item>
                        {createGameError.hasOwnProperty('completion_time') ?
                            <Text style={{color: 'red', textAlign: 'right', paddingRight: 10, fontSize: 13, marginTop: 3}}>{createGameError['completion_time'][0]}</Text>
                        : null
                        }

                    </View>

                </ScrollView>
                <Carousel 
                    nextDisabled={creatingGame.stake_end_time == '' || creatingGame.start_time == '' || creatingGame.completion_time == ''}
                    nextText={edit ? 'SAVE':'DONE'} 
                    onBackPress={() => Actions.pop()} 
                    onFrontPress={() => edit ? this.props.editGame(this.props.mySingleGame.id, creatingGame) : this.props.createGame(creatingGame)} 
                    hasBack={true} 
                    hasNext={true} 
                    current={4} 
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
    const {change, creatingGame, edit, mySingleGame} = state.game;
    return {categories,createGameError, mySingleGame, change, edit, creatingGame, user, createGameLoading, name, username};
};

export default connect(mapStateToProps,{ createGame, editGame, clearCreateGameError, createGameUpdate})(ChooseTime);

