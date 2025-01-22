import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { axiosInstance } from '../../utils/axiosInstance';

const SignUpCard = ({navigation}) => {
    const [user,setUser] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const [error,setError] = useState("");
    const handleChange = (name,text)=>{
        setUser((prev)=>({
            ...prev,
            [name]:text
        }))
    }
    const handleSubmit = ()=>{
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!user.name){
            setError("*Please enter your name");
        }
        else if(user.name.length<4){
            setError("*Please enter valid name");
        }
        else if(!user.email){
            setError("*Please enter your email");
        }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)){
            setError("*Please enter valid email");
        }
        else if(!user.password){
            setError("*Please enter password");
        }
        else if(!passwordRegex.test(user.password)){
            setError("*Please enter strong password");
        }
        else if(!user.confirmPassword){
            setError("*Please enter confirm password");
        }
        else if(user.confirmPassword!==user.password){
            setError("*Password didn't match");
        }
        else{
            register();
            console.log('submitted');
        }
    }

    const register = async()=>{
        try{
            console.log("sending")
            const response = await axiosInstance.post('/api/auth/signup',{
                name:user.name,
                email:user.email,
                password:user.password
            });
            
            if(response.data){
                setError("");
                navigation.navigate('login');
                console.log(response.data.message);
            } 
        }
        catch(err){
            setError(err.message); 
        }
    }
  return (
    <KeyboardAvoidingView behavior='padding' style={Styles.container}>
        <View style={Styles.heading}>
         <Text style={{fontWeight:"bold",fontSize:24}}>SignUp</Text>
        </View>
        <View>
            <Text style={Styles.error}>{error}</Text>
        </View>
        <View style={Styles.userName}>
            <Text style={{fontSize:16 }}>Name:</Text>
            <TextInput style={Styles.loginInp} placeholder='Enter your Name' value={user.name} onChangeText={(text)=>handleChange('name',text)}/>
        </View>
        <View style={Styles.userName}>
            <Text style={{fontSize:16 }}>Email:</Text>
            <TextInput style={Styles.loginInp} placeholder='Enter your Email' value={user.email} onChangeText={(text)=>handleChange('email',text)}/>
        </View>
        <View style={Styles.password}>
            <Text style={{fontSize:16}}>Password:</Text>
            <TextInput style={Styles.loginInp} placeholder='Enter your Password'  value={user.password} onChangeText={(text)=>handleChange('password',text)} secureTextEntry/>
        </View>
        <View style={Styles.password}>
            <Text style={{fontSize:16}}>Confirm Password:</Text>
            <TextInput style={Styles.loginInp} placeholder='Confirm your Password'  value={user.confirmPassword} onChangeText={(text)=>handleChange('confirmPassword',text)} secureTextEntry/>
        </View>
        <View style={Styles.loginBtn}>
            <TouchableOpacity onPress={handleSubmit}>
                <Text style={Styles.btnText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
       <View>
         <TouchableOpacity onPress={()=>navigation.navigate('login')}>
         <Text style={Styles.bottom}>Already have an Account?<Text style={{color:"blue"}}> Click Here</Text></Text>
         </TouchableOpacity>
       </View> 
       <View>
        <Text style={[Styles.bottom,{marginBottom:20}]}>Forgot Password?<Text style={{color:"blue"}}> Click Here</Text></Text>
       </View> 
    </KeyboardAvoidingView>
  )
}

const Styles = StyleSheet.create({
    container:{ 
        padding:20, 
        borderRadius:10, 
        elevation:20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: '#fff', 
    },
    heading:{ 
        marginTop:20 , 
        marginBottom:20,
        marginHorizontal:'auto', 
    },
    userName:{
        marginTop:20, 
    },
    password:{
        marginTop:20
    },
    loginInp:{
        marginTop:15, 
        borderWidth:2,
        borderColor:'gray',
        borderRadius:10
    },
    loginBtn:{
        marginTop:20,   
        marginHorizontal:"auto", 
        backgroundColor:"cornflowerblue", 
        width: 150, 
        borderRadius:20, 
    },
    btnText:{
        textAlign:'center',
        padding:15, 
        fontWeight:'bold',
        color:'white'
    },
    bottom:{ 
        textAlign:'center',
        marginTop:20
    }, 
    error:{
        color:'red',
        textAlign:'center'
    }

})

export default SignUpCard