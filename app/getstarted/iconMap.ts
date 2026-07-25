import { IconType } from 'react-icons';
import { FaSearchLocation } from 'react-icons/fa';
// Add additional icon imports here as new features are defined in Sanity

export const iconMap: Record<string, IconType> = {
  FaSearchLocation,
};

const fallbackIcon = FaSearchLocation;

export function resolveIcon(iconName: string): IconType {
  return iconMap[iconName] ?? fallbackIcon;
}
