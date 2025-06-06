// components/TabContent.tsx
import React from 'react';
import { ITabContentProps } from '../../../../../types/editProfileTypes';
import { BankingTab } from './BankingTab';
import { BusinessTab } from './BusinessTab';
import { HoursTab } from './HoursTab';
import { LocationTab } from './LocationTab';
import { ProfileTab } from './ProfileTab';


export const TabContent: React.FC<ITabContentProps> = ({
  activeTab,
  agentData,
  workingHours,
  profileImageUri,
  fadeAnim,
  slideAnim,
  inputRefs,
  onInputChange,
  onWorkingHoursChange,
  onImagePicker,
  onFocusNextInput,
}) => {
  switch (activeTab) {
    case 'profile':
      return (
        <ProfileTab
          agentData={agentData}
          profileImageUri={profileImageUri}
          fadeAnim={fadeAnim}
          slideAnim={slideAnim}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onImagePicker={onImagePicker}
          onFocusNextInput={onFocusNextInput}
        />
      );
    case 'business':
      return (
        <BusinessTab
          agentData={agentData}
          fadeAnim={fadeAnim}
          slideAnim={slideAnim}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />
      );
    case 'location':
      return (
        <LocationTab
          agentData={agentData}
          fadeAnim={fadeAnim}
          slideAnim={slideAnim}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />
      );
    case 'banking':
      return (
        <BankingTab
          agentData={agentData}
          fadeAnim={fadeAnim}
          slideAnim={slideAnim}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />
      );
    case 'hours':
      return (
        <HoursTab
          agentData={agentData}
          workingHours={workingHours}
          fadeAnim={fadeAnim}
          slideAnim={slideAnim}
          onInputChange={onInputChange}
          onWorkingHoursChange={onWorkingHoursChange}
        />
      );
    default:
      return (
        <ProfileTab
          agentData={agentData}
          profileImageUri={profileImageUri}
          fadeAnim={fadeAnim}
          slideAnim={slideAnim}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onImagePicker={onImagePicker}
          onFocusNextInput={onFocusNextInput}
        />
      );
  }
};