import React from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { Overlay, Button, FormInput, Card } from "react-native-elements";
import firebase from '../firebase-config'

// class NewNote extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: "",
//       desc: ""
//     };
//   }
//   render() {
//     return (
//       <View>
//         <Card title="New Note" style={{ height: 400 }}>
//           <FormInput
//             placeholder="Title"
//             onChangeText={txt => this.setState({ title: txt })}
//           />
//           <FormInput
//             multiline
//             numberOfLines={5}
//             placeholder="Description"
//             onChangeText={txt => this.setState({ desc: txt })}
//           />
//           <Button
//             title="Save"
//             onPress={() =>
//               this.props.save({
//                 title: this.state.title,
//                 desc: this.state.desc
//               })
//             }
//           />
//         </Card>
//       </View>
//     );
//   }
// }

export default class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      key: "",
      triproot: "",
      notes:[],
      newNote: false
    };
  }

  saveNote = msg => {
    console.log(msg);

    /* Code to save the message*/

    this.setState({ newNote: false });
  };

  componentDidMount() {
    /* Code to load notes */
    this.fetchnotes()
  }
  gettingfromFirebase =  () => {
     firebase
    .database()
    .ref(this.state.triproot)
    .on("value", snap =>{
      console.log(snap.val().notes);
  if (snap.val().notes) {
    const notes = snap.val().notes;
    console.log(notes);
     this.setState({ notes: [...notes] },()=>{
      console.log("notes bharela che");
      console.log(snap.val().notes);
      console.log(this.state);
     });
   
  }
  else{
    console.log("notes khali che")
  }

    });
  


  }
  fetchnotes = async () => {
    const params = this.props.navigation.state.params;
    let { location, key, triproot } = params;
    await this.setState({ location, key, triproot });
    console.log("notes");
    console.log(this.state)
    const snap = await firebase
      .database()
      .ref(triproot)
      .once("value");
    console.log(snap.val().notes);
    if (snap.val().notes) {
      const notes = snap.val().notes;
      console.log(notes);
      await this.setState({ notes: [...notes] });
      console.log("notes bharela che");
      console.log(snap.val().notes);
      console.log(this.state);
    }
    else{
      console.log("notes khali che")
    }
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button title="New Note" onPress={() => navigate("NewNote",{...(this.state),callback:this.gettingfromFirebase})} />
        <ScrollView>
          {this.state.notes.map((d,k)=>(<Text key={k}>{d.title}</Text>))}
        </ScrollView>
      </View>
    );
  }
}
