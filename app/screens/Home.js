import React from "react";
import { ScrollView, Text, Linking, View } from "react-native";
import { Card, Button , FormInput ,Header} from "react-native-elements";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



export default class Home extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {location:''};
  
  }
  search = ()=>{
    this.props.navigation.navigate('NewTrip',{location:this.state.location})
  }
  
  //onChangeText={(location)=> this.setState({location})}
  render() {
   
    const { navigate } = this.props.navigation
    return (
    
      <View style={{ paddingVertical: 20 }}>
      <Header
      placement="left"

      centerComponent={{ text: 'Home', style: { color: '#fff',fontSize:20} }}
      rightComponent={{ icon: 'home', color: '#fff' }}
    />
      <FormInput placeholder="location" onChangeText={(location)=> this.setState({location})} autoCapitalize="none" />
      


      <Button title='Add' style={{ paddingVertical: 20 ,marginTop:10}} backgroundColor="blue" onPress={()=>this.search()} />
             
 
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          
        </ScrollView>
       
      </View>
    )
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