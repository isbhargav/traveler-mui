import React from 'react'
import {View,ScrollView} from 'react-native'
import {Text,Card} from 'react-native-elements'


export default class Hotels extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            hotels:[]
        }
    }
    componentWillMount()
    {
        this.fetchotels()
    
    }
    fetchotels = async ()=>
    {
        let cord = this.props.navigation.state.params.cords;
        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${cord.lat},${cord.lng}&radius=500&type=restaurant&key=AIzaSyD3Vmuxr5TbEe588cVdsBoR6fPrGj5uY8Y`;
        let res = await fetch(url);
        const json = await res.json();
        const hotels = json.results;
        console.log(hotels.map(h=>{console.log(h.vicinity)}))
        this.setState({hotels})
    }
    render()
    {
        return(
            <ScrollView>
            <View>{this.state.hotels.map((h,k)=>(
                <Card key={k}><Text key={k} h3>{h.name}</Text></Card>
            ))}</View>
            </ScrollView>
        )
    }

}