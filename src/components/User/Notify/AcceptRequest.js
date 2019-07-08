import React, { Component } from 'react';
import { Content, Button, List, ListItem, Left, Right, Body, Text, Container, TabHeading, Tab, Tabs, Thumbnail} from 'native-base';
import { ImageBackground, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { GRAY, SITE_COLOR, YELLOW, WHITE, avatar, LIGHT_GRAY, GREEN, LIGHT_GREEN } from '../../../style';

class AcceptRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {

        return (
            
                
                <ListItem avatar style={{borderBottomWidth: 0.3, borderBottomColor: LIGHT_GRAY, paddingBottom: 10, marginLeft: 0, paddingLeft: 15}}>
                    <Left>
                        <Thumbnail small source={avatar} />
                    </Left>
                    <Body style={{borderBottomWidth: 0, paddingTop: 23, justifyContent: 'center'}}>
                        <Text> Jeremiahriz </Text>
                        
                    </Body>
                    <Right style={{borderBottomWidth: 0, flexDirection: 'row'}}>
                        <TouchableOpacity style={{borderRadius: 20, padding: 8, marginRight: 10, paddingLeft: 12, paddingRight: 12, backgroundColor: GREEN}}>
                            <Text style={{textAlign: 'center', color: WHITE, fontSize: 10}}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialCommunityIcon name="close-circle" size={25} color={LIGHT_GRAY} />
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

export default connect(mapStateToProps, { })(AcceptRequest);

