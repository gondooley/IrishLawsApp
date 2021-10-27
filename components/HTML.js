import React, { useEffect, useState } from "react";
import { View } from "react-native";
import WebView from 'react-native-webview';

const HTML = (props) => {

  const [editedSource, setEditedSource] = useState('');

  // edit once only, when page first loads (hence empty array for second argument)
  useEffect(() => {
    // This eliminates links.
    // TODO: 12:22 4 October 2021 (GOC) - Reinstate links
    let html = String(props.source);
    let linkIndicator = '<a href=';
    let pos = html.indexOf(linkIndicator, 0);

    while (pos > -1) {
      console.log("Position: " + pos);
      // 1 beyond the end of the link anchor
      let openingTagEndIndex = html.indexOf('>', pos) + 1;
      console.log(html.substring(pos, openingTagEndIndex));
      let closingTagIndex = html.indexOf('</a>', openingTagEndIndex);
      console.log(html.substring(closingTagIndex, closingTagIndex + 5));
        // before opening tag
      html = html.substring(0, pos - 1)
        // element inner html
        + html.substring(openingTagEndIndex, closingTagIndex)
        // after closing tag
        + html.substring(closingTagIndex + 5, html.length);
        pos = html.indexOf(linkIndicator, pos + 1);
    }
    setEditedSource(html);
  }, []);

  return (
    <WebView
      source={{ 'html': editedSource }}
      originWhitelist={['*']} />
  );
}

export default HTML;
