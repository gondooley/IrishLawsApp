import React, { useContext } from "react";
import { Text } from "react-native";
import { ThemeContext } from "../settings/ThemeContext";

const ThemedText = (props) => {

  function getFontSize(theme) {
    switch (theme) {
      case 'huge':
        return 50;
      case 'big':
        return 30;
      case 'medium':
        return 22;
      case 'small':
        return 16;
      case 'tiny':
      default:
        return 12;
    }
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        return (
          <Text style={{ fontSize: getFontSize(value) }}>
            {props.text}
          </Text>
        );
      }}
    </ThemeContext.Consumer>
  );
}

export default ThemedText;
