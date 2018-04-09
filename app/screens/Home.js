import React from "react";
import { ScrollView, Text, Linking, View, AsyncStorage } from "react-native";
import { Card, Button, FormInput, Header } from "react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Constrains } from "expo";
import firebase from "../firebase-config";

export default class Home extends React.Component {
  static navigationOptions = {}
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      key: "",
      triproot: "",
      trips:[],
    };
  }
componentDidMount()
{
  this.settingState()
}
settingState = async () => {
  const jsonuser = await AsyncStorage.getItem("user");
  const user = JSON.parse(jsonuser);
  let userroot = "users/" + user.email.split("@")[0] + "/trips"; 
  let trips = [];
  let snap = await firebase.database().ref(userroot).orderByKey().once('value');
  snap.forEach(child => {
    trips=[...trips,{...(child.val()),key:child.key,triproot:userroot+"/"+child.key}]
  });
  await this.setState({trips})
  

}
  search = () => {
    if (this.state.location.length > 0) {
      //save trip to firebase
      this.saveToFirebase();
      
    }
  };

  saveToFirebase = async () => {
    const jsonuser = await AsyncStorage.getItem("user");

    const user = JSON.parse(jsonuser);

    const key = await firebase
      .database()
      .ref()
      .child("users")
      .child("" + user.email.split("@")[0])
      .child("trips")
      .push({ location: this.state.location })
      .getKey();

    this.setState({
      key: key,
      triproot: "users/" + user.email.split("@")[0] + "/trips/" + key
    });
    console.log("home");
    console.log(this.state);
    //Navigate to new trip
    this.props.navigation.navigate("NewTrip", {
      location: this.state.location,
      key: this.state.key,
      triproot: this.state.triproot
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ paddingVertical: 20 }}>
        <Header
          centerComponent={{
            text: "Home",
            style: { color: "#fff", fontSize: 20 }
          }}
        />
        <FormInput
          placeholder="location"
          onChangeText={location => this.setState({ location })}
          autoCapitalize="none"
        />

        <Button
          buttonStyle={{ marginTop: 20 }}
          backgroundColor="#03A9F4"
          title="Add"
          onPress={() => this.search()}
        />

        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          {this.state.trips.map((d)=>(
            <View key={d.key}>
              <Card title="Trip">
                <Text>location : {d.location}</Text>
                <Button title="Show details" onPress={()=> navigate("NewTrip",d)}></Button>
              </Card>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

/*
const images = [
  {
    key: 1,
    name: "Nathan Anderson",
    image: require("../images/1.jpg"),
    url: "https://unsplash.com/photos/C9t94JC4_L8"
  },
  {
    key: 2,
    name: "Jamison McAndie",
    image: require("../images/2.jpg"),
    url: "https://unsplash.com/photos/waZEHLRP98s"
  },
  {
    key: 3,
    name: "Alberto Restifo",
    image: require("../images/3.jpg"),
    url: "https://unsplash.com/photos/cFplR9ZGnAk"
  },
  {
    key: 4,
    name: "John Towner",
    image: require("../images/4.jpg"),
    url: "https://unsplash.com/photos/89PFnHKg8HE"
  }
];
*/
