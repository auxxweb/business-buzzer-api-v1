export interface CreatePlanServiceData {
  plan: string;
  validity: number;
  amount: number;
  actualAmount: number;
  description: [string];
  isPremium: boolean;
}
