import React from "react";
import { ScrollView, Text, Linking, View } from "react-native";
import { Card, Button, FormInput,Tile,Header } from "react-native-elements";


export default class Companions extends React.Component {
    constructor(props)
    {
        super(props)
        this.state ={
            location:this.props.navigation.state.params.location,
            newmember:'',
            members:['Raj','Jay']
        }
    }
    addnewmember = () =>{
        //save to firebase 
        let members = this.state.members;
        let n=this.newmember;
        console.log(members)
        console.log(n)
        this.setState({members:[n,...members]});
    }
    render()
    {
        return(
            <View>
            <FormInput placeholder="Add Member" onChangeText={newmember=>this.setState({newmember})} autoCapitalize="none" />
            <Button title='Add'  backgroundColor="blue" onPress={()=>this.addnewmember()} />
            <ScrollView>
            {this.state.members.map((m,k)=>(<Text key={k}>{m}</Text>))}
            </ScrollView>
            </View>
        )
    }
}