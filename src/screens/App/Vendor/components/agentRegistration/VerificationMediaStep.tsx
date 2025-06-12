import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { colors } from '../../../../../constants/theme/colors';
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
  const pickImage = async (type: 'id' | 'license' | 'setup') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const imageUri = result.assets[0].uri;
      
      if (type === 'id') {
        setFormData({ ...formData, idDocument: imageUri });
      } else if (type === 'license') {
        setFormData({ ...formData, businessLicense: imageUri });
      } else if (type === 'setup') {
        setFormData({ 
          ...formData, 
          setupPhotos: [...formData.setupPhotos, imageUri] 
        });
      }
    }
  };

  const removeSetupPhoto = (index: number) => {
    const updatedPhotos = formData.setupPhotos.filter((_, i) => i !== index);
    setFormData({ ...formData, setupPhotos: updatedPhotos });
  };

  const DocumentUpload = ({ 
    title, 
    subtitle, 
    uri, 
    onPress, 
    required = false 
  }: {
    title: string;
    subtitle: string;
    uri: string | null;
    onPress: () => void;
    required?: boolean;
  }) => (
    <TouchableOpacity
      className="rounded-xl border-2 border-dashed p-4 mb-4"
      style={{
        borderColor: uri ? colors.success : colors.primary + '50',
        backgroundColor: uri ? colors.success + '10' : colors.primary + '10'
      }}
      onPress={onPress}
    >
      {uri ? (
        <View className="items-center">
          <Image 
            source={{ uri }} 
            style={{ width: 100, height: 100, borderRadius: 8 }}
            resizeMode="cover"
          />
          <View className="flex-row items-center mt-2">
            <MaterialIcons name="check-circle" size={16} color={colors.success} />
            <Text 
              className="ml-2 text-sm font-medium"
              style={{ color: colors.success }}
            >
              Document uploaded
            </Text>
          </View>
          <Text 
            className="text-xs mt-1"
            style={{ color: colors.text.secondary }}
          >
            Tap to change
          </Text>
        </View>
      ) : (
        <View className="items-center">
          <MaterialIcons 
            name="cloud-upload" 
            size={40} 
            color={colors.primary} 
          />
          <Text 
            className="text-base font-semibold mt-2"
            style={{ color: colors.text.primary }}
          >
            {title}
            {required && <Text style={{ color: colors.error }}> *</Text>}
          </Text>
          <Text 
            className="text-sm text-center mt-1"
            style={{ color: colors.text.secondary }}
          >
            {subtitle}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <Animated.View 
      style={[cardStyle, {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        marginTop: 20,
        borderWidth: 1,
        borderColor: colors.primary + '30',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
      }]}
    >
      <Text 
        className="text-xl font-bold mb-2"
        style={{ color: colors.text.primary }}
      >
        Verification & Media
      </Text>
      <Text 
        className="text-sm mb-5"
        style={{ color: colors.text.secondary }}
      >
        Upload documents to verify your identity 📄
      </Text>

      {/* ID Document Upload */}
      <Text 
        className="text-lg font-semibold mb-3"
        style={{ color: colors.text.primary }}
      >
        Required Documents
      </Text>

      <DocumentUpload
        title="ID Document"
        subtitle="Upload a clear photo of your National ID, Passport, or Driver's License"
        uri={formData.idDocument}
        onPress={() => pickImage('id')}
        required
      />

      {/* Business License Upload */}
      <DocumentUpload
        title="Business License"
        subtitle="Upload your business registration certificate (Optional)"
        uri={formData.businessLicense}
        onPress={() => pickImage('license')}
      />

      {/* Setup Photos */}
      <Text 
        className="text-lg font-semibold mb-3 mt-4"
        style={{ color: colors.text.primary }}
      >
        Business Setup Photos
      </Text>
      <Text 
        className="text-sm mb-3"
        style={{ color: colors.text.secondary }}
      >
        Add photos of your business location (Optional)
      </Text>

      {/* Setup Photos Grid */}
      <View className="flex-row flex-wrap gap-2 mb-4">
        {formData.setupPhotos.map((photo, index) => (
          <View key={index} className="relative">
            <Image 
              source={{ uri: photo }} 
              style={{ width: 80, height: 80, borderRadius: 8 }}
              resizeMode="cover"
            />
            <TouchableOpacity
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.error }}
              onPress={() => removeSetupPhoto(index)}
            >
              <MaterialIcons name="close" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        ))}
        
        {formData.setupPhotos.length < 5 && (
          <TouchableOpacity
            className="w-20 h-20 rounded-lg border-2 border-dashed items-center justify-center"
            style={{ borderColor: colors.primary + '50' }}
            onPress={() => pickImage('setup')}
          >
            <MaterialIcons name="add-a-photo" size={24} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Terms and Conditions */}
      <View className="mt-4">
        <TouchableOpacity
          className="flex-row items-start"
          onPress={() => setFormData({ ...formData, termsAccepted: !formData.termsAccepted })}
        >
          <MaterialIcons
            name={formData.termsAccepted ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color={formData.termsAccepted ? colors.primary : colors.gray?.medium || '#999999'}
            style={{ marginTop: 2 }}
          />
          <View className="flex-1 ml-3">
            <Text 
              className="text-sm leading-5"
              style={{ color: colors.text.primary }}
            >
              I agree to the{' '}
              <Text style={{ color: colors.primary, fontWeight: '600' }}>
                Terms and Conditions
              </Text>
              {' '}and{' '}
              <Text style={{ color: colors.primary, fontWeight: '600' }}>
                Privacy Policy
              </Text>
              . I understand that providing false information may result in rejection of my application.
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Upload Progress Indicator */}
      {formData.idDocument && (
        <View 
          className="flex-row items-center justify-center mt-4 py-2 px-4 rounded-lg"
          style={{ backgroundColor: colors.success + '20' }}
        >
          <MaterialIcons name="verified" size={16} color={colors.success} />
          <Text 
            className="ml-2 text-sm font-medium"
            style={{ color: colors.success }}
          >
            Ready for submission
          </Text>
        </View>
      )}
    </Animated.View>
  );
};

export default VerificationMediaStep;