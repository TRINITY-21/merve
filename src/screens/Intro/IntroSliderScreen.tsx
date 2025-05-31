import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { JSX, useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StatusBar,
    Text,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import { colors } from '../../constant/theme/colors';
import { IIntroSlide } from '../../types';
import { introData } from '../../utils/dummyData';

const { width } = Dimensions.get('window');

interface Props {
    navigation: {
        navigate: (screen: string) => void;
    };
}

const IntroSliderScreen: React.FC<Props> = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const insets = useSafeAreaInsets();
    const animatedValues = useRef<Animated.Value[]>(
        introData.map(() => new Animated.Value(0))
    ).current;
    const [animatedGradientColors, setAnimatedGradientColors] = useState(introData[0]?.gradient || [colors.primary, colors.accent]);

    useEffect(() => {
        animatedValues.forEach((value, index) => {
            Animated.timing(value, {
                toValue: currentIndex === index ? 1 : 0,
                duration: 600,
                useNativeDriver: true,
            }).start();
        });
    }, [currentIndex, animatedValues]);

    const handleNext = (): void => {
        if (currentIndex < introData.length - 1) {
            scrollViewRef.current?.scrollTo({
                x: width * (currentIndex + 1),
                animated: true,
            });
            setCurrentIndex(currentIndex + 1);
        } else {
            navigation.navigate('Login');
        }
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
        const scrollX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(scrollX / width);

        const progress = (scrollX % width) / width;
        const currentSlideIndex = Math.floor(scrollX / width);
        const nextSlideIndex = Math.min(currentSlideIndex + 1, introData.length - 1);

        if (introData[currentSlideIndex] && introData[nextSlideIndex]) {
            const currentGradient = introData[currentSlideIndex].gradient;
            const nextGradient = introData[nextSlideIndex].gradient;

            const interpolatedGradient = [currentGradient[0], currentGradient[1]];

            if (progress > 0.1) {
                interpolatedGradient[0] = nextGradient[0];
                interpolatedGradient[1] = nextGradient[1];
            }

            setAnimatedGradientColors(interpolatedGradient as [string, string]);
        }

        if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
        }
    };

    const renderPattern = (pattern: IIntroSlide['pattern']): JSX.Element => {
        if (pattern === 'circles') {
            return (
                <View style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden'
                }}>
                    {[...Array(6)].map((_, i) => (
                        <View
                            key={i}
                            style={{
                                position: 'absolute',
                                width: 100 + i * 30,
                                height: 100 + i * 30,
                                borderRadius: 1000,
                                borderWidth: 1,
                                borderColor: 'rgba(255,255,255,0.2)',
                                opacity: 0.1 - i * 0.015,
                                top: '50%',
                                left: '50%',
                                transform: [
                                    { translateX: -(50 + i * 15) },
                                    { translateY: -(50 + i * 15) }
                                ],
                            }}
                        />
                    ))}
                </View>
            );
        } else if (pattern === 'waves') {
            return (
                <View style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden'
                }}>
                    {[...Array(3)].map((_, i) => (
                        <View
                            key={i}
                            style={{
                                position: 'absolute',
                                width: '200%',
                                height: 200,
                                bottom: -50 + i * 60,
                                left: '-50%',
                                opacity: 0.1 - i * 0.03,
                                borderRadius: 1000,
                                backgroundColor: 'rgba(255,255,255,0.2)',
                            }}
                        />
                    ))}
                </View>
            );
        } else {
            return (
                <View style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden'
                }}>
                    {[...Array(50)].map((_, i) => (
                        <View
                            key={i}
                            style={{
                                position: 'absolute',
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: 'rgba(255,255,255,0.3)',
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                opacity: Math.random() * 0.3,
                            }}
                        />
                    ))}
                </View>
            );
        }
    };

    const renderSlide = (item: IIntroSlide, index: number): JSX.Element => {
        const animatedValue = animatedValues[index];

        return (
            <View key={item.id} style={{ width, flex: 1 }}>
                {renderPattern(item.pattern)}

                <Animated.View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 40,
                        paddingTop: insets.top + 60,
                        zIndex: 10,
                        opacity: animatedValue,
                        transform: [
                            {
                                translateY: animatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [100, 0],
                                }),
                            },
                        ],
                    }}
                >
                    <Animated.View
                        style={{
                            marginBottom: 40,
                            transform: [
                                {
                                    scale: animatedValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.5, 1],
                                    }),
                                },
                                {
                                    rotate: animatedValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['-180deg', '0deg'],
                                    }),
                                },
                            ],
                        }}
                    >
                        <View
                            style={{
                                width: 140,
                                height: 140,
                                borderRadius: 70,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(255,255,255,0.15)',
                                borderWidth: 2,
                                borderColor: 'rgba(255,255,255,0.3)',
                            }}
                        >
                            <MaterialIcons name={item.icon} size={80} color="white" />
                        </View>
                    </Animated.View>

                    <Text style={{
                        fontSize: 36,
                        fontWeight: 'bold',
                        color: 'white',
                        marginBottom: 16,
                        textAlign: 'center',
                    }}>
                        {item.title}
                    </Text>

                    <Text style={{
                        fontSize: 22,
                        fontWeight: '600',
                        color: 'rgba(255,255,255,0.95)',
                        marginBottom: 24,
                        textAlign: 'center',
                    }}>
                        {item.subtitle}
                    </Text>

                    <Text style={{
                        fontSize: 17,
                        color: 'rgba(255,255,255,0.85)',
                        textAlign: 'center',
                        lineHeight: 26,
                        paddingHorizontal: 20,
                    }}>
                        {item.description}
                    </Text>
                </Animated.View>
            </View>
        );
    };

    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent={true}
                hidden={false}
            />

            <LinearGradient
                colors={animatedGradientColors}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    style={{ flex: 1 }}
                >
                    {introData.map((item, index) => renderSlide(item, index))}
                </ScrollView>

                <View style={{
                    position: 'absolute',
                    bottom: Math.max(50, insets.bottom + 20),
                    left: 0,
                    right: 0,
                    paddingHorizontal: 40,
                }}>
                    {/* Pagination Dots */}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 30,
                    }}>
                        {introData.map((_, index) => (
                            <Animated.View
                                key={index}
                                style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    marginHorizontal: 8,
                                    backgroundColor: currentIndex === index
                                        ? 'white'
                                        : 'rgba(255,255,255,0.3)',
                                    transform: [
                                        {
                                            scale: animatedValues[index].interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [1, 1.2],
                                            }),
                                        },
                                    ],
                                }}
                            />
                        ))}
                    </View>

                    <Button
                        title={currentIndex === introData.length - 1 ? 'Get Started' : 'Next'}
                        onPress={handleNext}
                        size='medium'
                        endIcon='chevron-right'
                        iconStyle={{ color: "black" }}
                        textStyle={{ color: "black" }}
                        className="rounded-full"
                        style={{ backgroundColor: "white", borderColor: "white", width: '50%', alignSelf: 'center' }}
                    />
                </View>
            </LinearGradient>
        </>
    );
};
export default IntroSliderScreen;