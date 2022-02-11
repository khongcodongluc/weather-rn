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
} from 'react-native';

import locations from './locations';

import weatherService from '../../api/weatherApi';

import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'; 

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

const kaka = require('../assets/sunny.jpg');

export default function Home({route, navigation}) {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();

  const { city } = route?.params;

  const [currentWeather, setCurrentWeather] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const scrollX = useRef(new Animated.Value(0)).current;

  const getWeatherByName = async () => {
    const res = await weatherService.getWeatherByName(city);
    // console.log("res", res);
    if (res?.status === 200) {
      setCurrentWeather(res?.data);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getWeatherByName();
  }, [city]);

  // console.log(getTimeByLocal.getDate(currentWeather.dt * 1000));
  // console.log(new Date(currentWeather.dt * 1000));

  // const arrayy = Object.keys(currentWeather?.weather);

  return (
    <>
      {
      isLoading ? <View style={styles.container}><Text style={{fontSize: 30}}>Đang tải...</Text></View> :
        <>
      <StatusBar barStyle="light-content" />
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={1}>
            <View
              style={{width: windowWidth, height: windowHeight}}
              // key={index}
              >
              <ImageBackground
                source={kaka}
                style={{
                  flex: 1,
                }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    padding: 20,
                  }}>
                  <View style={styles.topInfoWrapper}>
                    <View>
                      <Text style={styles.city}>{currentWeather.name}</Text>
                      <Text style={styles.time}>{getTimeByLocal.getDate(currentWeather.dt * 1000)}</Text>
                    </View>
                    <View>
                      <Text style={styles.temparature}>
                        {`${Math.round(currentWeather.main?.temp)}\u2103`}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        {WeatherIcon(currentWeather?.weather[0]?.main)}
                        <Text style={styles.weatherType}>
                          {currentWeather?.weather[0]?.main}
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
                        {currentWeather.wind?.speed}
                      </Text>
                      <Text style={styles.infoText}>km/h</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: currentWeather.wind?.speed / 2,
                            height: 5,
                            backgroundColor: '#69F0AE',
                          }}
                        />
                      </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>Rain</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {/* {location.rain} */}
                        kaka
                      </Text>
                      <Text style={styles.infoText}>%</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: 4 / 2,
                            // width: location.rain / 2,
                            height: 5,
                            backgroundColor: '#F44336',
                          }}
                        />
                      </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>Humidity</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {currentWeather.main?.humidity}
                      </Text>
                      <Text style={styles.infoText}>%</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: currentWeather.main?.humidity / 2,
                            // width: 2,
                            height: 5,
                            backgroundColor: '#F44336',
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
            {locations.map((location, index) => {
          if (location.weatherType == 'Sunny') {
            var bgImg = require('../assets/sunny.jpg');
          } else if (location.weatherType == 'Night') {
            var bgImg = require('../assets/night2.jpg');
          } else if (location.weatherType == 'Cloudy') {
            var bgImg = require('../assets/cloudy.jpeg');
          } else if (location.weatherType == 'Rainy') {
            var bgImg = require('../assets/rainy.jpg');
          }
          return (
            <View
            style={{width: windowWidth, height: windowHeight}}
              key={index}>
                <ImageBackground
                source={bgImg}
                style={{
                  flex: 1,
                }}>
                  <View
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    padding: 20,
                  }}>
                  <View style={styles.topInfoWrapper}>
                    <View>
                        <Text style={styles.city}>{location.city}</Text>
                        <Text style={styles.time}>{location.dateTime}</Text>
                    </View>
                    <View>
                      <Text style={styles.temparature}>
                        {location.temparature}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        {WeatherIcon(location.weatherType)}
                        <Text style={styles.weatherType}>
                          {location.weatherType}
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
                        {location.wind}
                      </Text>
                      <Text style={styles.infoText}>km/h</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: location.wind / 2,
                            // width: 2,
                            height: 5,
                            backgroundColor: '#69F0AE',
                          }}
                        />
                      </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>Rain</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {location.rain}
                      </Text>
                      <Text style={styles.infoText}>%</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: location.rain / 2,
                            // width: 2,
                            height: 5,
                            backgroundColor: '#F44336',
                          }}
                        />
                      </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>Humidity</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {location.humidity}
                      </Text>
                      <Text style={styles.infoText}>%</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: location.humidity / 2,
                            // width: 2,
                            height: 5,
                            backgroundColor: '#F44336',
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                </ImageBackground>
            </View>
          );

        })}
      </ScrollView>

      <View style={styles.appHeader}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Search');
          }}>
            <Feather name="search" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('NextDay')}}>
            <Text style={{color: '#fff', marginBottom: 10}}>14 NGÀY</Text>
          </TouchableOpacity>
        </View>

      <View style={styles.indicatorWrapper}>
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
        </View>
  </>
    }
    </>
  );
}

const styles = StyleSheet.create({
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
    flex: 1,
    marginTop: 160,
    justifyContent: 'space-between',
  },
  city: {
    color: '#fff',
    fontSize: 30,
    // fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  time: {
    color: '#fff',
    // fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  temparature: {
    color: '#fff',
    // fontFamily: 'Lato-Light',
    fontSize: 85,
  },
  weatherType: {
    color: '#fff',
    // fontFamily: 'Lato-Regular',
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
    // fontFamily: 'Lato-Regular',
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
