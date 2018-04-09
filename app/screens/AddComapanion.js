import React from "react";
import { ScrollView, Text, Linking, View } from "react-native";
import { Card, Button, FormInput, Tile, Header } from "react-native-elements";
import firebase from "../firebase-config";

export default class AddCompanions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      name: "",
      contact: ""
    };
  }
  componentDidMount() {
    this.settingState();
  }
  settingState = async () => {
    const params = this.props.navigation.state.params;
    let { location, key, triproot, members } = params;
    await this.setState({ location, key, triproot, members });
  };
  addnewmember = () => {
    //save to firebase

    let user = { name: this.state.name, contact: this.state.contact };
    console.log("firebase");
    console.log(user);
    console.log(this.state.members)
    firebase
      .database()
      .ref(this.state.triproot)
      .update({ companions: [...(this.state.members), user] });
      this.props.navigation.state.params.callback()
    this.props.navigation.goBack()
  };
  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <FormInput
            placeholder="Name"
            onChangeText={name => this.setState({ name })}
            autoCapitalize="none"
          />
          <FormInput
            placeholder="Contact Number"
            onChangeText={contact => this.setState({ contact })}
            autoCapitalize="none"
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="Add"
            onPress={() => this.addnewmember()}
          />
        </Card>
      </View>
    );
  }
}
