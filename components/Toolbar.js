import React from 'react';
import { Text, View } from 'react-native'

const Toolbar = () => {
    return (
      <View style={{ height: 56, backgroundColor: 'blue', flexDirection: 'row', justifyContent: 'space-between'}} >
          <Text>Irish Laws</Text>
          <Text>3</Text>
      </View>
    );
}

export default Toolbar;

