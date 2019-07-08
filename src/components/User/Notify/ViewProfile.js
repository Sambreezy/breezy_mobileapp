import React, { Component } from 'react';
import { Content, Button, List, ListItem, Left, Right, Body, Text, Container, TabHeading, Tab, Tabs, Thumbnail} from 'native-base';
import { ImageBackground, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { GRAY, SITE_COLOR, YELLOW, WHITE, avatar, LIGHT_GRAY, GREEN, LIGHT_GREEN } from './../../../style';

class ViewProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        const {name, time, avatar, onPress} = this.props;

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
                                accepted your friend request. {time}
                            </Text>
                        </Text>
                        <Text note></Text>
                    </Body>
                    <Right style={{borderBottomWidth: 0}}>
                        <TouchableOpacity onPress={onPress} style={{borderRadius: 25, padding: 8, backgroundColor: SITE_COLOR}}>
                            <Text style={{textAlign: 'center', color: WHITE, fontSize: 10}}>View Profile</Text>
                        </TouchableOpacity>
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

export default connect(mapStateToProps, { })(ViewProfile);

