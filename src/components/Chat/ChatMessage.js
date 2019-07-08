import React, { Component } from 'react';
import { List, Item, Input, Thumbnail} from 'native-base';
import { TouchableOpacity, FlatList, View, Image } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getUsers, sendFriendRequest, friendUpdate, toggleImageViewModal} from '../../redux/actions';

import { SITE_COLOR, WHITE, avatar, LIGHT_GRAY, GRAY, GREEN, PINK, SEARCHFRIENDS,} from '../../style';
import { calculateOpacity } from '../../Helper';
import {Text} from './../Reusables';

class ChatMessage extends Component {

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
        const {message, time, name, mine} = this.props;
        return (
            <View style={{backgroundColor: WHITE, padding: 10, marginBottom: 5}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 14}}>{name}</Text>
                    <Text style={{color: '#05050F'+calculateOpacity(60), fontSize: 11}}>{time}</Text>
                </View>
                
                <View style={{ backgroundColor: '#6BC5CE'+calculateOpacity(10), padding: 8, borderRadius: 2, borderLeftColor: mine ? "#6BC5CE": "#E6296D", paddingLeft: 5, borderLeftWidth: 2}}>
                    <Text style={{justifyContent: 'center', fontSize: 15, lineHeight: 25}}>{message}</Text>
                </View>
            </View>
            
                 

        )


    }
}


const mapStateToProps = (state) => {
    const {users, requestNotSent, friends, requestSent, friendsId, pendingRequests} = state.friend;
    const {friendRequestLoading} = state.loading;
    
    return {users, friendRequestLoading, friends, requestNotSent, pendingRequests, requestSent, friendsId};
};

export default connect(mapStateToProps, {getUsers, sendFriendRequest, friendUpdate, toggleImageViewModal})(ChatMessage);

