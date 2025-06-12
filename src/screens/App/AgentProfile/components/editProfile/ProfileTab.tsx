// components/tabs/ProfileTab.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Animated,
  Image,
  TouchableOpacity,
  View
} from 'react-native';
import { Typography } from '../../../../../components/common';
import { IProfileTabProps } from '../../../../../types/editProfileTypes';
import { InputField } from './InputField';


export const ProfileTab: React.FC<IProfileTabProps> = ({
  agentData,
  profileImageUri,
  fadeAnim,
  slideAnim,
  inputRefs,
  onInputChange,
  onImagePicker,
  onFocusNextInput,
}) => {
  return (
    <Animated.View 
      className="p-5"
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }}
    >
      {/* Profile Photo Section */}
      <View className="items-center mb-6">
        <Typography className="text-lg font-bold text-gray-800 mb-4">
          Profile Photo
        </Typography>
        <TouchableOpacity 
          className="relative"
          onPress={onImagePicker}
          activeOpacity={0.8}
        >
          <Image 
            source={{ uri: profileImageUri }} 
            className="w-30 h-30 rounded-full border-4 border-white"
          />
          <View className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-teal-500 items-center justify-center">
            <MaterialIcons name="camera-alt" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Personal Information */}
      <View className="bg-white rounded-2xl p-5 mb-5 shadow-sm" 
        style={{
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 6,
        }}
      >
        <Typography variant='semibold' className=" text-gray-800 mb-4">
          Personal Information
        </Typography>
        
        <InputField
          label="First Name"
          fieldKey="firstName"
          value={agentData.firstName}
          options={{ required: true, icon: 'person', nextField: 'lastName' }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Last Name"
          fieldKey="lastName"
          value={agentData.lastName}
          options={{ required: true, icon: 'person-outline', nextField: 'email' }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Email Address"
          fieldKey="email"
          value={agentData.email}
          options={{ 
            required: true, 
            icon: 'email', 
            keyboardType: 'email-address', 
            autoCapitalize: 'none', 
            nextField: 'phone' 
          }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Phone Number"
          fieldKey="phone"
          value={agentData.phone}
          options={{ 
            required: true, 
            icon: 'phone', 
            keyboardType: 'phone-pad', 
            nextField: 'whatsapp' 
          }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="WhatsApp Number"
          fieldKey="whatsapp"
          value={agentData.whatsapp}
          options={{ icon: 'phone', keyboardType: 'phone-pad', nextField: 'dateOfBirth' }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Date of Birth"
          fieldKey="dateOfBirth"
          value={agentData.dateOfBirth}
          options={{ icon: 'cake', placeholder: 'YYYY-MM-DD', nextField: 'gender' }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Gender"
          fieldKey="gender"
          value={agentData.gender}
          options={{ icon: 'wc', nextField: 'idType' }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="ID Type"
          fieldKey="idType"
          value={agentData.idType}
          options={{ icon: 'badge', nextField: 'idNumber' }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="ID Number"
          fieldKey="idNumber"
          value={agentData.idNumber}
          options={{ required: true, icon: 'badge', nextField: 'businessName' }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />
      </View>
    </Animated.View>
  );
};