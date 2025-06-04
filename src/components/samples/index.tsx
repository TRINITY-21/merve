// // Example 1: AgentSearchScreen.tsx - Reusing AgentListItem
// import React, { useState } from 'react';
// import { View, FlatList } from 'react-native';
// import { AgentListItem, MapHeader } from '../components/map';
// import { ServiceSelectionGrid } from '../components/quickcash';
// import { Typography } from '../components/common/Typography';
// import useStore from '../store/useStore';
// import type { IAgent } from '../types';

// export const AgentSearchScreen: React.FC = () => {
//   const { agents } = useStore();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedFilter, setSelectedFilter] = useState('all');
//   const [selectedServices, setSelectedServices] = useState<string[]>([]);

//   const filteredAgents = agents.filter((agent: IAgent) => {
//     const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesFilter = selectedFilter === 'all' || agent.provider === selectedFilter;
//     const matchesServices = selectedServices.length === 0 || 
//       selectedServices.some(service => agent.services.includes(service));
    
//     return matchesSearch && matchesFilter && matchesServices;
//   });

//   const handleAgentSelect = (agent: IAgent) => {
//     // Navigate to agent details or perform action
//     console.log('Selected agent:', agent);
//   };

//   return (
//     <View className="flex-1 bg-gray-50">
//       {/* Reusable MapHeader without map-specific features */}
//       <MapHeader
//         searchQuery={searchQuery}
//         onSearchChange={setSearchQuery}
//         selectedFilter={selectedFilter}
//         onFilterChange={setSelectedFilter}
//         onNotificationPress={() => {}}
//         onProfilePress={() => {}}
//         showAvatar={false}
//         searchPlaceholder="Search agents..."
//       />

//       {/* Service filter */}
//       <View className="px-4 py-3">
//         <Typography variant="semibold" size={16} className="text-gray-900 mb-3">
//           Filter by Services
//         </Typography>
//         <ServiceSelectionGrid
//           services={[
//             { id: 'cash-in', label: 'Cash In', icon: 'account-balance-wallet', color: '#4CAF50', bgColor: '#E8F5E8' },
//             { id: 'cash-out', label: 'Cash Out', icon: 'payments', color: '#FF5722', bgColor: '#FFF3F0' },
//           ]}
//           selectedService={selectedServices[0] || ''}
//           onServiceSelect={(service) => setSelectedServices([service])}
//           columns={3}
//           compact={true}
//         />
//       </View>

//       {/* Agent List */}
//       <FlatList
//         data={filteredAgents}
//         renderItem={({ item }) => (
//           <AgentListItem
//             agent={item}
//             onPress={handleAgentSelect}
//             showDistance={true}
//             showServices={true}
//             compact={false}
//           />
//         )}
//         keyExtractor={(item) => item.id}
//         className="flex-1"
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// // Example 2: PaymentScreen.tsx - Reusing ServiceSelectionGrid and AmountInputSection
// import React, { useState } from 'react';
// import { View, ScrollView } from 'react-native';
// import { ServiceSelectionGrid, AmountInputSection } from '../components/quickcash';
// import { LoadingOverlay } from '../components/common';
// import { Typography } from '../components/common/Typography';
// import Button from '../components/common/Button';

// export const PaymentScreen: React.FC = () => {
//   const [selectedService, setSelectedService] = useState('');
//   const [amount, setAmount] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);

//   const paymentServices = [
//     { id: 'mobile-money', label: 'Mobile Money', icon: 'smartphone', color: '#2196F3', bgColor: '#E8F4FD' },
//     { id: 'bank-transfer', label: 'Bank Transfer', icon: 'account-balance', color: '#4CAF50', bgColor: '#E8F5E8' },
//     { id: 'card-payment', label: 'Card Payment', icon: 'credit-card', color: '#FF9800', bgColor: '#FFF8E1' },
//     { id: 'cash-payment', label: 'Cash Payment', icon: 'payments', color: '#9C27B0', bgColor: '#F3E5F5' },
//   ];

//   const handlePayment = async () => {
//     if (!selectedService || !amount) return;
    
//     setIsProcessing(true);
//     // Simulate payment processing
//     setTimeout(() => {
//       setIsProcessing(false);
//       // Handle payment completion
//     }, 3000);
//   };

