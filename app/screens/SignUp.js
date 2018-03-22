import React from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../auth";

import firebase from '../firebase-config'

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '',pass:'',cpass:''};
  
  }
signupvalidation=()=>
{
  //eamil and password validation
  console.log("SAVED SAVED SAVED SAVED")
  firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.pass)
  return this.props.navigation.navigate("SignIn")

}
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <FormLabel>Email</FormLabel>
          <FormInput placeholder="Email address..." onChangeText={(email) => this.setState({ email })} autoCapitalize="none"/>
          <FormLabel>Password</FormLabel>
          <FormInput secureTextEntry placeholder="Password..." onChangeText={(pass) => this.setState({ pass })} autoCapitalize="none" />
          <FormLabel>Confirm Password</FormLabel>
          <FormInput secureTextEntry placeholder="Confirm Password..." onChangeText={(cpass) => this.setState({ cpass })} autoCapitalize="none" />

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN UP"
            onPress={() => {
              onSignIn().then(() => this.signupvalidation());
            }}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#bcbec1" }}
            title="Sign In"
            onPress={() => navigate("SignIn")}
          />
        </Card>
      </View>

    )
  }
}

