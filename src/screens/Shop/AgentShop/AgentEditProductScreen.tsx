import { useNavigation, useRoute } from '@react-navigation/native';
import React, { JSX, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { ICategory, ICondition, IEditProductData, IEditProductScreenProps, IStep } from '../../../types/editProductTypes';
import ActionsModal from './components/editProduct/ActionsModal';
import BasicInfoStep from './components/editProduct/BasicInfoStep';
import CategoryModal from './components/editProduct/CategotyModal';
import ConditionModal from './components/editProduct/ConditionModal';
import DeleteModal from './components/editProduct/DeleteModal';
import EditProductHeader from './components/editProduct/EditProductHeader';
import MediaStep from './components/editProduct/MediaStep';
import NavigationButtons from './components/editProduct/NavigationButtons';
import { SpecificationModal, TagModal } from './components/editProduct/SpecificationModal';
import StepIndicator from './components/editProduct/StepIndicator';
import { DetailsStep, PricingStep } from './components/editProduct/steps';
import UpdateStep from './components/editProduct/UpdateStep';



const EditProductScreen: React.FC<IEditProductScreenProps> = () => {
    const navigation = useNavigation();
    const route = useRoute();

    // Get existing product data from route params
    const existingProduct = route.params?.product || {};

    // State management - Initialize with existing product data
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [productData, setProductData] = useState<IEditProductData>({
        id: existingProduct.id || '',
        title: existingProduct.title || '',
        description: existingProduct.description || '',
        category: existingProduct.category || '',
        price: existingProduct.price?.toString() || '',
        originalPrice: existingProduct.originalPrice?.toString() || '',
        condition: existingProduct.condition || 'new',
        warranty: existingProduct.warranty || '',
        stockCount: existingProduct.stockCount?.toString() || '',
        images: existingProduct.images || [],
        specifications: existingProduct.specifications || {},
        tags: existingProduct.tags || [],
        location: existingProduct.location || '',
        deliveryOptions: existingProduct.deliveryOptions || {
            pickup: true,
            delivery: false,
            shipping: false,
        },
        isPromoted: existingProduct.isPromoted || false,
        isDraft: existingProduct.isDraft || false,
        lastModified: new Date().toISOString(),
    });

    const [selectedImages, setSelectedImages] = useState<string[]>(existingProduct.images || []);
    const [mainImageIndex, setMainImageIndex] = useState<number>(existingProduct.mainImageIndex || 0);
    const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
    const [showConditionModal, setShowConditionModal] = useState<boolean>(false);
    const [showSpecModal, setShowSpecModal] = useState<boolean>(false);
    const [newSpecKey, setNewSpecKey] = useState<string>('');
    const [newSpecValue, setNewSpecValue] = useState<string>('');
    const [showTagModal, setShowTagModal] = useState<boolean>(false);
    const [newTag, setNewTag] = useState<string>('');
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showActionsModal, setShowActionsModal] = useState<boolean>(false);
    const [hasChanges, setHasChanges] = useState<boolean>(false);

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;

    const steps: IStep[] = [
        { key: 'basic', title: 'Basic Info', icon: 'info' },
        { key: 'media', title: 'Photos', icon: 'photo-camera' },
        { key: 'details', title: 'Details', icon: 'description' },
        { key: 'pricing', title: 'Pricing', icon: 'monetization-on' },
        { key: 'update', title: 'Update', icon: 'update' },
    ];

    const categories: ICategory[] = [
        { key: 'phones', label: 'Smartphones', icon: 'smartphone' },
        { key: 'laptops', label: 'Laptops', icon: 'laptop' },
        { key: 'tablets', label: 'Tablets', icon: 'tablet' },
        { key: 'accessories', label: 'Tech Accessories', icon: 'headphones' },
        { key: 'gaming', label: 'Gaming', icon: 'sports-esports' },
        { key: 'audio', label: 'Audio', icon: 'volume-up' },
        { key: 'cameras', label: 'Cameras', icon: 'photo-camera' },
        { key: 'wearables', label: 'Wearables', icon: 'watch' },
        { key: 'home', label: 'Smart Home', icon: 'home' },
        { key: 'other', label: 'Other', icon: 'category' },
    ];

    const conditions: ICondition[] = [
        { key: 'new', label: 'Brand New', desc: 'Never used, in original packaging' },
        { key: 'like-new', label: 'Like New', desc: 'Barely used, excellent condition' },
        { key: 'excellent', label: 'Excellent', desc: 'Minor wear, fully functional' },
        { key: 'good', label: 'Good', desc: 'Some wear, works perfectly' },
        { key: 'fair', label: 'Fair', desc: 'Visible wear, functions normally' },
    ];

    const mockImages: string[] = [
        'https://picsum.photos/300/300?random=1',
        'https://picsum.photos/300/300?random=2',
        'https://picsum.photos/300/300?random=3',
    ];

    useEffect(() => {
        // Initial animations
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
        ]).start();

        // Update progress animation
        Animated.timing(progressAnim, {
            toValue: currentStep / (steps.length - 1),
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [currentStep, fadeAnim, slideAnim, progressAnim, steps.length]);

    const updateProductData = (field: keyof IEditProductData, value: any): void => {
        setProductData(prev => ({
            ...prev,
            [field]: value,
            lastModified: new Date().toISOString(),
        }));
        setHasChanges(true);
    };

    const handleImagePicker = (): void => {
        const newImages = [...selectedImages, ...mockImages.slice(selectedImages.length, selectedImages.length + 1)];
        setSelectedImages(newImages);
        updateProductData('images', newImages);
    };

    const removeImage = (index: number): void => {
        const newImages = selectedImages.filter((_, i) => i !== index);
        setSelectedImages(newImages);
        updateProductData('images', newImages);
        if (mainImageIndex >= newImages.length) {
            setMainImageIndex(Math.max(0, newImages.length - 1));
        }
    };

    const addSpecification = (): void => {
        if (newSpecKey.trim() && newSpecValue.trim()) {
            updateProductData('specifications', {
                ...productData.specifications,
                [newSpecKey.trim()]: newSpecValue.trim()
            });
            setNewSpecKey('');
            setNewSpecValue('');
            setShowSpecModal(false);
        }
    };

    const removeSpecification = (key: string): void => {
        const newSpecs = { ...productData.specifications };
        delete newSpecs[key];
        updateProductData('specifications', newSpecs);
    };

    const addTag = (): void => {
        if (newTag.trim() && !productData.tags.includes(newTag.trim())) {
            updateProductData('tags', [...productData.tags, newTag.trim()]);
            setNewTag('');
            setShowTagModal(false);
        }
    };

    const removeTag = (tag: string): void => {
        updateProductData('tags', productData.tags.filter(t => t !== tag));
    };

    const validateStep = (stepIndex: number): boolean => {
        switch (stepIndex) {
            case 0: // Basic Info
                return !!(productData.title.trim() && productData.description.trim() && productData.category);
            case 1: // Media
                return selectedImages.length > 0;
            case 2: // Details
                return !!(productData.condition && productData.stockCount);
            case 3: // Pricing
                return !!(productData.price && parseFloat(productData.price) > 0);
            default:
                return true;
        }
    };

    const handleNext = (): void => {
        if (validateStep(currentStep)) {
            if (currentStep < steps.length - 1) {
                setCurrentStep(currentStep + 1);
            }
        } else {
            Alert.alert('Incomplete Information', 'Please fill in all required fields before proceeding.');
        }
    };

    const handlePrevious = (): void => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSaveChanges = (): void => {
        Alert.alert(
            'Save Changes',
            'Are you sure you want to save these changes?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Save',
                    onPress: () => {
                        setHasChanges(false);
                        Alert.alert('Success', 'Product changes saved successfully!');
                    }
                }
            ]
        );
    };

    const handleUpdateProduct = (): void => {
        if (validateStep(currentStep)) {
            Alert.alert(
                'Update Product',
                'Are you sure you want to update this product?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Update',
                        onPress: () => {
                            navigation.goBack();
                        }
                    }
                ]
            );
        }
    };

    const handleDeleteProduct = (): void => {
        Alert.alert(
            'Delete Product',
            'Are you sure you want to delete this product? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        navigation.goBack();
                    }
                }
            ]
        );
    };

    const handleDuplicateProduct = (): void => {
        Alert.alert(
            'Duplicate Product',
            'Create a copy of this product?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Duplicate',
                    onPress: () => {
                        navigation.navigate('AddProduct', { duplicateFrom: productData });
                    }
                }
            ]
        );
    };

    const handleBackPress = (): void => {
        if (hasChanges) {
            Alert.alert(
                'Unsaved Changes',
                'You have unsaved changes. What would you like to do?',
                [
                    { text: 'Discard', style: 'destructive', onPress: () => navigation.goBack() },
                    { text: 'Save & Exit', onPress: handleSaveChanges },
                    { text: 'Continue Editing', style: 'cancel' }
                ]
            );
        } else {
            navigation.goBack();
        }
    };

    const renderStepContent = (): JSX.Element => {
        const commonProps = {
            fadeAnim,
            slideAnim,
            productData,
            updateProductData,
        };

        switch (currentStep) {
            case 0:
                return (
                    <BasicInfoStep
                        {...commonProps}
                        categories={categories}
                        onCategoryPress={() => setShowCategoryModal(true)}
                    />
                );
            case 1:
                return (
                    <MediaStep
                        {...commonProps}
                        selectedImages={selectedImages}
                        mainImageIndex={mainImageIndex}
                        onImagePicker={handleImagePicker}
                        onRemoveImage={removeImage}
                        onSetMainImage={setMainImageIndex}
                    />
                );
            case 2:
                return (
                    <DetailsStep
                        {...commonProps}
                        conditions={conditions}
                        onConditionPress={() => setShowConditionModal(true)}
                        onSpecPress={() => setShowSpecModal(true)}
                        onTagPress={() => setShowTagModal(true)}
                        onRemoveSpecification={removeSpecification}
                        onRemoveTag={removeTag}
                    />
                );
            case 3:
                return <PricingStep {...commonProps} />;
            case 4:
                return (
                    <UpdateStep
                        {...commonProps}
                        selectedImages={selectedImages}
                        onPreview={() => setShowPreview(true)}
                        onSaveChanges={handleSaveChanges}
                        onUpdateProduct={handleUpdateProduct}
                    />
                );
            default:
                return (
                    <BasicInfoStep
                        {...commonProps}
                        categories={categories}
                        onCategoryPress={() => setShowCategoryModal(true)}
                    />
                );
        }
    };


    useLayoutEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: { display: 'none' },
        });

        return () => {
            navigation.getParent()?.setOptions({
                tabBarStyle: undefined,
            });
        };
    }, [navigation]);


    return (
        <KeyboardAvoidingView
            className="flex-1 bg-gray-50"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <EditProductHeader
                navigation={navigation}
                progressAnim={progressAnim}
                currentStep={currentStep}
                totalSteps={steps.length}
                hasChanges={hasChanges}
                onBackPress={handleBackPress}
                onActionsPress={() => setShowActionsModal(true)}
            />

            <StepIndicator
                steps={steps}
                currentStep={currentStep}
            />

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {renderStepContent()}
            </ScrollView>

            <NavigationButtons
                currentStep={currentStep}
                totalSteps={steps.length}
                canProceed={validateStep(currentStep)}
                onNext={handleNext}
                onPrevious={handlePrevious}
            />

            <CategoryModal
                visible={showCategoryModal}
                categories={categories}
                selectedCategory={productData.category}
                onSelect={(category) => {
                    updateProductData('category', category);
                    setShowCategoryModal(false);
                }}
                onClose={() => setShowCategoryModal(false)}
            />

            <ConditionModal
                visible={showConditionModal}
                conditions={conditions}
                selectedCondition={productData.condition}
                onSelect={(condition) => {
                    updateProductData('condition', condition);
                    setShowConditionModal(false);
                }}
                onClose={() => setShowConditionModal(false)}
            />

            <SpecificationModal
                visible={showSpecModal}
                newSpecKey={newSpecKey}
                newSpecValue={newSpecValue}
                onKeyChange={setNewSpecKey}
                onValueChange={setNewSpecValue}
                onAdd={addSpecification}
                onClose={() => setShowSpecModal(false)}
            />

            <TagModal
                visible={showTagModal}
                newTag={newTag}
                onTagChange={setNewTag}
                onAdd={addTag}
                onClose={() => setShowTagModal(false)}
            />

            <ActionsModal
                visible={showActionsModal}
                onPreview={() => {
                    setShowActionsModal(false);
                    setShowPreview(true);
                }}
                onDuplicate={() => {
                    setShowActionsModal(false);
                    handleDuplicateProduct();
                }}
                onSave={() => {
                    setShowActionsModal(false);
                    handleSaveChanges();
                }}
                onDelete={() => {
                    setShowActionsModal(false);
                    setShowDeleteModal(true);
                }}
                onClose={() => setShowActionsModal(false)}
            />

            <DeleteModal
                visible={showDeleteModal}
                onDelete={() => {
                    setShowDeleteModal(false);
                    handleDeleteProduct();
                }}
                onClose={() => setShowDeleteModal(false)}
            />
        </KeyboardAvoidingView>
    );
};

export default EditProductScreen;