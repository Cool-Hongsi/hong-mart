import styles from '../../styles/componentStyles/ProductImage.module.scss';
import Image from "next/image";
import { ProductImageInterface } from "../../service/type";

const ProductImage = ({ product, isClickable, width, height, onClickProductImage }: ProductImageInterface) => {
  return (
    <>
      <Image
        src={product.productImage}
        placeholder='blur'
        blurDataURL={product.productImage}
        alt={product.productName}
        width={`${width}px`} // Should be specified with numeric value in Next Image Component
        height={`${height}px`} // Should be specified with numeric value in Next Image Component
        className={(isClickable) ? styles.image_container_clickable : styles.image_container_unclickable}
        onClick={() => (isClickable) ? onClickProductImage(product) : null}
      />
    </>
  )
};

export default ProductImage;