import React, { Component } from 'react';
import { ImageBackground, View, ScrollView, Image, StatusBar, TouchableOpacity, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomIcon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { BACKGROUND } from '../../../style/images';
import { RoundedButton, Text, Hr } from '../../Reusables';
import { WHITE, SITE_COLOR } from '../../../style/colors';
import { CityAreaSection } from '../../Presenters/Location/CityAreaSection';
import { calculateOpacity } from '../../../Helper';

const { RNTwitterSignIn } = NativeModules;


class SelectArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
        }
        this.data = {}
    }


    render() {

        return (
            <ScrollView contentContainerStyle={{flexGrow: 1, padding: 15}} style={{backgroundColor: '#FBFBFB'}}>
                <View style={{paddingBottom: 15}}>
                    <Text style={{color: SITE_COLOR, fontSize: 20}}>Select area</Text>
                    <Hr style={{marginTop: 15, backgroundColor: '#707070'+calculateOpacity(53)}}/>
                </View>
                <CityAreaSection name={'New Haven'} />
                <CityAreaSection name={'Abakpa'} />
                <CityAreaSection name={'Emene'} />
                <CityAreaSection name={'Independence Layout'} />
            </ScrollView>
        );


    }
}

const BORDER_COLOR = '#C4C4C4';

const styles = {
    
}

const mapStateToProps = (state) => {
    const {authLoading} = state.loading;

    return { authLoading };
};

export default connect(mapStateToProps, {  })(SelectArea);

