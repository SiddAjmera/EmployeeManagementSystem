import { styled } from "@mui/material/styles";

const ImageWithPadding = styled("img")`
  padding: 40px;
`;

interface StyledIllustrationProps {
  src: string;
  alt: string;
}

export default function StyledIllustration({
  src,
  alt,
}: StyledIllustrationProps) {
  return <ImageWithPadding src={src} alt={alt} />;
}
