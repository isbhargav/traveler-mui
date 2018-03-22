import React from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput,FormValidationMessage } from "react-native-elements";
import { onSignIn } from "../auth";

export default class SignIn extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {email: '',pass:'',err:null};
  
  }

render()
{
  const { navigate } = this.props.navigation
  return(
    <View style={{ paddingVertical: 20 }}>
    <Card title="SIGN IN">
    <FormValidationMessage>
      {this.state.err}
      </FormValidationMessage>
      <FormLabel>Email</FormLabel>
      <FormInput placeholder="Email address..." onChangeText={(email) => this.setState({ email })} autoCapitalize="none" />
      <FormLabel>Password</FormLabel>
      <FormInput secureTextEntry placeholder="Password..." onChangeText={(pass) => this.setState({ pass })} autoCapitalize="none" />

      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="SIGN IN"
        onPress={() => {
        
            onSignIn(this.state.email,this.state.pass).then(()=>navigate("SignedIn")).catch(err=>{this.setState({err:'Invalid Login Credintials'});})
            
          
          
        }}
      />
    </Card>
  </View>
  )
}

} 
