import React, { Component } from 'react';
import { Container, Text, Button, Tab, Item, Tabs, TabHeading, Badge, Thumbnail, List, Input, ListItem } from 'native-base';
import { FlatList, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import {getFriends, getFriendRequests, acceptFriendRequest, denyFriendRequest, toggleFriendRequestModal} from './../../redux/actions';
import { SITE_COLOR, WHITE, YELLOW, GRAY, LIGHT_GRAY, avatar, GREEN, SEARCHFRIENDS} from './../../style';
import { Spinner } from '../Reusables';
import Friend from './Notify/Friend';
import FriendRequestModal from '../Modals/FriendRequestModal';
import ViewUsers from './ViewUsers';

class Friends extends Component {

    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            activeTab: 0,
            filteredFriends: [],
            initialPage: 0,
            checkedId: 0
        }

        this._keyExtractor = this._keyExtractor.bind(this);
    }

    _keyExtractor = (item, index) => Math.random().toString(36).substring(7);

    componentWillReceiveProps(nextProps){
        
        if(nextProps.isPushNotification){
            if(nextProps.pushNotification.requestId != this.state.checkedId){
                let friend = nextProps.pushNotification.friend;
                friend.requestId = nextProps.pushNotification.requestId;
                this.props.toggleFriendRequestModal(true, friend);
                this.setState({checkedId: nextProps.pushNotification.requestId}); 
            }
          
        }
        let pending = nextProps.pendingRequests.filter((item, index) => {
            return item;
        })
        this.setState({friends: nextProps.friends, filteredFriends: nextProps.friends, pendingRequests: pending});
    }

    componentWillMount(){
        this.props.getFriends();
        this.props.getFriendRequests();
    }

    componentDidMount(){
        
        if(this.props.isPushNotification){
            let friend = this.props.pushNotification.friend;
            friend.requestId = this.props.pushNotification.requestId;  
            this.setState({checkedId: this.props.pushNotification.requestId});     
            this.props.toggleFriendRequestModal(true, friend);
            
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

    friendHeading = () => {
        return (
            <TabHeading style={styles.tabHeadingStyle}>
                
                <Text style={{fontSize: 14, paddingTop: 4, color: this.state.activeTab == 0 ? SITE_COLOR : GRAY}}>ADD FRIENDS</Text>
            </TabHeading>
        );
    }

    blockedHeading = () => {
        return (
            <TabHeading style={styles.tabHeadingStyle}>
                
                <Text style={{fontSize: 14, paddingTop: 4, color: this.state.activeTab == 3 ? WHITE : SITE_COLOR}}>Blocked</Text>
            </TabHeading>
        );
    }

    pendingHeading = () => {
        return (
            <TabHeading style={[styles.tabHeadingStyle, {borderLeftWidth: 1.2, borderLeftColor: GRAY}]}>
                
                <Text style={{fontSize: 14, paddingTop: 4, color: this.state.activeTab == 1 ? SITE_COLOR : GRAY}}>FRIEND REQUEST</Text>
            </TabHeading>
        );
    }

    render() {

        return (
            <Container style={{ backgroundColor: SITE_COLOR, borderTopColor: SITE_COLOR, flex: 1}}>
                <FriendRequestModal/>
                <Tabs  
                    onChangeTab={({ i }) => {this.setState({activeTab: i}); console.log(i, 'activeTab')}}
                    tabBarUnderlineStyle={{height: 0, backgroundColor: WHITE}}
                    initialPage={this.state.initialPage}
                    page={this.state.activeTab}
                    tabContainerStyle={styles.tabContainerStyle}
                >
                    
                        <Tab
                            tabStyle={styles.tabStyle}
                            activeTabStyle={styles.activeTabStyle}
                            heading={this.friendHeading()}>
                            
                            <ViewUsers/>
                            
                        </Tab>

                        <Tab
                            tabStyle={styles.tabStyle}
                            activeTabStyle={styles.activeTabStyle}
                            heading={this.pendingHeading()}>
                            
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
                                                        <TouchableOpacity onPress={()=> this.props.acceptFriendRequest(item.id)} style={{borderRadius: 25, height: 25, paddingLeft: 15, paddingRight: 15, marginRight: 15, paddingTop: 5, paddingBottom: 3, backgroundColor: GREEN}}>
                                                            <View style={{justifyContent: 'center'}}>
                                                                <Text style={{textAlign: 'center', color: WHITE, fontSize: 10}}>Accept</Text>
                                                            </View>
                                                            
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

const BORDER_COLOR = '#C4C4C4';

const styles = {
    inputStyle: {
        marginTop: 30,
        marginBottom: 10,
        borderColor: BORDER_COLOR,
    },

    iconViewStyle: {
        borderRadius: 100,
        padding: 7
    },

    badgeStyle: {
        backgroundColor: SITE_COLOR
    },

    tabHeadingStyle: {
        backgroundColor: WHITE,
        flexDirection: 'column',
        shadowColor: 'red',
        borderBottomWidth: 0,
        borderWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        elevation: 0.5,
        shadowOffset: { width: 40, height: 1 },
        shadowOpacity: 0.2,
    },

    activeTabStyle: {
        borderBottomColor: YELLOW,
        borderWidth: 0
    },
    tabStyle:{
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.3,
        elevation: 1.2,
        borderWidth: 0,
        backgroundColor: 'red'
    },

    tabContainerStyle:{
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.3,
        elevation: 1.2,
        borderWidth: 0,
    }
}

const mapStateToProps = (state) => {
    const {friends, pendingRequests} = state.friend;
    const {friendRequestLoading} = state.loading;
    const {isPushNotification, pushNotification} = state.notification;
    return { friends, friendRequestLoading, pendingRequests, isPushNotification, pushNotification};
};

export default connect(mapStateToProps, {getFriends, getFriendRequests, acceptFriendRequest, denyFriendRequest, toggleFriendRequestModal})(Friends);

