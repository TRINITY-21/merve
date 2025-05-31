import React from 'react';
import { ScrollView, View } from 'react-native';
import Button from '../components/Button';
import { Typography } from '../components/Typography';

const HomeScreen: React.FC = () => {
  const handlePress = () => {
    console.log('Button pressed!');
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-4 py-8">
        {/* Header */}
        <View className="mb-8">


<Typography variant='medium' size={28} >Welcome, Joseph Fernandez</Typography>

          <Typography variant='regular' size={18} className="mt-5">This should be Black 900</Typography>


        </View>
        

        <Typography className="font-black text-2xl">Heading</Typography>


        {/* Feature Cards */}
        <View className="space-y-4 mb-8">
          <View className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <Typography className="text-lg font-semibold text-blue-900 mb-2">
              🚀 TypeScript
            </Typography>
            <Typography className="text-blue-700">
              Type-safe development with excellent IntelliSense
            </Typography>
          </View>

          <View className="bg-green-50 p-4 rounded-lg border border-green-200">
            <Typography className="text-lg font-semibold text-green-900 mb-2">
              🎨 Tailwind CSS
            </Typography>
            <Typography className="text-green-700">
              Utility-first CSS framework via NativeWinds
            </Typography>
          </View>

          <View className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <Typography className="text-lg font-semibold text-purple-900 mb-2">
              📱 React Native
            </Typography>
            <Typography className="text-purple-700">
              Cross-platform mobile development
            </Typography>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="space-y-3">
          <Button
            title="Primary Button"
            onPress={handlePress}
            variant="primary"
          />
          <Button
            title="Secondary Button"
            onPress={handlePress}
            variant="secondary"
          />
        </View>

        {/* Stats Grid */}
        <View className="mt-8 flex-row flex-wrap -mx-2">
          <View className="w-1/2 px-2 mb-4">
            <View className="bg-gray-100 p-4 rounded-lg items-center">
              <Typography className="text-2xl font-bold text-gray-900">100+</Typography>
              <Typography className="text-gray-600">Components</Typography>
            </View>
          </View>
          <View className="w-1/2 px-2 mb-4">
            <View className="bg-gray-100 p-4 rounded-lg items-center">
              <Typography className="text-2xl font-bold text-gray-900">50+</Typography>
              <Typography className="text-gray-600">Utilities</Typography>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;