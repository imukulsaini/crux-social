import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

const defaultCss = css`
  display: block;
  margin: 0 auto;
  margin-top: 10rem;
  border-color: #808191;
`;

export function LoadingSpinner({ size, isDefaultCss, color }) {
  const spinnerCss = isDefaultCss ? defaultCss : "";

  return <ClipLoader css={spinnerCss} loading size={size} color={color} />;
}
