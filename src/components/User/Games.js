import React, { Component } from 'react';
import { Content, Button, Badge} from 'native-base';
import { ImageBackground, View, ScrollView, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {WHITE, LIGHT_GRAY, GRAY, LIGHT_GREEN, SITE_COLOR, RED, GREEN, BARCA, MANCITY, DEFAULT, BORDER } from './../../style';
import { formatMoney } from '../../Helper';
import { Card, Text } from '../Reusables';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import _ from 'lodash';

class Games extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    computeAmountStaked(stakes, sides){
        
        let leftSideAmount = 0;
        let rightSideAmount = 0;
        let leftStakeCount = 0;
        let rightStakeCount = 0;
        let left = sides[0] ? sides[0].id : 0;
        let right =sides[1] ? sides[1].id : 0;

        stakes = _.groupBy(stakes, function(stake){
            return stake.side_id;
        });
        
        let keys = Object.keys(stakes);
       
        if(stakes[left]){
            stakes[left].map((item, index) => {
            
                leftSideAmount += parseFloat(item.amount.replace(',',''));
                leftStakeCount++;
            });
        }
    
        if(stakes[right]){
            stakes[right].map((item, index) => {
                rightSideAmount += parseFloat(item.amount.replace(',',''));
                rightStakeCount++;
            });
        }
   
        return rightSideAmount + leftSideAmount;
    }

    computeTimeLeft(endTime){
        let end = moment().to(endTime);
        if (end.split(' ').includes('ago')){
            return 'Ended '+end;
        }
        return 'Ends '+end;
    }

    computePeoplePlayingGame(stakes, endTime){
        let end = moment().to(endTime);
        if (end.split(' ').includes('ago')){
            if(stakes.length == 0){
                return 'Nobody Played this game';
            }
            if(stakes.length == 1){
                return '1 person played this game';
            }else{
                return stakes.length +' people played this game'
            }
        }

        if(stakes.length == 0){
            return 'Nobody is playing this game yet';
        }
        if(stakes.length == 1){
            return '1 person is playing this game';
        }else{
            return stakes.length +' people are playing this game'
        }
    }

    render() {
        const {game, title, onPress} = this.props;
        const {sides, stakes} = game;
        
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
            <Card style={{ borderRadius: 8, paddingLeft: 15, paddingRight: 15, paddingTop: 15, marginBottom: 15}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.4, borderBottomColor: LIGHT_GRAY}}>
                    <View>
                        <Text style={{fontSize: 12}}>Who will win ?</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <MaterialCommunityIcon name="clock-outline" size={16} color={'#8E8B9E'}/>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={{paddingLeft: 5, fontSize: 11}}>
                                {this.computeTimeLeft(game.completion_time)}
                            </Text>
                        </View>
                        
                    </View>
                </View>
                <Text style={{textAlign: 'left', fontSize: 11, paddingTop: 3, color: GRAY}}>{this.computePeoplePlayingGame(stakes, game.completion_time)}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 10}}>
                    <View>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                            <Image
                                source={sides[0] && sides[0].icon ? {uri: sides[0].icon} : DEFAULT}
                                style={{width: 18, height: 18, marginTop: 2}}
                                resizeMode={'contain'}
                            />
                            
                            <Text style={{paddingLeft: 10, fontSize: 16}}>{sides[0] ? sides[0].name : ''}</Text>
                            
                        </View>
                        
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                            <Image
                                source={sides[1] && sides[1].icon ? {uri: sides[1].icon} : DEFAULT}
                                style={{width: 18, height: 18, marginTop: 2}}
                                resizeMode={'contain'}
                            />
                            <Text style={{paddingLeft: 10, fontSize: 16}}>{sides[1] ? sides[1].name : ''}</Text>
                        </View>
                    </View>
                    
                        <Badge style={{backgroundColor: GRAY, justifyContent: 'center', paddingLeft: 7.5, paddingRight: 7.5}}>
                            <Text style={{color: WHITE, fontSize: 11}}>vs</Text>
                        </Badge>
                    <View style={{}}>
                        <Image
                            source={BORDER}
                            style={{width: 10, height: 60}}
                        />
                    </View>
                    <View style={{}}>
                        <Text style={{fontSize: 14, color: SITE_COLOR}}>₦ {formatMoney(this.computeAmountStaked(stakes, sides), ',','.')}</Text>
                        <Text style={{color: GRAY, textAlign: 'center'}}>to be won</Text>
                    </View>
                </View>
            </Card>
            </TouchableOpacity>
        );


    }
}

const styles = {
    
}

const mapStateToProps = (state) => {
   
    return {  };
};

export default connect(mapStateToProps, { })(Games);

