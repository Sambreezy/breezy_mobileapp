import { AppRegistry, YellowBox } from 'react-native';
import App from './src/App';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Remote debugger', 'RCTCxxM*']);

AppRegistry.registerComponent('Xend Food', () => App);
