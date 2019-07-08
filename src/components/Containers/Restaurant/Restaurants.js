import React, { Component } from 'react';
import { ImageBackground, View, ScrollView, Image, StatusBar, TouchableOpacity, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomIcon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { BACKGROUND, FOOD } from '../../../style/images';
import { RoundedButton, Text } from '../../Reusables';
import { WHITE, SITE_COLOR, GRAY } from '../../../style/colors';
import { RestaurantSection } from '../../Presenters/Restaurant/RestaurantSection';
import { calculateOpacity } from '../../../Helper';
import { SpecialOfferSection } from '../../Presenters/Restaurant/SpecialOfferSection';
import { NUNITO_BOLD, NUNITO_REGULAR } from '../../../style/font';

const { RNTwitterSignIn } = NativeModules;


class Restaurants extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
        }
        this.data = {}
    }


    render() {

        return (
            <View style={{backgroundColor: '#F5F5F5', flex: 1}}>
                 <View style={{paddingTop: 20, paddingBottom: 25, backgroundColor: WHITE}}>
                        <TouchableOpacity style={styles.locationStyle} activeOpacity={0.8}>
                            <View style={{flexDirection: 'row'}}>
                                <MaterialCommunityIcon color={GRAY} size={20} name="map-marker" />
                                <View style={{justifyContent: 'center', paddingLeft: 15}}>
                                    <Text style={{color: GRAY, fontSize: 14}}>New heaven</Text>
                                </View>
                            </View>
                            <MaterialCommunityIcon style={{marginRight: 10}} name="tune" size={25} color={SITE_COLOR+calculateOpacity(50)}/>
                        </TouchableOpacity>
                    </View>
                
                <ScrollView style={{backgroundColor: '#F5F5F5', flex: 1}} contentContainerStyle={{flexGrow: 1}}>
                    <View style={{marginTop: 15, marginLeft: 15}}>
                        <Text style={{color: '#403E3E', fontFamily: NUNITO_REGULAR, fontSize: 20}}>Special Offers</Text>
                    </View>
                    <View style={{paddingBottom: 20}}>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{backgroundColor: '#F5F5F5', flex: 1}} contentContainerStyle={{flexGrow: 1}}>
                            
                            <SpecialOfferSection
                                title={'Breakfast Special Package'} 
                                rate={2.5}
                                newOffer={true} 
                                minorder={250} 
                                open={true}
                                amount={'2,500'}
                                totalRating={56} 
                                logo={FOOD}
                                banner={FOOD}
                                storeName={'Ntachi Osa'}
                                address={'New Heaven'}
                            />
                            <SpecialOfferSection
                                title={'Breakfast Special Package'} 
                                rate={2.5}
                                newOffer={true} 
                                minorder={250} 
                                open={false}
                                amount={'2,500'}
                                totalRating={56} 
                                logo={FOOD}
                                banner={FOOD}
                                storeName={'Ntachi Osa'}
                                address={'New Heaven'}
                            />
                           
                            
                        </ScrollView>
                    </View>
                    <View style={{marginTop: 15, marginLeft: 15}}>
                        <Text style={{color: '#403E3E', fontFamily: NUNITO_REGULAR, fontSize: 20}}>All Vendors</Text>
                    </View>
                    <RestaurantSection
                        name={'Golden Toast'} 
                        rate={4.5}
                        newoffer={true} 
                        minorder={250} 
                        open={true}
                        totalRating={56} 
                        logo={FOOD}
                        banner={FOOD}
                        address={'New Heaven'}
                    />
                    <RestaurantSection
                        name={'Golden Toast'} 
                        rate={2.5}
                        newoffer={true} 
                        minorder={250} 
                        open={false}
                        totalRating={56} 
                        logo={FOOD}
                        banner={FOOD}
                        address={'New Heaven'}
                    />
                    
                </ScrollView>
            </View>
        );


    }
}

const BORDER_COLOR = '#C4C4C4';

const styles = {
    locationStyle: {
        borderWidth: 1,
        borderColor: '#707070',
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 15,
        marginRight: 15,
        paddingLeft: 15,
        borderRadius: 2,
        paddingTop: 12,
        paddingBottom: 12,
        elevation: 1.5
    }
}

const mapStateToProps = (state) => {
    const {authLoading} = state.loading;

    return { authLoading };
};

export default connect(mapStateToProps, {  })(Restaurants);

