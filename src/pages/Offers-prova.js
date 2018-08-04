import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, ToastAndroid, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
import CardView from 'react-native-cardview';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';



export default class Offers extends Component {


  constructor(props) {
    super(props);

    this.state = {

      message: "",
      resp: "",
      products: [],

    }; 
  }

  componentDidMount(){
   // this.refresh();
  }

  renderItem = ({ item, index }) => {

    return (

      <View style={styles.item}>
        <CardView
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}
          height={130}
          marginTop={2}>

          <Text>
            Articolo:
            <Text style={{fontWeight: 'bold'}}>
            {" " + item.name}
            </Text>
            </Text>

          <Text>
          Prezzo: 
            <Text style={{fontWeight: 'bold'}}>
            {" " + item.price} €
          </Text>
          </Text>


          <Text>
          Descrizione: 
            <Text style={{fontWeight: 'bold'}}>
            {" " + item.description}
          </Text>
          </Text>


          <Text>
          Quantità: 
            <Text style={{fontWeight: 'bold'}}>
            {" " + item.quantity}
          </Text>
          </Text>


          <Text>
          Link: 
            <Text style={{fontWeight: 'bold'}}>
            {" " + item.link}
          </Text>
          </Text>


          <Text>
          Inserzionista: 
            <Text style={{fontWeight: 'bold'}}>
            {" " + item.user}
          </Text>
          </Text>

        </CardView>
      </View>




    );
  }


  onSwipeDown() {
this.refresh();
  }
  render() {

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };


    return (

    
 <GestureRecognizer
        onSwipeDown={() => this.onSwipeDown()}
        config={config}
        style={{
          flex: 1,
        }}
        >
          <FlatList
            data={this.state.products}
            renderItem={this.renderItem}
            
           // height={Dimensions.get('window').height-115}

           

          />

     
      </GestureRecognizer>

    );
  }



  refresh() {
    console.log("login")

    return fetch('http://192.168.0.105:8000/api/home', {

      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })

      .then((response) => {

        if (response.status != 200) {

          response.text().then(

            (obj) => {

              this.setState({ resp: obj });
              this.setState({ user: "" });

              ToastAndroid.showWithGravity(
                this.state.resp,
                ToastAndroid.LONG,
                ToastAndroid.CENTER
              );



            });

        } else {

          response.json()
            .then((responseJson) => {

              this.setState({ products: responseJson.products });
              console.log(this.state.products)



            })
        }
      }).catch((error) => {
        console.error(error);
      });
  }



}



const styles = StyleSheet.create({

  view: {

    marginTop: '50%',
  },
  res: {
    color: "green",
    textAlign: "center",
    marginTop: '2%',
    fontSize: 30

  },

 
  TouchableOpacityStyle:{
 
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30, 
  },
 
  FloatingButtonStyle: {
 
    resizeMode: 'contain',
    width: 50,
    height: 50,
  }
});