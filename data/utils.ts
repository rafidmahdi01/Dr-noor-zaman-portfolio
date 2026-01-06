/**
 * Data merge utilities for combining base data with admin panel updates
 * This ensures the website shows both original and newly added content
 */

/**
 * Merges two arrays, with updates appended after base data
 * @param baseData - Original data from main files
 * @param updates - New data from admin panel
 * @returns Combined array with all entries
 */
export function mergeData<T>(baseData: T[], updates: T[]): T[] {
  return [...baseData, ...updates];
}

/**
 * Merges multiple data sources into a single object
 * Useful for combining different categories like publications
 */
export function mergeDataSources<T extends Record<string, any[]>>(
  baseSources: T,
  updateSources: Partial<T>
): T {
  const result = { ...baseSources } as T;
  
  for (const key in updateSources) {
    if (updateSources[key]) {
      result[key] = mergeData(baseSources[key] || [], updateSources[key]!);
    }
  }
  
  return result;
}
