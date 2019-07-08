import React, { Component } from 'react';
import { Content, Button, List, Container, TabHeading, Tab, Tabs, Thumbnail} from 'native-base';
import { ImageBackground, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { GRAY, SITE_COLOR, YELLOW, WHITE, avatar, LIGHT_GRAY, LIGHT_BLUE, GREEN, LIGHT_GREEN, SEARCHFRIENDS } from './../../style';
import CustomFooter from './CustomFooter';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getNotifications, getFriends, getFriendRequests, acceptFriendRequest, toggleImageViewModal, denyFriendRequest} from './../../redux/actions';
import WonGame from './Notify/WonGame';
import ViewProfile from './Notify/ViewProfile';
import AddFriend from './Notify/AddFriend';
import AcceptRequest from './Notify/AcceptRequest';
import { Spinner, Text  } from '../Reusables';
import moment from 'moment';
import _ from 'lodash';
import ImageViewModal from '../Modals/ImageViewModal';

class Notification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            activeTab: 0,
            filteredFriends: [],
            groupNotifications: {},
        }

        this._keyExtractor = this._keyExtractor.bind(this);
    }

    _keyExtractor = (item, index) => Math.random().toString(36).substring(7);

    componentWillReceiveProps(nextProps){

        let groupNotifications =  _.groupBy(nextProps.notifications, (notification) =>{
                return moment(notification.created_at).format('YYYY-MM-DD');
            });
        let pending = nextProps.pendingRequests.filter((item, index) => {
            return item;
        })

        this.setState({ groupNotifications, friends: nextProps.friends, filteredFriends: nextProps.friends, pendingRequests: pending});
    }

    componentWillMount(){
        this.props.getFriendRequests();
        this.props.getNotifications();
        moment.updateLocale('en', {
            calendar : {
                lastDay : '[Yesterday]',
                sameDay : '[Today]',
                nextDay : '[Tomorrow]',
                lastWeek : '[Last] dddd',
                nextWeek : 'dddd',
                sameElse : 'L'
            }
        });
    }

    renderNotifications(mainNotifications){
       
        let groupNotifications = _.groupBy(mainNotifications, function(notification){
            return moment(notification.created_at).format('YYYY-MM-DD');
        });
        
        let keys = Object.keys(groupNotifications);

        let notifications = [];
            
            for(let i in keys){
                let dailyNotification = groupNotifications[keys[i]].map((item, index) => {
                    
                    switch(item.type){
                        case FRIEND_REQUEST_RECEIVED:
                            return <AddFriend 
                                        hasFriend={this.props.friendsId.includes(item.id)} 
                                        key={item.id} name={item.data.friend.name} 
                                        time={moment(item.created_at).fromNow()} 
                                        avatar={item.data.friend.avatar ? {uri: item.data.friend.avatar} : avatar}
                                        onPress={() => this.props.toggleImageViewModal(true, item.data.friend.avatar ? {uri: item.data.friend.avatar} : avatar)}
                                    />
                            break;

                        case FRIEND_REQUEST_ACCEPTED:
                            return <ViewProfile 
                                        key={item.id} 
                                        name={item.data.friend.name} 
                                        time={moment(item.created_at).fromNow()}
                                        avatar={item.data.friend.avatar ? {uri: item.data.friend.avatar} : avatar}
                                        onPress={() => this.props.toggleImageViewModal(true, item.data.friend.avatar ? {uri: item.data.friend.avatar} : avatar)}
                                    />
                        default:
                            return null;
                    }
                });
                
                notifications.push(
                    <View key={i}>
                        <Text style={{paddingLeft: 15, paddingBottom: 10, fontSize: 15}}>{moment(keys[i]).calendar()}</Text>
                        
                        {dailyNotification}
                    </View>
                );
            }
            return notifications;

    }

    renderOptimalNotifications(keys){

        if(this.state.groupNotifications[keys]){
            
            let notifications = this.state.groupNotifications[keys].map((item, index) => {
                
                switch(item.type){
                    case FRIEND_REQUEST_RECEIVED:
                        return <AddFriend 
                                    hasFriend={this.props.friendsId.includes(item.id)} 
                                    key={item.id} name={item.data.friend.name} 
                                    time={moment(item.created_at).fromNow()} 
                                    avatar={item.data.friend.avatar ? {uri: item.data.friend.avatar} : avatar}
                                    onPress={() => this.props.toggleImageViewModal(true, item.data.friend.avatar ? {uri: item.data.friend.avatar} : avatar)}
                                />
                        
                    case FRIEND_REQUEST_ACCEPTED:
                        return <ViewProfile 
                                    key={item.id} 
                                    name={item.data.friend.name} 
                                    time={moment(item.created_at).fromNow()}
                                    avatar={item.data.friend.avatar ? {uri: item.data.friend.avatar} : avatar}
                                    onPress={() => this.props.toggleImageViewModal(true, item.data.friend.avatar ? {uri: item.data.friend.avatar} : avatar)}
                                />
                    default:
                        return null;
                }
            });
        
        return notifications;
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

    notificationHeading = () => {
        return (
            <TabHeading style={styles.tabHeadingStyle}>
               
                <Text style={{fontSize: 14, color: GRAY}}>NOTIFICATIONS</Text>
            </TabHeading>
        );
    }

    friendRequestHeading = () => {
        return (
            <TabHeading style={styles.tabHeadingStyle}>
               
                <Text style={{fontSize: 14, color: GRAY}}>FRIEND REQUESTS</Text>
            </TabHeading>
        );
    }



    render() {
        let notifications = _.groupBy(this.props.notifications, (notification) => {
            return moment(notification.created_at).format('YYYY-MM-DD');
        });
        let keys = Object.keys(notifications);
        return (
            <Container style={{ backgroundColor: WHITE, borderTopColor: WHITE}}>
                <Tabs  
                    onChangeTab={({ i }) => this.setState({activeTab: i})}
                    tabBarUnderlineStyle={{backgroundColor: GRAY}}
                    style={{elevation: 0}}
                >
                        <Tab
                            
                            tabStyle={styles.tabStyle}
                            activeTabStyle={styles.activeTabStyle}
                            heading={this.notificationHeading()}>
                            {this.props.notificationLoading ? <Spinner/> : null}
                            <ImageViewModal/>
                            <ScrollView style={{flex: 1, backgroundColor: WHITE, paddingTop: 15}}>
                                <List>
                                    <FlatList
                                        data={keys}
                                        keyExtractor={(item, index) => item}
                                        renderItem={({item}) => this.renderOptimalNotifications(item)}
                                    />
                                </List>
                            </ScrollView>
                        </Tab>

                        <Tab
                            
                            tabStyle={styles.tabStyle}
                            activeTabStyle={styles.activeTabStyle}
                            heading={this.friendRequestHeading()}>
                            <List style={{flex: 1, backgroundColor: WHITE}} contentContainerStyle={{flexGrow: 1}}>
                                
                                {this.props.friendRequestLoading ? <Spinner/> : null}
                                {!this.props.friendRequestLoading && this.props.pendingRequests.length == 0 ?
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 70}}>
                                    <Image
                                        source={SEARCHFRIENDS}
                                        style={{width: 150, height: 150}}
                                    />
                                    <Text style={{textAlign: 'center', marginTop: 15, fontSize: 18}}>No Friend Request</Text>
                                </View>
                                : null
                                }
                               
                                <FlatList
                                        data={this.state.pendingRequests}
                                        keyExtractor={(item, index) => item.id + ''}
                                        
                                        renderItem={({item}) => (
                                           
                                            <View style={{flexDirection: 'row', padding: 15, justifyContent: 'space-between', borderBottomWidth: 0.3, borderBottomColor: '#d3d3d3'}}>
                                                <View style={{flexDirection: 'row', marginLeft: 5, marginRight: 5}}>
                                                
                                                    <Thumbnail small source={item.friend.avatar ? {uri: item.friend.avatar} : avatar} />
                                                    <View style={{justifyContent: 'center', marginLeft: 15}}>
                                                        <Text style={{fontSize: 14}}>
                                                            {item.friend.name}                
                                                        </Text>
                                                    </View>
                                                    
                                                </View>
                                               
                                                <View style={{justifyContent: 'center'}}>
                                                    <View style={{borderBottomWidth: 0, flexDirection: 'row'}}>
                                                        <TouchableOpacity onPress={()=> this.props.acceptFriendRequest(item.id)} style={{borderRadius: 25, height: 25, marginRight: 15, padding: 5, paddingTop: 3, paddingBottom: 3, backgroundColor: GREEN}}>
                                                            <Text style={{textAlign: 'center', color: WHITE, fontSize: 10}}>Accept Request</Text>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity onPress={() => this.props.denyFriendRequest(item.id)}>
                                                            <MaterialCommunityIcons name="close-circle" size={25} color={LIGHT_GRAY} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                            
                                        )
                                    }
                                    />
                            
                            </List>
                            
                        </Tab>
                    
                </Tabs>
            
            </Container>
        );
    }
}

const FRIEND_REQUEST_RECEIVED = 'friend_request_received';
const FRIEND_REQUEST_ACCEPTED = 'friend_request_accepted';


const styles = {


    tabHeadingStyle: {
        backgroundColor: WHITE,
        flexDirection: 'column',
    },

    tabStyle: {
        borderBottomColor: YELLOW,
        borderBottomWidth: 5,
    },

    activeTabStyle: {
        backgroundColor: YELLOW,
        borderBottomColor: YELLOW,
        borderBottomWidth: 5,
        borderWidth: 0
    }
}

const mapStateToProps = (state) => {
    const {friends, pendingRequests, friendsId} = state.friend;
    const {friendRequestLoading, notificationLoading} = state.loading;
    const {notifications} = state.notification;
    return { friends, notifications, friendRequestLoading, notificationLoading, friendsId, pendingRequests};
};

export default connect(mapStateToProps, { getNotifications, getFriends, getFriendRequests, toggleImageViewModal, acceptFriendRequest, denyFriendRequest})(Notification);

