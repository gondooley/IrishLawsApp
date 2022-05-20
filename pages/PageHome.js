import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

const PageHome = (props) => {

  const HomeButton = (plops) => {
    return (
      <Pressable onPress={plops.onPress}>
        <View style={[{ backgroundColor: 'white', margin: 24, padding: 16, borderRadius: 2 }, plops.style]}>
          <Text style={{ fontSize: 22, color: '#656565' }}>
            {plops.children}
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={{ flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
        {/*activate search*/}
        <HomeButton onPress={() => {
          if (props.searchInputActivated == false) {
            props.setSearchInputActivated(true);
          } else {
            props.searchRequest();
          }
        }}>
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
        <HomeButton onPress={() => props.switchPage('years')} style={{ justifyContent: 'center', alignItems: 'center' }}>
          Choose law by year
        </HomeButton>
      </View>
    </ScrollView>);
}

export default PageHome;