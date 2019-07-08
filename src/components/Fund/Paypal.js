import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, Platform} from 'react-native';
import { WebView } from 'react-native-webview';
import { Spinner} from '../Reusables';
import {verifyTransaction} from './../../redux/actions';
import { Actions } from 'react-native-router-flux';
const source = require('./paypal.html');

class PayPal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            sent: false
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

    componentWillMount(){
        this.setState({loading: true});
    }


    handleNavigation(event){
        console.log(event)
    }

    handleMessage(event){
        let data = event.nativeEvent.data;
        data = JSON.parse(data);
        console.log(event.nativeEvent);
        if(data.status == 'success'){
            this.props.verifyTransaction({reference: data.reference, processor: 'paypal'});
            
        }else{
            this.setState({loading: false});
            alert('Failed, '+ data.message);
            Actions.pop();
        }
        
    }

    passValues(){
        const { amount, paypalFundingDetails} = this.props;
        
        let data = {
            amount,
            orderID: paypalFundingDetails.result.id
        }
     
        if(!this.state.sent){
            this.refs.webview.postMessage(JSON.stringify(data));
            this.setState({loading: false, sent: true});
        }
        
    }

    render() {
        const html = `<!DOCTYPE html>
        <html lang="">
          <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Paypal</title>
            <script src="https://www.paypal.com/sdk/js?client-id=AbjVnFAkIY_ZofxGjndksY9lBP0Xkbh-SFJV82Hc3MXyYOBLCO86FT6oGlRzkY-OrD3YgxSNTeyAOvAr"></script>
            
            <style>
                html, body{
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(180deg, #3D40AD 0%, #6B6ED7 100%);
                }
        
                .container{
                    height: 100%;
                    display: flex;
                    margin-left: 20px;
                    margin-right: 20px;
                    overflow-y: scroll;
                    justify-content: center;
                    align-items: center;
        
                }
                p{
                    color: white;
                    font-size: 16px;
                    text-align: justify;
                    margin-bottom: 50px;
                }
                #preloaderSpinner{
                  display: none;
                }
            </style>
          </head>
          <body>
              <div class="container">
                    <div style="justify-content: center; text-align: center">
                        <img width="80px" height="80px" src="data:image/png;base64,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"/>
                        <p>
                        </p>
                        <div id="paypal-button-container"></div>
                    </div>
              </div>
            
            
            <script>
              function payWithPayPal(amount, orderID) {
                paypal
                  .Buttons({
                    
                    createOrder: function(data, actions) {
                        return new Promise(function(resolve, reject){
                          resolve(orderID);
                      });
                    },
        
                    onApprove: function(data, actions) {
                        window.ReactNativeWebView.postMessage(JSON.stringify({
                            reference: data.orderID, 
                            message: 'Transaction Successful',
                            status: 'success'
                        }));
                    }
                  })
                  .render("#paypal-button-container");
              }
        
              document.addEventListener("message", function(data) {
                var details = JSON.parse(data.data);
                document.querySelector('p').innerText = "You are about to fund your wallet with USD "+details.amount+" on Predict Pal. Click on any of the payment options to proceed. Your account will be credited instantly after payment."
                payWithPayPal(details.amount, details.orderID);
              })
            
            </script>
          </body>
        </html>
        `;
        return (

            <View style={{flex: 1}}>
            {this.state.loading ? <Spinner/>:null}
             {this.props.fundLoading ? <Spinner/>:null}
             <WebView
            
               source={{html}}
               originWhitelist={["*"]}

               onError={() => {alert('Error Occured'); Actions.pop()}}
               onLoadEnd={() => this.passValues()}
               ref="webview"
               thirdPartyCookiesEnabled={true}
               scrollEnabled={true}
               domStorageEnabled={true}
               startInLoadingState={true}
               injectedJavaScript={this.patchPostMessageJsCode}
               onMessage={(event) => this.handleMessage(event)}
               onNavigationStateChange={(event) => this.handleNavigation(event)}
               
               javaScriptEnabled={true}
             />
         </View>

        );


    }
}

const mapStateToProps = (state) => {
    const {amount, paypalFundingDetails} = state.fund;
    const {fundLoading} = state.loading;
    return {amount, paypalFundingDetails, fundLoading};
};

export default connect(mapStateToProps, {verifyTransaction})(PayPal);

