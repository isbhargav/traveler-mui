import React from "react";
import { ScrollView, Text, Linking, View } from "react-native";
import { Card, Button, FormInput, Tile, Header } from "react-native-elements";
import firebase from "../firebase-config";

export default class Companions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      key: "",
      triproot: "",
      members: []
    };
  }

  componentDidMount() {
    this.fetchmemebers();
  }


  gettingfromFirebase = async () => {
    await firebase
    .database()
    .ref(this.state.triproot)
    .on("value");
  console.log(snap.val().companions);
  if (snap.val().companions) {
    const members = snap.val().companions;
    console.log(members);
    await this.setState({ members: [...members] });
    console.log("companions bharela che");
    console.log(snap.val().companions);
    console.log(this.state);
  }
  else{
    console.log("conpanions khali che")
  }


  }

  fetchmemebers = async () => {
    const params = this.props.navigation.state.params;
    let { location, key, triproot } = params;
    await this.setState({ location, key, triproot });
    console.log("Conmpanion");
    console.log(this.state)
    const snap = await firebase
      .database()
      .ref(triproot)
      .once("value");
    console.log(snap.val().companions);
    if (snap.val().companions) {
      const members = snap.val().companions;
      console.log(members);
      await this.setState({ members: [...members] });
      console.log("companions bharela che");
      console.log(snap.val().companions);
      console.log(this.state);
    }
    else{
      console.log("conpanions khali che")
    }
  };
  render() {
    return (
      <View>
        <Button
          buttonStyle={{ marginTop: 20 }}
          backgroundColor="#03A9F4"
          title="Add"
          onPress={() =>
            this.props.navigation.navigate("AddCompanion",{...(this.state),callback:this.fetchmemebers})
          }
        />
        <ScrollView>
          {this.state.members.map((m, k) => (
            <View key={k}>
              <Text>{m.name}</Text>
              <Text>{m.contact}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}
//this inside scrollview {this.state.members.map((m, k) => <Text key={k}>{m}</Text>)}
