import { useTheme } from "next-themes";
import BaseBarLoader from "react-spinners/BarLoader";
import { LoaderHeightWidthProps } from "react-spinners/helpers/props";

interface BarLoaderProps extends LoaderHeightWidthProps {}

export const BarLoader = (props: BarLoaderProps) => {
  const theme = useTheme();
  const color = theme.theme === "dark" ? "#fafafa" : "#18181b";
  return (
    <BaseBarLoader
      color={color}
      className="bg-ios-gray-900 dark:bg-ios-gray-50"
      {...props}
    />
  );
};
