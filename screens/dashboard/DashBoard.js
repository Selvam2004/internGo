import { Image ,View,Text, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import 'react-native-gesture-handler'
import { useDispatch ,useSelector} from 'react-redux'
import { logout } from '../../redux/reducers/AuthSlice';
import Logo from '../../assets/internGo.png';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import Profile from '../User/Profile';
import DailyUpdate from '../User/DailyUpdate';
import Roadmap from '../User/Roadmap';
import Help from '../User/Help';
import CreateRoadmap from '../Mentor/CreateRoadmap';
import EditFeedback from '../Mentor/EditFeedback';
import Interactions from '../User/Interactions';
import CreatePlan from '../Admin/CreatePlan';
import InteractionSchedule from '../Admin/InteractionSchedule'
import EditInteractions from '../Admin/EditInteraction'
import InteractionsToTake from '../Mentor/InteractionToTake'
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
import OI from 'react-native-vector-icons/Octicons';
import Home from '../User/Home'; 
import { axiosInstance } from '../../utils/axiosInstance';
import ViewDailyUpdates from '../Admin/ViewDailyUpdates';
import { useNavigation } from '@react-navigation/native';
import socket from '../../utils/socket';
import { addNotification, setNotifications,markAsRead } from '../../redux/reducers/NotificationSlice';
import AddUsers from '../Admin/AddUsers';
import ViewFeedback from '../Admin/ViewFeedback';
import Toast from 'react-native-toast-message';
import Analytics from '../Admin/Analytics';
 

export default function DashBoard( ) {
  const dispatch = useDispatch();   
  const datas= useSelector(state=>state.auth.data?.data?.permissions);  
  const id= useSelector(state=>state.auth.data?.data?.userId);  
  const token= useSelector(state=>state.auth.data?.data?.token);  
  const permission = datas || null;
  const navigation = useNavigation(); 
  const handleLogOut = ()=>{
    dispatch(logout());
  }
  const Drawer = createDrawerNavigator()
  const [badgeCount, setBadgeCount] = useState(0);  


  useEffect(()=>{
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
},[])

  useEffect(() => {   
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id); 
      socket.emit("join", {userId:id});
    });

    socket.on("notification", (data) => { 
      const dt = data.createdNotification;
      const newNotification = {id:dt.id,message:dt.message,type:dt.type,timestamp:new Date(dt.createdAt).toLocaleString("en-US", { 
        year: "numeric", month: "long", day: "numeric", 
        hour: "2-digit", minute: "2-digit"
    }),isRead:dt.isRead}
      showToast(newNotification.type,newNotification.message)
      setBadgeCount(prev=>prev+1);
      dispatch(addNotification(newNotification))
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected. Attempting to reconnect...");
    });

    return () => {
      socket.off("connect");
      socket.off("notification");
      socket.off("disconnect");   
    };
  }, [id]); 
 
  const showToast = (type,message) => {     
    Toast.show({
      type: 'info',  
      text1: type,
      text2: message,
      position: "top",  
      swipeable:true,
      visibilityTime:1500, 
    });
  }; 


  useEffect(()=>{ 
    fetchNotification(); 
  },[])
 
  const fetchNotification = async()=>{  
    try{
      const response = await axiosInstance.get(`/api/notifications/${id}`);
      if(response){ 
        
        let notification = response.data.data||[];
        if(notification.length>0){
          notification=notification.map((dt)=>({
            id:dt.id,message:dt.message,type:dt.type,timestamp:new Date(dt.createdAt).toLocaleString("en-US", { 
              year: "numeric", month: "long", day: "numeric", 
              hour: "2-digit", minute: "2-digit"
          }),isRead:dt.isRead})
          )
        }          
        const count =notification.filter(n=>!n.isRead);
        setBadgeCount(count.length);
        dispatch(setNotifications(notification));
      }
    }
    catch(err){
      dispatch(setNotifications([]));
      console.log(err.response.data?.message);      
    }
  }

  
  const handleNotification = ()=>{ 
    setBadgeCount(0);
    navigation.navigate('Notifications')
  }

  const tabs = [
    {
      label: 'Home',
      name: 'Home',
      permission: 'profile.update',
      component: Home,
      icon:EP,
      iconlabel:'home'
    },
    {
      label: 'Profile',
      name: 'Profile',
      permission: 'profile.update',
      component: Profile,
      icon:EP,
      iconlabel:'user', 
    },
    {
      label: 'Daily Update',
      name: 'Daily Update',
      permission: 'tasks.update',
      component: DailyUpdate,
      icon:FA,
      iconlabel:'list-ul'
    },
    // {
    //   label: 'RoadMap',
    //   name: 'RoadMap',
    //   permission: 'RoadMap',
    //   component: Roadmap,
    //   icon:FA,
    //   label:'map-marked-alt'
    // },
    // {
    //   label: 'Help',
    //   name: 'Help',
    //   permission: 'profile.update',
    //   component: Help,
    //   icon:MI,
    //   label:'contact-support'
    // },
    {
      label: 'Create Plan',
      name: 'Create Plan',
      permission: 'plans.create',
      component: CreatePlan,
      icon:FA,
      iconlabel:'sitemap'
    },
    {
      label: 'Daily Updates',
      name: 'View Daily Update',
      permission: 'users.manage',
      component: ViewDailyUpdates,
      icon:FA,
      iconlabel:'list-ul'
    },
    {
      label: 'Resources',
      name: 'Resources',
      permission: 'users.manage',
      component: Resources,
      icon:FA,
      iconlabel:'users'
    },
    {
      label: 'Add Users',
      name: 'AddUsers',
      permission: 'users.manage',
      component: AddUsers,
      icon:EP,
      iconlabel:'add-user', 
    },
    {
      label:'Schedule',
      name: 'Schedule',
      permission: 'interactions.schedule',
      component: InteractionSchedule,
      icon:MI,
      iconlabel:'pending-actions'
    },

    // {
    //   label: 'Create RoadMap',
    //   name: 'Create RoadMap',
    //   permission: 'roadmaps.view',
    //   component: CreateRoadmap,
    //   icon:FA,
    //   label:'map-marked-alt'
    // },
    {
      label: 'Interactions',
      name: 'Interactions',
      permission: 'tasks.update',
      component: Interactions,
      icon:AD,
      iconlabel:'calendar' 
    },
    {
      label: 'Interactions',
      name: 'InteractionsToTake',
      permission: 'feedback.create',
      component: InteractionsToTake,
      icon:AD,
      iconlabel:'calendar' 
    },
    {
      label: 'Interactions',
      name: 'EditInteractions',
      permission: 'interactions.schedule',
      component: EditInteractions,
      icon:AD,
      iconlabel:'calendar' 
    },
    {
      label: 'Analytics',
      name: 'PerformanceAnalytics',
      permission: 'feedback.view',
      component: Analytics,
      icon:EP,
      iconlabel:'bar-graph'
    },
    {
      label: 'FeedBack',
      name: 'View FeedBack',
      permission: 'feedback.view',
      component: ViewFeedback,
      icon:EP,
      iconlabel:'chat'
    },
    {
      label: 'FeedBack',
      name: 'edit FeedBack',
      permission: 'feedback.create',
      component: EditFeedback,
      icon:EP,
      iconlabel:'chat'
    },

    // {
    //   name: 'Records',
    //   permission: 'users.view',
    //   component: Records,
    //   icon:AD,
    //   label:'folderopen'
    // },
    // {
    //   name: 'Pending Tickets',
    //   permission: 'plans.create',
    //   component: PendingTickets,
    //   icon:MI,
    //   label:'pending-actions'
    // },    
    {
      label: 'Create Announcement',
      name: 'Create Announcement',
      permission: 'plans.create',
      component: CreateAnnouncement,
      icon:AD,
      iconlabel:'notification'
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
      <TouchableOpacity onPress={handleNotification} style={styles.iconContainer}>
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
                <DrawerItem label={tab.label} iconlabel={tab.iconlabel} icon={tab.icon} name={tab.name} />
              ),
            }} />
          )
        );
      }):<Drawer.Screen name='Blank' component={NoPermission}/>} 
      
     </Drawer.Navigator> 
     <Toast/>
   
     </>
  )
}

const DrawerItem = ({ icon: IconComponent, iconlabel,label }) => {
  return (
    <View style={{flexDirection:'row'}}>
      {IconComponent&&<IconComponent  name={iconlabel} size={20} style={{marginLeft:10}}/>}
      <Text style={{marginLeft:20}}>{label}</Text>
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