import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import getTimeByLocal from '../helpers/convertTime';


export default function NextDay({route, navigation}) {
    const { data } = route?.params;
    // console.log("data", data[0]);

    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Home');
            }}>
                <AntDesign name="back" size={40} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerItem}>Daily Forecast</Text>
          </View>
        <ScrollView>
            {
                data.map((item, index) => {
                    return (
                        <View key={index} style={styles.list}>
                            <Text style={styles.date}>
                                {(getTimeByLocal.getDate(item?.dt * 1000)).split(" ")[1]}
                            </Text>
                            <Image
                                alt="icon"
                                source={{
                                    uri: `https://openweathermap.org/img/wn/${item?.weather[0]?.icon}@4x.png`,
                                }}
                                style={{width: 55, height: 55, marginRight: 30}}
                            />
                            <View>
                                <Text style={styles.temp}>
                                    {`${Math.round(item?.temp?.max)}\u2103`}
                                </Text>
                                <Text style={styles.temp}>
                                    {`${Math.round(item?.temp?.min)}\u2103`}
                                </Text>
                            </View>
                        </View>
                    );
                })
            }
        </ScrollView>
      </View>
    )
  
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink',
        height: '100%',
    },
    header: {
        
    },
    headerItem: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 24,
        borderBottomWidth: 1,
    },
    list: {
        marginTop: 20,
        paddingBottom: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1,
    },
    date: {
        fontSize: 18,
        paddingTop: 10,
        paddingLeft: 20,
        marginRight: 136
    },
    temp: {
        fontSize: 18,
    }
})