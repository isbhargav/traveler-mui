import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Card } from "react-native-elements";

export default class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: []
    };
  }
  componentWillMount() {
    this.fetchSites();
  }
  fetchSites = async () => {
    let cord = this.props.navigation.state.params.cords;
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
      cord.lat
    },${
      cord.lng
    }&radius=500&type=restaurant&key=AIzaSyD3Vmuxr5TbEe588cVdsBoR6fPrGj5uY8Y`;
    let res = await fetch(url);
    const json = await res.json();
    const sites = json.results;
    console.log(
      sites.map(h => {
        console.log("Address = " + h.vicinity);
      })
    );
    this.setState({ sites });
  };
  render() {
    return (
      <ScrollView>
        <View>
          {this.state.sites.map((h, k) => (
            <Card key={k} title={h.name}>
              <Text>{h.vicinity}</Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    );
  }
}
