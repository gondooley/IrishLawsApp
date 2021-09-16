import React from 'react';
import { Button, Text, View } from 'react-native';

const PageHome = (props) => {
  return (
    // top container
    <View style={{ flexDirection: 'column'}}>
        {/* Top button */}
        <View>
      </View>
        {/* Picture */}
        <View>
      </View>
        {/* Bottom button */}
        <View>
      </View>

      {/* <Text style={{color: 'white'}}>
        Home
      </Text>
      <Button 
        onPress={() => {
          props.nav('years');
        }}
        title="Year List"
        color="#841584"/>
      <Button 
        onPress={() => props.nav('defns')}
        title="Definition results"
        color="#841584"/> */}
    </View>
  );
}

export default PageHome;