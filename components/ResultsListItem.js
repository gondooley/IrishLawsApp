import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import * as Database from '../database';

const ResultsListItem = (props) => {

    const [text, setText] = useState('Loading...');
    let year = String(props.item).substring(0, 4);
    let numberInYear = '';
    var index = 5;
    console.log("Checking you can index a string: " + props.item[index]);
    for (; props.item[index] != '-'; index++) {
        numberInYear += String(props.item).substr(index, 1);
        console.log("Adding " + String(props.item).substr(index, 1) + " makes " + numberInYear);
    }
    let sectionNumber = String(props.item).substr(index + 1);
    let isSchedule = String(props.item).startsWith('schedule');
    if (isSchedule) {
        sectionNumber = String(sectionNumber).substr(8);
    }
    console.log('About to fetch ' + numberInYear + " of " + year);
    Database.fetchBasicInfo(year, numberInYear)
        .then(basicInfo => {
            console.log(JSON.stringify(basicInfo));
            let returningText = basicInfo.title + ", ";
            if (isSchedule) {
                returningText += 'Schedule ';
            } else {
                returningText += 'Section ';
            }
            setText(returningText + sectionNumber);
        }).catch(error => {
            console.log(JSON.stringify(error));
        });

    return (
        <Pressable
            key={props.item}
            onPress={() => onPress(basicInfo)}>
            <View style={{ flexDirection: 'column' }}>
                <View style={{
                    backgroundColor: 'gray',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text>{props.section.title}</Text>
                    <Text>{props.index + 1}</Text>
                </View>
                <View style={{ backgroundColor: 'white' }}>
                    <Text>
                        {text}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

export default ResultsListItem;