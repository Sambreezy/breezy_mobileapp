import React, { Component } from 'react';
import { Modal, ScrollView, View, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import {Item, Input, Picker, Icon} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatMoney } from '../../Helper';
import {toggleWithdrawModal, fundUpdate, withdrawFromWallet, clearWithdrawError, resolveBankAccount} from './../../redux/actions';
import moment from 'moment';
import { Card, Spinner, AnimatedSpinner } from '../Reusables';
import { PINK, LIGHT_GRAY, SITE_COLOR, GRAY } from '../../style';
import { WHITE } from '../Reusables/styles';

class WithdrawModal extends Component { 
    
    constructor() {
        super();
        this.state = {
            hasTried: 0,
            bankCode: 0
        }
    }

    withdraw(){
       let data = {
           account_number: this.props.accountNumber,
           account_name: this.props.accountName,
           amount: this.props.amount,
           bank: this.props.bank,
           pin: this.props.pin
       }
       this.props.withdrawFromWallet(data);
    }

    renderWithdrawError(){
        
        if(this.props.withdrawErrorMessage.length > 0){
            
            setTimeout(() => this.props.clearWithdrawError(), 3000);
            
                return (
                    <View style={{backgroundColor: PINK,  justifyContent: 'center', position: 'absolute', left: 0, zIndex: 1000, right: 0, height: 45}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 16}}>{this.props.withdrawErrorMessage}</Text>
                    </View>
                );
            
            
        }
    }

    componentWillReceiveProps(nextProps){
        
        if(nextProps.accountNumber && nextProps.accountNumber.length == 10){
            if(this.state.hasTried == nextProps.accountNumber && nextProps.bankCode == this.state.bankCode) return;
            // if(this.props.bankCode != this.state.bankCode){
                this.props.banks.map((item, index) => {
                    if(item.code == this.props.bankCode){
                        this.props.fundUpdate({prop: 'bank', value: item.name})
                    }
                });
                this.props.resolveBankAccount({
                    account_number: nextProps.accountNumber,
                    bank_code: nextProps.bankCode
                });
               
            this.setState({bankCode: nextProps.bankCode, hasTried: nextProps.accountNumber});
            // }
            
        }

    }

    render() {
        const {withdrawError} = this.props;
        let disabled = this.props.resolveBankAccountLoading || this.props.accountName.length == 0 || this.props.accountNumber.length < 10;
        return (
            
            <Modal
                transparent={true}
                visible={this.props.withdrawModalVisible}
                onRequestClose={() => { console.log(true)}}
                animationType="fade"
               
            >
            {this.renderWithdrawError()}
            <View style={{backgroundColor: '#000000d6', flex: 1, justifyContent: 'space-around'}}>
                
                <Card style={styles.cardStyle}>
                        {this.props.withdrawLoading ? <Spinner/> : null}
                        <TouchableOpacity style={{flex: 0, marginTop: 10}} onPress={() => this.props.toggleWithdrawModal(false)}>
                            <MaterialCommunityIcons name="close-circle" size={20}  />
                        </TouchableOpacity>
                        
                        <Text style={{fontSize: 17, fontWeight: 'bold', textAlign: 'center', color: SITE_COLOR}}>Enter amount to Withdraw</Text>
                                        
                        <Item rounded style={{ marginTop: 15, marginLeft: 40, marginRight: 40, height: 42}}>
                            <Input 
                                style={{textAlign: 'left'}} 
                                keyboardType={'numeric'}
                                maxLength={7}
                                value={this.props.amount}
                                onChangeText={(value) => this.props.fundUpdate({prop: 'amount', value})}
                                placeholder={'Enter Amount'}
                                />
                        </Item>
                        {withdrawError.hasOwnProperty('amount') ?
                                <Text style={{color: 'red', paddingLeft: 45, paddingTop: 10, fontSize: 10}}>{withdrawError.amount[0]}</Text>
                            : null
                            }

                        <Item rounded style={{ marginTop: 15, marginLeft: 40, marginRight: 40, height: 42}}>
                            <Picker
                                note
                                mode="dropdown"
                                iosIcon={<Icon style={{flex: 1}} name="arrow-down" />}
                                style={{ flex: 1, paddingRight: 5 }}
                                selectedValue={this.props.bankCode ? this.props.bankCode : 0}
                                onValueChange={(value) => this.props.fundUpdate({prop: 'bankCode', value})}
                                >
                                <Picker.Item textStyle={{color: 'black'}} label={'Select Bank'} value={0} />
                                {  
                                    this.props.banks.map((item, index) => {
                                        return <Picker.Item key={index} label={item.name} value={item.code} />
                                    })
                                    
                                }
                            </Picker>
                        </Item>
                        {withdrawError.hasOwnProperty('bank_code') ?
                                <Text style={{color: 'red', paddingLeft: 45, paddingTop: 10, fontSize: 10}}>{withdrawError.bank_code[0]}</Text>
                            : null
                            }

                        <Item rounded style={{ marginTop: 15, marginLeft: 40, marginRight: 40, height: 42}}>
                            <Input 
                                style={{textAlign: 'left'}} 
                                keyboardType={'numeric'}
                                maxLength={10}
                                value={this.props.accountNumber}
                                onChangeText={(value) => this.props.fundUpdate({prop: 'accountNumber', value})}
                                placeholder={'Account Number'}
                                />
                        </Item>
                        {withdrawError.hasOwnProperty('account_number') ?
                                <Text style={{color: 'red', paddingLeft: 45, paddingTop: 10, fontSize: 10}}>{withdrawError.account_number[0]}</Text>
                            : null
                            }

                        <Item rounded style={{backgroundColor: LIGHT_GRAY, marginTop: 15, marginLeft: 40, marginRight: 40, height: 42}}>
                            <Input 
                                style={{textAlign: 'left'}} 
                                disabled
                                value={this.props.accountName}
                                onChangeText={(value) => this.props.fundUpdate({prop: 'accountName', value})}
                                placeholder={'Account Name'}
                                />
                                {this.props.resolveBankAccountLoading ? 
                                <ActivityIndicator style={{marginRight: 10}} size={'small'} />
                                : null }
                        </Item>
                        {withdrawError.hasOwnProperty('account_name') ?
                                <Text style={{color: 'red', paddingLeft: 45, paddingTop: 10, fontSize: 10}}>{withdrawError.account_name[0]}</Text>
                            : null
                            }

                        <Item rounded style={{ marginTop: 15, marginLeft: 40, marginRight: 40, height: 42}}>
                            <Input 
                                style={{textAlign: 'left'}} 
                                keyboardType={'numeric'}
                                secureTextEntry
                                maxLength={4}
                                value={this.props.pin}
                                onChangeText={(value) => this.props.fundUpdate({prop: 'pin', value})}
                                placeholder={'Enter Pin'}
                                />
                        </Item>
                        {withdrawError.hasOwnProperty('pin') ?
                                <Text style={{color: 'red', paddingLeft: 45, paddingTop: 10, fontSize: 10}}>{withdrawError.pin[0]}</Text>
                            : null
                            }
                
                        <TouchableOpacity 
                            onPress={() => this.withdraw()}
                            disabled={disabled}
                            style={{borderRadius: 25, marginBottom: 20, marginTop: 20, marginRight: 40, marginLeft: 40, padding: 13, backgroundColor: disabled ? PINK+'C5' : PINK}}>
                            <Text style={{textAlign: 'center', color: WHITE}}>Withdraw</Text>
                        </TouchableOpacity>
                </Card>  
              </View>  
                
            </Modal>
        );
    }
}


const styles = {

    cardStyle:{
        height: 420,
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 5,
        flex: 0,
        justifyContent: 'space-around'
    },

    detailViewStyle:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 20
    }
}

const mapStateToProps = (state) => {
    const {withdrawModalVisible} = state.general;
    const {withdrawLoading, resolveBankAccountLoading} = state.loading;
    const {withdrawError, withdrawErrorMessage} = state.errors;
    const {amount, bank, accountNumber, accountName, bankCode, banks, pin} = state.fund;
    return {
        withdrawModalVisible, withdrawLoading, withdrawError, 
        banks, amount, bank, bankCode, accountNumber, resolveBankAccountLoading,
        accountName, withdrawErrorMessage, pin
    };
};

export default connect(mapStateToProps,{toggleWithdrawModal, fundUpdate, withdrawFromWallet, resolveBankAccount, clearWithdrawError})(WithdrawModal);

