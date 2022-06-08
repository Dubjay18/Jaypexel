import React from "react";
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";
function Loader() {
  const override = css`
    display: block;

    border-color: #417505;
  `;

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-ful">
        <ScaleLoader
          color={"#4B6925"}
          css={override}
          width={20}
          radius={50}
          height={75}
          speedMultiplier={1.3}
        />
      </div>
    </div>
  );
}

export default Loader;
