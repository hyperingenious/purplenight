export default function Logo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 51 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path

        d="M1.52945 11.0085C1.52945 4.92868 6.50441 0 12.6413 0H37.4579C43.5948 0 48.5698 4.92868 48.5698 11.0085V35.5942C48.5698 41.6741 43.5948 46.6027 37.4579 46.6027H12.6413C6.50441 46.6027 1.52945 41.6741 1.52945 35.5942V11.0085Z"
        fill="#7B00FF"
      />
      <g filter="url(#filter0_d_2034_59)">
        <path
          d="M38.1986 4.40332H11.9005V41.8323H38.1986V4.40332Z"
          fill="white"
        />
      </g>
      <path
        d="M18.5676 37.7961H11.9005V46.9699H18.5676V37.7961Z"
        fill="white"
      />
      <g filter="url(#filter1_i_2034_59)">
        <path
          d="M31.9018 10.2747H18.5676V35.9612H31.9018V10.2747Z"
          fill="#7B00FF"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2034_59"
          x="7.13014"
          y="-8.90493e-05"
          width="38.0405"
          height="49.1714"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1.10085" dy="1.4678" />
          <feGaussianBlur stdDeviation="2.93561" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.63 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2034_59"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2034_59"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_i_2034_59"
          x="18.5676"
          y="10.2747"
          width="13.3343"
          height="27.1543"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1.4678" />
          <feGaussianBlur stdDeviation="1.28433" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.66 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_2034_59"
          />
        </filter>
      </defs>
    </svg>
  );
}