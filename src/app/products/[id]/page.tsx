"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/solid";

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  images: string[];
};

type Comment = {
  id: number;
  body: string;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [expandedComment, setExpandedComment] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState("Siyah");
  const [selectedFeature, setSelectedFeature] = useState<string>(
    "Ürün Özellik 1"
  );

  useEffect(() => {
    if (id) {
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setSelectedImage(data.thumbnail);
        });

      fetch(`https://dummyjson.com/comments/post/6`)
        .then((res) => res.json())
        .then((data) => setComments(data.comments || []));
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  // dummy data girdim

  const colors = [
    { name: "Siyah", colorCode: "#000000" },
    { name: "Sarı", colorCode: "#FFD700" },
  ];

  const features = [
    { title: "Ürün Özellik 1", description: "Lorem İpsum Dolar Sit Amet" },
    { title: "Ürün Özellik 2", description: "Lorem İpsum Dolar Sit Amet" },
    { title: "Ürün Özellik 3", description: "Lorem İpsum Dolar Sit Amet" },
    { title: "Ürün Özellik 4", description: "Lorem İpsum Dolar Sit Amet" },
  ];

  return (
    <div className="flex min-h-screen p-14 space-x-8">
      {/* sol kısım/left side - görseller */}
      <div className="w-2/5">
        <div className="w-full h-[470px] flex justify-center items-center bg-[#F2F2F2] mb-4">
          <img src={selectedImage || product.thumbnail} alt={product.title} className="h-full object-contain" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {product.images.map((image, index) => (
            <div
              key={index}
              className={`w-full h-[100px] flex justify-center items-center border-[1.5px] cursor-pointer ${
                selectedImage === image ? "opacity-100 border-black" : "opacity-50"
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index}`}
                className="h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ürün detayları */}
      <div className="w-3/5 space-y-4">
      <h1 className="text-[40px] font-[700] leading-[55px] text-[#000000] font-poppins text-left">
            {product.title}
        </h1>
        <p className="text-[20px] font-[400] leading-[30px] text-[#888888] font-poppins text-left">
            {product.description}
        </p>

        <p className="text-[16px] font-poppins font-bold leading-[22px] text-[#000000] mt-6 pt-5">Renk Seç</p>
        <div className="flex space-x-5">
          {colors.map((color) => (
            <button
              key={color.name}
              className={`flex items-center justify-between w-[145px] h-[45px] px-4 py-2 border ${
                selectedColor === color.name
                  ? "shadow-[0px_5px_10px_0px_#0000001A] opacity-100 border-transparent"
                  : "border-[#C0C0C0] opacity-50"
              }`}
              onClick={() => setSelectedColor(color.name)}
            >
              <div className="flex items-center space-x-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color.colorCode }}
                ></span>
<span className="text-[14.08px] font-[400] leading-[19.36px] text-[#000000] font-poppins text-left">
  {color.name}
</span>
              </div>
              {selectedColor === color.name && (
                <CheckCircleIcon className="w-5 h-5 text-[#00B500]" />
              )}
            </button>
          ))}
        </div>

        <p className="text-[16px] font-poppins font-bold leading-[22px] text-[#000000] mt-4 pt-5">Özellik Seç</p>
        <div className="grid grid-cols-2 gap-2 w-[380px]">
          {features.map((feature) => (
            <button
              key={feature.title}
              className={`flex flex-col w-[180px] h-[100px] p-2 border ${
                selectedFeature === feature.title
                  ? "shadow-[0px_5px_10px_0px_#0000001A] border-transparent"
                  : "border-[#C0C0C0] opacity-50"
              }`}
              onClick={() => setSelectedFeature(feature.title)}
            >
              <div className="flex items-center justify-between">
              <p className="font-poppins text-[14.08px] font-[500] text-[#000000] text-left">
  {feature.title}
</p>
                {selectedFeature === feature.title && (
                  <CheckCircleIcon className="w-5 h-5 ml-2 text-[#00B500]" />
                )}
              </div>
              <p className="font-poppins text-[14.08px] font-[500] text-[#1E1E21] text-left pt-2">
  {feature.description}
</p>
            </button>
          ))}
        </div>

        <p className="text-[16px] font-poppins font-bold leading-[22px] text-[#000000] mt-6  pt-5">Ürün Yorumları</p>
        {comments.slice(0, 2).map((comment) => (
          <div key={comment.id} className="mt-4">
            <div className="flex items-center">
              <p className="font-semibold">{comment.user.fullName}</p>
              <div className="flex items-center ml-4">
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <svg
                    key={index}
                    className={`w-4 h-4 ${index < 3 ? "fill-[#FFC700]" : "fill-[#FFC70040]"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27l5.18 3.09-1.64-6.42 4.64-4.18-6.28-.54L12 2l-2.91 6.2-6.28.54 4.64 4.18-1.64 6.42L12 17.27z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-gray-700">
              {expandedComment === comment.id
                ? comment.body
                : `${comment.body.slice(0, 100)}...`}
              {comment.body.length > 100 && (
                <button
                  onClick={() =>
                    setExpandedComment(
                      expandedComment === comment.id ? null : comment.id
                    )
                  }
                  className="text-blue-500 ml-2"
                >
                  {expandedComment === comment.id
                    ? "Daha az göster"
                    : "Daha fazla göster"}
                </button>
              )}
            </p>
          </div>
        ))}
        <button className="mt-2 bg-[#1E293B] text-white px-6 py-3 rounded font-inter text-[14px] font-[500] leading-[24px] text-center">
        Tümünü Gör
        </button>
      </div>

      {/* alt kısım sipariş özeti bölümü - buradaki fonksiyonları case'de yer almadığı için yazmadım */}
      <div
        className="fixed bottom-0 left-0 w-full h-[100px] bg-white border-t border-gray-300 p-4 flex items-center justify-between m-0"
        style={{ margin: '0px' }}
        >
        <div className="flex items-center space-x-4">
            <p className="font-poppins text-[22px] font-bold leading-[33px] text-[#000000] px-4">
            Sipariş Özeti
            </p>
            {/* Sağ tarafa dikey border */}
            <div className="h-[100px] w-[1px] bg-gray-300"></div>
            <div className="px-4">
            <p className="font-poppins text-[18px] font-bold leading-[24.75px] text-[#000000]">
                {product.title}
            </p>
            <p className="font-poppins text-[16px] font-normal leading-[22px] text-[#888888]">
                {product.description}
            </p>
            </div>
            {/* Yeni eklenen sağ border */}
            <div className="h-full w-[1px] bg-gray-300"></div>
        </div>

        <div className="flex items-center space-x-4">
            <p className="font-poppins text-[34px] font-medium leading-[46.75px] text-[#000000]">
            ${product.price}
            </p>
            <button className="w-[150px] h-[44px] bg-[#00B500] text-white font-inter text-[14px] font-medium leading-[20px] text-center rounded">
            Sepete Ekle
            </button>
        </div>
        </div>





    </div>
  );
};

export default ProductDetailPage;
