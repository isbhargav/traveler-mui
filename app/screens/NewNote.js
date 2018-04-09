import React from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { Overlay, Button, FormInput, Card } from "react-native-elements";
import firebase from '../firebase-config'

export default class NewNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      desc: "",
      notes:[]
    }
   
  }
  componentDidMount()
  {
    this.settingState()
  }
  settingState = async () => {
    const params = this.props.navigation.state.params;
    let { location, key, triproot, notes } = params;
    await this.setState({ location, key, triproot, notes });
  };
  saveNote = (note) =>
  {

   
    console.log("firebase new note");
    console.log(note);
    console.log(this.state.notes)
    firebase
      .database()
      .ref(this.state.triproot)
      .update({ notes: [...(this.state.notes), note] });
      this.props.navigation.state.params.callback()
    this.props.navigation.goBack()
  }
  render() {
    return (
      <View>
        <Card title="New Note" style={{ height: 400 }}>
          <FormInput
            placeholder="Title"
            onChangeText={txt => this.setState({ title: txt })}
          />
          <FormInput
            multiline
            numberOfLines={5}
            placeholder="Description"
            onChangeText={txt => this.setState({ desc: txt })}
          />
          <Button
            title="Save"
            onPress={() =>
              this.saveNote({
                title: this.state.title,
                desc: this.state.desc
              })
            }
          />
        </Card>
      </View>
    );
  }
}
