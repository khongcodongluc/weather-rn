import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { AntDesign, Feather } from '@expo/vector-icons'; 

export default function NextDay({route, navigation}) {
    const { data } = route?.params;
    console.log("data", data[0]);
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Home');
            }}>
                <AntDesign name="back" size={40} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerItem}>3 NGÀY</Text>
          </View>
        <ScrollView>
            {
                data.map((item, index) => {
                    return (
                        <View key={index} style={styles.list}>
                            <Text style={styles.date}>{item.date}</Text>
                            <Image
                                alt="icon"
                                source={{
                                    uri: `https:${item?.day?.condition?.icon}`,
                                }}
                                style={{width: 55, height: 55, marginRight: 38}}
                            />
                            <View>
                                <Text style={styles.temp}>
                                    {`${Math.round(item.day.maxtemp_c)}\u2103`}
                                </Text>
                                <Text style={styles.temp}>
                                    {`${Math.round(item.day.mintemp_c)}\u2103`}
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
        marginRight: 140
    },
    temp: {
        fontSize: 18,
    }
})