//   return (
//     <View className="flex-1 bg-white">
//       <LoadingOverlay
//         visible={isProcessing}
//         title="Processing Payment..."
//         subtitle="Please wait while we process your payment"
//         showAgentCircle={false}
//       />

//       <ScrollView className="flex-1 p-4">
//         <Typography variant="bold" size={24} className="text-gray-900 mb-6 text-center">
//           Make Payment
//         </Typography>

//         {/* Payment Method Selection */}
//         <Typography variant="semibold" size={16} className="text-gray-900 mb-4">
//           Select Payment Method
//         </Typography>
//         <ServiceSelectionGrid
//           services={paymentServices}
//           selectedService={selectedService}
//           onServiceSelect={setSelectedService}
//           columns={2}
//         />

//         {/* Amount Input */}
//         <View className="mt-6">
//           <AmountInputSection
//             amount={amount}
//             onAmountChange={setAmount}
//             currency="GHS"
//             quickAmounts={['50', '100', '200', '500']}
//             title="Enter Amount"
//           />
//         </View>

//         {/* Payment Button */}
//         <View className="mt-8">
//           <Button
//             title="Process Payment"
//             gradient
//             onPress={handlePayment}
//             disabled={!selectedService || !amount}
//           />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// // Example 3: AgentDashboardScreen.tsx - Reusing NavigationOverlay and AgentNotificationCard
// import React, { useState } from 'react';
// import { View, ScrollView } from 'react-native';
// import { NavigationOverlay } from '../components/map';
// import { AgentNotificationCard, RequestData } from '../components/notifications';
// import { Typography } from '../components/common/Typography';
// import useStore from '../store/useStore';

// export const AgentDashboardScreen: React.FC = () => {
//   const { currentUser } = useStore();
//   const [activeDelivery, setActiveDelivery] = useState(false);
//   const [incomingRequest, setIncomingRequest] = useState<RequestData | null>(null);
//   const [showNotification, setShowNotification] = useState(false);

//   const navigationStats = {
//     distance: 2.5,
//     time: 12
//   };

//   const handleAcceptRequest = () => {
//     setShowNotification(false);
//     setActiveDelivery(true);
//     // Handle request acceptance
//   };

//   const handleDeclineRequest = () => {
//     setShowNotification(false);
//     // Handle request decline
//   };

//   const stopDelivery = () => {
//     setActiveDelivery(false);
//     // Handle delivery completion
//   };

//   return (
//     <View className="flex-1 bg-gray-50">
//       {/* Navigation Overlay for active deliveries */}
//       <NavigationOverlay
//         visible={activeDelivery}
//         progress={75}
//         stats={navigationStats}
//         distanceTraveled={1.8}
//         onStop={stopDelivery}
//         title="Delivery in Progress"
//         position="top"
//       />

//       {/* Agent Notification for incoming requests */}
//       <AgentNotificationCard
//         visible={showNotification}
//         requestData={incomingRequest}
//         onAccept={handleAcceptRequest}
//         onDecline={handleDeclineRequest}
//       />

//       <ScrollView className="flex-1 p-4">
//         <Typography variant="bold" size={24} className="text-gray-900 mb-6">
//           Agent Dashboard
//         </Typography>

//         {/* Dashboard content */}
//         <View className="bg-white rounded-2xl p-4 mb-4">
//           <Typography variant="semibold" size={16} className="text-gray-900 mb-2">
//             Today's Summary
//           </Typography>
//           <Typography variant="regular" size={14} className="text-gray-600">
//             5 completed transactions
//           </Typography>
//         </View>

//         {/* Demo buttons */}
//         <Button
//           title="Simulate Incoming Request"
//           onPress={() => {
//             setIncomingRequest({
//               service: 'Cash Out',
//               amount: '150',
//               location: 'Adepazari, Sakarya',
//               distance: '250m away',
//               customerName: 'John Doe',
//               requestTime: new Date().toLocaleTimeString(),
//             });
//             setShowNotification(true);
//           }}
//           style={{ marginBottom: 16 }}
//         />

//         <Button
//           title="Start Demo Delivery"
//           gradient
//           onPress={() => setActiveDelivery(true)}
//         />
//       </ScrollView>
//     </View>
//   );
// };