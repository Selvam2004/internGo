import { Image ,View,Text, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import 'react-native-gesture-handler'
import { useDispatch ,useSelector} from 'react-redux'
import { logout } from '../../redux/AuthSlice';
import Logo from '../../assets/internGo.png';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import Profile from '../User/Profile';
import DailyUpdate from '../User/DailyUpdate';
import Roadmap from '../User/Roadmap';
import Help from '../User/Help';
import CreateRoadmap from '../Mentor/CreateRoadmap';
import Feedback from '../Mentor/Feedback';
import Interactions from '../Mentor/Interactions';
import CreatePlan from '../Admin/CreatePlan';
import InteractionSchedule from '../Admin/InteractionSchedule'
import Records from '../Admin/Records'
import CreateAnnouncement from '../Admin/CreateAnnouncement';
import PendingTickets from '../Admin/PendingTickets';
import NoPermission from '../User/NoPermission';
import Icon from 'react-native-vector-icons/MaterialIcons';  
import Resources from '../Admin/Resources'; 
import FA from 'react-native-vector-icons/FontAwesome5'; 
import EP from 'react-native-vector-icons/Entypo';
import MI from 'react-native-vector-icons/MaterialIcons';
import AD from 'react-native-vector-icons/AntDesign';
import Home from '../User/Home'; 
import { axiosInstance } from '../../utils/axiosInstance';
 

export default function DashBoard() {
  const dispatch = useDispatch();
  const datas = useSelector(state=>state.auth.data?.data?.permissions); 
  const id = useSelector(state=>state.auth.data?.data?.userId); 
  const token = useSelector((state)=>state.auth.data?.data?.token);
  const permission = datas || null;
  const handleLogOut = ()=>{
    dispatch(logout());
  }
  const Drawer = createDrawerNavigator()
  const [badgeCount, setBadgeCount] = useState(10); 
  const verify =async()=>{
    try{ 
      const response = await axiosInstance.post('/api/auth/verify',{token});
      if(response){
        console.log(response);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      } 
      else{
        handleLogOut();
      }
    }
    catch(err){
      console.log(err);
      handleLogOut()
    }
  }
  useEffect(()=>{
    verify();
  },[])
  
  const tabs = [
    {
      name: 'Home',
      permission: 'home',
      component: Home,
      icon:EP,
      label:'home'
    },
    {
      name: 'Profile',
      permission: 'profile.update',
      component: Profile,
      icon:EP,
      label:'user',
      data:id 
    },
    {
      name: 'Daily Update',
      permission: 'tasks.update',
      component: DailyUpdate,
      icon:FA,
      label:'list-ul'
    },
    {
      name: 'RoadMap',
      permission: 'RoadMap',
      component: Roadmap,
      icon:FA,
      label:'map-marked-alt'
    },
    {
      name: 'Help',
      permission: 'Help',
      component: Help,
      icon:MI,
      label:'contact-support'
    },
    {
      name: 'Create Plan',
      permission: 'plans.create',
      component: CreatePlan,
      icon:FA,
      label:'sitemap'
    },
    {
      name: 'Create RoadMap',
      permission: 'roadmaps.view',
      component: CreateRoadmap,
      icon:FA,
      label:'map-marked-alt'
    },
    {
      name: 'FeedBack',
      permission: 'feedback.view',
      component: Feedback,
      icon:EP,
      label:'chat'
    },
    {
      name: 'Interactions',
      permission: 'interactions.view',
      component: Interactions,
      icon:AD,
      label:'calendar' 
    },
    {
      name: 'Interaction Schedule',
      permission: 'interactions.schedule',
      component: InteractionSchedule,
      icon:AD,
      label:'calendar'
    },
    {
      name: 'Records',
      permission: 'users.view',
      component: Records,
      icon:AD,
      label:'folderopen'
    },
    {
      name: 'Pending Tickets',
      permission: 'plans.create',
      component: PendingTickets,
      icon:MI,
      label:'pending-actions'
    },    {
      name: 'Create Announcement',
      permission: 'plans.create',
      component: CreateAnnouncement,
      icon:AD,
      label:'notification'
    },
    {
      name: 'Resources',
      permission: 'users.manage',
      component: Resources,
      icon:FA,
      label:'users'
    },
  ]

  return (
    <>
     <Drawer.Navigator screenOptions={{
      headerTitle: () => (
      <Image
        source={Logo}
        style={{ width: 120, height: 120 }} 
      />
    ) ,
    headerRight:()=>(
      <View style={{marginRight:20}}>
      <TouchableOpacity onPress={()=>setBadgeCount(badgeCount-1)} style={styles.iconContainer}>
        <Icon name="notifications" size={30} color="#000" />
        {badgeCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
    )
  }}  
  
  drawerContent={ (props) => (
      <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}> 
        <Text style={styles.menuTitle}>DashBoard</Text>
      </View>
      <DrawerItemList {...props} />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
    )}>
 
      {Array.isArray(permission) && permission.length>0 ? tabs.map((tab, id) => {
        return (
          permission.includes(tab.permission) && (
            <Drawer.Screen name={tab.name} component={tab.component} key={id} options={{
              drawerLabel: () => (
                <DrawerItem label={tab.label} icon={tab.icon} name={tab.name} />
              ),
            }} />
          )
        );
      }):<Drawer.Screen name='Blank' component={NoPermission}/>} 
      
     </Drawer.Navigator> 
      
   
     </>
  )
}

const DrawerItem = ({ icon: IconComponent, name,label }) => {
  return (
    <View style={{flexDirection:'row'}}>
      {IconComponent&&<IconComponent  name={label} size={20} style={{marginLeft:10}}/>}
      <Text style={{marginLeft:20}}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20, 
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 15,
    backgroundColor: '#ff4d4d',
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    right: -6,  
    top: -4,  
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
})