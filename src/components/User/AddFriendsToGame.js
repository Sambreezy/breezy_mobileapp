import React, { Component } from 'react';
import { List, Item, Input, Text, Thumbnail, CheckBox} from 'native-base';
import { TouchableOpacity, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getUsers, addFriendsToGame, toggleImageViewModal} from './../../redux/actions';

import { SITE_COLOR, WHITE, avatar, LIGHT_GRAY, GRAY, GREEN, PINK,} from '../../style';
import { Spinner } from '../Reusables';
import ImageViewModal from '../Modals/ImageViewModal';

class AddFriendsToGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            filteredUsers: [],
            selectedUsers: [],
            hasError: false
        }

        this._keyExtractor = this._keyExtractor.bind(this);
    }

    _keyExtractor = (item, index) => item.id+'';

    componentWillMount(){
      
        this.setState({users: this.props.users, filteredUsers: this.props.users});
    
    }

    componentWillReceiveProps(nextProps){
        
        this.setState({users: nextProps.users, filteredUsers: nextProps.users});
    }

    renderRequestFailure(){
        
        if(this.state.hasError){
            
            setTimeout(() => { this.setState({hasError: false})}, 2000);
            
                return (
                    <View style={{backgroundColor: PINK, justifyContent: 'center', position: 'absolute', left: 0, marginBottom: 60, zIndex: 1000, right: 0, height: 50}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 16}}>Select a friend you want to challenge</Text>
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
            let joinedUsers = user.friend.name ? user.friend.name.toLowerCase() : '';
            return joinedUsers.match(regex);
        }
        );
        
        this.setState({filteredUsers: result});
    }

    addToGame(id, add){
        let selectedUsers = this.state.selectedUsers;
        
        if(!add){

            selectedUsers.push(id);
        }else{
            selectedUsers = selectedUsers.filter((item) => item != id);
        }
  
        this.setState({selectedUsers});

    }

    addSelectedFriendsToGame(){
        if(this.state.selectedUsers.length <= 0){
            this.setState({hasError: true});
            return;
        }
        this.props.addFriendsToGame(this.props.createdGameId, {players: this.state.selectedUsers});
    }

    render() {

        return (
          
                <List style={{flex: 1, backgroundColor: WHITE}} contentContainerStyle={{flexGrow: 1}}>
                {this.renderRequestFailure()}
                {this.props.createGameLoading ? <Spinner/> : null}
                    <ImageViewModal/>
                    
                    <Item rounded style={{backgroundColor: LIGHT_GRAY, height: 45, marginTop: 15, marginLeft: 15, marginRight: 15}}>
                        <MaterialCommunityIcons style={{paddingLeft: 10}} color={GRAY} name="magnify" size={25} />
                        <Input
                            placeholder={'Search ...'}
                            autoCorrect={false}
                            onChangeText={(value) => this.searchUsers(value)}
                        />
                    </Item>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 15, marginTop: 10, marginBottom: 5}}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.addSelectedFriendsToGame()}  style={{borderRadius: 25, flex: 0, width: 150, padding: 10, backgroundColor: GREEN}}>
                            <Text style={{textAlign: 'center', fontSize: 14, color: WHITE}}>Add {this.state.selectedUsers.length} Friend{this.state.selectedUsers.length > 1 ? 's' : ''}</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                            data={this.state.filteredUsers}
                            keyExtractor={this._keyExtractor}
                            extraData={this.state}
                            renderItem={({item}) => (
                                <View style={{flexDirection: 'row', padding: 15, justifyContent: 'space-between', borderBottomWidth: 0.3, borderBottomColor: '#d3d3d3'}}>
                                    <View style={{flexDirection: 'row', marginLeft: 5, marginRight: 5}}>
                                        <TouchableOpacity onPress={() => this.props.toggleImageViewModal(true, item.friend.avatar ? {uri: item.friend.avatar} : avatar)}>
                                            <Thumbnail small source={item.friend.avatar ? {uri: item.friend.avatar} : avatar} />
                                        </TouchableOpacity>
                                        <View style={{justifyContent: 'center', marginLeft: 15}}>
                                            <Text style={{fontSize: 14}}>
                                                {item.friend.name}                
                                            </Text>
                                        </View>
                                        
                                    </View>
                                    
                                    <View style={{marginRight: 15, justifyContent: 'center'}}>
                                        <CheckBox onPress={() => this.addToGame(item.friend.id, this.state.selectedUsers.includes(item.friend.id))} checked={this.state.selectedUsers.includes(item.friend.id)} color={PINK}/>
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
    const {friends, requestNotSent, requestSent} = state.friend;
    const {createGameLoading} = state.loading;
    const {createdGameId} = state.game;
    return {users: friends, createdGameId, createGameLoading, requestNotSent, requestSent};
};

export default connect(mapStateToProps, {getUsers, addFriendsToGame, toggleImageViewModal})(AddFriendsToGame);

