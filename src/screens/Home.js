import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import weatherService from '../../api/weatherApi';
import getTimeByLocal from '../helpers/convertTime';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sunnyImage = require('../assets/sunny.jpg');
const rainyImage = require('../assets/rainy.jpg');
const nightImage = require('../assets/night2.jpg');
const cloudImage = require('../assets/cloudy.jpeg');
const blue = require('../assets/Sky_Blue.png');

export default function Home({route, navigation}) {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();

  const { lat, lon } = route?.params;

  const [currentWeather, setCurrentWeather] = useState({});
  const [hourWeather, setHourWeather] = useState([]);
  const [daysWeather, setDaysWeather] = useState([]);
  const [currentAir, setCurrentAir] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isWishlist, setIsWishlist] = useState(false);

  const getWeatherByName = async () => {
    setIsLoading(true);
    if (lat && lon) {    
      console.log("1")
      const res0 = await weatherService.getWeatherByLatLon(lat, lon);
        // console.log("res0", res0?.data?.coord?.lon);
        const res1 = await weatherService.getWeatherOneCall(lat, lon);
        // console.log("res1", res1?.data);
        if (res0?.status === 200 && res1?.status === 200) {
          const res2 = await weatherService.getAirQuality(res0?.data?.coord?.lat, res0?.data?.coord?.lon);
          // console.log("res2", res2?.data?.data)
          if (res2?.status === 200) {
            const fvItem = await AsyncStorage.getItem('favourite');
            if (fvItem) {
              const arrFvItem = JSON.parse(fvItem);
              console.log("arrFvItem", arrFvItem);
              const item = arrFvItem.filter(item => {
                return item.name === res0?.data?.name;
              })                 
              if (item.length !== 0) {
                setIsWishlist(true)
              } else {
                setIsWishlist(false)
              } 
            } else {
              setIsWishlist(false)
            }
            setCurrentAir(res2?.data);
            setCurrentWeather(res0?.data);
            setHourWeather(res1?.data?.hourly)
            setDaysWeather(res1?.data?.daily)
            setIsLoading(false);       
          }
        }
    } else {
      console.log("2")
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 });    
        // console.log("location", location.coords)
        const res0 = await weatherService.getWeatherByLatLon(location?.coords?.latitude, location?.coords?.longitude);
        console.log("res0", res0?.status);
        const res1 = await weatherService.getWeatherOneCall(location?.coords?.latitude, location?.coords?.longitude);
        console.log("res1", res1?.status);
        if (res0?.status === 200 && res1?.status === 200) {
          const res2 = await weatherService.getAirQuality(res0?.data?.coord?.lat, res0?.data?.coord?.lon);
          console.log("res2", res2?.data?.data)
          if (res2?.status === 200) {
            const fvItem = await AsyncStorage.getItem('favourite');
            if (fvItem) {
              const arrFvItem = JSON.parse(fvItem);
              console.log("arrFvItem", arrFvItem);
              const item = arrFvItem.filter(item => {
                return item.name === res0?.data?.name;
              })                 
              if (item.length !== 0) {
                setIsWishlist(true)
              } else {
                setIsWishlist(false)
              }
            } else {
              setIsWishlist(false)
            }
            setCurrentAir(res2?.data);
            setCurrentWeather(res0?.data);
            setHourWeather(res1?.data?.hourly)
            setDaysWeather(res1?.data?.daily)
            setIsLoading(false);       
          }
        }
      }
    }
  }

  const reload = async () => {
    setIsLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 });    
        const res0 = await weatherService.getWeatherByLatLon(location?.coords?.latitude, location?.coords?.longitude);
        // console.log("res0", res0?.data?.coord?.lon);
        const res1 = await weatherService.getWeatherOneCall(location?.coords?.latitude, location?.coords?.longitude);
        // console.log("res1", res1?.data);
        if (res0?.status === 200 && res1?.status === 200) {
          const res2 = await weatherService.getAirQuality(res0?.data?.coord?.lat, res0?.data?.coord?.lon);
          // console.log("res2", res2?.data?.data)
          if (res2?.status === 200) {
            const fvItem = await AsyncStorage.getItem('favourite');
            if (fvItem) {
              const arrFvItem = JSON.parse(fvItem);
              console.log("arrFvItem", arrFvItem);
              const item = arrFvItem.filter(item => {
                return item.name === res0?.data?.name;
              })                 
              if (item.length !== 0) {
                setIsWishlist(true)
              } else {
                setIsWishlist(false)
              }
            } else {
              setIsWishlist(false)
            }
            setCurrentAir(res2?.data);
            setCurrentWeather(res0?.data);
            setHourWeather(res1?.data?.hourly)
            setDaysWeather(res1?.data?.daily)
            setIsLoading(false);       
          }
        }
      }
  }

  useEffect(() => {
    getWeatherByName();
  }, [lat, lon]);

  // console.log("text", lat, lon)
  // console.log("hooour", currentWeather?.weather[0]?.icon)

  // console.log(getTimeByLocal.getDate(currentWeather.dt * 1000));
  // console.log(`https:${currentWeather?.current?.condition?.icon}`);

  return (
    <>
      {
      isLoading ? <View style={styles.container}><Text style={{fontSize: 30}}>Loading...</Text></View> :
        <>
         <StatusBar barStyle="light-content" />
          <ScrollView
            style={{width: windowWidth, height: windowHeight}}
            // key={index}
          >
            <ImageBackground
              source={blue}
              style={{
                flex: 1,
              }}>
                <ScrollView
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    padding: 20,
                  }}
                >
                  <View style={styles.topInfoWrapper}>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <View>
                        <Text style={styles.city}>{currentWeather?.name}</Text>
                        <Text style={styles.time}>{getTimeByLocal.getDate(currentWeather.dt * 1000)}</Text>
                      </View>
                      <View>
                        <TouchableOpacity onPress={async () => {
                          if (isWishlist) {
                            const fvItem = await AsyncStorage.getItem('favourite');
                            // console.log("fvItem", fvItem)
                            if (fvItem) {
                              const arrFvItem = JSON.parse(fvItem);
                              console.log("arrFvItem", arrFvItem);
                              const item = arrFvItem.filter(item => {
                                return item.name !== currentWeather?.name;
                              })
                              await AsyncStorage.setItem('favourite', JSON.stringify(item));
                            }
                          } else {
                            const fvItem = await AsyncStorage.getItem('favourite');
                            // console.log("fvItem", fvItem)
                            if (!fvItem) {
                              const addItem = JSON.stringify([
                                {
                                  name: currentWeather?.name,
                                  latitude: currentWeather?.coord?.lat,
                                  longitude: currentWeather?.coord?.lon,
                                }
                              ]);
                              console.log("addItem", addItem);
                              await AsyncStorage.setItem('favourite', addItem);
                            } else {
                              const arrFvItem = JSON.parse(fvItem);
                              console.log("arrFvItem", arrFvItem);
                              const item = arrFvItem.filter(item => {
                                return item.name === currentWeather?.name;
                              })
                    
                              if (item.length == 0) {
                                arrFvItem.push({
                                  name: currentWeather?.name,
                                  latitude: currentWeather?.coord?.lat,
                                  longitude: currentWeather?.coord?.lon,
                                });
                                await AsyncStorage.setItem('favourite', JSON.stringify(arrFvItem));
                              }
                            }
                          }
                          setIsWishlist(!isWishlist)
                        }}>
                          {/* <AntDesign name="star" size={40} color="white" /> */}
                          {
                            isWishlist ? <AntDesign name="star" size={40} color="white" /> : <AntDesign name="staro" size={40} color="white" />
                          }
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: 10
                      }}
                    >
                      <Text style={styles.temparature}>
                        {`${Math.round(currentWeather.main?.temp)}\u2103`}
                      </Text>
                      <View style={{
                        flexDirection: 'row'
                      }}>
                        {/* {WeatherIcon(currentWeather?.weather[0]?.main)} */}
                        <Image
                          alt="icon"
                          source={{
                            // uri: `https:${currentWeather?.current?.condition?.icon}`,
                            uri: `https://openweathermap.org/img/wn/${currentWeather?.weather[0]?.icon}@4x.png`,
                          }}
                          style={{width: 45, height: 45}}
                        />
                        <Text style={styles.weatherType}>
                          {currentWeather?.weather[0]?.description}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'rgba(255,255,255,0.7)',
                      marginTop: 20,
                      borderBottomWidth: 1,
                    }}
                  />
                  <View style={styles.bottomInfoWrapper}>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>Wind</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {currentWeather?.wind?.speed}
                      </Text>
                      <Text style={styles.infoText}>km/h</Text>
                      {/* <View style={styles.infoBar}>
                        <View
                          style={{
                            width: currentWeather.current?.wind_kph / 2,
                            height: 5,
                            backgroundColor: '#69F0AE',
                          }}
                        />
                      </View> */}
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>Cloud</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {currentWeather?.clouds?.all}
                      </Text>
                      <Text style={styles.infoText}>%</Text>
                      {/* <View style={styles.infoBar}>
                        <View
                          style={{
                            width: 4 / 2,
                            // width: location.rain / 2,
                            height: 5,
                            backgroundColor: '#F44336',
                          }}
                        />
                      </View> */}
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>Humidity</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {currentWeather?.main?.humidity}
                      </Text>
                      <Text style={styles.infoText}>%</Text>
                      {/* <View style={styles.infoBar}>
                        <View
                          style={{
                            width: currentWeather.current?.humidity / 2,
                            // width: 2,
                            height: 5,
                            backgroundColor: '#F44336',
                          }}
                        />
                      </View> */}
                    </View>
                  </View>
                  <View style={styles.bottomInfoWrapper}>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>AQI-US</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {currentAir?.data?.current?.pollution?.aqius}
                      </Text>
                      {/* <Text style={styles.infoText}>km/h</Text> */}
                      {/* <View style={styles.infoBar}>
                        <View
                          style={{
                            width: currentWeather.current?.wind_kph / 2,
                            height: 5,
                            backgroundColor: '#69F0AE',
                          }}
                        />
                      </View> */}
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>Main-US</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {/* {location.rain} */}
                        {currentAir?.data?.current?.pollution?.mainus}
                      </Text>
                      {/* <Text style={styles.infoText}>%</Text> */}
                      {/* <View style={styles.infoBar}>
                        <View
                          style={{
                            width: 4 / 2,
                            // width: location.rain / 2,
                            height: 5,
                            backgroundColor: '#F44336',
                          }}
                        />
                      </View> */}
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>AQI-CN</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {currentAir?.data?.current?.pollution?.aqicn}
                      </Text>
                      {/* <Text style={styles.infoText}>%</Text> */}
                      {/* <View style={styles.infoBar}>
                        <View
                          style={{
                            width: currentWeather.current?.humidity / 2,
                            // width: 2,
                            height: 5,
                            backgroundColor: '#F44336',
                          }}
                        />
                      </View> */}
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>Main-CN</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {currentAir?.data?.current?.pollution?.maincn}
                      </Text>
                      {/* <Text style={styles.infoText}>%</Text> */}
                      {/* <View style={styles.infoBar}>
                        <View
                          style={{
                            width: currentWeather.current?.humidity / 2,
                            // width: 2,
                            height: 5,
                            backgroundColor: '#F44336',
                          }}
                        />
                      </View> */}
                    </View>
                  </View>
                  <ScrollView
                    horizontal={true}
                    style={{
                      borderBottomColor: 'rgba(255,255,255,0.7)',
                      borderBottomWidth: 1,
                    }}
                  />
                    <ScrollView
                      style={styles.nextHour}
                      horizontal={true}
                    >
                      {
                        hourWeather.map((item, index) => {
                          return (
                            <View key={index} style={styles.itemHour}>
                              <Text style={styles.itemTextHour}>
                                {`${Math.round(item?.temp)}\u2103`}
                              </Text>
                              <Text style={styles.itemTextHour}>
                                {/* {item.time.split(" ")[1]} */}
                                {getTimeByLocal.getDate(item?.dt * 1000)}
                              </Text>
                            </View>
                          );
                        })
                      }
                    </ScrollView>
                  </ScrollView>
              </ImageBackground>
            </ScrollView>
      


        <View style={styles.appHeader}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Search');
          }}>
            <Feather name="search" size={40} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {navigation.navigate('Wishlist')}}>
            <Feather name="heart" size={40} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {navigation.navigate('NextDay', {
            data: daysWeather
          })}}>
            <AntDesign name="barschart" size={40} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {reload()}}>
            <Ionicons name="reload" size={40} color="white" />
          </TouchableOpacity>
        </View>

      {/* <View style={styles.indicatorWrapper}>
          {locations.map((location, index) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (index - 1),
                windowWidth * index,
                windowWidth * (index + 1),
              ],
              outputRange: [5, 12, 5],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View key={index} style={[styles.normalDot, {width}]} />
            );
          })}
        </View> */} 
  </>
    }
    </>
  );
}

const styles = StyleSheet.create({
  nextHour: {
    marginVertical: 20,
  },
  itemHour: {
    marginRight: 15,
    paddingRight: 10,
    borderRightWidth: 1,
    borderColor: '#fff'
  },
  itemTextHour: {
    color: '#fff',
    fontSize: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appHeader: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: getStatusBarHeight() + 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20
  },
  topInfoWrapper: {
    // flex: 1,
    marginTop: 160,
    // justifyContent: 'space-between',
  },
  city: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  time: {
    color: '#fff',
    fontWeight: 'bold',
  },
  temparature: {
    color: '#fff',
    fontSize: 85,
  },
  weatherType: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 34,
    marginLeft: 10,
  },
  bottomInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  infoText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoBar: {
    width: 45,
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  indicatorWrapper: {
    position: 'absolute',
    top: 140,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalDot: {
    height: 5,
    width: 5,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
});
