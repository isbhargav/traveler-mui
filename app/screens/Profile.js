import React from "react";
import { View,AsyncStorage } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { onSignOut } from "../auth";


export default class Profile extends React.Component
 {
   constructor(props)
   {
     super(props)
     this.state={
      user:{}
     }
   }
  componentWillMount(){
    var value =  AsyncStorage.getItem('user');
       value.then((e)=>{
         this.setState({
          user: JSON.parse(e)
         })
       })
   }
   render(){
     const {navigate} = this.props.navigation
      return(
        <View style={{ paddingVertical: 20 }}>
    <Card title={this.state.user.email}>
      <View
        style={{
          backgroundColor: "#bcbec1",
          alignItems: "center",
          justifyContent: "center",
          width: 80,
          height: 80,
          borderRadius: 40,
          alignSelf: "center",
          marginBottom: 20
        }}
      >
      
        <Text style={{ color: "white", fontSize: 28 }}></Text>
      </View>
      <Button
        backgroundColor="#03A9F4"
        title="SIGN OUT"
        onPress={() => onSignOut().then(() => navigate("SignedOut"))} // NEW LOGIC
      />
    </Card>
  </View>
      )
   }
  
      }