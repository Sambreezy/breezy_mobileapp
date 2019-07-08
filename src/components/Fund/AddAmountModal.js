import React, { Component } from 'react';
import { Modal, ScrollView, View, TouchableOpacity, Text} from 'react-native';
import { connect } from 'react-redux';
import {Item, Input} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatMoney } from '../../Helper';
import {toggleAddAmountModal, fundUpdate, fundWallet, clearFundError} from './../../redux/actions';
import moment from 'moment';
import { Card, Spinner } from '../Reusables';
import { PINK, LIGHT_GRAY, SITE_COLOR } from '../../style';
import { WHITE } from '../Reusables/styles';
import { Actions } from 'react-native-router-flux';

class AddAmountModal extends Component {
    constructor() {
        super();
        this.state = {
   
        }
    }

    renderFundError(){
        
        if(this.props.fundError.length > 0){
            
            setTimeout(() => this.props.clearFundError(), 3000);
            
                return (
                    <View style={{ marginTop: 30, backgroundColor: PINK, justifyContent: 'center', position: 'absolute', left: 0, zIndex: 1000, right: 0, height: 45}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 16}}>{this.props.fundError}</Text>
                    </View>
                );
            
            
        }
    }

    fund(){
        Actions.paymenttype();
        this.props.toggleAddAmountModal(false);
        // this.props.fundWallet({amount: this.props.amount});
        
    }

    render() {
        
        return (
            
            <Modal
                transparent={true}
                visible={this.props.addAmountModalVisible}
                onRequestClose={() => { console.log(true)}}
                animationType="fade"
               
            >
            {this.renderFundError()}
            <View style={{backgroundColor: '#000000d6', flex: 1, justifyContent: 'space-around'}}>
                
                <Card style={styles.cardStyle}>
                        {this.props.fundLoading ? <Spinner/> : null}
                        <TouchableOpacity style={{flex: 0}} onPress={() => this.props.toggleAddAmountModal(false)}>
                            <MaterialCommunityIcons name="close-circle" size={20}  />
                        </TouchableOpacity>
                        
                        <Text style={{fontSize: 17, fontWeight: 'bold', textAlign: 'center', color: SITE_COLOR}}>Enter amount to Fund</Text>
                                        
                        <Item rounded style={{backgroundColor: LIGHT_GRAY, marginTop: 15, marginLeft: 60, marginRight: 60, height: 42}}>
                            <Input 
                                style={{textAlign: 'center'}} 
                                keyboardType={'numeric'}
                                maxLength={7}
                                value={this.props.amount}
                                placeholderTextColor={'#d0cdcd'}
                                onChangeText={(value) => this.props.fundUpdate({prop: 'amount', value})}
                                placeholder={`₦ ${formatMoney(5000, ',','.')}`}
                                />
                        </Item>
                
                        <TouchableOpacity 
                            onPress={() => this.fund()}
                            style={{borderRadius: 25, marginBottom: 20, marginRight: 60, marginLeft: 60, padding: 13, backgroundColor: PINK}}>
                            <Text style={{textAlign: 'center', color: WHITE}}>Fund</Text>
                        </TouchableOpacity>
                </Card>  
              </View>  
                
            </Modal>
        );
    }
}


const styles = {

    cardStyle:{
        height: 250,
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
    const {addAmountModalVisible} = state.general;
    const {fundLoading} = state.loading;
    const {fundError} = state.errors;
    const {amount} = state.fund;
    return {addAmountModalVisible, fundLoading, amount, fundError};
};

export default connect(mapStateToProps,{toggleAddAmountModal, clearFundError, fundUpdate, fundWallet})(AddAmountModal);

