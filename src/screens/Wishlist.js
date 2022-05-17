import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';


export default function Wishlist({route, navigation}) {
    const [arrWishList, setArrWishList] = useState([])
    useEffect(async () => {
        const fvItem = await AsyncStorage.getItem('favourite');
        if (fvItem) {
            const arrFvItem = JSON.parse(fvItem);
            console.log("arrFvItem", arrFvItem);
            setArrWishList(arrFvItem)
            } else {
              setArrWishList([])
            }
    }, [])
    // console.log("arrWishList", arrWishList)
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Home');
            }}>
                <AntDesign name="back" size={40} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerItem}>Wishlist</Text>
          </View>
          <SearchableDropdown
            onTextChange={(text) => console.log(text)}
            //On text change listner on the searchable input
            onItemSelect={(item) => {
                navigation.navigate('Home', {
                    lat: item?.latitude, lon: item?.longitude
                })
            }}
            //onItemSelect called after the selection from the dropdown
            containerStyle={{ padding: 5 }}
            //suggestion container style
            textInputStyle={{
                //inserted text style
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#FAF7F6',
            }}
            itemStyle={{
                //single dropdown item style
                padding: 10,
                marginTop: 2,
                backgroundColor: '#FAF9F8',
                borderColor: '#bbb',
                borderWidth: 1,
            }}
            itemTextStyle={{
                //text style of a single dropdown item
                color: '#222',
            }}
            itemsContainerStyle={{
                //items container style you can pass maxHeight
                //to restrict the items dropdown hieght
                // maxHeight: '60%',
            }}
            items={arrWishList}
            //mapping of item array
            // defaultIndex={2}
            //default selected item index
            placeholder="Tap to search and select"
            //place holder for the search input
            resetValue={false}
            //reset textInput Value with true and false state
            underlineColorAndroid="transparent"
            //To remove the underline from the android input
            />
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
})