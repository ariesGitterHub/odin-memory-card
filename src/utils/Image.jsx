//import styles from "../styles/Image.module.css"; // Not needed on this project.

export default function Image({ src, alt, className = "", ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      // className={`${styles.image} ${className}`}
      className={className} // Use above if linking to modular css like "Image.module.css"
      {...props}
    />
  );
}
