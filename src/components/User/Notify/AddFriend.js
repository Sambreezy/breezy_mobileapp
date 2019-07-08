import React, { Component } from 'react';
import {ListItem, Left, Right, Body, Thumbnail, Text} from 'native-base';
import {TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {WHITE, GREEN } from '../../../style';

class AddFriend extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        const {name, time, hasFriend, onPress, avatar} = this.props;
        
        return (
            
                
                <ListItem avatar style={{marginBottom: 15}}>
                    <Left>
                        <TouchableOpacity onPress={onPress}>
                            <Thumbnail small source={avatar} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={{borderBottomWidth: 0}}>
                        <Text style={{fontSize: 14}}>
                            {name}  <Text note>
                                    sent you a friend request
                            </Text>
                        </Text>
                        <Text note>{time}</Text>
                    </Body>
                    <Right style={{borderBottomWidth: 0}}>
                        {
                            hasFriend ? 
                            <TouchableOpacity style={{borderRadius: 25, padding: 8, backgroundColor: GREEN}}>
                                <Text style={{textAlign: 'center', color: WHITE, fontSize: 10}}>Accept</Text>
                            </TouchableOpacity>
                            :
                            null
                        }
                        
                    </Right>
                </ListItem>
                 

        );


    }
}

const BORDER_COLOR = '#C4C4C4';

const styles = {

}

const mapStateToProps = (state) => {
   
    return {  };
};

export default connect(mapStateToProps, { })(AddFriend);

