import BaseBarLoader from "react-spinners/BarLoader";
import { LoaderHeightWidthProps } from "react-spinners/helpers/props";

interface BarLoaderProps extends LoaderHeightWidthProps {}

export const BarLoader = (props: BarLoaderProps) => {
  const color = "oklch(62.3% 0.214 259.815)";
  return <BaseBarLoader color={color} className="bg-blue-500" {...props} />;
};
