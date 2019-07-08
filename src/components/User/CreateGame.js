import React, { Component } from 'react';
import { Modal, ScrollView, View, TouchableOpacity, Text, Image} from 'react-native';
import { connect } from 'react-redux';
import {Item, Input, Picker, Icon, Textarea, Thumbnail} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatMoney } from '../../Helper';
import {createGame, clearCreateGameError} from './../../redux/actions';
import moment from 'moment';
import { Card, Spinner } from '../Reusables';
import { PINK, LIGHT_GRAY, SITE_COLOR, avatar, GAME } from '../../style';
import { WHITE } from '../Reusables/styles';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-picker';

class CreateGame extends Component { 
    
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
        if(this.props.gameType){
            this.setState({
                private: true
            });
        }
        
    }

    componentWillUnmount(){
        this.props.clearCreateGameError();
    }

    render() {
        const {createGameError} = this.props;
        return (
            
            <ScrollView 
                contentContainerStyle={{flexGrow: 1}}
                style={{ flex: 1, backgroundColor: WHITE }}>

            
            <View style={{backgroundColor: WHITE}}>
                
                        {this.props.createGameLoading ? <Spinner/> : null}
                   
                        <Text style={{fontSize: 17, textAlign: 'center', margin: 10, color: PINK}}>{this.state.private ? 'Private Game' : ''}</Text>
                        <Text style={{fontSize: 12, marginLeft: 30, marginTop: 15, paddingLeft: 10, paddingBottom: 5, color: SITE_COLOR}}>Select a category</Text>
                                
                        <Item rounded style={{backgroundColor: LIGHT_GRAY, marginTop: 5, marginLeft: 30, marginRight: 30, height: 42}}>
                            <Picker
                                note
                                mode="dropdown"
                                iosIcon={<Icon style={{flex: 1}} name="arrow-down" />}
                                style={{ flex: 1, paddingLeft: 3, paddingRight: 5 }}
                                selectedValue={this.state.category ? this.state.category : 0}
                                onValueChange={(value) => this.setState({category: value})}
                                >
                                <Picker.Item textStyle={{color: 'black'}} label={'Select Category'} value={0} />
                                {  
                                    this.props.categories.map((item, index) => {
                                        return <Picker.Item key={index} label={item.name} value={item.id} />
                                    })
                                    
                                }
                            </Picker>
                        </Item>
                        {createGameError.hasOwnProperty('category') ?
                                <Text style={{color: 'red', textAlign: 'center', paddingRight: 10, fontSize: 10}}>{createGameError.category[0]}</Text>
                            : null
                            }
                        
                        <Text style={{fontSize: 12, marginLeft: 30, marginTop: 15, paddingLeft: 10, paddingBottom: 5, color: SITE_COLOR}}>Description</Text>
                          
                        <Item rounded style={{backgroundColor: LIGHT_GRAY, marginTop: 5, paddingTop: 15, marginLeft: 30, marginRight: 30}}>
                            <Textarea 
                                style={{textAlign: 'left', flex: 1}} 
                                rowSpan={5}
                                autoCorrect={false}
                                maxLength={30}
                                value={this.state.description}
                                onChangeText={(value) => this.setState({description: value})}
                                placeholder={' Description'}
                                />
                        </Item>
                        {createGameError.hasOwnProperty('description') ?
                                <Text style={{color: 'red', textAlign: 'center', paddingRight: 10, fontSize: 10}}>{createGameError['description'][0]}</Text>
                            : null
                            }
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

                        <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                            <View style={{flex: 1, height: 100, marginLeft: 30}}>
                                <Text style={{fontSize: 12, marginTop: 15, paddingLeft: 10, paddingBottom: 5, color: SITE_COLOR}}>Start Time</Text>
                                <TouchableOpacity onPress={() => this.setState({isStartTimeVisible: true})} style={{backgroundColor: LIGHT_GRAY, borderRadius: 40, padding: 10, marginRight: 5, flex: 1, height: 42}}>
                                    <Text>{this.state.start_time}</Text>
                                </TouchableOpacity>
                                <View style={{flex: 1}}>
                                    {createGameError.hasOwnProperty('start_time') ?
                                    <Text style={{color: 'red', textAlign: 'center', paddingRight: 10, fontSize: 10}}>{createGameError['start_time'][0]}</Text>
                                    : null
                                    }
                                </View>
                            </View>
                            
                            <View style={{flex: 1, height: 100,  marginRight: 30}}>
                                <Text style={{fontSize: 12, marginTop: 15, paddingLeft: 15, paddingBottom: 5, color: SITE_COLOR}}>Stake End Time</Text>
                                <TouchableOpacity onPress={() => this.setState({isStakeEndTimeVisible: true})} style={{backgroundColor: LIGHT_GRAY, borderRadius: 40, padding: 10, marginLeft: 5, flex: 1, height: 42}}>
                                    <Text>{this.state.stake_end_time}</Text>
                                </TouchableOpacity>
                                <View style={{flex: 1}}>
                                    {createGameError.hasOwnProperty('stake_end_time') ?
                                        <Text style={{color: 'red', textAlign: 'center', paddingRight: 10, fontSize: 10}}>{createGameError['stake_end_time'][0]}</Text>
                                    : null
                                    }
                                </View>
                            </View>
                            
                        </View>

                        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                            <View style={{flex: 1, marginLeft: 30}}>
                                <Text style={{fontSize: 12, marginTop: 15, paddingLeft: 10, paddingBottom: 5, color: SITE_COLOR}}>Completion Time</Text>
                                <TouchableOpacity onPress={() => this.setState({isCompletionTimeVisible: true})} style={{backgroundColor: LIGHT_GRAY, borderRadius: 40, padding: 10, marginRight: 5, flex: 1, height: 42}}>
                                    <Text>{this.state.completion_time}</Text>
                                </TouchableOpacity>
                                {createGameError.hasOwnProperty('completion_time') ?
                                <Text style={{color: 'red', textAlign: 'center', paddingRight: 10, fontSize: 10}}>{createGameError['completion_time'][0]}</Text>
                                : null
                                }
                            </View>
                           
                            <View style={{flex: 1, marginRight: 30}}>
                        
                            </View>
                            
                        </View>
                        <Text style={{fontSize: 16, textAlign: 'center', marginTop: 15, paddingBottom: 5, color: SITE_COLOR}}>Add Game Sides</Text>
                         
                        <View style={{flexDirection: 'row', marginLeft: 30, marginRight: 30, justifyContent: 'space-between'}}>
                            <View style={{flex: 1, marginRight: 5}}>
                                <View>
                                    {
                                        this.state.sides[0].icon ? 
                                        <View style={{alignSelf: 'center', flex: 1}}>
                                            <Thumbnail
                                                source={{uri: this.state.sides[0].icon}}
                                                small
                                            />
                                        </View>
                                        :
                                        <View style={{alignSelf: 'center', flex: 1}}>
                                            <Thumbnail
                                                source={GAME}
                                                small
                                            />
                                        </View>
                                    }
                                    <View>
                                        <Text style={{fontSize: 15, textAlign: 'center', marginTop: 15, paddingLeft: 10, paddingBottom: 5, color: SITE_COLOR}}>Side A</Text>
                                    </View>
                                    <Item rounded style={{backgroundColor: LIGHT_GRAY, height: 42}}>
                                        <Input 
                                            style={{textAlign: 'left'}} 
                                            
                                            maxLength={30}
                                            value={this.state.sides[0].name}
                                            onChangeText={(value) => this.setSideAValue('name', value)}
                                            placeholder={'  Name'}
                                            />
                                    </Item>
                                    {createGameError.hasOwnProperty('sides.0.name') ?
                                        <Text style={{color: 'red', textAlign: 'center', paddingRight: 10, fontSize: 10}}>{createGameError['sides.0.name'][0]}</Text>
                                    : null
                                    }
                                </View>
                                <View style={{flex: 1}}>
                                   
                                    <View style={{flex: 1, marginTop: 15}}>
                                        <TouchableOpacity onPress={() => this.selectSideAIcon()} style={{backgroundColor: LIGHT_GRAY, borderRadius: 40, padding: 12,flex: 1}}>
                                            <Text>Side A Icon</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {createGameError.hasOwnProperty('sides.0.icon') ?
                                        <Text style={{color: 'red', textAlign: 'center', paddingRight: 10, fontSize: 10}}>{createGameError['sides.0.icon'][0]}</Text>
                                    : null
                                    }
                                </View>
                                <Item regular style={{ borderRadius: 10, backgroundColor: LIGHT_GRAY, marginTop: 10, paddingTop: 5}}>
                                    <Textarea 
                                        style={{textAlign: 'left', flex: 1}} 
                                        rowSpan={3}
                                        autoCorrect={false}
                                        value={this.state.sides[0].description}
                                        onChangeText={(value) => this.setSideAValue('description', value)}
                                        placeholder={' Description'}
                                        />
                                </Item>
                                {createGameError.hasOwnProperty('sides.0.description') ?
                                        <Text style={{color: 'red', textAlign: 'center', paddingRight: 10, fontSize: 10}}>{createGameError['sides.0.description'][0]}</Text>
                                    : <Text> </Text>
                                    }
                            </View>
                            <View style={{flex: 1, marginLeft: 5}}>
                                <View>
                                {
                                        this.state.sides[1].icon ? 
                                        <View style={{alignSelf: 'center', flex: 1}}>
                                            <Thumbnail
                                                source={{uri: this.state.sides[1].icon}}
                                                small
                                            />
                                        </View>
                                        : 
                                        <View style={{alignSelf: 'center', flex: 1}}>
                                            <Thumbnail
                                                source={GAME}
                                                small
                                            />
                                        </View>
                                    }
                                    <View>
                                        <Text style={{fontSize: 15, marginTop: 15, textAlign: 'center', paddingLeft: 10, paddingBottom: 5, color: SITE_COLOR}}>Side B</Text>
                                    </View>
                                        <Item rounded style={{backgroundColor: LIGHT_GRAY, height: 42}}>
                                        <Input 
                                            style={{textAlign: 'left'}} 
                                            
                                            maxLength={30}
                                            value={this.state.sides[1].name}
                                            onChangeText={(value) => this.setSideBValue('name', value)}
                                            placeholder={'  Name'}
                                            />
                                    </Item>
                                    {createGameError.hasOwnProperty('sides.1.name') ?
                                        <Text style={{color: 'red', textAlign: 'center', paddingRight: 10, fontSize: 10}}>{createGameError['sides.1.name'][0]}</Text>
                                    : null
                                    }
                                </View>
                                <View style={{flex: 1}}>
                                    
                                    <View style={{flex: 1, marginTop: 15}}>
                                        <TouchableOpacity onPress={() => this.selectSideBIcon()} style={{backgroundColor: LIGHT_GRAY, borderRadius: 40, padding: 12, flex: 1}}>
                                            <Text>Side B Icon</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {createGameError.hasOwnProperty('sides.1.icon') ?
                                        <Text style={{color: 'red', textAlign: 'center', paddingRight: 10, fontSize: 10}}>{createGameError['sides.1.icon'][0]}</Text>
                                    : null
                                    }
                                </View>
                                
                                <Item regular style={{borderRadius: 10, backgroundColor: LIGHT_GRAY, marginTop: 10, paddingTop: 5}}>
                                    <Textarea 
                                        style={{textAlign: 'left', flex: 1}} 
                                        rowSpan={3}
                                        autoCorrect={false}
                                        value={this.state.sides[1].description}
                                        onChangeText={(value) => this.setSideBValue('description', value)}
                                        placeholder={' Description'}
                                        />
                                </Item>
                                {createGameError.hasOwnProperty('sides.1.description') ?
                                    <Text style={{color: 'red', textAlign: 'center', paddingRight: 10, fontSize: 10}}>{createGameError['sides.1.description'][0]}</Text>
                                : <Text> </Text>
                                }
                            </View>
                        </View>
                        
                        
                
                        <TouchableOpacity 
                            onPress={() => this.createMyGame()}
                            style={{borderRadius: 25, marginBottom: 20, marginTop: 20, marginRight: 30, marginLeft: 30, padding: 13, backgroundColor: PINK}}>
                            <Text style={{textAlign: 'center', color: WHITE}}>Create Game</Text>
                        </TouchableOpacity>
               
              </View>  
             </ScrollView>
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
    return {categories,createGameError, user, createGameLoading, name, username};
};

export default connect(mapStateToProps,{ createGame, clearCreateGameError})(CreateGame);

