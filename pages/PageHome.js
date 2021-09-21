import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

const PageHome = (props) => {

  const HomeButton = (plops) => {
    return (
      <View style={[{ backgroundColor: 'white', margin: 24, padding: 16, borderRadius: 2 }, plops.style] }>
        <Text style={{ fontSize: 22, color: '#656565' }}>
          {plops.children}
        </Text>
      </View>
    );
  }

  return (
    // top container
    <View style={{ flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
      <HomeButton>
        Search for definitions in Irish Laws
      </HomeButton>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Image source={require('../images/irish_laws_icon.png')}
          style={{
            height: '85%',
            width: '85%',
            resizeMode: 'contain',
          }} />
      </View>
      <HomeButton style={{ justifyContent: 'center', alignItems: 'center' }}>
        Choose law by year
      </HomeButton>

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