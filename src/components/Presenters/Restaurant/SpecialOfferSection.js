import React, { Component } from 'react';
import {TouchableOpacity, View, Image, Text as UText} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, Hr, Card} from './../../Reusables';
import { calculateOpacity } from '../../../Helper';
import ViewOverflow from 'react-native-view-overflow';
import { FOOD } from '../../../style/images';
import CornerLabel from '../Others/CornerLabel';
import { WHITE, SITE_COLOR } from '../../../style/colors';
import { NUNITO_BOLD, NUNITO_SEMIBOLD, NUNITO_REGULAR } from '../../../style/font';

const SpecialOfferSection = ({ onPress, style, title, amount, storeName, rate, newOffer, minOrder, open, totalRating, logo, banner, address}) => {

    return (
        <TouchableOpacity onPress={onPress} disabled={!open} activeOpacity={0.92} style={{paddingLeft: 15, paddingTop: 15, marginBottom: 15, paddingRight: 15, backgroundColor: '#F5F5F5'}}>
            <View style={{overflow: 'hidden'}}>
                <Image
                    source={banner || FOOD}
                    style={{maxWidth: 340, height: 180}}
                    resizeMode={'stretch'}
                />
                {newOffer ?
                <CornerLabel
                    cornerRadius={50}
                    style={{backgroundColor: '#F26522', height: 35}}
                    textStyle={{color: WHITE, }}>
                    New
                </CornerLabel>
                : null}
                {open ? null :
                <View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', zIndex: 10, top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "#000000"+calculateOpacity(70)}}>
                    <Text style={{color: WHITE, fontSize: 16, fontWeight: 'bold'}}>CLOSED</Text>
                </View>
                }
            </View>
            <Card style={styles.cardStyle}>
                <View style={{justifyContent: 'center', paddingLeft: 10}}>
                    <Text style={{fontSize: 16, lineHeight: 22, fontFamily: NUNITO_BOLD}}>
                        {title}
                    </Text>
                    
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row', flex: 11}}>

                        <Card style={{flex: 0, borderWidth: 0, alignSelf: 'center', padding: 2, elevation: 3, shadowColor: WHITE}}>
                            <Image
                                style={{width: 18, height: 20}}
                                source={logo || FOOD}
                                resizeMode={'stretch'}
                            />
                        </Card>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <Text style={{fontSize: 16, fontFamily: NUNITO_SEMIBOLD}}>
                                {storeName} --- <UText style={{fontSize: 14}}>
                                    {address}    
                                </UText>
                            </Text>
                            
                        </View>
                     
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <MaterialCommunityIcon name="chevron-right" size={22} />
                    </View>
                </View>
                <View style={{marginLeft: 5, marginTop: 5}}>
                    <Text style={{color: SITE_COLOR, fontFamily: NUNITO_REGULAR, fontSize: 20}}>₦{amount}</Text>
                </View>
            </Card>
            
        </TouchableOpacity>
    );
};

const styles = {
    cardStyle: {
        marginLeft: 0,
        marginRight: 0,
        elevation: 3.5,
        padding: 15,
        marginTop: 0,
        borderWidth: 0,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
    }
}

export { SpecialOfferSection };
