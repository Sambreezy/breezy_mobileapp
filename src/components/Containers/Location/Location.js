import React, { Component } from 'react';
import { ImageBackground, View, ScrollView, Image, StatusBar, TouchableOpacity, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomIcon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { BACKGROUND } from '../../../style/images';
import { RoundedButton, Text } from '../../Reusables';
import { WHITE, SITE_COLOR } from '../../../style/colors';
import { Field } from '../../Presenters/Location/Field';

const { RNTwitterSignIn } = NativeModules;


class Location extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
        }
        this.data = {}
    }


    render() {

        return (
            <ImageBackground 
                source={BACKGROUND}
                style={{width: null, flex: 1}}
            >
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content"/>
                <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 65, paddingLeft: 25, paddingRight: 25, justifyContent: 'space-around'}} style={{}}>
                    <View style={{justifyContent: 'center', flex: 1}}>
                        <View style={{flexDirection: 'row', marginBottom: 30, justifyContent: 'center'}}>
                            <MaterialCommunityIcon name={'map-marker'} color={SITE_COLOR} size={35} />
                        </View>
                        <Field onPress={() => Actions.selectCity()} name={'Enter your city'}/>
                        <Field onPress={() => Actions.selectArea()} name={'Enter your area'}/>
                        <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'flex-end', marginTop: 20}}>
                            <View style={{justifyContent: 'center', borderRadius: 100, padding: 5, paddingRight: 6, borderColor: SITE_COLOR, borderWidth: 0.6}}>
                                <FontAwesomIcon name="send" size={15} color={SITE_COLOR} />
                            </View>
                            <View style={{justifyContent: 'center'}}>
                                <Text style={{fontSize: 17, color: SITE_COLOR, paddingLeft: 10}}> Use my location</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <RoundedButton onPress={() => Actions.restaurants()}>
                            <Text style={{color: WHITE, textAlign: 'center', fontSize: 18}}>See Vendors</Text>
                        </RoundedButton>
                    </View>
                </ScrollView>
            </ImageBackground>
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

export default connect(mapStateToProps, {  })(Location);

