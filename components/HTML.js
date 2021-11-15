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
    html = processLinks(html);
    html = processImageLinks(html);
    //web margins are too big for the mobile display
    html = shrinkSubsequentValues(html, 'margin-');
    html = shrinkSubsequentValues(html, 'text-indent');
    setEditedSource(html);
  }, [props.source]);

  function processImageLinks(html) {
    let imageIndicator = '<img src="';
    let pos = html.indexOf(imageIndicator, 0);

    while (pos > -1) {
      html = amendImageLink(html, pos);
      pos = html.indexOf(imageIndicator, pos + 1);
    }
    return html;
  }

  function amendImageLink(html, pos) {
    return html.substring(0, pos + 10)
      + "https://irishlaws.s3.eu-west-1.amazonaws.com"
      + html.substring(pos + 10);
  }

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
      html = html.substring(0, startOfValueIndex) + value
        + html.substring(pos);
      pos = html.indexOf(indicator, pos);
    }
    return html;
  }

  /**
   * Finds links and chooses what to do with them.
   * @param {String} html 
   * @returns html without links
   */
  function processLinks(html) {
    let linkIndicator = '<a href=';
    let pos = html.indexOf(linkIndicator, 0);
    html += `
      <script>
        function handleClick(msg) {
          window.ReactNativeWebView.postMessage(msg);
        }
      </script>
    `

    while (pos > -1) {
      // html = eliminateLink(html, pos);
      html = putClickTester(html, pos);
      pos = html.indexOf(linkIndicator, pos + 1);
    }
    return html;
  }

  function putClickTester(html, pos) {
    // 1 beyond the end of the link anchor
    let openingTagEndIndex = html.indexOf('>', pos) + 1;
    let closingTagIndex = html.indexOf('</a>', openingTagEndIndex);

    return html.substring(0, pos - 1) + " "                     // before opening tag
      + '<a href="#" onclick="handleClick(`Might sub this out`);event.preventDefault();">'
      + html.substring(openingTagEndIndex, closingTagIndex)     // element inner html
      + "</a>"
      + " " + html.substring(closingTagIndex + 5, html.length); // after closing tag

  }

  function eliminateLink(html, pos) {
    // 1 beyond the end of the link anchor
    let openingTagEndIndex = html.indexOf('>', pos) + 1;
    let closingTagIndex = html.indexOf('</a>', openingTagEndIndex);

    return html.substring(0, pos - 1) + " "                     // before opening tag
      + html.substring(openingTagEndIndex, closingTagIndex)     // element inner html
      + " " + html.substring(closingTagIndex + 5, html.length); // after closing tag
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

  function htmlToConsole(html) {
    let nextOutput = '';
    // let depth = 0;
    let isFirstChar = true;
    // let previousChar = '';
    let isTag = false;
    Array.from(html).forEach(function (character) {
      if (isFirstChar) {
        nextOutput = character;
        isFirstChar = false;
      } else {
        if (character = '<') {
          isTag = true;
        }
        // ' '.repeat(depth) + nextOutput
      }
    });

  }

  function linkClickDetected() {
    console.log("Link click detected");
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        let text = '<div style="font-size:'
          + getFontSize(value) + 'px;margin-right:0.50em">'
          + editedSource + "</div>";
        text = text.replace(/display:block/g, '');
        console.log('----------');
        console.log(text);
        console.log('----------');
        return (
          <WebView
            source={{ 'html': text }}
            originWhitelist={['*']}
            onMessage={(event) => {
              console.log("There's a click: " + event.nativeEvent.data);
            }} />
        );
      }}
    </ThemeContext.Consumer>
  );
}

export default HTML;
