import React, { Component } from 'react';
import { Container, Text, Button, Tab, Tabs, TabHeading, Badge, Thumbnail, ScrollableTab, Footer, FooterTab, Icon } from 'native-base';
import { Image, View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { BoxInput, Header, Spinner, Card } from './../Reusables';
import { getMyGames, getMySingleGame } from './../../redux/actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { SITE_COLOR, WHITE, BLUE, ORANGE, ENTERTAINMENT, PINK, SPORTS, BOXING, POLITICS, YELLOW, GRAY} from './../../style';
import Games from './Games';
import GameView from './GameView';

class MyGames extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
        }
    }

    componentDidMount(){
       this.props.getMyGames();
    }

    render() {
        const {myGames} = this.props;
        return (
                
                <ScrollView contentContainerStyle={{paddingBottom: 30, flex: 1, flexGrow: 1}} style={{backgroundColor: SITE_COLOR}}>
                    {this.props.gameLoading ? <Spinner/> : null}

                    { myGames.length == 0 && !this.props.gameLoading ?
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Card
                            style={{padding: 15, alignItems: 'center', justifyContent: 'center'}}
                        >
                            <FontAwesome name="hourglass-2" size={55} color={PINK} />
                            <Text style={{textAlign: 'center', paddingTop: 25, fontSize: 20, color: SITE_COLOR}}>You have no games yet</Text>
                        </Card>
                    </View>
                    :
                    <FlatList
                        data={myGames}
                        keyExtractor={(item) => Math.random().toString(36).substring(7)}
                        renderItem={({item}) => (<GameView onPress={()=> {this.props.getMySingleGame(item.id); Actions.start({edit: true})}} game={item}
                        />)}
                    />
                    }
                </ScrollView>
             
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
        backgroundColor: SITE_COLOR,
        flexDirection: 'column',
        shadowColor: 'rgba(0, 0, 0, 0.16)',
        borderBottomWidth: 0,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.3,
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
    const {gameLoading} = state.loading;
    const {myGames} = state.game;
   
    return { gameLoading, myGames};
};

export default connect(mapStateToProps, {getMyGames, getMySingleGame})(MyGames);

