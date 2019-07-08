import React, { Component } from 'react';
import { Container, Button, Tab, Tabs, TabHeading, Badge, Thumbnail, ScrollableTab, Footer, FooterTab, Icon } from 'native-base';
import { Image, View, TouchableOpacity, ScrollView, FlatList, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { BoxInput, Header, Spinner, Card, Text } from './../Reusables';
import { getMyProfile, getCategories, getFriends, getUserSetting, isPushNotification, getBanks } from './../../redux/actions';

import { SITE_COLOR, WHITE, BLUE, ORANGE, ENTERTAINMENT, SPORTS, BOXING, POLITICS, YELLOW, GRAY, PINK} from './../../style';
import Games from './Games';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
            categories: [
                {
                    name: 'Sports',
                    image: SPORTS
                },
                {
                    name: 'Politics',
                    image: POLITICS
                },
                {
                    name: 'Entertainment',
                    image: ENTERTAINMENT
                },
                {
                    name: 'Boxing',
                    image: BOXING
                },
                {
                    name: 'Fighting',
                    image: POLITICS
                }
            ]
        }
    }

    componentWillMount(){
        this.props.getMyProfile();
        SplashScreen.hide();
    }

    componentDidMount(){
        this.props.getCategories();
        this.props.getFriends();
        
        this.props.getUserSetting();
        this.props.getBanks();
        
        if(this.props.hasReceivedNotification){
            this.props.isPushNotification(true);
            Actions.friends();
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.hasReceivedNotification){
            nextProps.isPushNotification(true);
            Actions.friends();
        }
    }

    tabHeading = (index, image, name) => {
        
        return (
            <TabHeading style={styles.tabHeadingStyle}>
                <Thumbnail
                    source={image}
                    resizeMode={'cover'}
                    style={{opacity: this.state.activeTab == index ? 1 : 0.67}}
                />
                <Text style={{fontSize: 12, paddingTop: 4, fontWeight: this.state.activeTab == index ? 'bold' : 'normal', color: this.state.activeTab == index ? WHITE : WHITE}}>{name}</Text>
            </TabHeading>
        );
    }

    render() {

        return (
            <Container style={{ backgroundColor: SITE_COLOR}}>
            <StatusBar backgroundColor={'#2B2D7B'} barStyle="light-content" />
                {this.props.categoryLoading ? <Spinner/> : null}
                <Tabs  
                    onChangeTab={({ i }) => this.setState({activeTab: i})}
                    tabBarUnderlineStyle={{backgroundColor: YELLOW}}
                    
                    renderTabBar={()=> <ScrollableTab style={{ height: 100, shadowColor: 'rgba(0, 0, 0, 0.12)',
                    shadowOffset: { width: 2, height: 200 }, elevation: 10, shadowRadius: 13,
                    shadowOpacity: 0.7, borderWidth: 0, backgroundColor: '#36399A' }}  />}
                >
                    
                    {this.props.categories ? this.props.categories.map((category, index)=>{
                        return(
                        <Tab
                            key={index}
                            tabStyle={styles.tabStyle}
                            activeTabStyle={styles.activeTabStyle}
                            heading={this.tabHeading(index, category.icon ? {uri: category.icon} : SPORTS, category.name)}>
                            
                            <ScrollView contentContainerStyle={{paddingBottom: 30, flexGrow: 1}} style={{backgroundColor: SITE_COLOR, paddingTop: 20}}>
                            
                            {
                                category.games.length == 0 && !this.props.categoryLoading ?
                                <View style={{flex: 1, justifyContent: 'center', margin: 5}}>
                                    <Card
                                        style={{padding: 15, alignItems: 'center', borderRadius: 10, justifyContent: 'center'}}
                                    >
                                        <FontAwesome name="hourglass-2" size={55} color={PINK} />
                                        <Text style={{textAlign: 'center', paddingTop: 30, fontSize: 18, color: SITE_COLOR}}>No Games in this category at the moment</Text>
                                    </Card>
                                </View>
                                :
                                <FlatList
                                
                                data={category.games}
                                keyExtractor={(item) => Math.random().toString(36).substring(7)}
                                renderItem={({item}) => (
                                    <Games 
                                        onPress={() => Actions.singleEvent({id: item.id, title: category.name})} 
                                        game={item}
                                    />
                                )}
                            />
                            }
                            
                                
                            </ScrollView>
                            
                        </Tab>);
                    }): null}
                    
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
        backgroundColor: 'transparent',
        // backgroundColor: 'red',
        flexDirection: 'column',
        // shadowColor: 'rgba(0, 0, 0, 0.12)',
        // shadowOffset: { width: 0, height: 3 },
        // shadowOpacity: 0.4,
        paddingLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingRight: 20,
        // marginLeft: 0,
        // marginRight: 0,
        // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.16), 0px 0px 4px rgba(0, 0, 0, 0.12);
        // boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.16), 0px 0px 4px rgba(0, 0, 0, 0.12)",
        // borderBottomWidth: 0.5,
        
        
    },

    tabStyle: {
        borderBottomColor: YELLOW,
        borderBottomWidth: 15,
        elevation: 45,
    },

    activeTabStyle: {
        backgroundColor: YELLOW,
        borderBottomColor: YELLOW,
        borderBottomWidth: 5,
        borderWidth: 0
    }
}

const mapStateToProps = (state) => {
    const {categories} = state.category;
    const {categoryLoading} = state.loading;
    const {hasReceivedNotification} = state.notification;
    return { categories, categoryLoading, hasReceivedNotification};
};

export default connect(mapStateToProps, {getCategories, getMyProfile, getUserSetting, getBanks, getFriends, isPushNotification})(Home);

