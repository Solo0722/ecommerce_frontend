import { Carousel } from "antd";
import homeStyles from "../styles/Home.module.css";
import Banner from "../components/Banner";
import Image from "next/image";
import Footer from "../components/Footer";
import { commerce } from "../lib/commerce";

const banner_items = [
  {
    name: "Macbook Pro",
    brand: "Apple",
    price: "$2,999.99",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aconsequuntur officia nobis ipsum nemo veritatis ab voluptas est fuga,dolores sed, consectetur optio. Temporibus consequatur laborum possimus explicabo dolores. Ipsam!",
    background: "macbook.jpg",
  },
  {
    name: "Dell Core I7",
    brand: "Dell",
    price: "$1,349.99",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aconsequuntur officia nobis ipsum nemo veritatis ab voluptas est fuga,dolores sed, consectetur optio. Temporibus consequatur laborum possimus explicabo dolores. Ipsam!",
    background: "dell.jpg",
  },
  {
    name: "Macbook 8",
    brand: "Apple",
    price: "$1,499.99",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aconsequuntur officia nobis ipsum nemo veritatis ab voluptas est fuga,dolores sed, consectetur optio. Temporibus consequatur laborum possimus explicabo dolores. Ipsam!",
    background: "macbook2.jpg",
  },
  {
    name: "Dell Core I5",
    brand: "Dell",
    price: "$1,249.99",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aconsequuntur officia nobis ipsum nemo veritatis ab voluptas est fuga,dolores sed, consectetur optio. Temporibus consequatur laborum possimus explicabo dolores. Ipsam!",
    background: "dell2.jpg",
  },

  {
    name: "Iphone 13",
    brand: "Apple",
    price: "$1,049.99",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aconsequuntur officia nobis ipsum nemo veritatis ab voluptas est fuga,dolores sed, consectetur optio. Temporibus consequatur laborum possimus explicabo dolores. Ipsam!",
    background: "iphone13.jpg",
  },
];

export const getStaticProps = async () => {
  const { data } = await commerce.categories.list();
  return {
    props: { data },
  };
};

export default function Home({ data }) {
  return (
    <div className={homeStyles.homeContainer}>
      <Carousel autoplay>
        {banner_items.map((item, i) => (
          <Banner item={item} key={i} />
        ))}
      </Carousel>
      <div className={homeStyles.secondaryContainer}>
        <h2>Best Selling Products</h2>
        <h2>New Arrivals</h2>
        <h2>Shop by brand</h2>
        <Carousel slidesToShow={4} draggable dots={false}>
          {data[0]?.children?.map((brand) => (
            <div className={homeStyles.brandsContainer}>
              <img src={brand.assets[0].url} />
              <h3>{brand.name}</h3>
            </div>
          ))}
        </Carousel>
        <h2>Shop by collections</h2>
        <Carousel slidesToShow={4} draggable dots={false}>
          {data[1]?.children?.map((collection) => (
            <div className={homeStyles.brandsContainer}>
              <img src={collection.assets[0].url} />
              <h3>{collection.name}</h3>
            </div>
          ))}
        </Carousel>
        <h2>Great Deals for you</h2>
      </div>
      <Footer />
    </div>
  );
}
