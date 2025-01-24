import React, { useState, useEffect } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useThemeConfig, useColorMode } from "@docusaurus/theme-common";
import ThemedImage from "@theme/ThemedImage";
import configurations from "../../utils/configurations";

function LogoThemedImage({ logo, alt, imageClassName }) {
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };
  const themedImage = (
    <ThemedImage
      className={logo.className}
      sources={sources}
      height={logo.height}
      width={logo.width}
      alt={alt}
      style={logo.style}
    />
  );
  // Is this extra div really necessary?
  // introduced in https://github.com/facebook/docusaurus/pull/5666
  return imageClassName ? (
    <div className={imageClassName}>{themedImage}</div>
  ) : (
    themedImage
  );
}
export default function Logo(props) {
  const {
    siteConfig: { title },
  } = useDocusaurusContext();
  const {
    navbar: { title: navbarTitle, logo },
  } = useThemeConfig();
  const { imageClassName, titleClassName, ...propsRest } = props;
  const logoLink = useBaseUrl(logo?.href || "/");
  // If visible title is shown, fallback alt text should be
  // an empty string to mark the logo as decorative.
  const fallbackAlt = navbarTitle ? "" : title;
  // Use logo alt text if provided (including empty string),
  // and provide a sensible fallback otherwise.
  const alt = logo?.alt ?? fallbackAlt;
  
  const hasHomepage =
  configurations.homepage.endsWith(".html") ||
  configurations.homepage.endsWith(".jsx") ||
  configurations.homepage.endsWith(".js");
  
  
  const { colorMode } = useColorMode();
  const [imageSrc, setImageSrc] = useState(logo);

  const srcDark = {
    ...logo,
    src: configurations.images.darkLogo
  }

  useEffect(() => {
    setImageSrc(colorMode === "dark" && srcDark.src ? srcDark : logo);
  }, [colorMode])
  
  if (configurations.homepage && hasHomepage) {
    return (
      <Link
        to={logoLink}
        {...propsRest}
        {...(logo?.target && { target: logo.target })}
      >
        {logo && (
          <LogoThemedImage
            logo={imageSrc}
            alt={alt}
            imageClassName={imageClassName}
          />
        )}
        {navbarTitle != null && <b className={titleClassName}>{navbarTitle}</b>}
      </Link>
    );
  }

  return (
    <div {...propsRest} {...(logo?.target && { target: logo.target })}>
      {logo && (
        <LogoThemedImage
          logo={imageSrc}
          alt={alt}
          imageClassName={imageClassName}
        />
      )}
      {navbarTitle != null && <b className={titleClassName}>{navbarTitle}</b>}
    </div>
  );
}
