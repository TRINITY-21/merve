// components/map/MapHeader.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react'; // Import useRef
import { Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { colors } from '../../constants/theme/colors';
import { Typography } from '../common/Typography';
// Import the new SearchInput component and its ref interface
import { SearchInput, SearchInputRef } from '../common/SearchInput';

interface FilterOption {
  value: string;
  label: string;
}

interface MapHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  // New prop for when the search is officially "submitted" (e.g., via debounce or enter key)
  onSearchSubmit?: (query: string) => void; 
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  onNotificationPress: () => void;
  onProfilePress: () => void;
  notificationCount?: number;
  searchPlaceholder?: string;
  filters?: FilterOption[];
  showAvatar?: boolean;
  showNotifications?: boolean;
  showSearch?: boolean;
  showFilters?: boolean;
  gradientColors?: string[]; // This prop seems unused, can be removed if not needed
  style?: any;
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
  onSearchSubmit, // Destructure new prop
  selectedFilter,
  onFilterChange,
  onNotificationPress,
  onProfilePress,
  notificationCount = 0,
  searchPlaceholder = 'Search for locations',
  filters = defaultFilters,
  showAvatar = true,
  showNotifications = true,
  showSearch = true,
  showFilters = true,
  style,
}) => {
  const searchInputRef = useRef<SearchInputRef>(null);

  // You can optionally add a local state for loading if MapHeader needs to control it
  // const [searchLoading, setSearchLoading] = useState(false);

  // Handle the search submission
  const handleSearchSubmitted = (query: string) => {
    console.log('Search submitted from MapHeader:', query);
    onSearchSubmit?.(query); // Call the prop if provided
    // If you had a searchLoading state:
    // setSearchLoading(true);
    // Simulate API call and then setSearchLoading(false);
  };

  // Handle clearing the search
  const handleSearchClear = () => {
    onSearchChange(''); // Clear the text in the parent state
    // Any other logic for clearing search results in MapHeader
    console.log('MapHeader search cleared');
  };

  return (
    <View 
      className={`absolute top-0 left-0 right-0 z-500 ${Platform.OS === 'ios' ? 'pt-10' : 'pt-10'} pb-4 px-4`}
      style={style}
    >
        {/* Notification Bell */}
        {showNotifications && (
          <Animated.View
            entering={FadeInDown.duration(500)}
            className={`absolute ${Platform.OS === 'ios' ? 'top-14' : 'top-18'} right-6 z-50 w-10 h-10 rounded-full items-center justify-center bg-white bg-opacity-90`}
          >
            <TouchableOpacity onPress={onNotificationPress}>
              <Ionicons name="notifications" size={26} color={colors.secondary} />
              {notificationCount > 0 && (
                <View className="absolute -top-2 -right-1 w-4 h-4 rounded-full bg-red-500 items-center justify-center">
                  <Typography variant="bold" size={10} className="text-white">
                    {notificationCount > 99 ? '99+' : notificationCount.toString()}
                  </Typography>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Avatar Button */}
        {showAvatar && (
          <View className="flex-row items-center mt-2 px-0.5 mb-2.5">
            <TouchableOpacity
              className="mr-3.5 bg-white bg-opacity-90 rounded-full p-1.5 items-center justify-center"
              onPress={onProfilePress}
              activeOpacity={0.7}
            >
              <Ionicons name="person-circle-outline" size={30} color={colors.secondary} />
            </TouchableOpacity>
          </View>
        )}

        {/* Search Bar using the new SearchInput component */}
        {showSearch && (
          <SearchInput
            ref={searchInputRef} // Attach ref if you need to imperatively call focus/blur/clear
            value={searchQuery}
            onChangeText={onSearchChange}
            onSearch={handleSearchSubmitted} // Called when debounced or submitted
            onClear={handleSearchClear} // Called when clear button is pressed
            placeholder={searchPlaceholder}
            visible={true} 
            icon="location-pin"
            containerStyle={{ marginBottom: 12 }} 
            debounceDelay={400} 
   
          />
        )}

        {/* Filter Chips */}
        {showFilters && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-0"
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.value}
                className={`px-4 py-2.5 rounded-full mr-2.5 border ${
                  selectedFilter === filter.value
                    ? 'bg-secondary border-white shadow-white'
                    : 'bg-white border-white border-opacity-40'
                }`}
                onPress={() => onFilterChange(filter.value)}
              >
                <Typography
                  variant="bold"
                  size={13}
                  className={`tracking-wide ${
                    selectedFilter === filter.value ? 'text-white' : 'text-secondary'
                  }`}
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