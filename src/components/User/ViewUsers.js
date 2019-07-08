import React, { Component } from 'react';
import { List, Item, Input, Text, Thumbnail} from 'native-base';
import { TouchableOpacity, FlatList, View, Image } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getUsers, sendFriendRequest, friendUpdate, toggleImageViewModal} from './../../redux/actions';

import { SITE_COLOR, WHITE, avatar, LIGHT_GRAY, GRAY, GREEN, PINK, SEARCHFRIENDS,} from '../../style';
import { Spinner } from '../Reusables';
import ImageViewModal from '../Modals/ImageViewModal';

class ViewUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            filteredUsers: []
        }

        this._keyExtractor = this._keyExtractor.bind(this);
    }

    _keyExtractor = (item, index) => item.id;

    componentWillMount(){
        
        this.props.getUsers();
    }

    componentWillReceiveProps(nextProps){
        
        this.setState({users: nextProps.users, filteredUsers: []});
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

    searchUsers(query){
        let users = this.state.users;
        query = query.toLowerCase();
        let expression = `.*${query}.*`;
        let regex = new RegExp(expression, 'g');
        let result = users.filter(user => {
            let joinedUsers = user.name ? user.name.toLowerCase() : '';
            return joinedUsers.match(regex);
        }
        );
        if(query.trim() == ''){
            this.setState({filteredUsers: []});
        }else{
            this.setState({filteredUsers: result});
        }
        
    }

    render() {

        return (
          
                <List style={{flex: 1, backgroundColor: WHITE}} contentContainerStyle={{flexGrow: 1}}>
                {this.renderRequestFailure()}
                {this.renderRequestSuccess()}
                    <ImageViewModal/>
                    <Item rounded style={{backgroundColor: LIGHT_GRAY, height: 45, marginTop: 15, marginLeft: 15, marginRight: 15}}>
                        <MaterialCommunityIcons style={{paddingLeft: 10}} color={GRAY} name="magnify" size={25} />
                        <Input
                            placeholder={'Search ...'}
                            autoCorrect={false}
                            onChangeText={(value) => this.searchUsers(value)}
                        />
                    </Item>
                    {this.props.friendRequestLoading ? <Spinner/> : null}
                    {this.state.filteredUsers.length == 0 ?
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 70}}>
                            <Image
                                source={SEARCHFRIENDS}
                                style={{width: 150, height: 150}}
                            />
                            <Text style={{textAlign: 'center', marginTop: 15, fontSize: 18}}>Search to add new friends!</Text>
                        </View>
                        : null
                    }
                    <FlatList
                            data={this.state.filteredUsers}
                            keyExtractor={this._keyExtractor}
                            
                            renderItem={({item}) => (
                                <View style={{flexDirection: 'row', padding: 15, justifyContent: 'space-between', borderBottomWidth: 0.3, borderBottomColor: '#d3d3d3'}}>
                                    <View style={{flexDirection: 'row', marginLeft: 5, marginRight: 5}}>
                                        <TouchableOpacity onPress={() => this.props.toggleImageViewModal(true, item.avatar ? {uri: item.avatar} : avatar)}>
                                            <Thumbnail small source={item.avatar ? {uri: item.avatar} : avatar} />
                                        </TouchableOpacity>
                                        <View style={{justifyContent: 'center', marginLeft: 15}}>
                                            <Text style={{fontSize: 14}}>
                                                {item.name}                
                                            </Text>
                                        </View>
                                        
                                    </View>
                                    
                                    <View style={{borderBottomWidth: 0, justifyContent: 'center'}}>
                                        <TouchableOpacity onPress={() => this.props.sendFriendRequest({friend: item.id})} style={{borderRadius: 25, padding: 7, backgroundColor: SITE_COLOR}}>
                                            <Text style={{textAlign: 'center', color: WHITE, fontSize: 10}}>Add Friend</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                
                            )
                        }
                        />
                    
                </List>
                 

        )


    }
}


const mapStateToProps = (state) => {
    const {users, requestNotSent, requestSent, friendsId, pendingRequests} = state.friend;
    const {friendRequestLoading} = state.loading;
    console.log(friendsId, pendingRequests);
    return {users, friendRequestLoading, requestNotSent, pendingRequests, requestSent, friendsId};
};

export default connect(mapStateToProps, {getUsers, sendFriendRequest, friendUpdate, toggleImageViewModal})(ViewUsers);

