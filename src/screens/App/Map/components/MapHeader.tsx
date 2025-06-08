// components/map/MapHeader.tsx
import React, { useRef } from 'react';
import { Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../components/common';
import { SearchInput, SearchInputRef } from '../../../../components/common/SearchInput';
import { colors } from '../../../../constants/theme/colors';

interface FilterOption {
  value: string;
  label: string;
}

interface MapHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  onProfilePress: () => void;
  searchPlaceholder?: string;
  filters?: FilterOption[];
  showAvatar?: boolean;
  showSearch?: boolean;
  showFilters?: boolean;
  style?: any;
  userAvatarUrl?: string; // User's profile image URL
  userName?: string; // For generating initials if no avatar
}

const defaultFilters: FilterOption[] = [
  { value: 'all', label: 'All' },
  { value: 'mtn', label: 'MTN' },
  { value: 'vodafone', label: 'Vodafone' },
  { value: 'airteltigo', label: 'AirtelTigo' },
  { value: 'glo', label: 'Glo' },
];

export const MapHeader: React.FC<MapHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  selectedFilter,
  onFilterChange,
  onProfilePress,
  searchPlaceholder = 'Search for locations',
  filters = defaultFilters,
  showAvatar = true,
  showSearch = true,
  showFilters = true,
  style,
  userAvatarUrl,
  userName = 'User',
}) => {
  const searchInputRef = useRef<SearchInputRef>(null);

  const handleSearchSubmitted = (query: string) => {
    console.log('Search submitted from MapHeader:', query);
    onSearchSubmit?.(query);
  };

  const handleSearchClear = () => {
    onSearchChange('');
    console.log('MapHeader search cleared');
  };

  return (
    <View
      className={`absolute top-0 left-0 right-0 z-500 ${Platform.OS === 'ios' ? 'pt-10' : 'pt-1'} pb-4 px-4`}
      style={style}
    >
      {/* Search Bar with Profile Icon Inside (Google Maps Style) */}
      {showSearch && (
        <View className="mt-8 mb-4">
          <SearchInput
            ref={searchInputRef}
            value={searchQuery}
            onChangeText={onSearchChange}
            onSearch={handleSearchSubmitted}
            onClear={handleSearchClear}
            placeholder={searchPlaceholder}
            visible={true}
            icon="location-pin"
            debounceDelay={400}

            // Google Maps style profile integration
            showProfileIcon={showAvatar}
            profileIconPress={onProfilePress}
            profileAvatarUrl={userAvatarUrl}
            userName={userName}
            profileIconSize={40} // Increased profile icon size

            // Enhanced card-like styling with full opacity
            containerStyle={{
              height: 60, // Increased height
              opacity: 1,
              backgroundColor: '#FFFFFF', // Solid white background
              borderRadius: 30, // Full border radius (height/2)
              paddingHorizontal: 4,
              paddingVertical: 0,
              borderWidth: 1.5, // Increased border width
              borderColor: 'rgba(0, 0, 0, 0.1)', // Subtle border
              // Enhanced shadow for better elevation
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 10
              },
              shadowOpacity: 0.25,
              shadowRadius: 20,
              elevation: 15,
              // Additional visual enhancement
              marginHorizontal: 0,
              alignItems: 'center',
              flexDirection: 'row',
            }}
            inputStyle={{
              fontSize: 17, // Increased font size
              fontWeight: '500',
              color: colors.secondary,
              paddingVertical: 0,
              lineHeight: 22, // Increased line height
              letterSpacing: 0.3, // Added letter spacing
            }}
          />
        </View>
      )}

      {/* Elevated Filter Chips (Google Maps Style) */}
      {showFilters && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-0"
          contentContainerStyle={{
            paddingHorizontal: 4,
            alignItems: 'center',
            paddingVertical: 4, // Add vertical padding for better Android alignment
          }}
          style={{
            flexGrow: 0, // Prevent scroll view from expanding
          }}
        >
          {filters.map((filter, index) => (
            <TouchableOpacity
              key={filter.value}
              style={[
                {
                  paddingHorizontal: 16, // Increased horizontal padding
                  paddingVertical: 10, // Increased vertical padding
                  borderRadius: 20, // Increased border radius
                  marginRight: 10,
                  marginLeft: index === 0 ? 0 : 0,
                  minHeight: 40, // Increased height
                  height: 40, // Increased height
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1.5, // Increased border width
                  flexDirection: 'row',
                  // White background for unselected state
                  backgroundColor: selectedFilter === filter.value
                    ? colors.secondary
                    : '#FFFFFF',
                  borderColor: selectedFilter === filter.value
                    ? colors.secondary
                    : 'rgba(0, 0, 0, 0.1)',
                  // Strong elevation and shadow
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: selectedFilter === filter.value ? 8 : 4,
                  },
                  shadowOpacity: selectedFilter === filter.value ? 0.3 : 0.2,
                  shadowRadius: selectedFilter === filter.value ? 12 : 8,
                  elevation: selectedFilter === filter.value ? 12 : 6,
                },
                // Enhanced glow effect for selected state
                selectedFilter === filter.value && {
                  shadowColor: colors.secondary,
                  shadowOpacity: 0.4,
                }
              ]}
              onPress={() => onFilterChange(filter.value)}
              activeOpacity={0.7}
            >
              <Typography
                variant="bold"
                size={15} // Increased font size
                style={{
                  color: selectedFilter === filter.value ? colors.white : colors.secondary,
                  fontWeight: '700', // Bolder text
                  letterSpacing: 0.3, // Increased letter spacing
                  lineHeight: 18, // Increased line height
                  textAlign: 'center',
                }}
              >
                {filter.label}
              </Typography>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};