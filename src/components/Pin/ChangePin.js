import React, { Component } from 'react';
import { Modal, ScrollView, View, TouchableOpacity, Text} from 'react-native';
import { connect } from 'react-redux';
import {Item, Input} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatMoney } from '../../Helper';
import {toggleChangePinModal, changeWithdrawalPin} from './../../redux/actions';
import { Card, Spinner } from '../Reusables';
import { PINK, LIGHT_GRAY, SITE_COLOR, RED } from '../../style';
import { WHITE } from '../Reusables/styles';
import { Actions } from 'react-native-router-flux';

class ChangePin extends Component {
    constructor() {
        super();
        this.state = {
            pin: '',
            current_pin: ''
        }
    }


    ChangePin(){
        let data = {
            current_pin: this.state.current_pin,
            pin: this.state.pin
        }
        this.props.changeWithdrawalPin(data);
    }

    render() {
        
        return (
            
            <Modal
                transparent={true}
                visible={this.props.changePinModalVisible}
                onRequestClose={() => { console.log(true)}}
                animationType="fade"
               
            >
           
            <View style={{backgroundColor: '#000000d6', flex: 1, justifyContent: 'space-around'}}>
                <View>
                    <TouchableOpacity style={{flex: 0, alignSelf: 'center', marginBottom: 15}} onPress={() => this.props.toggleChangePinModal(false)}>
                        <MaterialCommunityIcons color={WHITE} name="close" size={24}  />
                    </TouchableOpacity>
                    <Card style={styles.cardStyle}>
                            {this.props.pinLoading ? <Spinner/> : null}
                            
                            <Text style={{fontSize: 18, marginTop: 20, fontWeight: 'normal', textAlign: 'center'}}>Change Transaction Pin</Text>
                            <View>                
                                <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 12, color: RED}}>
                                    {this.props.createPinErrorMessage}
                                </Text>
                                <Item regular  style={{ marginTop: 15, marginLeft: 60, marginRight: 60, height: 50}}>
                                    <Input 
                                        style={{textAlign: 'center'}} 
                                        keyboardType={'numeric'}
                                        maxLength={4}
                                        secureTextEntry
                                        value={this.props.amount}
                                        placeholderTextColor={'#d0cdcd'}
                                        onChangeText={(value) => this.setState({current_pin: value})}
                                        placeholder={'Current pin'}
                                        />
                                </Item>
                                <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 12, color: RED}}>
                                    {this.props.createPinError.hasOwnProperty('current_pin') ? this.props.createPinError.current_pin[0] : ''}
                                </Text>
                            </View>
                        
                            <View>
                                <Item regular  style={{ marginTop: 15, marginLeft: 60, marginRight: 60, height: 50}}>
                                    <Input 
                                        style={{textAlign: 'center'}} 
                                        keyboardType={'numeric'}
                                        maxLength={4}
                                        secureTextEntry
                                        value={this.props.amount}
                                        placeholderTextColor={'#d0cdcd'}
                                        onChangeText={(value) => this.setState({pin: value})}
                                        placeholder={'New Pin'}
                                        />
                                </Item>
                                <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 12, color: RED}}>
                                    {this.props.createPinError.hasOwnProperty('pin') ? this.props.createPinError.pin[0] : ''}
                                </Text>
                            </View>
                    
                            <TouchableOpacity 
                                onPress={() => this.ChangePin()}
                                style={{borderRadius: 25, marginBottom: 20, marginTop: 15, marginRight: 60, marginLeft: 60, padding: 13, backgroundColor: PINK}}>
                                <Text style={{textAlign: 'center', color: WHITE}}>Change</Text>
                            </TouchableOpacity>
                    </Card>  
                </View>
              </View>  
                
            </Modal>
        );
    }
}


const styles = {

    cardStyle:{
        height: 300,
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
    const {changePinModalVisible} = state.general;
    const {pinLoading} = state.loading;
    const {createPinError, createPinErrorMessage} = state.errors;

    return {changePinModalVisible, pinLoading, createPinError, createPinErrorMessage};
};

export default connect(mapStateToProps,{toggleChangePinModal, changeWithdrawalPin})(ChangePin);

