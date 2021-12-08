import * as React from 'react'
import { Image, ScrollView } from 'react-native';
import { View, Text } from 'react-native'
import { servidor } from '../config/Path';
import { styles } from '../css/Styles1';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
let rs = "";
export default function Home({route}){
    const {dados} = route.params;
    rs = dados[2];
    return(
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name="TelaHome" component={TelaHome}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}


 function TelaHome({navigation}) {
    
    console.log(`Dados na Home ->${rs}`);

    const[lstEmpresa,setLstEmpresa] = React.useState([]);


    React.useEffect(()=>{
        fetch(`${servidor}`,{
            method:'GET',
            headers:{
                accept: 'application/json',
                'content-type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((result)=>{
            console.log(result);
            setLstEmpresa(result.output);
        })
        .catch((erro)=>console.error(`Erro ao ler a api -> ${erro}`))
        
    },[])


    return(
        <View style={styles.container}>

        <ScrollView horizontal={false} style={styles.scroll}>
            <Image source={{uri:"https://www.azulis.com.br/wp-content/uploads/2020/02/shutterstock_571562023-1-770x478.jpg"}} style={styles.imgcliente}/>
            <View>
                {
                    lstEmpresa.map((item,index)=>(
                        <View style={styles.empresa} key={index}>
                            <Text style={styles.rua}>Rua:{item.rua}</Text>
                            <Text style={styles.bairro}>Bairro:{item.bairro}</Text>
                            <Text style={styles.cep}>CEP:{item.cep}</Text>
                            <Text style={styles.numero}>Número:{item.numero}</Text>
                            <TouchableOpacity onPress={()=>{
                                navigation.navigate("Atualizar",{cliente:item,token:rs});
                            }}>
                            <Feather name="edit" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </View>
        </ScrollView>    
        </View>
    );
}