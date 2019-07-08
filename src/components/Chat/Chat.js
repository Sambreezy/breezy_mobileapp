import React, { Component } from 'react';
import { List, Item, Input, Text, Thumbnail} from 'native-base';
import { TouchableOpacity, FlatList, View, Image } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getUsers, sendFriendRequest, friendUpdate, toggleImageViewModal, sendMessage, getChatHistory} from '../../redux/actions';

import { SITE_COLOR, WHITE, avatar, LIGHT_GRAY, GRAY, GREEN, PINK, SEARCHFRIENDS, CHATIMAGE,} from '../../style';
import ChatMessage from './ChatMessage';
import { calculateOpacity } from '../../Helper';
import moment from 'moment';
import { Spinner } from '../Reusables';

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            filteredFriends: [],
            text: ''
        }

        this._keyExtractor = this._keyExtractor.bind(this);
    }

    _keyExtractor = (item, index) => item.id;

    componentWillMount(){
        moment.updateLocale('en', {
            calendar : {
                lastDay : '[Yesterday] HH:mm:A',
                sameDay : '[Today] HH:mm:A',
                nextDay : '[Tomorrow]',
                lastWeek : '[Last] dddd HH:mm:A',
                nextWeek : 'dddd',
                sameElse : 'L'
            }
        });
    }

    componentDidUpdate(){
       
    }

    renderRequestSuccess(){
       
    }

    renderRequestFailure(){
       
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

        return (
            <View style={{backgroundColor: WHITE, flex: 1}}>
            {this.props.getChatLoading && this.props.currentChatHistory.length == 0 ? <Spinner/> : null}
                <View style={{flex: 1}}>
                {!this.props.getChatLoading && this.props.currentChatHistory.length == 0 ?
                    <View style={{flex: 1, alignItems: 'center', marginBottom: 50, justifyContent: 'center'}}>
                        <Image
                            source={CHATIMAGE}
                            style={{width: 150, height: 150}}
                            resizeMode={'contain'}
                        />
                        <Text style={{textAlign: 'center', fontSize: 18, marginTop: 20}}>Start a chat with a friend!</Text>
                    </View>
                    : <FlatList
                        
                        data={this.props.currentChatHistory}
                        ref='_flatlist'
                        keyExtractor={(item, index) => Math.random().toString(36).substring(7)}
                        onContentSizeChange={() => this.refs._flatlist.scrollToEnd({animated: true})}
                        onLayout={() => this.refs._flatlist.scrollToEnd({animated: true})}
                        renderItem={({item}) => (
                            <ChatMessage
                                time={moment(item.created_at).calendar()}
                                message={item.text}
                                mine={item.user.id == this.props.user.id}
                                name={ item.user.id == this.props.user.id ? 'You' : item.user.name}
                            />
                        )
                    }
                />}
                    
                </View>
                <View style={{flexDirection: 'row', backgroundColor: "#A9A4C2"+calculateOpacity(16), padding: 8, justifyContent: 'space-between'}}>
                    <Item rounded style={{flex: 10, backgroundColor: WHITE}}>
                        <View style={{flexDirection: 'row', marginLeft: 8}}>
                            <TouchableOpacity>
                                <MaterialCommunityIcons color={"#05050F"+calculateOpacity(80)} name="image" size={25} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft: 10, marginRight: 12}}>
                                <MaterialCommunityIcons color={"#05050F"+calculateOpacity(80)} name="emoticon" size={25} />
                            </TouchableOpacity>
                        </View>
                        <Input 
                            placeholder={'Start a chat'} 
                            style={{borderLeftWidth: 0.5, borderLeftColor: "#A9A4C2"+calculateOpacity(16)}}
                            onChangeText={(value) => this.setState({text: value})}
                            value={this.state.text}
                        />

                    </Item>
                    <TouchableOpacity onPress={() => {
                        this.props.sendMessage(this.props.currentChatId, 
                            {
                                text: this.state.text,
                                user_id: this.props.user.id,
                                chat_id: this.props.currentChatId
                            });
                        this.setState({text: ''});
                    }} 
                    disabled={this.state.text.length == 0}
                    style={{flex: 1,justifyContent: 'center', alignItems: 'center', marginLeft: 10, padding: 5, paddingLeft: 9, paddingRight: 9, borderRadius: 50, backgroundColor: this.state.text.length == 0 ? '#32359E'+calculateOpacity(80) : '#32359E'}}>
                        <View style={{}}>
                            <MaterialCommunityIcons name="send" size={24} color={WHITE} />
                        </View>
                        
                    </TouchableOpacity>
                </View>
                
            </View>
            
                 

        )


    }
}


const mapStateToProps = (state) => {
    const {currentChatHistory, currentChatId, stateChanged} = state.chat;
    const {user} = state.auth;
    const {getChatLoading} = state.loading;
    return {getChatLoading, user, stateChanged, currentChatHistory, currentChatId};
};

export default connect(mapStateToProps, {getUsers, sendFriendRequest, sendMessage, getChatHistory, friendUpdate, toggleImageViewModal})(Chat);

