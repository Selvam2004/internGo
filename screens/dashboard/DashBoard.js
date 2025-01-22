import { Image ,View,Text, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
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

export default function DashBoard() {
  const dispatch = useDispatch();
  const data = useSelector(state=>state.auth.data?.data?.permissions); 
  const permission = data || null;
  const handleLogOut = ()=>{
    dispatch(logout());
  }
  const Drawer = createDrawerNavigator()
  const [badgeCount, setBadgeCount] = useState(10);
  
  const tabs = [
    {
      name: 'Profile',
      permission: 'profile.update',
      component: Profile
    },
    {
      name: 'Daily Update',
      permission: 'tasks.update',
      component: DailyUpdate
    },
    {
      name: 'RoadMap',
      permission: 'RoadMap',
      component: Roadmap
    },
    {
      name: 'Help',
      permission: 'Help',
      component: Help
    },
    {
      name: 'Create RoadMap',
      permission: 'Create RoadMap',
      component: CreateRoadmap
    },
    {
      name: 'FeedBack',
      permission: 'feedback.view',
      component: Feedback
    },
    {
      name: 'Interactions',
      permission: 'interactions.view',
      component: Interactions
    },
    {
      name: 'Create Plan',
      permission: 'Create Plan',
      component: CreatePlan
    },
    {
      name: 'Interaction Schedule',
      permission: 'Interaction Schedule',
      component: InteractionSchedule
    },
    {
      name: 'Records',
      permission: 'Records',
      component: Records
    },
    {
      name: 'Pending Tickets',
      permission: 'Pending Tickets',
      component: PendingTickets
    },    {
      name: 'Create Announcement',
      permission: 'Create Announcement',
      component: CreateAnnouncement
    },
  ]

  return (
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
            <Drawer.Screen name={tab.name} component={tab.component} key={id} />
          )
        );
      }):<Drawer.Screen name='Blank' component={NoPermission}/>} 
     </Drawer.Navigator>
  )
}

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