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
      className="bg-zinc-900 dark:bg-zinc-50"
      {...props}
    />
  );
};
