import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  UserIcon,
  ChevronDownIcon,
  SearchIcon,
  AdjustmentsIcon,
} from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import client from '../sanity'


const HomeScreen = () => {
  const navigation=useNavigation();
  const [featuredCategories,setFeaturedCategories]=useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown:false,
    });
  },[]);
  useEffect(()=>{
    client.fetch(`
     *[_type=="featured"]{
        ...,
        restarants[]->{
          ...,
          dishes[]->
        }
     }
    `).then(data=>{
       setFeaturedCategories(data);
    })
  },[]);
  
  return (
    <SafeAreaView className='bg-white pt-5'>
        {/* header */}
      <View className='flex-row pb-3 items-center mx-4 space-x-2 '>
        <Image 
        source={{url:'https://links.papareact.com/wru'}}
        className='h-7 w-7 bg-green-300 p-4 rounded-full'
        />

        <View className='flex-1'>
          <Text className='font-bold text-gray-400 text-xs'>Deliver Now</Text>
          <Text className='font-bold text-xl'>Current location
           <ChevronDownIcon size={20} color='#00ccbb' />
          </Text>
        </View>
        <UserIcon size={35} color='#00ccbb' />
      </View>
      {/* search area */}
       <View className='flex-row items-center space-x-2 pb-2 mx-4 '>
          <View className='flex-row flex-1 space-x-2 bg-gray-200 p-3'>
            <SearchIcon size={20} color='grey' />
            <TextInput
              placeholder='Restaurants and cuisines'
              keyboardType='default'
            />
          </View>
          <AdjustmentsIcon color='#00ccbb' />
       </View>
       {/* body */}
       <ScrollView
        className='bg-gray-100'
        contentContainerStyle={{
          paddingBottom:100,
        }}
       >
         {/* categories */}
         <Categories />

         {/* featured row */}
         {featuredCategories?.map((category)=>(
            <FeaturedRow 
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_descriptiom}
            />
         ))}
         
       </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen