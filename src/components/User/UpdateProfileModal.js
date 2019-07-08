import React, { Component } from 'react';
import { Modal, ScrollView, View, TouchableOpacity, Text} from 'react-native';
import { connect } from 'react-redux';
import {Item, Input} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatMoney } from '../../Helper';
import {toggleUpdateProfileModal, registerUpdate, clearProfileUpdateError, updateMyProfile} from './../../redux/actions';
import moment from 'moment';
import { Card, Spinner } from '../Reusables';
import { PINK, LIGHT_GRAY, SITE_COLOR } from '../../style';
import { WHITE } from '../Reusables/styles';

class UpdateProfileModal extends Component { 
    
    constructor() {
        super();
        this.state = {
   
        }
    }

    updateProfile(){
       let data = {
           name: this.props.name,
           username: this.props.username
       }
       this.props.updateMyProfile(this.props.user.id, data);
    }

    renderProfileUpdateError(){
        
        if(this.props.profileUpdateError.length > 0){
            
            setTimeout(() => this.props.clearProfileUpdateError(), 3000);
            
                return (
                    <View style={{backgroundColor: PINK, justifyContent: 'center', position: 'absolute', left: 0, zIndex: 1000, right: 0, height: 45}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 16}}>{this.props.profileUpdateError}</Text>
                    </View>
                );
            
            
        }
    }

    render() {
        const {profileUpdateValidationError} = this.props;
        return (
            
            <Modal
                transparent={true}
                visible={this.props.updateProfileModalVisible}
                onRequestClose={() => { console.log(true)}}
                animationType="fade"
               
            >
            {this.renderProfileUpdateError()}
            <View style={{backgroundColor: '#000000d6', flex: 1, justifyContent: 'space-around'}}>
                
                <Card style={styles.cardStyle}>
                        {this.props.profileUpdateLoading ? <Spinner/> : null}
                        <TouchableOpacity style={{flex: 0, marginTop: 10}} onPress={() => this.props.toggleUpdateProfileModal(false)}>
                            <MaterialCommunityIcons name="close-circle" size={20}  />
                        </TouchableOpacity>
                        
                        <Text style={{fontSize: 17, fontWeight: 'bold', textAlign: 'center', color: SITE_COLOR}}>Update your Profile</Text>
                       

                        <Item rounded style={{backgroundColor: LIGHT_GRAY, marginTop: 15, marginLeft: 40, marginRight: 40, height: 42}}>
                            <Input 
                                style={{textAlign: 'left'}} 
                                
                                
                                value={this.props.name}
                                onChangeText={(value) => this.props.registerUpdate({prop: 'name', value})}
                                placeholder={'  Name'}
                                />
                        </Item>
                        {profileUpdateValidationError.hasOwnProperty('name') ?
                            <Text style={{color: 'red', textAlign: 'center', paddingRight: 10, fontSize: 12}}>{profileUpdateValidationError.name[0]}</Text>
                        : null
                        }

                        <Item rounded style={{backgroundColor: LIGHT_GRAY, marginTop: 15, marginLeft: 40, marginRight: 40, height: 42}}>
                            <Input 
                                style={{textAlign: 'left'}} 
                                
                                
                                value={this.props.username}
                                onChangeText={(value) => this.props.registerUpdate({prop: 'username', value})}
                                placeholder={'  Username'}
                                />
                        </Item>
                        {profileUpdateValidationError.hasOwnProperty('username') ?
                            <Text style={{color: 'red', textAlign: 'center', paddingRight: 10, fontSize: 12}}>{profileUpdateValidationError.username[0]}</Text>
                        : null
                        }
                
                        <TouchableOpacity 
                            onPress={() => this.updateProfile()}
                            style={{borderRadius: 25, marginBottom: 20, marginTop: 20, marginRight: 40, marginLeft: 40, padding: 13, backgroundColor: PINK}}>
                            <Text style={{textAlign: 'center', color: WHITE}}>Update Profile</Text>
                        </TouchableOpacity>
                </Card>  
              </View>  
                
            </Modal>
        );
    }
}


const styles = {

    cardStyle:{
        height: 320,
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
    const {updateProfileModalVisible} = state.general;
    const {profileUpdateLoading} = state.loading;
    const {profileUpdateError, profileUpdateValidationError} = state.errors;
    const {name, username, user} = state.auth;
    return {updateProfileModalVisible,profileUpdateValidationError, user, profileUpdateLoading, profileUpdateError, name, username};
};

export default connect(mapStateToProps,{toggleUpdateProfileModal, updateMyProfile, registerUpdate, clearProfileUpdateError})(UpdateProfileModal);

