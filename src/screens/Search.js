import React, {useEffect, useState} from 'react';
import {RefreshControl, TouchableOpacity} from 'react-native';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TextInput,
    Image,
    ScrollView,
    ImageBackground
} from 'react-native';

import { Feather, AntDesign } from '@expo/vector-icons'
import citys from '../../model/city';
import weatherService from '../../api/weatherApi';

const noDataImage = require('../assets/noData.png');

export default function Search({navigation}) {

    const [search, setSearch] = useState("");
    const [city, setCity] = useState([]);

    // console.log(citys.filter((item) => item?.city?.toString().startsWith(search)))

    const searchFunc = async (param) => {
        const res = await weatherService.searchCity(param);
        console.log("res", res?.data);
        if (res?.status === 200) {
            setCity(res?.data);
        }
    }

    useEffect(() => {
        searchFunc(search);
    }, [search]);

  return (
    <View style={styles.container}>
            {/* <Header/> */}
            <SafeAreaView style={{height: '95%'}}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Home');
                }}>
                    <AntDesign name="back" size={40} color="black" />
                </TouchableOpacity>
                {/* Search Bar */}
                <View style={styles.inputSection}>
                    <Feather name="search" size={20} color="red" />
                    <TextInput
                        // style={{...FONTS.body3}}
                        placeholder="Tìm kiếm"
                        onChangeText={setSearch}
                        value={search}
                    />
                </View>
                {
                    (city.length > 0) ?
                    (city.map((item) => {
                        return (
                            <TouchableOpacity key={item?.id} style={styles.itemSearch} onPress={() => {navigation.navigate('Home', {
                                city: item.name
                            })}}>
                                <Text style={styles.itemSearchText}>{`${item?.name} - ${item?.country}`}</Text>
                            </TouchableOpacity>
                        );
                    })) : <Image
                            alt="noDataImage"
                            source={noDataImage}
                            style={{
                                width: "100%"
                            }}
                        />
                }
                {/* <ScrollView style={{marginBottom: 50}} 
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={getUsers}
                        />
                      }
                    >
                {
                    listUser.map((item) =>
                    <TouchableOpacity 
                        key={item["id"]}
                        onPress = { () => alert(item["id"]) }
                     >
                        <View 
                            style={styles.rowUser}
                            key={item["id"]}
                        >       
                                <Image source={{uri: item["photo"] == "" ? "https://ui-avatars.com/api/?name="+item["name"]+"&background=random" : item["photo"]}} style={styles.avatar}/>
                                <View style={styles.boxUsername}>
                                    <Text style={styles.username}>{item["name"]}</Text>
                                </View>
                        </View>
                    </TouchableOpacity>
                    )
                }
                </ScrollView> */}
            </SafeAreaView>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
      paddingHorizontal:20,
      position:"absolute",
      left:0,
      right:0,
      top:0,
      height:'95%',
      paddingTop:30
  },
  inputSection: {
      flexDirection: 'row',
      paddingHorizontal:10,
      paddingVertical: 0,
      backgroundColor: '#fff',
      borderRadius:10,
      marginTop: 5,
      marginBottom: 10,
      height: 40,
      alignItems: 'center',
  },
  itemSearch: {
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5
  },
  itemSearchText: {
    fontSize: 20,
  },
  avatar:{
      width:50,
      height:50,
      borderRadius:25,
      marginRight: 10,
      marginLeft: -15,
  },
  username:{
      // ...FONTS.body2,
      width: '80%',
      alignItems: 'center',
      justifyContent:'center',
      alignContent: 'center',
  },
  boxUsername: {
      paddingBottom: 10,
      paddingLeft: 10,
      width: '90%',
      justifyContent: 'flex-end',
      alignContent: 'center',
  },
  rowUser: {
      flexDirection:'row',
      paddingHorizontal:20,
      paddingVertical: 10,
      alignItems:'center',
      alignItems: 'stretch',
      // borderBottomColor: COLORS.darkgray,
      borderBottomWidth: 0.5,
  }
})

