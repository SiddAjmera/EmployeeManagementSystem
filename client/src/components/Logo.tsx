import { Box } from "@mui/material";
import logo from "../logo.svg";
interface LogoProps {
  sx?: { [key: string]: number };
}

export default function Logo({ sx }: LogoProps): JSX.Element {
  return (
    <Box component="img" src={logo} sx={{ width: 40, height: 40, ...sx }} />
  );
}
