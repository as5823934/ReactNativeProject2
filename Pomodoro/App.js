import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      mainTime: null,
      lapTime: null,
      isRunning: false
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
      mainTimeStart: new Date(),
      lapTimeStart: new Date()
    })
  }

  render() {
    // setInterval(()=>{
    //   this.setState({
    //     mainTime: new Date() - this.state.mainTime
    //   });
    // }, 1000);

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
