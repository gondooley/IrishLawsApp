import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import * as Database from '../database'

const PageLawsInYear = (props) => {
  const [titlesInYear, setTitlesInYear] = useState([]);
  useEffect(() => {
    Database.fetchLawTitles(props.year)
      .then(data => {
        let dataArray = [];
        Object.keys(data).forEach((key) => {
          if (key != '_id') {
            dataArray.push(
              {
                'numberInYear': key,
                'title': data[key]
              }
            );
          }
        });
        setTitlesInYear(dataArray);
      }).catch((error) => {
        console.log('Error: ' + error);
      });
  }, []);

  const renderItem = (item) => {
    return (
      <Pressable style={{ height: 40, justifyContent: 'center' }} onPress={() => goToLaw(Number.parseInt(item.numberInYear))}>
        <Text>
          {item.numberInYear}. {item.title}
        </Text>
      </Pressable>
    );
  }

  function goToLaw(numberInYear) {
    props.setNumberInYear(numberInYear);
    props.nav('basicInfo');
  }


  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <Text style={{ color: 'white' }}>
        Oireachtas Laws for {props.year}
      </Text>
      <FlatList
        data={titlesInYear}
        renderItem={({ item }) => renderItem(item)} />
    </View>
  );
}

export default PageLawsInYear;