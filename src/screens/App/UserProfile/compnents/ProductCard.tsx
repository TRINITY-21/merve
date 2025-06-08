// components/ProductCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Typography } from '../../../../components/common/Typography';
import { colors } from '../../../../constants/theme/colors';
import { IProduct } from '../../../../types/userProfileTypes';

interface ProductCardProps {
    product: IProduct;
    onPress: () => void;
    fadeAnim: Animated.SharedValue<number>;
    slideAnim: Animated.SharedValue<number>;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, fadeAnim, slideAnim }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const renderImage = ({ item, index }: { item: string; index: number }) => (
        <Image
            source={{ uri: item }}
            style={styles.image}
            resizeMode="cover"
        />
    );

    const renderDots = () => (
        <View style={styles.dotsContainer}>
            {product.images.map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        { backgroundColor: index === activeIndex ? colors.primary : colors.gray.light }
                    ]}
                />
            ))}
        </View>
    );

    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.container}
        >
            <TouchableOpacity
                onPress={onPress}
                style={styles.card}
                activeOpacity={0.9}
            >
                <View style={styles.imageContainer}>
                    <FlatList
                        ref={flatListRef}
                        data={product.images}
                        renderItem={renderImage}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={(event) => {
                            const newIndex = Math.round(event.nativeEvent.contentOffset.x / CARD_WIDTH);
                            setActiveIndex(newIndex);
                        }}
                    />
                    {renderDots()}
                </View>

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Typography variant="bold" size={16} style={styles.title}>
                            {product.title}
                        </Typography>
                        <TouchableOpacity
                            style={styles.favoriteButton}
                            onPress={() => console.log('Toggle favorite')}
                        >
                            <MaterialIcons
                                name={product.favorited ? 'favorite' : 'favorite-border'}
                                size={24}
                                color={product.favorited ? colors.error : colors.gray.medium}
                            />
                        </TouchableOpacity>
                    </View>

                    <Typography variant="medium" size={14} style={styles.agent}>
                        {product.agent}
                    </Typography>

                    <View style={styles.footer}>
                        <Typography variant="bold" size={18} style={styles.price}>
                            ${product.price.toFixed(2)}
                        </Typography>
                        <TouchableOpacity
                            style={styles.inquireButton}
                            onPress={() => console.log('Inquire about product')}
                        >
                            <Typography variant="bold" size={12} style={styles.inquireText}>
                                {product.inquired ? 'Inquired' : 'Inquire Now'}
                            </Typography>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        marginRight: 16,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 4,
    },
    imageContainer: {
        height: 200,
        position: 'relative',
    },
    image: {
        width: CARD_WIDTH,
        height: 200,
    },
    dotsContainer: {
        position: 'absolute',
        bottom: 12,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    content: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    title: {
        color: colors.white,
        flex: 1,
        marginRight: 8,
    },
    favoriteButton: {
        padding: 4,
    },
    agent: {
        color: colors.white,
        marginBottom: 12,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        color: colors.primary,
    },
    inquireButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
    },
    inquireText: {
        color: colors.white,
    },
});