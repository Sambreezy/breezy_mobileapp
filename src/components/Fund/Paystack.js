import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ScrollView, Image} from 'react-native';
import { WebView } from 'react-native-webview';
import {Button} from 'native-base';
import { BLUE, WHITE } from '../../style';
import { ORANGE } from '../Reusables/styles';
import { Spinner, CustomInput } from '../Reusables';
import {verifyTransaction} from './../../redux/actions';
import settings from './../../redux/config';
import { Actions } from 'react-native-router-flux';
const source = require('./paystack.html');

class Paystack extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }

        const patchPostMessageFunction = function() {
            var originalPostMessage = window.postMessage;
          
            var patchedPostMessage = function(message, targetOrigin, transfer) { 
              originalPostMessage(message, targetOrigin, transfer);
            };
          
            patchedPostMessage.toString = function() { 
              return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            };
          
            window.postMessage = patchedPostMessage;
          };
          
          this.patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';
          
      }

    validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       
        if(email){
          email = email.trim();
          let newEmail = re.test(String(email).toLowerCase()) ? email : settings.defaultEmail;
          return newEmail;
        }else{
          return settings.defaultEmail;
        }
    }

    componentWillMount(){
        this.setState({loading: true});
    }


    handleNavigation(event){
        console.log(event)
    }

    handleMessage(event){
        let data = event.nativeEvent.data;
        console.log(data);
        data = JSON.parse(data);

        if(data.status == 'success'){
            this.props.verifyTransaction({reference: data.reference, processor: 'paystack'});
        }else{
            this.setState({loading: false});
            alert('Failed, '+ data.message);
            Actions.pop();
        }
        
    }

    passValues(){
      
        let data = {
            publicKey: this.props.paystackFundingDetails.public_key,
            ref: this.props.paystackFundingDetails.id,
            email: this.props.paystackFundingDetails.data.email,
            amount: this.props.amount
        }
        this.refs.webview.postMessage(JSON.stringify(data));
        this.setState({loading: false});
    }

    render() {
        const html = `
        <!DOCTYPE html>
        <html lang="">
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Paystack</title>
        
                <script src="https://js.paystack.co/v1/inline.js"></script>
               
        
                <script>
                    function payWithPayStack(amount, email, ref, publicKey) {
                          
                            var handler = PaystackPop.setup({
                                key: publicKey,
                                email: email,
                                amount:  parseFloat(amount) * 100,
                                currency: "NGN",
                                ref,
                                metadata: {
                                custom_fields: [
                                    {
                                        value: ''
                                    }
                                ]
                                },
                                callback: function(response){
                                    
                                    window.ReactNativeWebView.postMessage(JSON.stringify({
                                        reference: response.reference, 
                                        message: 'Transaction Successful', 
                                        status: 'success'
                                    }));
                                },
                                onClose: function(){
                                    window.ReactNativeWebView.postMessage(JSON.stringify({
                                        reference: '', 
                                        message: 'Transaction Cancelled by user',
                                        status: 'failed'
                                    }));
                                }
                            });
                            handler.openIframe();
                        }
        
                    document.addEventListener("message", function(data) {
                        
                        var details = JSON.parse(data.data);
                        payWithPayStack(details.amount, details.email, details.ref, details.publicKey);
                    });
        
                </script>
        
                <script>
                    if (document.readyState === "complete") {
                      
                     }
                </script>
            </head>
            </body>
        </html>
        `;
        return (
          <ScrollView contentContainerStyle={{flex: 1, flexGrow: 1}}>
             {this.state.loading ? <Spinner/>:null}
             {this.props.fundLoading ? <Spinner/>:null}
          
              <WebView
                source={{html}}
                onError={() => {alert('Error Occured'); Actions.pop()}}
                onLoadEnd={() => this.passValues()}
                originWhitelist={['*']}
                ref="webview"
                injectedJavaScript={this.patchPostMessageJsCode}
                onMessage={(event) => this.handleMessage(event)}
                onNavigationStateChange={(event) => this.handleNavigation(event)}
                javaScriptEnabled={true}
              />
          </ScrollView>
               
        );


    }
}

const TEST = 'TEST';
const LIVE = 'LIVE';

const mapStateToProps = (state) => {
    const {paystackFundingDetails, amount} = state.fund;
    const {fundLoading} = state.loading;
    return { paystackFundingDetails, amount, fundLoading};
};

export default connect(mapStateToProps, {verifyTransaction})(Paystack);

