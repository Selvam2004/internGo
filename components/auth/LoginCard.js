import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView , ActivityIndicator} from 'react-native' 
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../../redux/reducers/AuthSlice';
import { axiosInstance } from '../../utils/axiosInstance';

const LoginCard = ({navigation}) => {
    const [error,setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [user,setUser] = useState({
        email:"",
        password:""
    })
    const dispatch = useDispatch();
    const handleChange = (name,text)=>{
        setUser((prev)=>({
            ...prev,
            [name]:text
        }))
    }
    const handleSubmit = ()=>{
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!user.email){
            setError("*Please enter your email");
        }
        else if(!/^[a-zA-Z0-9._%+-]+@(?:finestcoder\.com|codingmart\.com)$/.test(user.email)){
            setError("*Please enter valid email");
        }
        else if(!user.password){
            setError("*Please enter password");
        } 
        else{
            setError("");
            console.log('submitted');
            login();
        }
    }
    const login = async()=>{ 
        try{   
            setLoading(true); 
            console.log("sending")
            const response = await axiosInstance.post('/api/auth/signin',{ 
                email:user.email,
                password:user.password
            });
            console.log('finished');
            if(response.data){
                setError("");  
                const token = response.data.data?.token;
                if (token) { 
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    dispatch(loginAction(response.data));
                }
            } 
        }
        catch(err){
            console.log(err)
            setError(err?.response?.data?.message||"Something went wrong while Signin"); 
            
        }
        finally {
            setLoading(false);  
        }
    }
  return (
    <KeyboardAvoidingView behavior='padding' style={Styles.container}>
        
        <View style={Styles.heading}>
         <Text style={{fontWeight:"bold",fontSize:24}}>Login</Text>
        </View>
        <View>
            <Text style={Styles.error}>{error}</Text>
        </View>
        <View style={Styles.userName}>
            <Text style={{fontSize:16 }}>Email:</Text>
            <TextInput style={Styles.loginInp} placeholder='Enter your Email' value={user.email} onChangeText={(text)=>handleChange('email',text)} />
        </View>
        <View style={Styles.password}>
            <Text style={{fontSize:16}}>Password:</Text>
            <TextInput style={Styles.loginInp} placeholder='Enter your Password'  value={user.password} onChangeText={(text)=>handleChange('password',text)} secureTextEntry/>
        </View>
        <View style={Styles.loginBtn}>
            <TouchableOpacity onPress={handleSubmit}>
                <Text style={Styles.btnText}>Login</Text>
            </TouchableOpacity>
        </View>
       <View>
       <TouchableOpacity onPress={()=>navigation.navigate('signup')}>
        <Text style={Styles.bottom} >Don't have an Account?<Text style={{color:"blue"}}> Click Here</Text></Text>
        </TouchableOpacity>
       </View> 
       <View>
        <Text style={[Styles.bottom,{marginBottom:20}]}>Forgot Password?<Text style={{color:"blue"}}> Click Here</Text></Text>
       </View> 

            {loading && (
                <View style={Styles.loadingContainer}> 
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={Styles.loadingText}>Logging in...</Text>
                </View>
            )}

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
        marginTop:30, 
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
    },
    loadingContainer: {
        position: 'absolute',
        flexDirection:'row',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        zIndex: 1,  
    },
    loadingText: { 
        padding:5,
        fontSize: 16,
        color: '#000',  
    }

})

export default LoginCard