
import { UsageHistoryEntry } from '@/types/usage';

export const prepareDailyData = (data: UsageHistoryEntry[]) => {
  const dailyMap = new Map();
  
  data.forEach(entry => {
    const date = entry.timestamp.split('T')[0];
    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        date,
        calls: 0,
        credits: 0,
        'Property Search': 0,
        'Property Detail': 0,
        'Property Comps': 0,
        'Autocomplete': 0,
        'Mapping': 0
      });
    }
    
    const day = dailyMap.get(date);
    day.calls += 1;
    day.credits += entry.credits;
    
    // Increment the count for the specific endpoint
    if (day[entry.endpoint] !== undefined) {
      day[entry.endpoint] += 1;
    }
  });
  
  return Array.from(dailyMap.values())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const prepareEndpointData = (data: UsageHistoryEntry[], dataView: string) => {
  const endpointMap = new Map();
  
  data.forEach(entry => {
    if (!endpointMap.has(entry.endpoint)) {
      endpointMap.set(entry.endpoint, {
        name: entry.endpoint,
        calls: 0,
        credits: 0,
        value: 0 // For pie chart
      });
    }
    
    const endpoint = endpointMap.get(entry.endpoint);
    endpoint.calls += 1;
    endpoint.credits += entry.credits;
    endpoint.value = dataView === 'calls' ? endpoint.calls : endpoint.credits;
  });
  
  return Array.from(endpointMap.values());
};
