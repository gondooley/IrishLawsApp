import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native'

const Toolbar = (props) => {
  [inputShowing, setInputShowing] = useState(false);

  return (
    <View style={{ height: 56, backgroundColor: 'blue', flexDirection: 'row', justifyContent: 'space-between' }} >
      {inputShowing
        ?
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Pressable onPress={() => setInputShowing(false)}>
            <View style={{ width: 50, backgroundColor: 'red', flex: 1 }}>
              <Text>Back</Text>
            </View>
          </Pressable>
          <TextInput style={{ flex: 1, backgroundColor: 'white' }} />
          <View style={{ width: 50, backgroundColor: 'white' }}>
            <Text>Q</Text>
          </View>
        </View>
        :
        <Text>Irish Laws</Text>
      }
      <View style={{ flexDirection: 'row' }}>
        {inputShowing
          ? null : (
            <Pressable onPress={() => setInputShowing(true)}>
              <View style={{ width: 50, backgroundColor: 'green', flex: 1 }}>
                <Text>Q</Text>
              </View>
            </Pressable>
          )}
        <Pressable onPress={() => props.fontSizeModal(true)}>
          <View style={{ width: 50, backgroundColor: 'lightgreen', flex: 1 }}>
            <Text>3</Text>
          </View>
        </Pressable>
      </View>
    </View >
  );
}

export default Toolbar;

