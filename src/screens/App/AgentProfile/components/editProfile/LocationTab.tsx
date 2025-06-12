// components/tabs/LocationTab.tsx
import React from 'react';
import {
  Animated,
  View
} from 'react-native';
import { InputField } from '.';
import { Typography } from '../../../../../components/common';
import { ILocationTabProps } from '../../../../../types/editProfileTypes';

export const LocationTab: React.FC<ILocationTabProps> = ({
  agentData,
  fadeAnim,
  slideAnim,
  inputRefs,
  onInputChange,
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
      <View className="bg-white rounded-2xl p-5 mb-5 shadow-sm" 
        style={{
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 6,
        }}
      >
        <Typography variant='semibold' className="text-lg font-bold text-gray-800 mb-4">
          Business Location
        </Typography>
        
        <InputField
          label="Business Address"
          fieldKey="businessAddress"
          value={agentData.businessAddress}
          options={{ 
            required: true, 
            icon: 'home', 
            multiline: true,
            numberOfLines: 2,
            nextField: 'city'
          }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="City"
          fieldKey="city"
          value={agentData.city}
          options={{ required: true, icon: 'location-city', nextField: 'region' }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Region/State"
          fieldKey="region"
          value={agentData.region}
          options={{ required: true, icon: 'map', nextField: 'postalCode' }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Postal Code"
          fieldKey="postalCode"
          value={agentData.postalCode}
          options={{ icon: 'markunread-mailbox', nextField: 'landmark' }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Landmark"
          fieldKey="landmark"
          value={agentData.landmark}
          options={{ icon: 'place', placeholder: 'e.g., Near Circle Interchange', nextField: 'gpsAddress' }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="GPS Address"
          fieldKey="gpsAddress"
          value={agentData.gpsAddress}
          options={{ icon: 'gps-fixed', placeholder: 'e.g., GA-123-4567' }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />
      </View>

      <View className="bg-white rounded-2xl p-5 mb-5 shadow-sm" 
        style={{
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 6,
        }}
      >
        <Typography  variant='semibold' className="text-lg font-bold text-gray-800 mb-4">
          Emergency Contact
        </Typography>
        
        <InputField
          label="Emergency Contact Name"
          fieldKey="emergencyContactName"
          value={agentData.emergencyContactName}
          options={{ 
            required: true, 
            icon: 'contact-emergency',
            nextField: 'emergencyContactPhone'
          }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Emergency Contact Phone"
          fieldKey="emergencyContactPhone"
          value={agentData.emergencyContactPhone}
          options={{ 
            required: true, 
            icon: 'phone',
            keyboardType: 'phone-pad',
            nextField: 'emergencyContactRelation'
          }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Relationship"
          fieldKey="emergencyContactRelation"
          value={agentData.emergencyContactRelation}
          options={{ 
            required: true, 
            icon: 'people',
            placeholder: 'e.g., Sister, Brother, Friend'
          }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />
      </View>
    </Animated.View>
  );
};