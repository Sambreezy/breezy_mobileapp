import React, { Component } from 'react';
import { Modal, View, TouchableOpacity, Image, Text} from 'react-native';
import { connect } from 'react-redux';
import {Thumbnail} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {toggleFriendRequestModal, acceptFriendRequest, denyFriendRequest} from './../../redux/actions';
import { Card, Spinner } from '../Reusables';
import { WHITE } from '../Reusables/styles';
import { avatar, PINK, GREEN } from '../../style';

class FriendRequestModal extends Component { 
    
    constructor() {
        super();
        this.state = {
   
        }
    }


    render() {
        const {currentData} = this.props;
        return (
            
            <Modal
                transparent={true}
                visible={this.props.friendRequestModalVisible}
                onRequestClose={() => { console.log(true)}}
                animationType="fade"
               
            >
          
            <View style={{backgroundColor: '#000000d6', flex: 1, justifyContent: 'center'}}>
            {this.props.friendRequestLoading ? <Spinner/> : null}
            
                <Card style={styles.cardStyle}>
                        
                        <TouchableOpacity style={{flex: 0, marginTop: 5}} onPress={() => this.props.toggleFriendRequestModal(false, avatar)}>
                            <MaterialCommunityIcons name="close-circle" size={20}  />
                        </TouchableOpacity>
                        <View style={{alignSelf: 'center'}}>
                            <Text style={{marginTop: 10, textAlign: 'center', fontSize: 16, marginTop: 10, color: GREEN}}>Friend Request</Text>
                            <Thumbnail
                                source={ currentData.avatar ? {uri: currentData.avatar} : avatar}
                                style={{width: 200, height: 120, marginTop: 20, alignSelf: 'center'}}
                                resizeMode={'contain'}
                            />
                            <Text style={{marginTop: 10, fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>{currentData.name ? currentData.name : currentData.username}</Text>

                            <View style={{borderBottomWidth: 0, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                                <TouchableOpacity onPress={() => this.props.acceptFriendRequest(currentData.requestId)}  style={{paddingLeft: 15, paddingRight: 15, borderRadius: 25, height: 25, marginRight: 15, padding: 5, paddingTop: 4, paddingBottom: 3, backgroundColor: GREEN}}>
                                    <Text style={{textAlign: 'center', color: WHITE, fontSize: 10}}>Accept</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.denyFriendRequest(currentData.requestId)} style={{borderRadius: 25, paddingLeft: 17, paddingRight: 17, height: 25, marginRight: 15, padding: 5, paddingTop: 4, paddingBottom: 3, backgroundColor: PINK}}>
                                    <Text style={{textAlign: 'center', color: WHITE, fontSize: 10}}>Deny</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                </Card>  
              </View>  
                
            </Modal>
        );
    }
}


const styles = {

    cardStyle:{
        height: 320,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
        flex: 0,
        
    },

}

const mapStateToProps = (state) => {
    const {currentData, friendRequestModalVisible} = state.general;
    const {friendRequestLoading} = state.loading;
    return {currentData, friendRequestModalVisible, friendRequestLoading};
};

export default connect(mapStateToProps,{toggleFriendRequestModal, acceptFriendRequest, denyFriendRequest})(FriendRequestModal);

