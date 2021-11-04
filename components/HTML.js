import React, { useEffect, useState } from "react";
import WebView from 'react-native-webview';
import { ThemeContext } from "../settings/ThemeContext";

const HTML = (props) => {

  const [editedSource, setEditedSource] = useState('Loading...');

  // edit once only, when page first loads (hence empty array for second argument)
  useEffect(() => {
    // This eliminates links.
    // TODO: 12:22 4 October 2021 (GOC) - Reinstate links
    let html = eliminateLinks(String(props.source));
    setEditedSource(html);
  }, [props.source]);

  function eliminateLinks(html) {
    let linkIndicator = '<a href=';
    let pos = html.indexOf(linkIndicator, 0);

    while (pos > -1) {
      // 1 beyond the end of the link anchor
      let openingTagEndIndex = html.indexOf('>', pos) + 1;
      let closingTagIndex = html.indexOf('</a>', openingTagEndIndex);
        // before opening tag
      html = html.substring(0, pos - 1)
        // element inner html
        + html.substring(openingTagEndIndex, closingTagIndex)
        // after closing tag
        + html.substring(closingTagIndex + 5, html.length);
        pos = html.indexOf(linkIndicator, pos + 1);
    }
    return html;
  }

  function getFontSize(theme) {
    switch (theme) {
      case 'huge':
        return 88;
      case 'big':
        return 72;
      case 'medium':
        return 56;
      case 'small':
        return 40;
      case 'tiny':
      default:
        return 24;
    }
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        return (
          <WebView
          source={{ 'html': '<div style="font-size:' + getFontSize(value) + 'px">' + editedSource + "</div>" }}
          originWhitelist={['*']} />    
        );
      }}
      </ThemeContext.Consumer>
  );
}

export default HTML;
