import React, { Component } from 'react';
import { Content, Button, List, ListItem, Left, Right, Body, Thumbnail} from 'native-base';
import { ImageBackground, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text } from './../../Reusables';
import { GRAY, WHITE, avatar} from './../../../style';
import { formatMoney } from '../../../Helper';

class WonGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }


    render() {
        const {sideA, sideB, time, status, amount} = this.props;
        return (
            <View style={{backgroundColor: WHITE, marginBottom: 15}}>
                <List>
                    <ListItem avatar>
                    <Left>
                        <TouchableOpacity>
                            <Thumbnail small source={avatar} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={{borderBottomWidth: 0}}>
                        <Text style={{fontSize: 14}}>
                              <Text note>
                                You {status} {sideA} vs {sideB} game. {time}
                            </Text>
                        </Text>
                        <Text note></Text>
                    </Body>
                    <Right style={{borderBottomWidth: 0}}>
                    <TouchableOpacity disabled style={{borderRadius: 25, padding: 8, backgroundColor: GRAY}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 10}}> + ₦ {formatMoney(amount, ',','.')}</Text>
                    </TouchableOpacity>
                    </Right>
                    </ListItem>
                </List>
            </View>
        );


    }
}

const BORDER_COLOR = '#C4C4C4';

const styles = {

}

const mapStateToProps = (state) => {
   
    return {  };
};

export default connect(mapStateToProps, { })(WonGame);

