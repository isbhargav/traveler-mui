import React from "react";
import { View , TouchableOpacity} from "react-native";
import firebase from '../firebase-config'
import Moment from "moment";
import { FormInput, FormLabel, Button ,Text} from "react-native-elements";
import CalendarPicker from "react-native-calendar-picker";
import { ScrollView } from "react-native-gesture-handler";

class AddReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      fromDate: null,
      toDate: null,
      details: "",
      fromCalander:false,
      toCalander:false
    };
  }
  addReservation = () =>
  {
    let triproot = this.props.parentState.triproot
    let reservations = this.props.parentState.reservations
    let reservation = {title:this.state.title,details:this.state.details,fromDate:this.state.fromDate,toDate:this.state.toDate}
    

    firebase
      .database()
      .ref(triproot)
      .update({ reservations: [...(reservations), reservation] });
      console.log("inside child ")
     this.props.callback()

  }

  df = date => {
    this.setState({ fromDate: Moment(date).format("DD/MM/YY").toString() ,fromCalander:false});

  };
  dt = date => {
    this.setState({ toDate:  Moment(date).format("DD/MM/YY").toString() ,toCalander:false});


  };
  render() {
    return (
      <View>
        <FormInput placeholder="Reservation at" onChangeText={title => this.setState({ title })}/>
        <FormInput placeholder="Details" onChangeText={details => this.setState({ details })}/>
        <TouchableOpacity onPress={()=> this.setState({fromCalander:true})}><FormLabel>From : {this.state.fromDate}</FormLabel></TouchableOpacity>
        {(this.state.fromCalander) && ( <CalendarPicker onDateChange={d => this.df(d)} />)}
        <TouchableOpacity onPress={()=> this.setState({toCalander:true})} ><FormLabel>To : {this.state.toDate}</FormLabel></TouchableOpacity>
        {(this.state.toCalander) &&  <CalendarPicker onDateChange={d => this.dt(d)} />}
        <Button title="Add" onPress={()=> this.addReservation()}/>
      </View>
    );
  }
}
export default class Reservations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      key: "",
      triproot: "",
      reservations:[]
    };
  }
  componentDidMount()
  {
    this.fetchreservations();

  }
  fetchreservations = async () => {
    const params = this.props.navigation.state.params;
    let { location, key, triproot } = params;
    await this.setState({ location, key, triproot });


    const snap = await firebase
      .database()
      .ref(triproot)
      .once("value");

    if (snap.val().reservations) {
      const reservations = snap.val().reservations;

      await this.setState({ reservations: [...reservations] });
      // console.log("reservations bharela che");
      // console.log(snap.val().reservations);
      // console.log(this.state);
    }
    else{
      console.log("reservations khali che")
    }
  };

  gettingfromFirebase =  () => {
     firebase
    .database()
    .ref(this.state.triproot)
    .on("value", snap=>{
      console.log(snap.val().reservations);
  if (snap.val().reservations) {
    const reservations = snap.val().reservations;
    console.log(reservations);
     this.setState({ reservations: [...reservations] },()=>{
      console.log("reservations bharela che");
    console.log(snap.val().reservations);
    console.log(this.state);
     });
    
  }
  else{
    console.log("reservations khali che")
  }
    });
  


  }
  render() {
    return (
      <View>
      <AddReservation parentState={this.state} callback={this.gettingfromFirebase}/>
      <ScrollView>
      {this.state.reservations.map((d,k)=>(<Text key={k}>{d.title}</Text>))}
      </ScrollView>
      </View>
    )
  }
}
