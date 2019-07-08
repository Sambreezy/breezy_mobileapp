import React, { Component } from 'react';
import { List, Item, Input, Text, Thumbnail} from 'native-base';
import { TouchableOpacity, FlatList, View, Image } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getUsers, sendFriendRequest, friendUpdate, toggleImageViewModal, getChatHistory, chatUpdate, createChat} from './../../redux/actions';

import { SITE_COLOR, WHITE, avatar, LIGHT_GRAY, GRAY, GREEN, PINK, SEARCHFRIENDS,} from '../../style';
import { Spinner } from '../Reusables';
import ImageViewModal from '../Modals/ImageViewModal';
import Friend from './Notify/Friend';
import { Actions } from 'react-native-router-flux';

class UserFriends extends Component {

    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            filteredFriends: []
        }

        this._keyExtractor = this._keyExtractor.bind(this);
    }

    _keyExtractor = (item, index) => item.id;

    componentWillMount(){
        
        this.setState({
            filteredFriends: this.props.friends,
            friends: this.props.friends
        })
    }

    componentWillReceiveProps(nextProps){
       
    }

    renderRequestSuccess(){
        
        if(this.props.requestSent.length > 0){
            
            setTimeout(() => { this.props.friendUpdate({prop: 'requestSent', value: ''})}, 3000);
            
                return (
                    <View style={{backgroundColor: GREEN, justifyContent: 'center', position: 'absolute', left: 0, marginBottom: 60, zIndex: 1000, right: 0, height: 50}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 16}}>Request sent successfully</Text>
                    </View>
                );
            
        }
    }

    renderRequestFailure(){
        
        if(this.props.requestNotSent.length > 0){
            
            setTimeout(() => { this.props.friendUpdate({prop: 'requestNotSent', value: ''})}, 3000);
            
                return (
                    <View style={{backgroundColor: PINK, justifyContent: 'center', position: 'absolute', left: 0, marginBottom: 60, zIndex: 1000, right: 0, height: 50}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 16}}>{this.props.requestNotSent}</Text>
                    </View>
                );
            
        }
    }

    searchFriends(query){
        let friends = this.state.friends;
        query = query.toLowerCase();
        let expression = `.*${query}.*`;
        let regex = new RegExp(expression, 'g');
        let result = friends.filter(user => {
            let joinedFriends = user.friend.name ? user.friend.name.toLowerCase() : '';
            return joinedFriends.match(regex);
        }
        );
       
            this.setState({filteredFriends: result});
        
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
            <View style={{backgroundColor: WHITE, flex: 1}}>
                <Item rounded style={{backgroundColor: LIGHT_GRAY, height: 45, marginTop: 15, marginBottom: 15, marginLeft: 15, marginRight: 15}}>
                    <MaterialCommunityIcons style={{paddingLeft: 10}} color={GRAY} name="magnify" size={25} />
                    <Input
                        placeholder={'Search ...'}
                        autoCorrect={false}
                        onChangeText={(value) => this.searchFriends(value)}
                    />
                </Item>
                <FlatList
                        data={this.state.filteredFriends}
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
            
                 

        )


    }
}


const mapStateToProps = (state) => {
    const {users, requestNotSent, friends, requestSent, friendsId, pendingRequests} = state.friend;
    const {friendRequestLoading} = state.loading;
    console.log(friendsId, pendingRequests);
    return {users, friendRequestLoading, friends, requestNotSent, pendingRequests, requestSent, friendsId};
};

export default connect(mapStateToProps, {getUsers, sendFriendRequest, getChatHistory, createChat, chatUpdate, friendUpdate, toggleImageViewModal})(UserFriends);

