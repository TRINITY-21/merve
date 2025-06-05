import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Header } from '../../../components/common';
import { colors } from '../../../constants/theme/colors';
import { IFormData, IProfileSettings } from '../../../types/userSettingTypes';



interface FieldConfig {
    key: keyof IFormData;
    label: string;
    icon: string;
    required: boolean;
    type: 'text' | 'email' | 'phone' | 'date' | 'select';
}

interface InputRefs {
    [key: string]: TextInput | null;
}

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const AccountInfoScreen: React.FC = () => {
    const navigation = useNavigation();

    // State management with TypeScript
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasChanges, setHasChanges] = useState<boolean>(false);
    const [showImagePicker, setShowImagePicker] = useState<boolean>(false);

    // Form data with TypeScript
    const [formData, setFormData] = useState<IFormData>({
        firstName: 'Alex',
        lastName: 'Johnson',
        email: 'alex.johnson@email.com',
        phone: '+233 24 123 4567',
        dateOfBirth: '1990-08-15',
        gender: 'Male',
        nationality: 'Ghanaian',
        idNumber: 'GHA-123456789-0',
        address: '123 Independence Avenue',
        city: 'Accra',
        region: 'Greater Accra',
        postalCode: '00233',
        emergencyContact: '+233 26 987 6543',
        emergencyContactName: 'Sarah Johnson',
        emergencyContactRelation: 'Sister',
        occupation: 'Software Engineer',
        employer: 'Tech Solutions Ltd',
        monthlyIncome: 'GH₵ 5,000 - 10,000',
    });

    // Profile settings with TypeScript
    const [profileSettings, setProfileSettings] = useState<IProfileSettings>({
        emailVerified: true,
        phoneVerified: true,
        idVerified: false,
        twoFactorEnabled: true,
        profileVisibility: 'Public',
        contactByEmail: true,
        contactByPhone: false,
        marketingEmails: true,
        transactionSMS: true,
    });

    // Original data for comparison
    const [originalData, setOriginalData] = useState<IFormData>(formData);
    const [avatarUri, setAvatarUri] = useState<string>('https://i.pravatar.cc/150?img=9');

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const headerScaleAnim = useRef(new Animated.Value(0.95)).current;

    // Input refs for navigation with TypeScript
    const inputRefs = useRef<InputRefs>({});

    // Field configurations with TypeScript
    const personalFields: FieldConfig[] = [
        { key: 'firstName', label: 'First Name', icon: 'person', required: true, type: 'text' },
        { key: 'lastName', label: 'Last Name', icon: 'person-outline', required: true, type: 'text' },
        { key: 'email', label: 'Email Address', icon: 'email', required: true, type: 'email' },
        { key: 'phone', label: 'Phone Number', icon: 'phone', required: true, type: 'phone' },
        { key: 'dateOfBirth', label: 'Date of Birth', icon: 'cake', required: true, type: 'date' },
        { key: 'gender', label: 'Gender', icon: 'wc', required: false, type: 'select' },
    ];

    const identificationFields: FieldConfig[] = [
        { key: 'nationality', label: 'Nationality', icon: 'flag', required: true, type: 'text' },
        { key: 'idNumber', label: 'National ID Number', icon: 'badge', required: true, type: 'text' },
    ];

    const addressFields: FieldConfig[] = [
        { key: 'address', label: 'Street Address', icon: 'home', required: true, type: 'text' },
        { key: 'city', label: 'City', icon: 'location-city', required: true, type: 'text' },
        { key: 'region', label: 'Region/State', icon: 'map', required: true, type: 'text' },
        { key: 'postalCode', label: 'Postal Code', icon: 'markunread-mailbox', required: false, type: 'text' },
    ];

    const emergencyFields: FieldConfig[] = [
        { key: 'emergencyContactName', label: 'Emergency Contact Name', icon: 'contact-emergency', required: true, type: 'text' },
        { key: 'emergencyContact', label: 'Emergency Contact Phone', icon: 'phone', required: true, type: 'phone' },
        { key: 'emergencyContactRelation', label: 'Relationship', icon: 'people', required: true, type: 'text' },
    ];

    const professionalFields: FieldConfig[] = [
        { key: 'occupation', label: 'Occupation', icon: 'work', required: false, type: 'text' },
        { key: 'employer', label: 'Employer', icon: 'business', required: false, type: 'text' },
        { key: 'monthlyIncome', label: 'Monthly Income Range', icon: 'attach-money', required: false, type: 'select' },
    ];

    useEffect(() => {
        // Initial animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 20,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.spring(headerScaleAnim, {
                toValue: 1,
                tension: 25,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start();

        // Store original data
        setOriginalData(formData);
    }, []);

    useEffect(() => {
        // Check for changes
        const hasFormChanges = JSON.stringify(formData) !== JSON.stringify(originalData);
        setHasChanges(hasFormChanges);
    }, [formData, originalData]);

    const handleInputChange = (key: keyof IFormData, value: string): void => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleToggleChange = (key: keyof IProfileSettings, value: boolean | string): void => {
        setProfileSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const validateForm = (): boolean => {
        const requiredFields = [
            ...personalFields.filter(f => f.required),
            ...identificationFields.filter(f => f.required),
            ...addressFields.filter(f => f.required),
            ...emergencyFields.filter(f => f.required)
        ];

        for (const field of requiredFields) {
            if (!formData[field.key] || formData[field.key].trim() === '') {
                Alert.alert('Validation Error', `${field.label} is required`);
                return false;
            }
        }

        // Email validation
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            Alert.alert('Validation Error', 'Please enter a valid email address');
            return false;
        }

        // Phone validation
        if (formData.phone && !/^\+233\s\d{2}\s\d{3}\s\d{4}$/.test(formData.phone)) {
            Alert.alert('Validation Error', 'Please enter a valid phone number (+233 XX XXX XXXX)');
            return false;
        }

        return true;
    };

    const handleSave = async (): Promise<void> => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            setOriginalData(formData);
            setIsEditing(false);
            setHasChanges(false);

            Alert.alert('Success', 'Account information updated successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to update account information. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = (): void => {
        if (hasChanges) {
            Alert.alert(
                'Discard Changes',
                'You have unsaved changes. Are you sure you want to discard them?',
                [
                    { text: 'Keep Editing', style: 'cancel' },
                    {
                        text: 'Discard',
                        style: 'destructive',
                        onPress: () => {
                            setFormData(originalData);
                            setIsEditing(false);
                            setHasChanges(false);
                        }
                    }
                ]
            );
        } else {
            setIsEditing(false);
        }
    };

    const handleImagePicker = (): void => {
        Alert.alert(
            'Change Profile Photo',
            'Choose an option',
            [
                { text: 'Camera', onPress: () => console.log('Open camera') },
                { text: 'Photo Library', onPress: () => console.log('Open photo library') },
                { text: 'Cancel', style: 'cancel' }
            ]
        );
    };

    const focusNextInput = (currentKey: keyof IFormData): void => {
        const allFields = [...personalFields, ...identificationFields, ...addressFields, ...emergencyFields, ...professionalFields];
        const currentIndex = allFields.findIndex(field => field.key === currentKey);
        const nextField = allFields[currentIndex + 1];

        if (nextField && inputRefs.current[nextField.key]) {
            inputRefs.current[nextField.key]?.focus();
        }
    };

    const renderHeader = () => (
        <Animated.View
            className="shadow-lg elevation-8 z-10"
            style={{ transform: [{ scale: headerScaleAnim }] }}
        >
            <LinearGradient
                colors={colors.gradient.primary}
                className={`${Platform.OS === 'ios' ? 'pt-15' : 'pt-3'} pb-5`}
            >
                <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />

                <Header title="Account Information"
                    leftIcon={{ name: 'chevron-left', onPress: () => navigation.goBack() }}
                    rightIcons={[
                        { name: isEditing ? 'hourglass-empty' : 'edit', onPress: isEditing ? handleSave : () => setIsEditing(true) }
                    ]}
                />


                {hasChanges && isEditing && (
                    <View className='mb-4'
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 12,
                            paddingHorizontal: 14,
                            paddingVertical: 10,
                            borderRadius: 1,
                            backgroundColor: `${colors.white}20`,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.06,
                            shadowRadius: 2,
                            elevation: 2,
                        }}
                    >
                        <MaterialIcons name="info" size={18} color={colors.white} style={{ marginRight: 8 }} />
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: '600',
                                color: colors.white,
                                letterSpacing: 0.2,
                            }}
                        >
                            You have unsaved changes
                        </Text>
                    </View>
                )}


            </LinearGradient>
        </Animated.View>
    );

    const renderProfilePhotoSection = () => (
        <Animated.View
            style={{
                margin: 20,
                borderRadius: 20,
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 6,
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
            }}
        >
            <LinearGradient
                colors={['#FFFFFF', '#F8FAFC']}
                style={{ padding: 20 }}
            >
                {/* Header */}
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: colors.text.primary,
                        marginBottom: 20,
                        letterSpacing: 0.3,
                    }}
                >
                    Profile Photo
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                    {/* Avatar with edit icon */}
                    <TouchableOpacity
                        activeOpacity={isEditing ? 0.85 : 1}
                        onPress={isEditing ? handleImagePicker : undefined}
                        style={{ position: 'relative' }}
                    >
                        <Image
                            source={{ uri: avatarUri }}
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                borderWidth: 3,
                                borderColor: colors.white,
                            }}
                        />
                        {isEditing && (
                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    width: 28,
                                    height: 28,
                                    borderRadius: 14,
                                    backgroundColor: colors.accent,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <MaterialIcons name="camera-alt" size={16} color={colors.white} />
                            </View>
                        )}
                    </TouchableOpacity>

                    {/* Text Info */}
                    <View style={{ flex: 1 }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '700',
                                color: colors.text.primary,
                                marginBottom: 4,
                            }}
                        >
                            Profile Picture
                        </Text>
                        <Text
                            style={{
                                fontSize: 13,
                                color: colors.text.secondary,
                                marginBottom: 12,
                            }}
                        >
                            {isEditing ? 'Tap to change your profile photo' : 'Your current profile photo'}
                        </Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <MaterialIcons name="verified" size={16} color={colors.success} />
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: '600',
                                    color: colors.success,
                                }}
                            >
                                Profile Verified
                            </Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </Animated.View>
    );


    const renderInputField = (field: FieldConfig) => (
        <View key={field.key} className="mb-1">
            <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center gap-2">
                    <MaterialIcons name={field.icon as any} size={16} color={colors.accent} />
                    <Text className="text-sm font-semibold text-gray-900">
                        {field.label}
                        {field.required && <Text style={{ color: colors.error }}> *</Text>}
                    </Text>
                </View>

                {field.key === 'email' && profileSettings.emailVerified && (
                    <View className="flex-row items-center px-2 py-1 rounded-xl gap-1" style={{ backgroundColor: colors.success + '20' }}>
                        <MaterialIcons name="verified" size={12} color={colors.success} />
                        <Text className="text-xs font-bold" style={{ color: colors.success }}>Verified</Text>
                    </View>
                )}

                {field.key === 'phone' && profileSettings.phoneVerified && (
                    <View className="flex-row items-center px-2 py-1 rounded-xl gap-1" style={{ backgroundColor: colors.success + '20' }}>
                        <MaterialIcons name="verified" size={12} color={colors.success} />
                        <Text className="text-xs font-bold" style={{ color: colors.success }}>Verified</Text>
                    </View>
                )}
            </View>

            <View className={`bg-white rounded-xl px-4 py-3 shadow-sm elevation-1 ${!isEditing ? 'bg-gray-100 opacity-70' : ''
                }`} style={{ borderWidth: 1, borderColor: colors.gray.light }}>
                <TextInput
                    ref={ref => inputRefs.current[field.key] = ref as any}
                    className="text-base text-gray-900 font-medium min-h-5"
                    value={formData[field.key]}
                    onChangeText={(value) => handleInputChange(field.key, value) as any}
                    editable={isEditing}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    placeholderTextColor={colors.gray.medium}
                    keyboardType={
                        field.type === 'email' ? 'email-address' :
                            field.type === 'phone' ? 'phone-pad' :
                                'default'
                    }
                    autoCapitalize={field.type === 'email' ? 'none' : 'words'}
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextInput(field.key)}
                    multiline={field.key === 'address'}
                    numberOfLines={field.key === 'address' ? 2 : 1}
                />
            </View>
        </View>
    );

    const renderSection = (
        title: string,
        fields: FieldConfig[],
        icon: string,
        color: string
    ) => (
        <Animated.View
            style={{
                marginHorizontal: 20,
                marginBottom: 20,
                borderRadius: 20,
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 6,
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
            }}
        >
            <LinearGradient
                colors={['#FFFFFF', '#F8FAFC']}
                style={{ padding: 20 }}
            >
                {/* Section Header */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 20,
                        gap: 12,
                    }}
                >
                    <View
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 18,
                            backgroundColor: color,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <MaterialIcons name={icon as any} size={20} color={colors.white} />
                    </View>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '700',
                            color: colors.text.primary,
                            letterSpacing: 0.3,
                        }}
                    >
                        {title}
                    </Text>
                </View>

                {/* Input Fields */}
                <View style={{ gap: 16 }}>
                    {fields.map(renderInputField)}
                </View>
            </LinearGradient>
        </Animated.View>
    );

    const renderSettingsSection = () => (
        <Animated.View
            style={{
                marginHorizontal: 20,
                marginBottom: 20,
                borderRadius: 20,
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 6,
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
            }}
        >
            <LinearGradient colors={['#FFFFFF', '#F8FAFC']} style={{ padding: 20 }}>
                {/* Section Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 12 }}>
                    <View
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 18,
                            backgroundColor: colors.warning,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <MaterialIcons name="settings" size={20} color={colors.white} />
                    </View>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text.primary }}>
                        Privacy & Communication
                    </Text>
                </View>

                {/* Settings Items */}
                <View style={{ gap: 20 }}>
                    {[
                        {
                            icon: 'visibility',
                            label: 'Profile Visibility',
                            desc: 'Allow others to find your profile',
                            key: 'profileVisibility',
                            value: profileSettings.profileVisibility === 'Public',
                        },
                        {
                            icon: 'email',
                            label: 'Email Contact',
                            desc: 'Allow contact via email',
                            key: 'contactByEmail',
                            value: profileSettings.contactByEmail,
                        },
                        {
                            icon: 'sms',
                            label: 'Transaction SMS',
                            desc: 'Receive SMS for transactions',
                            key: 'transactionSMS',
                            value: profileSettings.transactionSMS,
                        },
                        {
                            icon: 'security',
                            label: 'Two-Factor Authentication',
                            desc: 'Enhanced account security',
                            key: 'twoFactorEnabled',
                            value: profileSettings.twoFactorEnabled,
                        },
                    ].map((item) => (
                        <View
                            key={item.key}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderBottomColor: colors.gray.light,
                                paddingBottom: 16,
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
                                <MaterialIcons name={item.icon as any} size={20} color={colors.text.secondary} />
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text.primary }}>
                                        {item.label}
                                    </Text>
                                    <Text style={{ fontSize: 12, color: colors.text.secondary, marginTop: 4 }}>
                                        {item.desc}
                                    </Text>
                                </View>
                            </View>
                            <Switch
                                value={item.value}
                                onValueChange={(val) =>
                                    handleToggleChange(item.key as keyof typeof profileSettings, item.key === 'profileVisibility' ? (val ? 'Public' : 'Private') : val)
                                }
                                trackColor={{ false: colors.gray.light, true: colors.primary }}
                                thumbColor={colors.white}
                                disabled={!isEditing}
                            />
                        </View>
                    ))}
                </View>
            </LinearGradient>
        </Animated.View>
    );


    return (
        <View className="flex-1" style={{ backgroundColor: colors.background }}>
            {renderHeader()}

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ paddingBottom: 40 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {renderProfilePhotoSection()}

                    {renderSection('Personal Information', personalFields, 'person', colors.primary)}
                    {renderSection('Identification', identificationFields, 'badge', colors.secondary)}
                    {renderSection('Address Information', addressFields, 'home', colors.accent)}

                    {renderSettingsSection()}

                    <View className="h-10" />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default AccountInfoScreen;