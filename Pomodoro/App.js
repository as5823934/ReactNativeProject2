import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Button, Vibration } from 'react-native';
import { Icon } from 'react-native-elements'


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isRunning: false,
      count : 300,
      title: '',
      usersetting: null
    }
  }

  componentWillUpdate(){
    
    if (this.state.count === 0 && this.state.isRunning === true) {
      this.setState({
        isRunning: false,
        count: 60 * parseInt(this.state.usersetting, 10)
        
      }, () => this.handleVibrate())
      alert('Times up')
      clearInterval(this.interval)
      
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
    
    if (this.state.count !== 0) {
      this.setState({
        isRunning: true,
      })

      this.interval = setInterval(()=>{
        this.setState({
          count: this.state.count - 1,
        });
      }, 1000);
    } else {
      alert('Please choose your time')
    }
  }

  handleReset() {
    clearInterval(this.interval)
    if (this.state.count > 300) {
      this.setState({
        count: 1500,
        isRunning: false
      })
    } else {
      this.setState({
        count: 300,
        isRunning: false
      })
    }
    
  }

  handleVibrate() {
    Vibration.vibrate([1000, 1000, 1000])
    //Vibration.cancel()
  }

  renderBottom(){
      return (
        <View style={styles.styleBottom}>
          <View style={styles.buttonStyle}>
            <Button
              color="#841584" 
              title="Short"
              onPress={()=> this.setState({count: 300})}
            />
          </View>
          <View style={styles.buttonStyle}>
            <Button 
              color="#841584" 
              title="Long" 
              onPress={()=> this.setState({count: 1500})}/>
          </View>
          <View style={styles.buttonStyle}>
            <TextInput 
              onChangeText={
                (title) => this.setState({
                  count: 60 * parseInt(title, 10) || 0,
                  title,
                  usersetting: title
                })
              }
              value={this.state.title}
              placeholder='mins'
              underlineColorAndroid='transparent'
              style={{ fontSize: 18, textAlign: 'center', paddingTop: 8, color: "#841584"}}
            />
          </View>
        </View>
      );
  }

  render() {
    return (
      <View style={styles.container}>   
        <View style={{paddingTop: 50}}>
        {/* Time View */}
          <View style={{alignItems: 'center'}}> 
            <Text style={{fontSize: 100}}>{this.state.count.toString().toHHMMSS()}</Text>
          </View>
        {/* Button View  */}
          <View style={styles.stylePlayStop}>
          {this.state.isRunning ? 
            <TouchableHighlight onPress={()=> this.handleStartStop()}>
              <Icon name='pause' size={50} color="#000000" />
            </TouchableHighlight>
            :
            <TouchableHighlight onPress={()=> this.handleStartStop()}>
              <Icon name='play-arrow' size={60} color="#000000" />
            </TouchableHighlight>}

            <TouchableHighlight onPress={()=> this.handleReset()}>
              <Icon name='replay' size={50} color="#000000" />
            </TouchableHighlight>
          </View>
        </View>
        {this.renderBottom()}
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 20, 
    backgroundColor: 'lightblue'
  },
  styleBottom: {
    flexDirection:'row', 
    backgroundColor: 'lightblue', 
    justifyContent: 'space-around',
    marginTop: 50,
    paddingVertical: 20,
  },
  buttonStyle: {
    backgroundColor: 'yellow',
    width: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  stylePlayStop: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    paddingTop: 50
  }

});

String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return minutes+':'+seconds;
}
