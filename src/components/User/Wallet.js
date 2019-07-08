import React, { Component } from 'react';
import { Content, Button} from 'native-base';
import { ImageBackground, View, ScrollView, Image, TouchableOpacity, RefreshControl, FlatList } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {WHITE, LIGHT_GRAY, GRAY, LIGHT_GREEN, SITE_COLOR, RED, GREEN, PINK } from './../../style';
import { formatMoney } from '../../Helper';
import { Card, Text } from '../Reusables';
import {
    getBalance, getTransactions, toggleAddAmountModal, 
    fundUpdate, toggleWithdrawModal, clearWithdrawError,
    clearFundError, toggleCreatePinModal, settingUpdate
} from './../../redux/actions';

import moment from 'moment';
import AddAmountModal from '../Fund/AddAmountModal';
import WithdrawModal from '../Fund/WithdrawModal';
import CreatePin from './../Pin/CreatePin';

class Wallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasTried: false
        }
    }

    componentWillMount(){
        this.props.getBalance();
        this.props.getTransactions();
    }

    renderFundSuccess(){
        
        if(this.props.fundSuccess === true){
            
            setTimeout(() => { this.props.fundUpdate({prop: 'fundSuccess', value: false})}, 3000);
            
                return (
                    <View style={{backgroundColor: GREEN, justifyContent: 'center', position: 'absolute', left: 0, marginBottom: 60, zIndex: 1000, right: 0, height: 50}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 16}}>Funding Successful</Text>
                    </View>
                );
            
        }
    }


    renderWithdrawSuccess(){
        
        if(this.props.withdrawSuccess === true){
            
            setTimeout(() => { this.props.fundUpdate({prop: 'withdrawSuccess', value: false})}, 3000);
            
                return (
                    <View style={{backgroundColor: GREEN, justifyContent: 'center', position: 'absolute', left: 0, marginBottom: 60, zIndex: 1000, right: 0, height: 50}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 16}}>Withdraw Successful</Text>
                    </View>
                );
            
        }
    }

    isCredit(value){
        switch(value){

            case WITHDRAWAL:
                return {color: RED, text: 'You made a withdrawal ', credit: false};

            case BONUS:
                return {color: GREEN, text: 'You received a bonus ', credit: true};

            case STAKE:
                return {color: RED, text: 'You staked ', credit: false};

            case EARNING:
                return {color: GREEN, text: 'You Earned ', credit: true};

            case WINNING:
                return {color: GREEN, text: 'You won ', credit: true};
            
            default:
                return {color: GREEN, text: 'You received ', credit: true};
        }
    }

    renderTransactions(item){
        
         const {color, text, credit} = this.isCredit(item.type);
        return(
            <View style={styles.transactionHistoryStyle}>
                <View style={{justifyContent: 'center'}}>
                    <Text style={{color: 'black', fontSize:12}}> {text}</Text>
                    <Text style={{color: GRAY, fontSize: 12}}> {moment(item.created_at).format('MMM DD YYYY, hh:mm A')}</Text>
                </View>
                
                <Text style={{fontSize: 12, color}}>{credit ? '+' : '-'} ₦ {formatMoney(item.amount, ',', '.')}</Text>
            </View>
        );
    }


    renderSuccess(){
        
        if(this.props.success){
            
            setTimeout(() => this.props.settingUpdate({prop: 'success', value: false}), 3000);
            
                return (
                    <View style={{ backgroundColor: GREEN, justifyContent: 'center', position: 'absolute', left: 0, zIndex: 1000, right: 0, height: 45}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 16}}>Create Pin Successful</Text>
                    </View>
                );
            
            
        }else{
            return null;
        }
    }

    render() {

        return (
            <ScrollView 
            refreshControl={
                <RefreshControl
                refreshing={this.props.walletLoading}
                onRefresh={() => this.props.getBalance()}
                />
            }
                style={{backgroundColor: WHITE }}
                contentContainerStyle={{paddingLeft: 20, paddingRight: 20}}
                >
                {this.renderFundSuccess()}
                {this.renderWithdrawSuccess()}
                {this.renderSuccess()}
               <AddAmountModal/>
               <WithdrawModal/>
               <CreatePin/>
               <View style={{marginTop: 10}}>
                    <Text style={{textAlign: 'center', color: '#3F4054', fontSize: 35, paddingTop: 30, fontWeight: 'bold'}}>₦{formatMoney(this.props.balance.balance, ',', '.')}</Text>
                    <Text style={{textAlign: 'center', fontSize: 24, color: GRAY, paddingTop: 10, paddingBottom: 20}}>Wallet Balance</Text>
               </View>

               <View style={{flexDirection: 'row'}}>
                   <Card style={{backgroundColor: LIGHT_GRAY, elevation: 0, borderWidth: 0.2, borderTopColor: LIGHT_GRAY, borderTopLeftRadius: 12, borderBottomLeftRadius: 12, padding: 25}}>
                        <Text style={{textAlign: 'center', fontSize: 14, fontWeight: 'bold'}}>₦{formatMoney(this.props.meta.won_this_month, ',','.')}</Text>
                        <Text style={{textAlign: 'center', fontSize: 8}}>Won this Month</Text>
                   </Card>
                   <Card style={{backgroundColor: LIGHT_GRAY, elevation: 0, borderWidth: 0.2, borderTopColor: LIGHT_GRAY, borderTopRightRadius: 12, borderBottomRightRadius: 12, padding: 25}}>
                        <Text style={{textAlign: 'center', fontSize: 14, fontWeight: 'bold'}}>₦{formatMoney(this.props.balance.bonus_balance, ',','.')}</Text>
                        <Text style={{textAlign: 'center', fontSize: 8}}>Bonus Balance</Text>
                   </Card>
               </View>

               <View>
                   {
                       this.props.user.has_transaction_pin ?
                        <Card style={{backgroundColor: LIGHT_GRAY, elevation: 0, borderRadius: 12, borderWidth: 0.2, borderTopColor: LIGHT_GRAY, marginTop: 30}}>
                                <TouchableOpacity onPress={() => this.props.toggleAddAmountModal(true)} style={{flexDirection: 'row', padding: 20}}>
                                    <MaterialCommunityIcon name="credit-card" size={30} color={LIGHT_GREEN}/>
                                    <View style={{justifyContent: 'center', marginLeft: 30}}>
                                        <Text style={{fontSize: 16, color: 'black'}}>Fund Wallet</Text>
                                        <Text style={{fontSize: 10, color: GRAY}}>Play more, Win more, fund wallet sharpely</Text>
                                    </View>
                                </TouchableOpacity>
                        </Card>
                        : 

                        <Card style={{backgroundColor: LIGHT_GRAY, elevation: 0, borderRadius: 12, borderWidth: 0.2, borderTopColor: LIGHT_GRAY, marginTop: 30}}>
                                <TouchableOpacity onPress={() => this.props.toggleCreatePinModal(true)} style={{flexDirection: 'row', padding: 20}}>
                                    <MaterialCommunityIcon name="credit-card" size={30} color={LIGHT_GREEN}/>
                                    <View style={{justifyContent: 'center', marginLeft: 30}}>
                                        <Text style={{fontSize: 16, color: 'black'}}>Fund Wallet</Text>
                                        <Text style={{fontSize: 10, color: GRAY}}>Play more, Win more, fund wallet sharpely</Text>
                                    </View>
                                </TouchableOpacity>
                        </Card>
                   }

                   <Card style={{backgroundColor: LIGHT_GRAY, elevation: 0, borderRadius: 12, borderWidth: 0.2, borderTopColor: LIGHT_GRAY, marginTop: 15}}>
                        <TouchableOpacity onPress={() => this.props.toggleWithdrawModal(true)} style={{flexDirection: 'row', padding: 20}}>
                            <MaterialCommunityIcon name="cash" size={30} color={LIGHT_GREEN}/>
                            <View style={{justifyContent: 'center', marginLeft: 30}}>
                                <Text style={{fontSize: 16, color: 'black'}}>Withdraw Funds</Text>
                                <Text style={{fontSize: 10, color: GRAY}}>Tap to withdraw funds from your wallet</Text>
                            </View>
                        </TouchableOpacity>
                   </Card>
               </View>

               <View style={{marginTop: 20, paddingLeft: 5}}>
                   <Text style={{color: SITE_COLOR, fontSize: 12}}>RECENT TRANSACTIONS</Text>

                   <FlatList
                        data={this.props.transactions}
                        keyExtractor={(item) => Math.random().toString(36).substring(7)}
                        renderItem={({item}) => this.renderTransactions(item)}
                    />
                
               </View>
               
            </ScrollView>
        );


    }
}

const BORDER_COLOR = '#C4C4C4';

const styles = {
    transactionHistoryStyle:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 15,
        borderTopWidth: 0.4,
        borderTopColor: LIGHT_GRAY,
        paddingTop: 25,
        paddingBottom: 10
    }
}

const WITHDRAWAL = 'withdrawal';
const EARNING =  'earning';
const STAKE =  'stake';
const BONUS = 'bonus';
const WINNING = 'winning';

const mapStateToProps = (state) => {
    const {balance, transactions, meta} = state.transaction;
    const {walletLoading} = state.loading;
    const {user} = state.auth;
    const {success} = state.setting;
    const {fundSuccess, withdrawSuccess} = state.fund;

    return { balance, user, walletLoading, transactions, 
            fundSuccess, withdrawSuccess, meta, user, success
        };
};

export default connect(mapStateToProps, { 
        getBalance, getTransactions, toggleAddAmountModal, 
        toggleWithdrawModal, fundUpdate, clearWithdrawError,
        clearFundError, toggleCreatePinModal, settingUpdate
    })(Wallet);

