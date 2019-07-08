import React, { Component } from 'react';
import { List, Item, Input, Text, Thumbnail} from 'native-base';
import { TouchableOpacity, FlatList, View, Image } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getUsers, sendFriendRequest, friendUpdate, toggleImageViewModal} from '../../redux/actions';

import { SITE_COLOR, WHITE, avatar, GREEN, PINK} from '../../style';

class ChatHeader extends Component {

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

    render() {
        const {name} = this.props.currentChatFriend;
        return (
            <View style={{backgroundColor: WHITE, paddingLeft: 20, flexDirection: 'row',}}>
                <Thumbnail
                    source={this.props.currentChatFriend.avatar ? {uri: this.props.currentChatFriend.avatar} : avatar} 
                    small
                />
                <View style={{justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold', marginLeft: 15, color: '#020B0F'}}>{name}</Text>
                </View>
                
            </View>
 
        )


    }
}


const mapStateToProps = (state) => {
    const {currentChatFriend} = state.chat;
    return {currentChatFriend};
};

export default connect(mapStateToProps, {getUsers, sendFriendRequest, friendUpdate, toggleImageViewModal})(ChatHeader);

