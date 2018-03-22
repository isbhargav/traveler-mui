import React from "react";
import { ScrollView, Text, Linking, View } from "react-native";
import { Card, Button, FormInput,Tile,Header } from "react-native-elements";
import firebase from '../firebase-config'
import {AsyncStorage} from 'react-native'


export default class NewTrip extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            location:'',
            cords:{}
        }

       

        
    }
    componentWillMount()
    {
        this.fetchcord()
    }
    componentDidMount()
    {
        let dbref = firebase.database().ref().child('users')
        
            
            AsyncStorage.getItem('user').then(usr=>{
                let usrjson = JSON.parse(usr);
                let user ={
                    email:usrjson.email,
                }


            }).catch(err=>console.log(err))
            
     
      
        
        

        
    }
    fetchcord = async ()=>{
        let url =`https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.navigation.state.params.location}&key=AIzaSyAoYGIELrfONpKhI8THKy6jfMJ9MW8-UQc`;
        let res = await fetch(url);
        const json = await res.json()
        const cords = await json.results[0].geometry.location;
        let location = this.props.navigation.state.params.location
        this.setState({cords})
        this.setState({location})

        console.log(this.state)


    }
    render() {
        const {navigate} = this.props.navigation
        return (
            

            <View>
            <Header centerComponent={{ text:this.props.navigation.state.params.location , style: { color: '#fff',fontSize:20 } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
            />

            <Button
                    title='Companions' onPress={()=> navigate("Companions",{location:this.state.location})}  />

                <Button
                    title='Reservations' onPress={()=> navigate("Reservations",{location:this.state.location})} />
                <Button
                    title='Packing' />
                <Button
                    title='Notes' />
                <Button
                    title='Explore' />
                <Button
                    title='Hotels' onPress={()=> navigate("Hotels",{location:this.state.location,cords:this.state.cords})}/>

            

            </View>
        )
    }

}