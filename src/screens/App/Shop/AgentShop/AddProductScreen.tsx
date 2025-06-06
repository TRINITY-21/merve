import { useNavigation } from '@react-navigation/native';
import React, { JSX, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { ICategory, ICondition, IProductData, IStep } from '../../../../types/addproductTypes';
import AddProductHeader from './components/addProduct/AddProductHeader';
import BasicInfoStep from './components/addProduct/BasicInfoStep';
import CategoryModal from './components/addProduct/CategoryModal';
import ConditionModal from './components/addProduct/ConditionModal';
import DetailsStep from './components/addProduct/DetailsStep';
import MediaStep from './components/addProduct/MediaStep';
import NavigationButtons from './components/addProduct/NavigationButtons';
import PricingStep from './components/addProduct/PricingStep';
import PublishStep from './components/addProduct/PublishStep';
import SpecificationModal from './components/addProduct/SpecificationModal';
import StepIndicator from './components/addProduct/StepIndicator';
import TagModal from './components/addProduct/TagModal';


const AddProductScreen: React.FC = () => {
    const navigation = useNavigation();

    // State management
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [productData, setProductData] = useState<IProductData>({
        title: '',
        description: '',
        category: '',
        price: '',
        originalPrice: '',
        condition: 'new',
        warranty: '',
        stockCount: '',
        images: [],
        specifications: {},
        tags: [],
        location: '',
        deliveryOptions: {
            pickup: true,
            delivery: false,
            shipping: false,
        },
        isPromoted: false,
        isDraft: false,
    });

    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [mainImageIndex, setMainImageIndex] = useState<number>(0);
    const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
    const [showConditionModal, setShowConditionModal] = useState<boolean>(false);
    const [showSpecModal, setShowSpecModal] = useState<boolean>(false);
    const [newSpecKey, setNewSpecKey] = useState<string>('');
    const [newSpecValue, setNewSpecValue] = useState<string>('');
    const [showTagModal, setShowTagModal] = useState<boolean>(false);
    const [newTag, setNewTag] = useState<string>('');
    const [showPreview, setShowPreview] = useState<boolean>(false);

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;

    const steps: IStep[] = [
        { key: 'basic', title: 'Basic Info', icon: 'info' },
        { key: 'media', title: 'Photos', icon: 'photo-camera' },
        { key: 'details', title: 'Details', icon: 'description' },
        { key: 'pricing', title: 'Pricing', icon: 'monetization-on' },
        { key: 'publish', title: 'Publish', icon: 'publish' },
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

    const updateProductData = (field: keyof IProductData, value: any): void => {
        setProductData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleImagePicker = (): void => {
        // Simulate image picker
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

    const handleSaveDraft = (): void => {
        updateProductData('isDraft', true);
        Alert.alert('Draft Saved', 'Your product has been saved as a draft.');
    };

    const handlePublish = (): void => {
        if (validateStep(currentStep)) {
            Alert.alert(
                'Publish Product',
                'Are you sure you want to publish this product?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Publish',
                        onPress: () => {
                            // Handle publishing logic
                            navigation.goBack();
                        }
                    }
                ]
            );
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
                    <PublishStep
                        {...commonProps}
                        selectedImages={selectedImages}
                        onPreview={() => setShowPreview(true)}
                        onSaveDraft={handleSaveDraft}
                        onPublish={handlePublish}
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
            className="flex-1 bg-background"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <AddProductHeader
                navigation={navigation}
                progressAnim={progressAnim}
                currentStep={currentStep}
                totalSteps={steps.length}
                onSaveDraft={handleSaveDraft}
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
        </KeyboardAvoidingView>
    );
};


export default AddProductScreen;