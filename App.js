import { StatusBar } from 'expo-status-bar';

import { StyleSheet,Dimensions, TextInput,Text, Image,View,ScrollView, SafeAreaView,FlatList} from 'react-native';
import { Feather } from '@expo/vector-icons';
import GetData from './data/fetch';
import  {useState,useEffect} from 'react';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  let getNetwork =async (data)=>{
  }
  

  
  const [Data,setData] =  useState(null);
  const [error,setError] = useState(null);
  
  const [Searchval,setsearchval] = useState("");
 const [title,setTitle]= useState("Batman");
 const [Loading,setLoading] = useState(true)
 const [Dark,SetDark] = useState(true);
 const [errormsg,setErrormsg] = useState(null)


 let getData = (title)=>{

  GetData(title)
  .then(data=>{

      setLoading(false)
      setData(data)
      console.log(data)
      return



  }).catch(e=>{
    console.log(e)
   setData(undefined)
    setLoading(true)
    return
  })



}  

  let  result= Data ? Data.filter(e=>{
    return e.Poster !== "N/A"}
    ) : undefined


    // Handling Theme
    const HandleTheme = ()=>{
      SetDark(!Dark)
      console.log(Dark)
    }



    
let ChangeInp = (e)=>{
  setsearchval(e)

}

// Category Onclick
let CategoryClick = (e)=>{
  getData(e)

 
    
    
}


// Seacrh Onlick event

let Enterkey = (e)=>{

  if (Searchval == "" || !Data) {
   console.log("error")
  //  console.log(result)
   setErrormsg("Please Enter a value")
  
    
  } else{
    setTitle(Searchval)
    // console.log(Data)
    setErrormsg(null)
   
    getData(Searchval)
    
  }   
  console.log(Searchval)
    
}

  // Getting Data 
  const ApiURL =  "  http://www.omdbapi.com/?apikey=3c497d9c"



  useEffect(() => {
    const controller= new AbortController()
    const Data = fetch(`${ApiURL}&s=${title}`).then(e=>e.json()).then(e=>{
   
    }).catch(e=>console.log(e))
    getData(title)
    console.log("HELLO")
    getNetwork()
    return controller.abort()
  }, [])



  const RenderItems = (data)=>{
      return (
        <View style={styles.MovieBox}>
         <Image 
         resizeMode='contain'
         alt='image'
          source ={{uri: data.item.Poster}}
          style = {
             { height: 300,
             width:  Dimensions.get("window").width - 50,
             borderRadius: 8,
             borderTopRightRadius: 8

              }}/>
            <Text style={[styles.Title,{color: Dark ? "white": "black"}]}>{data.item.Title}</Text>
            <Text style={styles.Catergory}>{data.item.Catergory}</Text>
            



        </View>

      )
  }


  return (
      <SafeAreaView   horizontal={true}
      pagingEnabled={true} 
      // style={[styles.container,
      //   {backgroundColor: Dark ? "black": "white"}
      //   ]}
        
        >
        {Loading ? <View>
          <Text>Loading</Text>
          </View> : <ScrollView >


             <View style={styles.wrapper}>
           <Text style={[styles.text,
              {color: Dark ? "white": "black"}
              ]}>Filmpire </Text>
           <FontAwesome style={styles.icon} onPress={HandleTheme} name={Dark ? "toggle-on": "toggle-off" } size={24} color={Dark?"white": "black"} />
           <View style={styles.inputContainer}>
            <TextInput  placeholderTextColor={Dark ? "white": "black"} onChangeText={ChangeInp} style={styles.input} placeholder="Search for your movie..."></TextInput>
            <Feather onPress={Enterkey} name="search" color={Dark ? "white": "black"} size={30}/>

           </View>

           
            <FlatList style={styles.container}
            data={Data}
            renderItem={RenderItems}
            />
        </View>
  </ScrollView> }
        
     

      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 container : {
  flex: 1,
  padding: 20,

},

 wrapper: {
   flex:1,
   },
   inputContainer : {
    marginVertical: 35,
    flexDirection: "row",
    alignItems: 'center',
   },

   input: {
    borderRadius: 20,
    borderColor: "grey",
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: 100,
    flex: 1
   },
   text: {
    color: "teal",
    fontSize: 40,
    fontWeight:  "bold",
    textAlign: "center"
   },

   Title: {
    fontSize: 22,
    fontFamily: "monospace",
    textAlign: "center"
   }

});
