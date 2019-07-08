import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {initializeUser, getCategories, logoutUser} from './../../redux/actions';
import CreatePin from '../Pin/CreatePin';
import { Spinner } from '../Reusables';
import SplashScreen from 'react-native-splash-screen';

class Initializer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasFetchedCategory: false
        }
      
    }

    componentWillMount(){
        
        AsyncStorage.getItem('token')
            .then(token => {
                if(token){
               
                    this.props.initializeUser(token);
                    
                }else{
                    Actions.reset('login');
                }
            }).catch(err => {
                    Actions.reset('login');
            })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.auth && !this.state.hasFetchedCategory){
            setTimeout(()=>{
                this.props.getCategories();
            }, 100);
            this.setState({hasFetchedCategory: true});
            SplashScreen.hide();
            Actions.reset('auth');
        }
        if(nextProps.auth){
            SplashScreen.hide();
            // Actions.reset('auth');
        }
        
    }


    render() {

        return (
            null
        );


    }
}

const styles = {
  
}

const mapStateToProps = (state) => {
    const {categoryLoading} = state.loading;
    const {auth, user} = state.auth;
    console.log(user, auth);
    return {categoryLoading, auth, user};
};

export default connect(mapStateToProps, { initializeUser, getCategories, logoutUser})(Initializer);
