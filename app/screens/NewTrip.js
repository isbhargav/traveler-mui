import React from "react";
import { ScrollView, Text, Linking, View, StyleSheet ,TouchableOpacity} from "react-native";
import {
  Card,
  Button,
  FormInput,
  Tile,
  Header,
  Divider
} from "react-native-elements";
import firebase from "../firebase-config";
import { AsyncStorage } from "react-native";
import Expo,{Permissions} from 'expo'

export default class NewTrip extends React.Component {
  static navigationOptions = ({navigation}) =>({
    headerLeft: <TouchableOpacity onPress={()=>navigation.navigate("SignedIn")}><Text >Home</Text></TouchableOpacity>,
  })
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      key: null,
      triproot: null,
      cords: {}
    };
  }

  componentDidMount() {
    
    this.fetchcord();
  }
  fetchcord = async () => {
    // let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${
    //   this.props.navigation.state.params.location
    // }&key=AIzaSyAoYGIELrfONpKhI8THKy6jfMJ9MW8-UQc`;
    // let res = await fetch(url);
    // const json = await res.json();
    // const cords = await json.results[0].geometry.location;
    await Permissions.askAsync(Permissions.LOCATION);
   let location = this.props.navigation.state.params.location;
    let res = await Expo.Location.geocodeAsync(this.props.navigation.state.params.location)
    console.log(res)
    let cords = {
      lat:res[0].latitude,
      lng:res[0].longitude
    }
    this.setState({ cords });
    this.setState({ location });
    const params = this.props.navigation.state.params;
    const { key, triproot } = params;
  //  console.log(params);
    await this.setState({ location, key, triproot });
   console.log("New trip");
   console.log(this.state);
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Header
          backgroundColor="rgb(247,247,247)"
          centerComponent={{
            text: "Trip to " + this.props.navigation.state.params.location,
            style: { color: "black", fontSize: 20 }
          }}
          rightComponent={{ icon: "home", color: "blue" }}
        />
        <View>
          <View style={styles.btn}>
            <Button
              style={styles.btn}
              title="Companions"
              onPress={() =>
                navigate("Companions", this.props.navigation.state.params)
              }
            />
          </View>

          <View style={styles.btn}>
            <Button
              style={styles.btn}
              title="Reservations"
              onPress={() =>
                navigate("Reservations", this.props.navigation.state.params )
              }
            />
          </View>
      
          <View style={styles.btn}>
            <Button
              style={styles.btn}
              title="Notes"
              onPress={() =>
                navigate("Notes",  this.props.navigation.state.params )
              }
            />
          </View>
          <View style={styles.btn}>
            <Button style={styles.btn} title="Explore" 
            onPress={() =>
              navigate("Hotels", {
                location: this.state.location,
                cords: this.state.cords
              })
            }
            />
          </View>
          <View style={styles.btn}>
            <Button
              style={styles.btn}
              title="Hotels"
              onPress={() =>
                navigate("Hotels", {
                  location: this.state.location,
                  cords: this.state.cords
                })
              }
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {}
});
