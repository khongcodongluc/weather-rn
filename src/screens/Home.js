import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
  StatusBar,
  Animated,
  TouchableOpacity,
  Image
} from 'react-native';

import locations from './locations';

import weatherService from '../../api/weatherApi';

import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'; 
import * as Location from 'expo-location';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useEffect, useRef, useState } from 'react';
import getTimeByLocal from '../helpers/convertTime';

const WeatherIcon = weatherType => {
  if (weatherType == 'Sunny') {
    return <Feather name="sun" size={40} color="white" />;
  }
  if (weatherType == 'Rainy') {
    return <Feather name="cloud-rain" size={40} color="white" />;
  }
  if (weatherType == 'Cloudy' || weatherType == 'Clouds') {
    return <Feather name="cloud" size={40} color="white" />;
  }
  if (weatherType == 'Night') {
    return <Ionicons name="cloudy-night" size={40} color="white" />;
  }
};

const sunnyImage = require('../assets/sunny.jpg');
const rainyImage = require('../assets/rainy.jpg');
const nightImage = require('../assets/night2.jpg');
const cloudImage = require('../assets/cloudy.jpeg');
const blue = require('../assets/Sky_Blue.png');

export default function Home({route, navigation}) {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();

  const { city } = route?.params;

  const [currentWeather, setCurrentWeather] = useState({});
  const [currentAir, setCurrentAir] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const scrollX = useRef(new Animated.Value(0)).current;

  const getWeatherByName = async () => {
    setIsLoading(false);
    const res = await weatherService.getWeatherByName(city);
    // console.log("res", res);
    if (res?.status === 200) {
      const res2 = await weatherService.getAirQuality(res?.data?.location?.lat, res?.data?.location?.lon);
      // console.log("res2", res2?.data?.data)
      if (res2?.status === 200) {
        setCurrentAir(res2?.data);
        setCurrentWeather(res?.data);
        setIsLoading(false);       
      }
    }
  }

  useEffect(() => {
    getWeatherByName();
  }, [city]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 });
      setLocation(location?.coords);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  console.log("text", city)

  // console.log(getTimeByLocal.getDate(currentWeather.dt * 1000));
  // console.log(`https:${currentWeather?.current?.condition?.icon}`);

  // const arrayy = Object.keys(currentWeather?.weather);

  return (
    <>
      {
      isLoading ? <View style={styles.container}><Text style={{fontSize: 30}}>Đang tải...</Text></View> :
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
                    <View>
                      <Text style={styles.city}>{currentWeather.location.name}</Text>
                      {/* <Text style={styles.time}>{getTimeByLocal.getDate(currentWeather.dt * 1000)}</Text> */}
                      <Text style={styles.time}>{currentWeather.location.localtime}</Text>
                    </View>
                    <View
                      style={{
                        marginTop: 10
                      }}
                    >
                      <Text style={styles.temparature}>
                        {/* {`${Math.round(currentWeather.main?.temp)}\u2103`} */}
                        {`${Math.round(currentWeather.current?.temp_c)}\u2103`}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        {/* {WeatherIcon(currentWeather?.weather[0]?.main)} */}
                        <Image
                          alt="icon"
                          source={{
                            uri: `https:${currentWeather?.current?.condition?.icon}`,
                          }}
                          style={{width: 45, height: 45}}
                        />
                        <Text style={styles.weatherType}>
                          {currentWeather?.current?.condition?.text}
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
                        {currentWeather.current?.wind_kph}
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
                        {/* {location.rain} */}
                        {currentWeather.current?.cloud}
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
                        {currentWeather.current?.humidity}
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
                        currentWeather.forecast.forecastday[0].hour.map((item, index) => {
                          return (
                            <View key={index} style={styles.itemHour}>
                              <Text style={styles.itemTextHour}>
                                {`${Math.round(item.temp_c)}\u2103`}
                              </Text>
                              <Text style={styles.itemTextHour}>
                                {item.time.split(" ")[1]}
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
          <TouchableOpacity onPress={() => {navigation.navigate('NextDay', {
            data: currentWeather.forecast.forecastday
          })}}>
            <Feather name="heart" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('NextDay', {
            data: currentWeather.forecast.forecastday
          })}}>
            <Text style={{color: '#fff', marginBottom: 10}}>3days</Text>
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
