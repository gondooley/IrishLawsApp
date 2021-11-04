import React, { useEffect, useState } from "react";
import WebView from 'react-native-webview';
import { ThemeContext } from "../settings/ThemeContext";

const HTML = (props) => {

  const [editedSource, setEditedSource] = useState('Loading...');

  // edit once only, when page first loads (hence empty array for second argument)
  useEffect(() => {
    // This eliminates links.
    // TODO: 12:22 4 October 2021 (GOC) - Reinstate links
    let html = String(props.source);
    html = eliminateLinks(html);

    //web margins are too big for the mobile display
    html = shrinkSubsequentValues(html, 'margin-');
    html = shrinkSubsequentValues(html, 'text-indent');
    // console.log('----------');
    // console.log(html);
    // console.log('----------');
    setEditedSource(html);
  }, [props.source]);

  /**
   * Reduces the value following some html style attribute
   * @param {String} html 
   * @param {String} indicator 
   * @returns 
   */
  function shrinkSubsequentValues(html, indicator) {
    let pos = html.indexOf(indicator, 0);

    while (pos > -1) {
      // it is deemed unnecessary to find which 'side' for a margin
      // let sideEndPosition = html.indexOf(':', pos);
      // console.log("Side end position: " + sideEndPosition);
      // let side = html.substring(pos + 7, sideEndPosition);
      // console.log("Margin indicator found for: " + side);

      pos = html.indexOf(":", pos) + 1;
      let startOfValueIndex = pos;
      let stringValue = "";
      //negative value
      if (html.charAt(pos) == '-') {
        stringValue = '-';
        pos++;
      }
      // either '.' or within range '0' to '9'
      while (html.charAt(pos) == '.'
        || (html.charCodeAt(pos) >= 48 && html.charCodeAt(pos) <= 57)) {
        stringValue += html.charAt(pos);
        pos++;
      }
      // make 8 times smaller
      let value = Number(stringValue) / 8;
      console.log("Value: " + value);
      html = html.substring(0, startOfValueIndex) + value
        + html.substring(pos);
      pos = html.indexOf(indicator, pos);
    }
    return html;
  }

  /**
   * This method is used to strip out links.
   * It will be removed when links are dealt with.
   * @param {String} html 
   * @returns html without links
   */
  function eliminateLinks(html) {
    let linkIndicator = '<a href=';
    let pos = html.indexOf(linkIndicator, 0);

    while (pos > -1) {
      // 1 beyond the end of the link anchor
      let openingTagEndIndex = html.indexOf('>', pos) + 1;
      let closingTagIndex = html.indexOf('</a>', openingTagEndIndex);
      // before opening tag
      html = html.substring(0, pos - 1) + " "
        // element inner html
        + html.substring(openingTagEndIndex, closingTagIndex)
        // after closing tag
        + " " + html.substring(closingTagIndex + 5, html.length);
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
            source={{ 'html': '<div style="font-size:' + getFontSize(value) + 'px;margin-right:0.50em">' + editedSource + "</div>" }}
            originWhitelist={['*']} />
        );
      }}
    </ThemeContext.Consumer>
  );
}

export default HTML;
