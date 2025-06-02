import { useNavigation } from '@react-navigation/native'; // Assuming you're using React Navigation
import React from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '../components/IconButton';
import { colors } from '../constant/theme/colors';

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* This replaces your original TouchableOpacity block */}
  

      <IconButton
  icon="chevron-left"
  onPress={() => navigation.goBack()}
/>
<IconButton
          icon="chevron-left"
          // onPress={handleBack}
          // --- Using the 'translucent-white' variant here! ---
          variant="translucent-white"
          size="medium" // This gives you a 44x44 button by default
          // If you strictly need 40x40, you can add:
          // style={{ width: 40, height: 40 }}
          style={styles.backButton}
        />


      {/* Your other screen content */}
      <View style={styles.content}>
        {/* ... */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Adjust your container styles as needed, e.g., padding, backgroundColor
    backgroundColor: colors.background, // Example background
  },
  backButton: {
    // Positioning for your back button, e.g., absolute positioning for a header
    position: 'absolute',
    top: 50, // Adjust based on safe area and desired top padding
    left: 20, // Adjust desired left padding
    zIndex: 1, // Ensure it's above other content
    // The width, height, borderRadius, backgroundColor, alignItems, justifyContent
    // are now primarily handled by the IconButton component's props ('translucent' variant, 'medium' size)
    // You only need to add custom overrides here if they differ from the IconButton's defaults.
    // For example, if 'medium' isn't exactly 40x40 and you need that precise size:
    width: 40,
    height: 40,
    // The borderRadius, background, and centering are built into IconButton!
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // ... other content styles
  },
});

export default Home;