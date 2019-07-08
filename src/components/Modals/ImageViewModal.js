import React, { Component } from 'react';
import { Modal, View, TouchableOpacity, Image} from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {toggleImageViewModal} from './../../redux/actions';
import { Card, Spinner } from '../Reusables';
import { WHITE } from '../Reusables/styles';
import { avatar } from '../../style';
import { calculateOpacity } from '../../Helper';

class ImageViewModal extends Component { 
    
    constructor() {
        super();
        this.state = {
   
        }
    }


    render() {
        
        return (
            
            <Modal
                transparent={true}
                visible={this.props.imageViewModalVisible}
                onRequestClose={() => { console.log(true)}}
                animationType="fade"
               
            >
          
            <View style={{backgroundColor: '#000000'+calculateOpacity(65), flex: 1, justifyContent: 'center'}}>
                
                <Card style={styles.cardStyle}>
                        
                        <TouchableOpacity style={{flex: 0, marginTop: 5}} onPress={() => this.props.toggleImageViewModal(false, avatar)}>
                            <MaterialCommunityIcons name="close-circle" size={20}  />
                        </TouchableOpacity>
                        <View style={{alignSelf: 'center'}}>
                            <Image
                                source={this.props.currentImage}
                                style={{width: 450, height: 260, marginTop: 10}}
                                resizeMode={'contain'}
                            />
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
    const {currentImage, imageViewModalVisible} = state.general;
    return {currentImage, imageViewModalVisible};
};

export default connect(mapStateToProps,{toggleImageViewModal})(ImageViewModal);

