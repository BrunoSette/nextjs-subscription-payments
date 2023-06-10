import { Database } from '@/types_db';

export function getMaxResumeCreationsByPlan(
  planName: Database['public']['Enums']['product_name']
): number {
  const creationsPerPlan: {
    [_ in Database['public']['Enums']['product_name']]: number;
  } = {
    Free: 1,
    Standard: 5,
    Premium: 30,
    Ultra: 100
  };

  return creationsPerPlan[planName];
}
