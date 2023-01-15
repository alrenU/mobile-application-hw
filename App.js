import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import axios from 'axios';

const App = () => {
  const [cityTextState, setCityTextState] = useState('Istanbul');
  const [textState, setTextState] = useState('');
  // const [weatherDataState, setWeatherDataState] = useState('');
  const [weatherState, setWeatherState] = useState('');
  const [weatherIconState, setWeatherIconState] = useState('');

  const getWeather = async () => {
    try {
      const getWeatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityTextState}&appid=fbaaa153cc9a9e7233e920553b7b0aca`,
      );

      setWeatherState(Math.round(getWeatherData.data.main.temp - 273.14));
      setWeatherIconState(getWeatherData.data.weather[0].icon);
    } catch (exception) {
      console.log(exception);
    }
  };

  useEffect(() => {
    getWeather();
  }, [cityTextState]);

  return (
    <View style={styles.container}>
      <View>
        <StatusBar backgroundColor="#Afe4ec" barStyle="dark-content" />
      </View>
      <View style={styles.headerContainer}>
        {weatherIconState && (
          <Image
            style={styles.weatherImage}
            source={{uri: `http://openweathermap.org/img/w/${weatherIconState}.png`}}
          />
        )}
        <Text style={styles.headerText}>Location: {cityTextState}</Text>
        <Text style={styles.headerSubText}>
          Temparature: {weatherState}
          {'\u00B0'}C
        </Text>
      </View>
      <View style={styles.searchSectionContainer}>
        <TextInput
          style={styles.inputArea}
          placeholder="Type the city name you want to look for..."
          onChangeText={text => setTextState(text)}
        />
        <Pressable
          style={styles.pressableStyle}
          onPress={() => {
            setCityTextState(textState);
          }}>
          <Text style={styles.buttonTextStyle}>Search for City Weather</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#Afe4ec',
  },
  headerContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 40,
    color: '#2a3738',
  },
  headerSubText: {
    fontSize: 30,
    color: '#2a3738',
  },
  searchSectionContainer: {
    marginBottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputArea: {
    padding: 10,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  pressableStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#2a3738',
    width: 200,
  },
  buttonTextStyle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  weatherImage: {
    position:"absolute",
    top:50,
    width:75,
    height:75,
    zIndex:-99
  }
});

export default App;
