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
      className={`absolute top-0 left-0 right-0 z-500 ${Platform.OS === 'ios' ? 'pt-10' : 'pt-0'} pb-4 px-4`}
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
            profileIconSize={36}
            
            // Enhanced card-like styling with full opacity
            containerStyle={{
              height: 56, // Fixed height to match profile icon + padding
              opacity: 1,
              backgroundColor: '#FFFFFF', // Solid white - no transparency
              borderRadius: 28, // Full border radius (height/2)
              paddingHorizontal: 1,
              paddingVertical: 0, // Remove vertical padding since we have fixed height
              borderWidth: 0.5,
              borderColor: 'rgba(0, 0, 0, 0.08)',
              // Strong card-like elevation
              shadowColor: '#000',
              shadowOffset: { 
                width: 0, 
                height: 8 
              },
              shadowOpacity: 0.25,
              shadowRadius: 20, 
              elevation: 15,
              // Additional visual enhancement
              marginHorizontal: 0,
              alignItems: 'center', // Ensure content is centered
              flexDirection: 'row',
            }}
            inputStyle={{
              fontSize: 16,
              // fontWeight: '500',
              color: colors.secondary,
              paddingVertical: 0,
              lineHeight: 20, // Consistent line height
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
                  paddingHorizontal: 14,
                  paddingVertical: 8, // Slightly increased for better touch target
                  borderRadius: 16,
                  marginRight: 8,
                  marginLeft: index === 0 ? 0 : 0,
                  minHeight: 36,
                  height: 32, // Fixed height for consistency
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  // Ensure consistent alignment across platforms
                  flexDirection: 'row',
                  // Google Maps style elevation and colors - SOLID BACKGROUNDS
                  backgroundColor: selectedFilter === filter.value 
                    ? colors.secondary 
                    : '#FFFFFF', // Solid white - no transparency
                  borderColor: selectedFilter === filter.value 
                    ? colors.secondary 
                    : 'rgba(255, 255, 255, 0.8)',
                  // Enhanced shadow for map overlay
                  // shadowColor: '#000',
                  // shadowOffset: {
                  //   width: 0,
                  //   height: selectedFilter === filter.value ? 6 : 4,
                  // },
                  // shadowOpacity: selectedFilter === filter.value ? 0.25 : 0.15,
                  // shadowRadius: selectedFilter === filter.value ? 12 : 8,
                  // elevation: selectedFilter === filter.value ? 12 : 6,
                },
                // Add a subtle glow effect for selected state
                selectedFilter === filter.value && {
                  shadowColor: colors.secondary,
                  shadowOpacity: 0.3,
                }
              ]}
              onPress={() => onFilterChange(filter.value)}
              activeOpacity={0.8}
            >
              <Typography
                variant="bold"
                size={14}
                style={{
                  color: selectedFilter === filter.value ? colors.white : colors.secondary,
                  // fontWeight: '700',
                  letterSpacing: 0.2,
                  lineHeight: 16, // Consistent line height for alignment
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