import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import {calculatorIcon} from '../assets/pngLinks';

export default function Header() {
  return (
    <View style = {{flexDirection:'row',margin:'auto',}}>
      <Image source ={calculatorIcon} style = {styles.headerImage}/>
      <Text style = {styles.headerText}>ChainCalc.com</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    marginRight:16,
    width:38,
    height:38,
  },
  headerText: {
    fontSize:28,
    fontWeight:'700'
  }
})