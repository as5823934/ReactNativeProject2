import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      mainTime: null,
      lapTime: null,
      isRunning: false,
      mainTimeStart: null,
      lapTimeStart: null,
      count : 0
    }
  }

  handleStartStop() {
    if(this.state.isRunning){
      clearInterval(this.interval)
      this.setState({
        isRunning: false,
  
      });
      return;
    }
    this.setState({
      isRunning: true,
      mainTimeStart: new Date().getTime() / 1000,
      lapTimeStart: new Date(),
    })

    this.interval = setInterval(()=>{
      this.setState({
        mainTime: (new Date().getTime() / 1000 - this.state.mainTimeStart + this.state.mainTime).toString().toHHMMSS(),
        lapTime: new Date() - this.state.lapTimeStart + this.state.lapTime,
        count: this.state.count + 1
      });
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.mainTime}</Text>
        <TouchableHighlight>
          <Text onPress={()=> this.handleStartStop()}>{this.state.isRunning ? "Stop" : "Start"}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
}
