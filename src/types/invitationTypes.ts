export interface IInvitationDetails {
  programName?: string;
  benefits?: string[];
  deadline?: string;
  contactPerson?: string;
  contactEmail?: string;
  networkName?: string;
  networkDescription?: string;
  agentCode?: string;
  location?: string;
  onboardingDate?: string;
  serviceName?: string;
  commissionRate?: string;
  integrationProcess?: string;
  userId?: string;
  reason?: string;
  agentId?: string;
  businessName?: string;
  project?: string;
  expectedVolume?: string;
  service?: string;
  revenueShare?: string;
}

export interface IInvitation {
  id: string;
  type: 'received_partnership' | 'received_network' | 'received_follow_user' | 'received_follow_agent' | 
        'sent_collaboration' | 'sent_partnership_proposal' | 'sent_follow_user' | 'sent_follow_agent';
  sender?: string;
  recipient?: string;
  senderType?: 'Organization' | 'Agent' | 'Bank' | 'User' | 'Business';
  recipientType?: 'Organization' | 'Agent' | 'Bank' | 'User' | 'Business';
  title: string;
  message: string;
  date: string;
  status: 'pending' | 'accepted' | 'declined' | 'cancelled';
  details?: IInvitationDetails;
}