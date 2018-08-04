import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, ToastAndroid, FlatList, Dimensions, Image, RefreshControl } from 'react-native';
import CardView from 'react-native-cardview';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

const baseUrl = "http://192.168.0.100:8000/";

export default class Offers extends Component {


  constructor(props) {
    super(props);

    this.state = {

      message: "",
      resp: "",
      products: [],

    };
  }

  componentDidMount() {
      this.refresh();
  }

  renderItem = ({ item, index }) => {

    return (

      <View>
        <CardView
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}
          height={130}
          marginTop={2}>

          <Image
          style={{width: 66, height: 58}}
          source={{uri: baseUrl + "images/" + item.image}} 
        />

         

          <Text>
            Articolo:
            <Text style={{ fontWeight: 'bold' }}>
              {" " + item.name}
            </Text>
          </Text>

          <Text>
            Prezzo:
            <Text style={{ fontWeight: 'bold' }}>
              {" " + item.price} €
          </Text>
          </Text>


          <Text>
            Descrizione:
            <Text style={{ fontWeight: 'bold' }}>
              {" " + item.description}
            </Text>
          </Text>


          <Text>
            Quantità:
            <Text style={{ fontWeight: 'bold' }}>
              {" " + item.quantity}
            </Text>
          </Text>


          <Text>
            Link:
            <Text style={{ fontWeight: 'bold' }}>
              {" " + item.link}
            </Text>
          </Text>


          <Text>
            Inserzionista:
            <Text style={{ fontWeight: 'bold' }}>
              {" " + item.user}
            </Text>
          </Text>

        </CardView>
      </View>




    );
  }



  render() {


    return (

      <View >

        <View>
          <FlatList
            data={this.state.products}
            renderItem={this.renderItem}
            minHeight={Dimensions.get('window').height}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onEndReachedThreshold={0.5}
                onRefresh={() => this.refresh()}
              />
            }



          />

        </View>
      </View>
    );
  }



  refresh() {

    return fetch(baseUrl + "api/home", {

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

              if(responseJson.products.length <= 0){

                ToastAndroid.showWithGravity(
                  "Nessuna offerta disponibile",
                  ToastAndroid.LONG,
                  ToastAndroid.CENTER
                );

              } else {

              var list = responseJson.products;

              for(let i = 0; i < list.length; i++){

                if(list[i].image == "null"){
                  list[i].image = "noimg.jpg";
                }

              }
          
              this.setState({ products: list });
              console.log(this.state.products)
            } 


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

  }
});