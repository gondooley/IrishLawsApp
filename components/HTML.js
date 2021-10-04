import React from "react";
import WebView from 'react-native-webview';

const HTML = (props) =>
    <WebView
        source={{ 'html': props.source }}
        originWhitelist={['*']} />;

export default HTML;
