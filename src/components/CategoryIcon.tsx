import { getCategoryIcon } from "@/lib/icons";
import { CategoryRef } from "@/lib/types";

type CategoryIconProps = {
  category?: CategoryRef | null;
  className?: string;
};

// Single renderer for a category's icon. Reads the embedded category the API
// now returns on each entity, so there is no id-join or category map to keep in
// sync. Unknown/missing categories render the uncategorized fallback icon.
export const CategoryIcon = ({ category, className }: CategoryIconProps) => {
  const Icon = getCategoryIcon(category?.Icon);
  return <Icon className={className} />;
};
