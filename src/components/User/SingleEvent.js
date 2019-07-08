import React, { Component } from 'react';
import { Content, Button, Thumbnail, Badge, Switch, Item, Input} from 'native-base';
import { ImageBackground, View, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import ToggleSwitch from 'toggle-switch-react-native';
import ViewOverflow from 'react-native-view-overflow';
import Share from 'react-native-share';
import {stake, stakeUpdate, getSingleGame, clearStakeError, clearSingleGame} from './../../redux/actions'; 
import {WHITE, LIGHT_GRAY, GRAY, SITE_COLOR, PINK,LIGHT_PURPLE, YELLOW, DEFAULT, RED, GREEN } from './../../style';
import { formatMoney, isObjectEmpty, isNumeric } from '../../Helper';
import { Card, Spinner, Toastr, Text } from '../Reusables';
import { Players } from './Players';
import moment from 'moment';
import _ from 'lodash';
import config from './../../redux/config';

class SingleEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            on: false,
            keys: [],
            stakes: [],
            hasTried: false,
            amountError: '',
            pin: '',
            visiblePin: false,
            visible: true
        }
    }

    componentWillMount(){
        this.props.getSingleGame(this.props.id);
        this.props.clearStakeError();
    }

    componentWillUnmount(){
        this.props.clearSingleGame();
    }

    validate(){
        if(!isNumeric(this.props.amount)){
            this.setState({amountError: 'Enter a valid amount'});
            return;
        }

        if(this.props.amount.length <= 0){
            this.setState({amountError: 'Amount cannot be empty'});
            return;
        }

        this.setState({visiblePin: true});
    }

    stakeGame(){
        const {game} = this.props;
        const {sides, stakes} = game;
        this.setState({hasTried: false});

        let data = {
            amount: parseFloat(this.props.amount.trim()),
            game: game.id,
            pin: this.state.pin,
            side: this.state.on ? sides[1].id : sides[0].id
        };
        
        this.props.stake(data);
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
   
        return {
            rightSideAmount, leftSideAmount, leftStakeCount, 
            rightStakeCount, totalAmount: rightSideAmount + leftSideAmount
        };
    }

    renderError(){
        
        if(this.props.stakeError.length > 0 && !this.state.hasTried){
            
            setTimeout(() => this.setState({hasTried: true}), 3000);
            
                return (
                    <View style={{backgroundColor: PINK, justifyContent: 'center', position: 'absolute', left: 0, zIndex: 1000, right: 0, height: 45}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 16}}>{this.props.stakeError}</Text>
                    </View>
                );
            
            
        }
    }

    renderStakeSuccess(){
        
        if(this.props.stakeSuccess.length > 0 && !this.state.hasTried){
            this.setState({visiblePin: false});
            setTimeout(() => {this.setState({hasTried: true}); this.props.stakeUpdate({prop: 'stakeSuccess', value: ''})}, 3000);
            
                return (
                    <View style={{backgroundColor: GREEN, justifyContent: 'center', position: 'absolute', left: 0, zIndex: 1000, right: 0, height: 45}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 16}}>{this.props.stakeSuccess}</Text>
                    </View>
                );
            
            
        }
    }

    computeTimeLeft(endTime){
        let end = moment().to(endTime);
        if (end.split(' ').includes('ago')){
            return 'Ended '+end;
        }
        return 'Ends '+end;
    }

    render() {
        const {game} = this.props;
        let {sides, stakes} = game;
        let left = sides && sides[0] ? sides[0].id : 0;
        let right = sides && sides[1] ? sides[1].id : 0;
        const data = sides ? this.computeAmountStaked(stakes, sides) : {};
        stakes = _.groupBy(stakes, function(stake){
            return stake.side_id;
        });

        
        let gameOptions = !isObjectEmpty(game) ? {
            title: 'Predict Pal',
            message: `Bet on ${sides[0].name} vs ${sides[1].name} `,
            url: config.appUrl+'/game/'+game.reference,
            subject: 'Predict Pal',
            failOnCancel: true
        }: {};
        
        let keys = Object.keys(stakes);
        return (
            <View style={{flex: 1}}>
                
                {this.renderStakeSuccess()}
                <ScrollView 
                    contentContainerStyle={{paddingBottom: 25, flexGrow: 1}}
                    style={{backgroundColor: SITE_COLOR}}>
                    
                {this.props.singleGameLoading ? <Spinner/> : null}
                {this.props.stakeLoading ? <Spinner/> : null}
                { !isObjectEmpty(this.props.game) && sides[0] ? 
                <View>
                        <Modal
                            transparent={true}
                            visible={this.state.visiblePin}
                            onRequestClose={() => { console.log(true)}}
                            animationType="fade"
                        
                        >
                        {this.renderError()}
                        <View style={{backgroundColor: '#000000d6', flex: 1, justifyContent: 'space-around'}}>
                        
                            <Card style={styles.cardStyle}>
                                    {this.props.pinLoading ? <Spinner/> : null}
                                    <TouchableOpacity style={{flex: 0, marginTop: 10}} onPress={() =>this.setState({visiblePin: false})}>
                                        <MaterialCommunityIcon name="close-circle" size={20}  />
                                    </TouchableOpacity>
                                   
                                    <Text style={{fontSize: 17, fontWeight: 'bold', textAlign: 'center', color: SITE_COLOR}}>Enter Transaction Pin</Text>
                                    <View>               
                                        <Item rounded style={{backgroundColor: LIGHT_GRAY, marginTop: 15, marginLeft: 60, marginRight: 60, height: 42}}>
                                            
                                            <Input 
                                                style={{paddingLeft: 20}} 
                                                autoCorrect={false}
                                                placeholderTextColor={'#d0cdcd'}
                                                secureTextEntry={this.state.visible}
                                                value={this.state.pin}
                                                maxLength={4}
                                                onChangeText={(value) => this.setState({pin: value})}
                                                placeholder={'Pin'}
                                                />
                                                <TouchableOpacity onPress={() => this.setState({visible: !this.state.visible})}>
                                                    <MaterialCommunityIcon style={{marginRight: 22}} name={ this.state.visible ?  'eye-off' : 'eye'} color={'black'} size={25}/>
                                    
                                                </TouchableOpacity>
                                        </Item>
                                       
                                    </View>  

                                    <TouchableOpacity 
                                        onPress={() => this.stakeGame()}
                                        style={{borderRadius: 25, marginBottom: 20, marginRight: 60, marginLeft: 60, padding: 13, backgroundColor: PINK}}>
                                        <Text style={{textAlign: 'center', color: WHITE}}>Stake</Text>
                                    </TouchableOpacity>
                            </Card>  
                        </View>  
                            
                        </Modal>
                    
                        <View style={{marginTop: 20}}>
                            <Text style={{color: WHITE, fontSize: 24, textAlign: 'center', fontWeight: 'bold'}}>
                                ₦ {formatMoney(data.totalAmount, ',', '.')} 
                                    <Text style={{fontSize: 12, fontWeight: 'normal', paddingLeft: 5}}>  to be won!</Text>
                                </Text>

                                <Text style={{ color: WHITE, textAlign: 'center', fontSize: 10, marginTop: 20}}>
                                    {this.computeTimeLeft(game.completion_time)}</Text>
                                <Text style={{ color: WHITE, textAlign: 'center', fontSize: 10, marginTop: 10}}>
                                {console.log(game)}
                                    End Date: {moment(game.completion_time, 'YYYY-MM-DD HH:mm:ss').format('Do MMMM, YYYY  |  HH:mm:ss A')} 
                                </Text>
                        </View>
                        
                        <ViewOverflow style={{borderRadius: 15, marginTop: 60, marginLeft: 10, marginRight: 10, paddingBottom: 30, backgroundColor: WHITE}}>
                                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between', position: 'absolute', left: 30, right: 30}}>
                                    <Thumbnail
                                        style={{marginTop: -30}}
                                        source={sides[0].icon ? {uri: sides[0].icon} : DEFAULT}
                                    />
                                    <Badge style={{backgroundColor: GRAY, justifyContent: 'center', marginTop: 15, paddingLeft: 7.5, paddingRight: 7.5}}>
                                        <Text style={{color: WHITE, fontSize: 11}}>vs</Text>
                                    </Badge>
                                    <Thumbnail
                                            style={{marginTop: -30}}
                                            source={sides[1].icon ? {uri: sides[1].icon} : DEFAULT}
                                    />
                                </View>

                                <View style={{flexDirection: 'row', paddingLeft: 10, paddingRight: 10, justifyContent: 'space-between', marginTop: 60}}>
                                    <View>
                                        <Text style={{textAlign: 'center', fontFamily: 'Segoe UI', fontWeight: 'bold', fontSize: 16, color: '#3F4054'}}>{sides[0].name}</Text>
                                        <Text style={{textAlign: 'center', fontSize: 9}}>Your chosen winning team</Text>
                                    </View>
                                    <View>
                                        <ToggleSwitch
                                            isOn={this.state.on}
                                            onColor={SITE_COLOR}
                                            offColor={'#C0BFDE'}
                                            size='small'
                                            onToggle={ (isOn) => this.setState({on: !this.state.on}) }
                                        />
                                    </View>
                                    <View>
                                        <Text style={{textAlign: 'center', fontFamily: 'Segoe UI', fontWeight: 'bold', fontSize: 16, color: '#3F4054'}}>{sides[1].name}</Text>
                                        <Text style={{textAlign: 'center', fontSize: 9}}>Betting against this team</Text>
                                    </View>
                                </View>

                                <View style={{marginTop: 20, paddingLeft: 80, paddingRight: 80}}>
                                    <Text style={{fontSize: 14, textAlign: 'center', color: SITE_COLOR}}>Enter amount to put</Text>
                                    
                                    <Item rounded style={{backgroundColor: LIGHT_GRAY, marginTop: 15, height: 42}}>
                                        <Input 
                                            style={{textAlign: 'center'}} 
                                            keyboardType={'numeric'}
                                            onFocus={() => this.setState({amountError: ''})}
                                            value={this.props.amount}
                                            placeholderTextColor={'#d0cdcd'}
                                            onChangeText={(value) => this.props.stakeUpdate({prop: 'amount', value})}
                                            placeholder={`₦ ${formatMoney(5000, ',','.')}`}
                                            />
                                    </Item>
                                    <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 12, color: RED}}>{this.state.amountError}</Text>

                                    <TouchableOpacity 
                                        onPress={() => this.validate()}
                                        style={{borderRadius: 25, marginTop: 20, padding: 13, backgroundColor: PINK}}>
                                        <Text style={{textAlign: 'center', color: WHITE}}>Place Bet</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, paddingLeft: 0, paddingRight: 8}}>
                                    <View style={{flexDirection: 'row', marginLeft: 10}}>
                                        <View style={{justifyContent: 'center'}}>
                                            <Card style={{borderRadius: 100, paddingTop: 4, paddingBottom: 4, borderColor: "#efefea", shadowOpacity: 1, elevation: 1, borderColor: GRAY, borderWidth: 0.2, shadowColor: "#ddd", shadowOffset: {width: 2, height: 4}}}>
                                                <Thumbnail
                                                    style={{width: 25, height: 25}}
                                                    source={sides[0].icon ? {uri: sides[0].icon} : DEFAULT}
                                                    small
                                                    resizeMode={'cover'}
                                                />
                                            </Card>
                                            
                                        </View>
                                        <View style={{paddingLeft: 8}}>
                                            <Text style={{textAlign: 'left', fontSize: 17, color: '#8E8B9E', fontWeight: 'bold'}}>₦ {formatMoney(data.leftSideAmount, ',', '.')}</Text>
                                            <Text style={{textAlign: 'center', fontSize: 9}}>Total amount staked</Text>
                                        </View>
                                    </View>

                                    <View style={{flexDirection: 'row', marginRight: 10}}>
                                        <View style={{justifyContent: 'center'}}>
                                            <Card style={{borderRadius: 100, paddingTop: 4, paddingBottom: 4, borderColor: "#efefea", shadowOpacity: 1, elevation: 1, borderColor: GRAY, borderWidth: 0.2, shadowColor: "#ddd", shadowOffset: {width: 2, height: 4}}}>
                                                
                                                <Thumbnail
                                                    style={{width: 25, height: 25}}
                                                    source={sides[1].icon ? {uri: sides[1].icon} : DEFAULT}
                                                    resizeMode={'cover'}
                                                    small
                                                />
                                            </Card>
                                            
                                        </View>
                                        <View style={{paddingLeft: 8}}>
                                            <Text style={{textAlign: 'left', fontSize: 17, color: '#8E8B9E', fontWeight: 'bold'}}>₦ {formatMoney(data.rightSideAmount, ',', '.')}</Text>
                                            <Text style={{textAlign: 'center', fontSize: 9}}>Total amount staked</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, paddingLeft: 8, paddingRight: 8}}>
                                    <View>
                                        {stakes[left] ? stakes[left].map((item, index) => {
                                            if(index == LIMIT - 1)return null;
                                            if(item.side_id == left){
                                                return <Players
                                                            key={index}
                                                            image={item.user.avatar ? {uri: item.user.avatar} : DEFAULT}
                                                            name={item.user.username ? item.user.username.substring(0,10) : item.user.name.substring(0,10)}
                                                            amount={item.amount.replace(',','')}
                                                        />
                                            }
                                            
                                        }): null}
                                        
                                        {
                                            data.leftStakeCount > LIMIT ?
                                            <View style={{flexDirection: 'row', marginBottom: 10}}>
                                                <View style={{backgroundColor: SITE_COLOR, padding: 5, paddingTop: 7, paddingBottom: 7, borderRadius: 25, }}>
                                                    <Text style={{color: WHITE, fontSize: 6}}>{data.leftStakeCount > LIMIT ? (data.leftStakeCount - LIMIT) + '+' : ''}</Text>
                                        
                                                </View>
                                                <View style={{justifyContent: 'center'}}>
                                                    <Text style={{paddingLeft: 5, fontSize: 10}}>Others are playing</Text>

                                                </View>
                                                
                                            
                                            </View>
                                            : null
                                        }
                                    </View>
                                    <View>
                                        {stakes[right] ? stakes[right].map((item, index) => {
                                            if(index == LIMIT - 1)return null;
                                            if(item.side_id == right){
                                                return <Players
                                                            key={index}
                                                            image={item.user.avatar ? {uri: item.user.avatar} : DEFAULT}
                                                            name={item.user.username ? item.user.username.substring(0,10) : item.user.name.substring(0,10)}
                                                            amount={item.amount.replace(',','')}
                                                        />
                                            }
                                            
                                        }): null}
                                        
                                        {
                                            data.rightStakeCount > LIMIT ?
                                            <View style={{flexDirection: 'row', marginBottom: 10}}>
                                            
                                                <View style={{backgroundColor: SITE_COLOR, padding: 5, paddingTop: 7, paddingBottom: 7, borderRadius: 25, }}>
                                                    <Text style={{color: WHITE, fontSize: 6}}>{data.rightStakeCount > LIMIT ? (data.rightStakeCount - LIMIT) + '+' : ''}</Text>
                                        
                                                </View>
                                                <View style={{justifyContent: 'center'}}>
                                                <Text style={{paddingLeft: 5, fontSize: 10}}>Others are playing</Text>

                                                </View>
                                                
                                            </View>
                                            : null
                                        
                                        }
                                    </View>
                                </View>

                                <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                                    <Badge style={{justifyContent: 'center', backgroundColor: GRAY}}>
                                        <MaterialCommunityIcon name="message-reply-text" color={WHITE} size={15}/>
                                    </Badge>
                                    <View style={{justifyContent: 'center'}}>
                                        <Text style={{paddingLeft: 15, color: SITE_COLOR, fontSize: 14}}>Join the general chat</Text>
                                    </View>
                                </TouchableOpacity>
                                
                        </ViewOverflow>

                        <View style={{flexDirection: 'row', paddingLeft: 10, paddingRight: 10}}>
                                <TouchableOpacity 
                                    activeOpacity={0.6} 
                                    style={{borderRadius: 25, flex: 1, marginTop: 20, marginRight: 10, paddingTop: 15, paddingBottom: 15, paddingLeft: 10, paddingRight: 10, backgroundColor: LIGHT_PURPLE}}
                                    onPress={() => {
                                        Share.open(gameOptions)
                                            .then(res => console.log(res))
                                            .catch(err => console.log(err));
                                    }}
                                    >
                                    <Text style={{textAlign: 'center', color: WHITE, fontSize: 12}}>Play with a friend</Text>
                                </TouchableOpacity>
                                
                                    <TouchableOpacity 
                                        activeOpacity={0.6} 
                                        style={{borderRadius: 25, marginLeft: 10, flex: 1, marginTop: 20, paddingTop: 15, paddingBottom: 15, paddingLeft: 10, paddingRight: 10, backgroundColor: LIGHT_PURPLE}}
                                        onPress={() => {
                                            Share.open(shareOptions)
                                                .then(res => console.log(res))
                                                .catch(err => console.log(err));
                                        }}
                                        >
                                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 12}}>Invite your friends</Text>
                                    </TouchableOpacity>
                                    
                            
                        </View>
                        <View style={{padding: 10, paddingRight: 25, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Text style={{fontSize: 10, color: WHITE}}>Earn <Text style={{color: YELLOW}}>₦{formatMoney(150, ',','.')}</Text> for each invite</Text>
                        </View>
                    </View>
                    : null}
                </ScrollView>
                   
            </View>
        );


    }
}

let shareOptions = {
    title: 'Predict Pal',
    message: 'Checkout this game I am about to play on Predict pal',
    url: config.appUrl,
    subject: 'Predict Pal',
    failOnCancel: true
};



const LIMIT = 8;
const styles = {
    cardStyle:{
        height: 300,
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 5,
        flex: 0,
        justifyContent: 'space-around'
    },
}

const mapStateToProps = (state) => {
    const {amount, stakeSuccess} = state.stake;
    const {singleGame} = state.game;
    const {stakeLoading, singleGameLoading} = state.loading;
    const {stakeError} = state.errors;
    return {amount, stakeLoading, stakeSuccess, singleGameLoading, game: singleGame, stakeError};
};

export default connect(mapStateToProps, {stake, stakeUpdate, getSingleGame, clearStakeError, clearSingleGame})(SingleEvent);

