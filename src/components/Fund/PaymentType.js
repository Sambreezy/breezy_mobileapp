import React, { Component } from 'react';
import { Content, Button} from 'native-base';
import { ImageBackground, View, ScrollView, Image, TouchableOpacity, Text, RefreshControl, FlatList } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {WHITE, LIGHT_GRAY, GRAY, GREEN, PINK, logo, PAYPAL, PAYSTACK } from './../../style';
import { formatMoney } from '../../Helper';
import { Card, Spinner } from '../Reusables';
import {
    getBalance, getTransactions, toggleAddAmountModal, 
    fundUpdate, toggleWithdrawModal, clearWithdrawError,
    clearFundError, initializeFunding
} from './../../redux/actions';

import { Actions } from 'react-native-router-flux';

class PaymentType extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasTried: false
        }
    }

    componentWillMount(){
      
    }

    fundWithPaystack(){
        let data = {
            processor: 'paystack',
            amount: this.props.amount
        }
        this.props.initializeFunding(data);
    }

    fundWithPaypal(){
        let data = {
            processor: 'paypal',
            amount: this.props.amount
        }
        this.props.initializeFunding(data);
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



    render() {

        return (
        
               <View style={{backgroundColor: WHITE, flex: 1, flexGrow: 1, padding: 20, justifyContent: 'center'}}>
                        {this.props.fundLoading ? <Spinner/> : null}
                        <Card style={{backgroundColor: LIGHT_GRAY, flex: 0, elevation: 0, borderRadius: 8, borderWidth: 0.2, borderTopColor: LIGHT_GRAY, marginTop: 15}}>
                                <TouchableOpacity onPress={() => this.fundWithPaypal()} style={{flexDirection: 'row', padding: 20}}>
                                    <Image
                                        source={PAYPAL}
                                        style={{width: 50, height: 50}}
                                    />
                                    <View style={{justifyContent: 'center', marginLeft: 10}}>
                                        <Text style={{fontSize: 16, color: 'black'}}>Fund Wallet</Text>
                                        <Text style={{fontSize: 15, color: GRAY}}>Top up your wallet with paypal.</Text>
                                    </View>
                                </TouchableOpacity>
                        </Card>
                    
                    
                        <Card style={{backgroundColor: LIGHT_GRAY, flex: 0, elevation: 0, borderRadius: 8, borderWidth: 0.2, borderTopColor: LIGHT_GRAY, marginTop: 40}}>
                                <TouchableOpacity onPress={() => this.fundWithPaystack()} style={{flexDirection: 'row', padding: 20}}>
                                    <Image
                                        source={PAYSTACK}
                                        style={{width: 35, height: 35}}
                                    />
                                    <View style={{justifyContent: 'center', marginLeft: 25}}>
                                        <Text style={{fontSize: 16, color: 'black'}}>Fund Wallet</Text>
                                        <Text style={{fontSize: 15, color: GRAY}}>Top up your wallet with paystack</Text>
                                    </View>
                                </TouchableOpacity>
                        </Card>
                    
                   
               </View>
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


const mapStateToProps = (state) => {
    const {balance, transactions, meta} = state.transaction;
    const {fundLoading} = state.loading;
    const {fundSuccess, withdrawSuccess, amount} = state.fund;

    return { balance, fundLoading, transactions, 
            fundSuccess, withdrawSuccess, meta, amount
        };
};

export default connect(mapStateToProps, { 
        getBalance, getTransactions, toggleAddAmountModal, 
        toggleWithdrawModal, fundUpdate, clearWithdrawError,
        clearFundError, initializeFunding
    })(PaymentType);

