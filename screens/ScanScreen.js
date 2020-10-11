import * as React from "react";
import {View,Text,TouchableOpacity,StyleSheet,Image} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class ScanScreen extends React.Component{
  constructor(){
    super();
    this.state={
      hasCamPermissions : null,
      scanned : false,
      scannedData : "",
      buttonState : 'normal',
    }
  }

  getCamPermission = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCamPermissions: status==="granted",
    })
  }

  handleBarCodeScanned = async ({type,data}) => {
    this.setState({
      scanned : true,
      scannedData : data,
      buttonState : 'normal',
    })
  }

  render(){
    const hasCameraPermissions = this.state.hasCamPermissions;
    const scanned = this.state.scanned;
    const button = this.state.buttonState;
    if(button==='clicked' && hasCameraPermissions){
      return(
        <BarCodeScanner 
          onBarCodeScanned={scanned ?undefined :this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if(this.state.buttonState==='normal'){
        return(
          <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Image
                style={{
                    width: 150,
                    height: 150,
                }}
                source={{
                    uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg'
                }}
            />
            <Text>
              {hasCameraPermissions===true
                ? this.state.scannedData:'requestCameraPermission'
              }
            </Text>
            <TouchableOpacity 
              style={styles.scanButton} 
              onPress={this.getCamPermission}
              title="Bar Code Scanner"
            >
              <Text style={styles.displayText}>Scan QR Code</Text>
            </TouchableOpacity>
          </View>
        )
      }
    }
}

const styles = StyleSheet.create({
    displayText:{
      fontSize:15,
      textDecorationLine:"underline",
    },
    scanButton:{
      backgroundColor:"#2196F3",
      padding:10,
      margin:10,
    }
  });