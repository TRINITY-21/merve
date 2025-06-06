import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Button } from '../../../../../components/common';
import { IFormData } from '../../../../../types/agentRegistrationTypes';

interface IVerificationMediaStepProps {
  formData: IFormData;
  setFormData: (data: IFormData) => void;
  cardStyle: any;
}

const VerificationMediaStep: React.FC<IVerificationMediaStepProps> = ({
  formData,
  setFormData,
  cardStyle,
}) => {
  const pickImage = async (field: keyof IFormData) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setFormData({ ...formData, [field]: result.assets[0].uri });
    }
  };

  const addSetupPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setFormData({
        ...formData,
        setupPhotos: [...formData.setupPhotos, result.assets[0].uri],
      });
    }
  };

  return (
    <Animated.View 
      style={cardStyle}
      className="bg-white/95 rounded-2xl p-5 mb-5 border border-[#FFCC00]/30 shadow-lg"
    >
      <Text className="text-xl font-bold text-[#212121] mb-2">
        Verification & Media
      </Text>
      <Text className="text-sm text-[#757575] mb-5">
        Build trust with your customers! 📸
      </Text>

      {/* ID Document Upload */}
      <View className="mb-4">
        <Text className="text-base text-[#212121] mb-2 font-semibold">
          ID Document
        </Text>
        <Button
          title={formData.idDocument ? 'ID Uploaded' : 'Upload ID'}
          variant="outline"
          size="medium"
          onPress={() => pickImage('idDocument')}
          className="border-[#00BFA5] mb-2"
          // textClassName="text-[#00BFA5]"
        />
        {formData.idDocument && (
          <Image 
            source={{ uri: formData.idDocument }} 
            className="w-25 h-25 rounded-lg border border-[#9E9E9E]"
          />
        )}
      </View>

      {/* Business License Upload */}
      <View className="mb-4">
        <Text className="text-base text-[#212121] mb-2 font-semibold">
          Business License (Optional)
        </Text>
        <Button
          title={formData.businessLicense ? 'License Uploaded' : 'Upload License'}
          variant="outline"
          size="medium"
          onPress={() => pickImage('businessLicense')}
          className="border-[#00BFA5] mb-2"
          // textClassName="text-[#00BFA5]"
        />
        {formData.businessLicense && (
          <Image 
            source={{ uri: formData.businessLicense }} 
            className="w-25 h-25 rounded-lg border border-[#9E9E9E]"
          />
        )}
      </View>

      {/* Setup Photos Upload */}
      <View className="mb-4">
        <Text className="text-base text-[#212121] mb-2 font-semibold">
          Setup Photos (Optional)
        </Text>
        <Button
          title="Add Photo"
          variant="outline"
          size="medium"
          onPress={addSetupPhoto}
          className="border-[#00BFA5] mb-2"
          // textClassName="text-[#00BFA5]"
        />
        <FlatList
          data={formData.setupPhotos}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          renderItem={({ item }) => (
            <Image 
              source={{ uri: item }} 
              className="w-25 h-25 rounded-lg border border-[#9E9E9E] mr-2"
            />
          )}
        />
      </View>

      {/* Terms and Conditions */}
      <TouchableOpacity
        className="flex-row items-center mb-4"
        onPress={() => setFormData({ ...formData, termsAccepted: !formData.termsAccepted })}
      >
        <MaterialIcons
          name={formData.termsAccepted ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color="#00BFA5"
        />
        <Text className="ml-2 text-base text-[#212121]">
          I accept the{' '}
          <Text className="text-[#00BFA5] underline">
            Agent Terms & Conditions
          </Text>
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default VerificationMediaStep;