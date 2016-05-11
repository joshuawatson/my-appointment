import React, { Component } from 'react';
import { ListView, ScrollView, TouchableHighlight, StyleSheet, Text, View,AlertIOS,Linking } from 'react-native';
import { logoutUser } from './../../actions/Auth/login';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import SettingsCell from './Components/SettingsCell';
import SettingScene from './../../components/SettingScene';
import find from 'lodash/find';

class Settings extends Component {

  constructor(props) {
    super(props);
  }

  performLogout() {
    this.props.dispatch(logoutUser());
    Actions.main();
  }

  loadLink(name){
    switch(name) {
      case 'about':
        return Actions.about();
      case 'term':
        return Actions.term();
      case 'profile':
        return Actions.profile();
      case 'contact':
        return Actions.contact();
      default :
        return;
    }
  }

  logout() {
    AlertIOS.alert('Are you sure you want to logout ?  ', null, [{text: 'Yes', onPress:()=>{this.performLogout()}},{text:'No'}]);
  }

  render() {
    return (
      <ScrollView style={{flex:1,backgroundColor: 'white',paddingTop:80}}>
        <SettingsCell icon="ion|power" title="Logout" callback={()=>this.logout()} />
        <SettingsCell icon="ion|person" title="Profile" callback={()=>this.loadLink('profile')} />
        <SettingsCell icon="ion|information-circled" title="About" callback={()=>this.loadLink('about')} />
        <SettingsCell icon="ion|help-circled" title="Contact Us" callback={()=>this.loadLink('contact')} />
        <SettingsCell icon="ion|ios-checkmark" title="Terms and Conditions" callback={()=>this.loadLink('term')} />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    authUser:state.entities.users ? find(state.entities.users,['id',state.userReducer.authUserID]) : ''
  }
}

export default connect(mapStateToProps)(Settings);