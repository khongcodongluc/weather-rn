import { Text, StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'

import { Feather } from '@expo/vector-icons'

export default function NextDay() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>14 NGÀY</Text>
        <ScrollView>
        <View style={styles.list}>
            <Text style={styles.date}>10/02/2022</Text>
            <Feather style={styles.icon} name="sun" size={40} color="black" />
            <View>
                <Text>23</Text>
                <Text>16</Text>
            </View>
        </View>
        <View style={styles.list}>
            <Text style={styles.date}>10/02/2022</Text>
            <Feather style={styles.icon} name="sun" size={40} color="black" />
            <View>
                <Text>23</Text>
                <Text>16</Text>
            </View>
        </View>
        <View style={styles.list}>
            <Text style={styles.date}>10/02/2022</Text>
            <Feather style={styles.icon} name="sun" size={40} color="black" />
            <View>
                <Text>23</Text>
                <Text>16</Text>
            </View>
        </View>
        <View style={styles.list}>
            <Text style={styles.date}>10/02/2022</Text>
            <Feather style={styles.icon} name="sun" size={40} color="black" />
            <View>
                <Text>23</Text>
                <Text>16</Text>
            </View>
        </View>
        <View style={styles.list}>
            <Text style={styles.date}>10/02/2022</Text>
            <Feather style={styles.icon} name="sun" size={40} color="black" />
            <View>
                <Text>23</Text>
                <Text>16</Text>
            </View>
        </View>
        <View style={styles.list}>
            <Text style={styles.date}>10/02/2022</Text>
            <Feather style={styles.icon} name="sun" size={40} color="black" />
            <View>
                <Text>23</Text>
                <Text>16</Text>
            </View>
        </View>
        <View style={styles.list}>
            <Text style={styles.date}>10/02/2022</Text>
            <Feather style={styles.icon} name="sun" size={40} color="black" />
            <View>
                <Text>23</Text>
                <Text>16</Text>
            </View>
        </View>
        <View style={styles.list}>
            <Text style={styles.date}>10/02/2022</Text>
            <Feather style={styles.icon} name="sun" size={40} color="black" />
            <View>
                <Text>23</Text>
                <Text>16</Text>
            </View>
        </View>
        <View style={styles.list}>
            <Text style={styles.date}>10/02/2022</Text>
            <Feather style={styles.icon} name="sun" size={40} color="black" />
            <View>
                <Text>23</Text>
                <Text>16</Text>
            </View>
        </View>
        <View style={styles.list}>
            <Text style={styles.date}>10/02/2022</Text>
            <Feather style={styles.icon} name="sun" size={40} color="black" />
            <View>
                <Text>23</Text>
                <Text>16</Text>
            </View>
        </View>
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
        paddingTop: 10,
        paddingLeft: 20,
        marginRight: 140
    },
    icon: {
        marginRight: 40
    }
})