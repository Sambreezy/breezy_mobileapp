import React, { Component } from 'react';
import { Content, Button, Thumbnail} from 'native-base';
import { FlatList, View, ScrollView, Image, TouchableOpacity,RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from 'react-native-share';
import {WHITE, LIGHT_GRAY, GRAY, LIGHT_GREEN, SITE_COLOR, avatar, PINK, GREEN } from './../../style';
import { formatMoney } from '../../Helper';
import { Card, Spinner, Text } from '../Reusables';
import Friend from './Notify/Friend';
import {logoutUser, getFriends, updateMyProfile, createChat, chatUpdate, getChatHistory, toggleUpdateProfileModal, getMyProfile, toggleImageViewModal} from './../../redux/actions';
import config from './../../redux/config';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import UpdateProfileModal from './UpdateProfileModal';
import ImageViewModal from '../Modals/ImageViewModal';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    componentWillMount(){
        this.props.getFriends();
    }

    changeAvatar(){
        const options = {
            title: 'Select Avatar',
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
                console.log(source);
                this.props.updateMyProfile(this.props.user.id, {avatar: 'data:image/jpeg;base64,' + response.data});
            }
          });
    }

    renderRequestFailure(){
        
        if(this.state.hasError){
            
            setTimeout(() => { this.setState({hasError: false})}, 2000);
            
                return (
                    <View style={{backgroundColor: PINK, justifyContent: 'center', position: 'absolute', left: 0, marginBottom: 60, zIndex: 1000, right: 0, height: 50}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 16}}>You must have at least one friend to challenge</Text>
                    </View>
                );
            
        }
    }

    processChat(item){
        if(!item.chat){
            this.props.createChat({with: item.friend.id})
        }else{
            this.props.chatUpdate({prop: 'currentChatFriend', value: item.friend});
            this.props.chatUpdate({prop: 'currentChatId', value: item.chat.id});
            this.props.getChatHistory(item.chat.id, true);
            Actions.chat();
        }
    }


    render() {

        return (
            <View style={{flex: 1}}>
                {this.renderRequestFailure()}
                <ScrollView 
                    refreshControl={
                        <RefreshControl
                        refreshing={this.props.friendRequestLoading}
                        onRefresh={() => { this.props.getMyProfile(); this.props.getFriends()}}
                        />
                    }
                    contentContainerStyle={{flexGrow: 1}}
                    style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                    <UpdateProfileModal/>
                    <ImageViewModal/>
                    
                    {this.props.profileUpdateLoading ? <Spinner/> : null}
                    {this.props.friendRequestLoading ? <Spinner/> : null}
                    
                    <View style={{alignSelf: 'center', marginTop: 50}}>
                        <TouchableOpacity onPress={() => this.props.toggleImageViewModal(true, this.props.user.avatar ? {uri: this.props.user.avatar} : avatar)}>
                            <Thumbnail
                                // style={{backgroundColor: LIGHT_GRAY}}
                                source={this.props.user.avatar ? {uri: this.props.user.avatar} : avatar}
                                large
                            />
                        </TouchableOpacity>
                    
                        <TouchableOpacity onPress={() => this.changeAvatar()} style={{ position: 'absolute', padding: 3, elevation: 3, borderRadius: 50, zIndex: 100, bottom: 0, right: 10,  backgroundColor: WHITE, flex: 0, alignItems: 'center', justifyContent: 'center'}}>
                            <MaterialCommunityIcon size={16} color={'#A9A4C2'} name={'camera'}/>
                        </TouchableOpacity>
                        
                    </View>
                    
                    <View style={{marginTop: 10 }}>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <Text style={{color: SITE_COLOR, fontSize: 22, fontWeight: 'bold'}}>{this.props.user.name}</Text>
                            <TouchableOpacity onPress={() => this.props.toggleUpdateProfileModal(true)} style={{justifyContent: 'center'}}>
                                <View style={{ shadowOffset:{ width: 2, height: 2}, shadowOpacity: 1, shadowRadius: 80, elevation: 2, backgroundColor: WHITE, padding: 5, marginLeft: 5, borderRadius: 80, alignItems: 'center', justifyContent: 'center'}}>
                                    <MaterialCommunityIcon size={13} style={{justifyContent: 'center'}} color={'#A9A4C2'} name={'pencil'}/>
                                </View>
                                
                            </TouchableOpacity>
                        </View>
                        
                        <Text style={{textAlign: 'center', fontSize: 12}}> {this.props.user.username ? this.props.user.username + ' | ' : ' '} Joined {moment(this.props.user.created_at).fromNow()}</Text>
                    </View>

                    <View style={{flexDirection: 'row', marginTop: 25, justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20}}>
                        <TouchableOpacity disabled={true} onPress={() => Actions.friends()}>
                            <Text style={{color: '#05050F', fontSize: 14, fontWeight: 'bold'}}>FRIENDS ({this.props.friends.length})</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => Actions.userFriends()}>
                                <MaterialCommunityIcon name="message-text" size={22} color={LIGHT_GREEN}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={{marginLeft: 20}} onPress={() => Actions.friends()}>
                                <MaterialCommunityIcon name="account-plus" size={22} color={LIGHT_GREEN}/>
                            </TouchableOpacity>
                        </View>
                        
                    </View>

                    <View style={{marginTop: 20}}>
                        <FlatList
                            data={this.props.friends}
                            keyExtractor={(item, index) => item.id + ''}
                            
                            renderItem={({item}) => (
                                <Friend 
                                    name={item.friend.name} 
                                    id={item.friend.id} 
                                    pix={item.friend.avatar}
                                    onPress={() => this.processChat(item)}
                                />
                                
                            )
                        }
                        />
                    </View>

                    <View style={{margin: 20}}>
                        <TouchableOpacity onPress={() => Actions.userFriends()} activeOpacity={0.8} style={{borderRadius: 25, marginTop: 20, padding: 13, backgroundColor: '#292B80'}}>
                            <Text style={{textAlign: 'center',fontSize: 16,fontSize: 16, color: WHITE}}>View all friends</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} 
                            onPress={() => { 
                                if(this.props.friends.length <= 0){
                                    this.setState({hasError: true});
                                    return;
                                }
                                Actions.createGame({gameType: 'private'}); 
                            }}  
                            style={{borderRadius: 25, marginTop: 20, padding: 13, backgroundColor: PINK}}>
                            <Text style={{textAlign: 'center', fontSize: 16, color: WHITE}}>Challenge a friend</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.start()}  style={{borderRadius: 25, marginTop: 20, padding: 13, backgroundColor: '#6BC5CE'}}>
                            <Text style={{textAlign: 'center', fontSize: 16, color: WHITE}}>Create a Game</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => Actions.myGames()} activeOpacity={0.8} style={{borderRadius: 25, marginTop: 20, padding: 13, backgroundColor: '#292B80'}}>
                            <Text style={{textAlign: 'center',fontSize: 16,fontSize: 16, color: WHITE}}>View My Games</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{margin: 20}}>
                        <Card style={{backgroundColor: LIGHT_GRAY, elevation: 0, borderRadius: 12}}>
                            <TouchableOpacity onPress={() => {
                                Share.open(shareOptions)
                                    .then(res => console.log(res))
                                    .catch(err => console.log(err));
                            }} style={{flexDirection: 'row', padding: 20}}>
                                <MaterialCommunityIcon name="share-variant" size={30} color={LIGHT_GREEN}/>
                                <View style={{justifyContent: 'center', marginLeft: 20}}>
                                    <Text style={{fontSize: 16, color: 'black'}}>Share this App</Text>
                                    <Text style={{fontSize: 10, color: GRAY}}>Get free credits when you invite your friends!</Text>
                                </View>
                            </TouchableOpacity>
                    </Card>

                    <TouchableOpacity onPress={() => this.props.logoutUser()} style={{ flexDirection: 'row', justifyContent: 'center', borderRadius: 25, margin: 20, marginLeft: 80, marginRight: 80, padding: 10, backgroundColor: LIGHT_GRAY}}>
                                <MaterialCommunityIcon name="power"  size={22} color={LIGHT_GREEN}/>
                                <Text style={{textAlign: 'center', fontSize: 16, paddingLeft: 5}}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );


    }
}

let shareOptions = {
    title: 'Predict Pal',
    message: 'Checkout Predict Pal, I just won some cash by predicting a game',
    url: config.appUrl,
    subject: 'Predict Pal',
    failOnCancel: true
};


const styles = {
    
}

const mapStateToProps = (state) => {
    const {user} = state.auth;
    const {friends} = state.friend;
    const {friendRequestLoading, profileUpdateLoading, gameLoading} = state.loading;
    return { user, friends, friendRequestLoading, profileUpdateLoading, gameLoading };
};

export default connect(mapStateToProps, {logoutUser, getFriends, getChatHistory, chatUpdate, createChat, updateMyProfile, getMyProfile, toggleUpdateProfileModal, toggleImageViewModal })(Profile);

