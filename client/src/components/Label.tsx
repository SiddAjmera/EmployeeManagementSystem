import { alpha, styled } from "@mui/material/styles";

const RootStyle: React.FC<any> = styled("span")(
  ({ theme, ownerState }: any) => {
    const { color, variant } = ownerState;

    const styleFilled = (color: Color) => ({
      color: theme.palette[color].contrastText,
      backgroundColor: theme.palette[color].main,
    });

    const styleOutlined = (color: Color) => ({
      color: theme.palette[color].main,
      backgroundColor: "transparent",
      border: `1px solid ${theme.palette[color].main}`,
    });

    const styleGhost = (color: Color) => ({
      color: theme.palette[color].dark,
      backgroundColor: alpha(theme.palette[color].main, 0.16),
    });

    return {
      height: 22,
      minWidth: 22,
      lineHeight: 0,
      borderRadius: 8,
      cursor: "default",
      alignItems: "center",
      whiteSpace: "nowrap",
      display: "inline-flex",
      justifyContent: "center",
      padding: theme.spacing(0, 1),
      color: theme.palette.grey[800],
      fontSize: theme.typography.pxToRem(12),
      fontFamily: theme.typography.fontFamily,
      backgroundColor: theme.palette.grey[300],
      fontWeight: theme.typography.fontWeightBold,

      ...(color !== "default"
        ? {
            ...(variant === "filled" && { ...styleFilled(color) }),
            ...(variant === "outlined" && { ...styleOutlined(color) }),
            ...(variant === "ghost" && { ...styleGhost(color) }),
          }
        : {
            ...(variant === "outlined" && {
              backgroundColor: "transparent",
              color: theme.palette.text.primary,
              border: `1px solid ${theme.palette.grey[500_32]}`,
            }),
            ...(variant === "ghost" && {
              color: theme.palette.text.secondary,
              backgroundColor: theme.palette.grey[500_16],
            }),
          }),
    };
  }
);

export enum Color {
  default = "default",
  primary = "primary",
  secondary = "secondary",
  info = "info",
  success = "success",
  warning = "warning",
  error = "error",
  banned = "banned",
}

export enum Variant {
  filled = "filled",
  outlined = "outlined",
  ghost = "ghost",
}

interface LabelProps {
  children: React.ReactNode;
  color: Color;
  variant: Variant;
  [key: string]: any;
}

export default function Label({
  color = Color.default,
  variant = Variant.ghost,
  children,
  ...other
}: LabelProps) {
  return (
    <RootStyle ownerState={{ color, variant }} {...other}>
      {children}
    </RootStyle>
  );
}