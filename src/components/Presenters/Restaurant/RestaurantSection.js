import React, { Component } from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, Hr, Card} from './../../Reusables';
import { calculateOpacity } from '../../../Helper';
import ViewOverflow from 'react-native-view-overflow';
import { FOOD } from '../../../style/images';
import CornerLabel from '../Others/CornerLabel';
import { WHITE, SITE_COLOR } from '../../../style/colors';

const RestaurantSection = ({ onPress, style, name, rate, newoffer, minorder, open, totalRating, logo, banner, address}) => {

    return (
        <TouchableOpacity onPress={onPress} disabled={!open} activeOpacity={0.92} style={{paddingLeft: 15, paddingTop: 15, marginBottom: 15, paddingRight: 15, backgroundColor: '#F5F5F5'}}>
            <View style={{overflow: 'hidden'}}>
                <Image
                    source={banner || FOOD}
                    style={{width: null, flex: 1, height: 230}}
                />
                {newoffer ?
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
                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row', flex: 11}}>
                        <Card style={{flex: 0, borderWidth: 0, alignSelf: 'center', padding: 3, elevation: 5, shadowColor: WHITE}}>
                            <Image
                                style={{width: 40, height: 35}}
                                source={logo || FOOD}
                                resizeMode={'stretch'}
                            />
                        </Card>
                        <View style={{justifyContent: 'center', paddingLeft: 10}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                            {name}
                            <Text style={{color: '#8E8E93', fontWeight: 'normal', fontSize: 13}}> -- {address}</Text>
                            </Text>
                            <View style={{flexDirection: 'row'}}>
                                <MaterialCommunityIcon size={15} name="silverware-variant" />
                                <Text style={{paddingLeft: 3, fontSize: 12}}>African Restaurant</Text>
                              
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 3}}>
                                <Text style={{marginLeft: 3, paddingLeft: 5, paddingRight: 5, fontSize: 8, borderRadius: 2, color: '#F26522', borderWidth: 1, borderColor: '#F26522', padding: 2}}>Popular</Text>
                                <Text style={{marginLeft: 3, paddingLeft: 5, paddingRight: 5, fontSize: 8, borderRadius: 2, color: '#F26522', borderWidth: 1, borderColor: '#F26522', padding: 2}}>Food Subscription</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 3}}>
                                <MaterialCommunityIcon size={18} name="star" color={rate && rate > 0 ? '#FFE14A' : '#B2B2B2'} />
                                <MaterialCommunityIcon size={18} name="star" color={rate && rate > 1 ? '#FFE14A' : '#B2B2B2'} />
                                <MaterialCommunityIcon size={18} name="star" color={rate && rate > 2 ? '#FFE14A' : '#B2B2B2'} />
                                <MaterialCommunityIcon size={18} name="star" color={rate && rate > 3 ? '#FFE14A' : '#B2B2B2'} />
                                <MaterialCommunityIcon size={18} name="star" color={rate && rate > 4 ? '#FFE14A' : '#B2B2B2'} />
                                <Text style={{color: '#B2B2B2', fontSize: 14}}> ({totalRating || 0})</Text>
                                <Text style={{color: '#B2B2B2', fontSize: 14, paddingLeft: 20}}> Min Order N {minorder || 0}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <MaterialCommunityIcon name="chevron-right" size={22} />
                    </View>
                </View>
            </Card>
            
        </TouchableOpacity>
    );
};

const styles = {
    cardStyle: {
        marginLeft: 0,
        marginRight: 0,
        elevation: 2,
        padding: 15,
        marginTop: 0,
        borderWidth: 0,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
    }
}

export { RestaurantSection };
