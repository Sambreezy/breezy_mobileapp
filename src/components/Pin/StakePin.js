import React, { Component } from 'react';
import { Modal, ScrollView, View, TouchableOpacity, Text} from 'react-native';
import { connect } from 'react-redux';
import {Item, Input} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatMoney } from '../../Helper';
import {toggleCreatePinModal, createWithdrawalPin} from './../../redux/actions';
import { Card, Spinner } from '../Reusables';
import { PINK, LIGHT_GRAY, SITE_COLOR, RED } from '../../style';
import { WHITE } from '../Reusables/styles';
import { Actions } from 'react-native-router-flux';

class CreatePin extends Component {
    constructor() {
        super();
        this.state = {
            pin: '',
            visible: true
        }
    }


    createPin(){
        this.props.createWithdrawalPin({pin: this.state.pin})
    }

    renderFundError(){
        
        if(this.props.createPinError.length > 0){
            
            setTimeout(() => this.props.clearFundError(), 3000);
            
                return (
                    <View style={{ marginTop: 30, backgroundColor: PINK, justifyContent: 'center', position: 'absolute', left: 0, zIndex: 1000, right: 0, height: 45}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 16}}>{this.props.fundError}</Text>
                    </View>
                );
            
            
        }
    }

    render() {
        
        return (
            
            <Modal
                transparent={true}
                visible={this.props.createPinModalVisible}
                onRequestClose={() => { console.log(true)}}
                animationType="fade"
               
            >
           
            <View style={{backgroundColor: '#000000d6', flex: 1, justifyContent: 'space-around'}}>
                
                <Card style={styles.cardStyle}>
                        {this.props.pinLoading ? <Spinner/> : null}
                        {/* <TouchableOpacity style={{flex: 0, marginTop: 10}} onPress={() =>this.props.toggleCreatePinModal(false)}>
                            <MaterialCommunityIcons name="close-circle" size={20}  />
                        </TouchableOpacity>
                         */}
                        <Text style={{fontSize: 17, fontWeight: 'bold', textAlign: 'center', color: SITE_COLOR}}>Create Transaction Pin</Text>
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
                                        <MaterialCommunityIcons style={{marginRight: 22}} name={ this.state.visible ?  'eye-off' : 'eye'} color={'black'} size={25}/>
                        
                                    </TouchableOpacity>
                            </Item>
                            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 12, color: RED}}>
                                {this.props.createPinError.hasOwnProperty('pin') ? this.props.createPinError.pin[0] : ''}
                            </Text>
                            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 12, color: RED}}>
                                {this.props.createPinErrorMessage}
                            </Text>
                        </View>  

                        <TouchableOpacity 
                            onPress={() => this.createPin()}
                            style={{borderRadius: 25, marginBottom: 20, marginRight: 60, marginLeft: 60, padding: 13, backgroundColor: PINK}}>
                            <Text style={{textAlign: 'center', color: WHITE}}>Create</Text>
                        </TouchableOpacity>
                </Card>  
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
    const {stakePinModalVisible} = state.general;

    return {stakePinModalVisible};
};

export default connect(mapStateToProps,{toggleStakePinModal, createWithdrawalPin})(CreatePin);

