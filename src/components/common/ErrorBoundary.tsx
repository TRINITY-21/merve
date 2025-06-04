// components/common/ErrorBoundary.tsx
import React, { Component, ReactNode } from 'react';
import { View } from 'react-native';
import { Typography } from './Typography';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.log('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <View className="flex-1 justify-center items-center p-4">
          <Typography variant="semibold" size={16} className="text-red-600 text-center mb-2">
            Something went wrong
          </Typography>
          <Typography variant="regular" size={14} className="text-gray-600 text-center">
            Please try refreshing the screen
          </Typography>
        </View>
      );
    }

    return this.props.children;
  }
}