
const platform = 'local';

let settings = {};

if (platform == 'local') {
    settings = {
        apiUrl: 'https://api.predictpal.com/',
        countryUrl: "https://restcountries.eu/rest/v2/",
        stateUrl: "http://locationsng-api.herokuapp.com/api/v1/states",
        lgaUrl: "http://locationsng-api.herokuapp.com/api/v1/states",
        clientID: "1e86d6aa-ec23-4157-b5ca-dd0e95727749",
        clientSecret: "zNvUQ5FivIvYDNsEEWaX0Z6uLL4BIOcGB5lHfTow",
        TWITTER_COMSUMER_KEY: "WsZWvbQZf2KDVlE6vxg8TiFgG",
        TWITTER_CONSUMER_SECRET: "7RZg57j073f2JqU6xoO8NJ6HEnHOOF7EovKbfjdkm7zvfAA3Fe",
        baseUrl: '',
        app_name: 'Predict Pal',
        subject: 'Predict Pal',
        appUrl: 'https://predictpal.com',
        gcmId: '645231926780'
    }
} else {
    settings = {
        apiUrl: 'https://api.predictpal.com/',
        countryUrl: "https://restcountries.eu/rest/v2/",
        stateUrl: "http://locationsng-api.herokuapp.com/api/v1/states",
        lgaUrl: "http://locationsng-api.herokuapp.com/api/v1/states",
        clientID: "1e86d6aa-ec23-4157-b5ca-dd0e95727749",
        clientSecret: "zNvUQ5FivIvYDNsEEWaX0Z6uLL4BIOcGB5lHfTow",
        TWITTER_COMSUMER_KEY: "WsZWvbQZf2KDVlE6vxg8TiFgG",
        TWITTER_CONSUMER_SECRET: "7RZg57j073f2JqU6xoO8NJ6HEnHOOF7EovKbfjdkm7zvfAA3Fe",
        baseUrl: '',
        appName: 'Predict Pal',
        subject: 'Predict Pal',
        appUrl: 'https://predictpal.com',
        gcmId: '645231926780'
       
    }
}



export default settings;