// AgentSelector.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { IAgent } from '../../../../../types/BookingTypes';


interface AgentSelectorProps {
    agents: IAgent[];
    selectedAgent: IAgent | null;
    onAgentSelect: (agent: IAgent) => void;
}

export const AgentSelector: React.FC<AgentSelectorProps> = ({
    agents,
    selectedAgent,
    onAgentSelect
}) => (
    <View className="mb-6">
        <Text className="text-base font-bold mb-3" style={{ color: colors.text.primary }}>
            Select Agent
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3 p-1">
                {agents.map((agent) => (
                    <TouchableOpacity
                        key={agent.id}
                        className="w-35 rounded-xl p-3 shadow-sm shadow-black/10 elevation-2"
                        style={{
                            backgroundColor: selectedAgent?.id === agent.id ? colors.accent : colors.white
                        }}
                        onPress={() => onAgentSelect(agent)}
                        activeOpacity={0.7}
                    >
                        <Text
                            className="text-xs font-bold mb-1"
                            style={{
                                color: selectedAgent?.id === agent.id ? colors.white : colors.text.primary
                            }}
                        >
                            {agent.name}
                        </Text>
                        <Text className="text-xs mb-1.5" style={{ color: colors.text.secondary }}>
                            {agent.location as any}
                        </Text>
                        <View className="flex-row items-center gap-1">
                            <MaterialIcons name="star" size={14} color={colors.primary} />
                            <Text className="text-xs font-semibold" style={{ color: colors.text.secondary }}>
                                {agent.rating}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    </View>
);
