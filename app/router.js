import React from "react";
import { StackNavigator, TabNavigator } from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";

import Home from "./screens/Home";
import Profile from "./screens/Profile";
import NewTrip from "./screens/NewTrip";
import Hotels from "./screens/Hotels";
import Companions from "./screens/Companions";
import Resevations from "./screens/Reservations";
import AddCompanion from "./screens/AddComapanion";
import Notes from "./screens/Notes";
import NewNote from "./screens/NewNote";
import Explore from "./screens/Explore"

export const SignedIn = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="home" size={30} color={tintColor} />
      )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="user" size={30} color={tintColor} />
      )
    }
  }
});

export const SignedOut = StackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up"
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Home"
    }
  },
  NewTrip: {
    screen: NewTrip,
    navigationOptions: {
      title: "NewTrip"
    }
  },
  Notes: {
    screen: Notes,
    navigationOptions: {
      title: "Notes"
    }
  },
  NewNote: {
    screen: NewNote,
    navigationOptions: {
      title: "New Note"
    }
  },
  Companions: {
    screen: Companions,
    navigationOptions: {
      title: "Companions"
    }
  },
  AddCompanion: {
    screen: AddCompanion,
    navigationOptions: {
      title: "Add"
    }
  },
  Hotels: {
    screen: Hotels,
    navigationOptions: {
      title: "Hotels"
    }
  },
  Hotels: {
    screen: Explore,
    navigationOptions: {
      title: "Explore"
    }
  },
  Reservations: {
    screen: Resevations,
    navigationOptions: {
      title: "Reservations"
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In"
    }
  }
});
export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
