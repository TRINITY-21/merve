// AgentSelector.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../../components/common';
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
    <View className="mb-4">
        <Typography variant="semibold" size={14} className="text-base font-bold mb-0" style={{ color: colors.text.primary }}>
            Select Agent
        </Typography>
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
                        <Typography variant='bold' size={12}
                            className="text-xs font-bold mb-1"
                            style={{
                                color: selectedAgent?.id === agent.id ? colors.white : colors.text.primary
                            }}
                        >
                            {agent.name}
                        </Typography>
                        <Typography variant="regular" size={10} className="text-xs mb-1.5" style={{ color: colors.text.secondary }}>
                            {agent.location as any}
                        </Typography>
                        <View className="flex-row items-center gap-1">
                            <MaterialIcons name="star" size={14} color={colors.primary} />
                            <Typography variant="regular" size={10} className="text-xs font-semibold" style={{ color: colors.text.secondary }}>
                                {agent.rating}
                            </Typography>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    </View>
);
