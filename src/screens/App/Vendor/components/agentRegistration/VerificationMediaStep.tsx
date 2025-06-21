import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Typography } from '../../../../../components/common';
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
      style={{
        borderRadius: 16,
        borderWidth: 2,
        borderStyle: 'dashed',
        padding: 20,
        marginBottom: 16,
        borderColor: uri ? colors.success : colors.primary,
        backgroundColor: uri ? colors.success + '08' : colors.primary + '08',
        // shadowColor: colors.shadowColor,
        // shadowOffset: colors.shadowOffset,
        // shadowOpacity: 0.05,
        // shadowRadius: 8,
        // elevation: 2,
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {uri ? (
        <View style={{ alignItems: 'center' }}>
          <Image 
            source={{ uri }} 
            style={{ 
              width: 120, 
              height: 120, 
              borderRadius: 12,
              // shadowColor: colors.shadowColor,
              // shadowOffset: colors.shadowOffset,
              // shadowOpacity: 0.1,
              // shadowRadius: 8,
            }}
            resizeMode="cover"
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <MaterialIcons name="check-circle" size={18} color={colors.success} />
            <Typography 
              variant="medium"
              style={{ color: colors.success, marginLeft: 8, fontSize: 14 }}
            >
              Document uploaded successfully
            </Typography>
          </View>
          <Typography 
            variant="regular"
            style={{ color: colors.text.secondary, fontSize: 12, marginTop: 4 }}
          >
            Tap to change
          </Typography>
        </View>
      ) : (
        <View style={{ alignItems: 'center' }}>
          <View style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.primary + '20',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 12,
          }}>
            <MaterialIcons 
              name="cloud-upload" 
              size={32} 
              color={colors.primary} 
            />
          </View>
          <Typography 
            variant="semibold"
            style={{ color: colors.text.primary, fontSize: 16, textAlign: 'center' }}
          >
            {title}
            {required && <Text style={{ color: colors.error }}> *</Text>}
          </Typography>
          <Typography 
            variant="regular"
            style={{ color: colors.text.secondary, fontSize: 14, textAlign: 'center', marginTop: 8, lineHeight: 20 }}
          >
            {subtitle}
          </Typography>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <Animated.View 
      style={[cardStyle, {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 24,
        // marginBottom: 20,
        marginTop: 10,
        // shadowColor: colors.shadowColor,
        // shadowOffset: colors.shadowOffset,
        // shadowOpacity: 0.1,
        // shadowRadius: 16,
        // elevation: 8,
        borderWidth: 1,
        borderColor: colors.gray.light,
      }]}
    >
      <View style={{ marginBottom: 24 }}>
        <Typography 
          variant="semibold"
          style={{ color: colors.text.primary, fontSize: 20, marginBottom: 8 }}
        >
          Verification & Media
        </Typography>
        <Typography 
          variant="regular"
          style={{ color: colors.text.secondary, fontSize: 14, lineHeight: 20 }}
        >
          Upload documents to verify your identity and showcase your business setup.
        </Typography>
      </View>

      {/* Required Documents */}
      <View style={{ marginBottom: 24 }}>
        <Typography 
          variant="semibold"
          style={{ color: colors.text.primary, fontSize: 16, marginBottom: 16 }}
        >
          Required Documents
        </Typography>

        <DocumentUpload
          title="ID Document"
          subtitle="Upload a clear photo of your National ID, Passport, or Driver's License"
          uri={formData.idDocument}
          onPress={() => pickImage('id')}
          required
        />

        <DocumentUpload
          title="Business License"
          subtitle="Upload your business registration certificate (Optional)"
          uri={formData.businessLicense}
          onPress={() => pickImage('license')}
        />
      </View>

      {/* Setup Photos */}
      <View style={{ marginBottom: 24 }}>
        <Typography 
          variant="semibold"
          style={{ color: colors.text.primary, fontSize: 16, marginBottom: 8 }}
        >
          Business Setup Photos
        </Typography>
        <Typography 
          variant="regular"
          style={{ color: colors.text.secondary, fontSize: 14, marginBottom: 16, lineHeight: 20 }}
        >
          Add photos of your business location to help customers recognize your setup (Optional)
        </Typography>

        {/* Setup Photos Grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          {formData.setupPhotos.map((photo, index) => (
            <View key={index} style={{ position: 'relative' }}>
              <Image 
                source={{ uri: photo }} 
                style={{ 
                  width: 100, 
                  height: 100, 
                  borderRadius: 12,
                  // shadowColor: colors.shadowColor,
                  // shadowOffset: colors.shadowOffset,
                  // shadowOpacity: 0.1,
                  // shadowRadius: 4,
                }}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: colors.error,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // shadowColor: colors.shadowColor,
                  // shadowOffset: colors.shadowOffset,
                  // shadowOpacity: 0.2,
                  // shadowRadius: 4,
                  // elevation: 3,
                }}
                onPress={() => removeSetupPhoto(index)}
              >
                <MaterialIcons name="close" size={16} color={colors.white} />
              </TouchableOpacity>
            </View>
          ))}
          
          {formData.setupPhotos.length < 4 && (
            <TouchableOpacity
              style={{
                width: 100,
                height: 100,
                borderRadius: 12,
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: colors.primary,
                backgroundColor: colors.primary + '08',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => pickImage('setup')}
            >
              <MaterialIcons name="add-photo-alternate" size={32} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Terms and Conditions */}
      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: 16,
            backgroundColor: colors.secondaryLight,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: formData.termsAccepted ? colors.primary : colors.gray.light,
          }}
          onPress={() => setFormData({ ...formData, termsAccepted: !formData.termsAccepted })}
        >
          <View style={{
            width: 20,
            height: 20,
            borderRadius: 4,
            borderWidth: 2,
            borderColor: formData.termsAccepted ? colors.primary : colors.gray.medium,
            backgroundColor: formData.termsAccepted ? colors.primary : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
            marginTop: 2,
          }}>
            {formData.termsAccepted && (
              <MaterialIcons name="check" size={14} color={colors.white} />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Typography 
              variant="medium"
              style={{ color: colors.text.primary, fontSize: 14, lineHeight: 20 }}
            >
              I agree to the Terms and Conditions and Privacy Policy
            </Typography>
            <Typography 
              variant="regular"
              style={{ color: colors.text.secondary, fontSize: 12, marginTop: 4, lineHeight: 16 }}
            >
              By checking this box, you confirm that all information provided is accurate and you agree to our terms.
            </Typography>
          </View>
        </TouchableOpacity>
      </View>

    </Animated.View>
  );
};

export default VerificationMediaStep;