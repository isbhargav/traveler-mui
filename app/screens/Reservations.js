import React from 'react'
import {View} from 'react-native'
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';

export default class Reservations extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            date:null
        }
    }
    render()
    {
        return(
            <View>
            <Calendar
                onChange={(date) => this.setState({ date })}
                selected={this.state.date}
                // We use Moment.js to give the minimum and maximum dates. 
                minDate={Moment().startOf('monday')}
                maxDate={Moment().add(10, 'years').startOf('monday')}
            />
            </View>
        )
    }
}