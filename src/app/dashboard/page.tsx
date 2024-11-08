"use client";

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import LeftBar from '@/components/LeftBar';
import Link from 'next/link';

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  thumbnail: string;
};

const DashboardPage = () => {
  const router = useRouter();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const itemsPerPage = 9;

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  // fetch ile apiden ürünleri al, 100 ürünle limitliyorum
  const fetchProducts = () => {
    fetch(`https://dummyjson.com/products?limit=100`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.products);
        setProductCount(data.total);
      });
  };

  // ilk yüklemede tüm ürünleri getir
  useEffect(() => {
    fetchProducts();
  }, []);

  // filtrelenmiş ürünleri ayarla
  useEffect(() => {
    let filtered = allProducts;

    if (selectedCategories.length > 0) {
      // kategori seçili ise filtrele
      filtered = allProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // filtrelenmiş ürünleri sayfaya göre göster
    const paginatedProducts = filtered.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    setFilteredProducts(paginatedProducts);
    setProductCount(filtered.length);
  }, [selectedCategories, allProducts, currentPage]);

  // kategoriye göre filtrele
  const handleFilter = (categories: string[]) => {
    setSelectedCategories(categories);
    setCurrentPage(1); // filtreleme sonrası ilk sayfaya dön
  };

  // sayfa değişikliği
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(productCount / itemsPerPage);

  const renderPagination = () => {
    let pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, '...', totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }

    return pages.map((page, index) =>
      typeof page === 'number' ? (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          className={`w-8 h-8 flex items-center justify-center rounded-lg border text-xs font-bold ${
            page === currentPage
              ? 'bg-[#00B500] text-white'
              : 'bg-white text-[#1E293B] border-gray-300'
          }`}
        >
          {page}
        </button>
      ) : (
        <span key={index} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 bg-white text-xs font-bold">
          {page}
        </span>
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-14">
      <div className="w-1/4">
        <LeftBar onFilter={handleFilter} />
      </div>

      <div className="w-3/4 pl-10">
        <h1 className="text-[20px] font-bold leading-[30px] text-[#141A24] font-poppins mb-6 mt-2">
          {productCount} ürün listeleniyor
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-[#F2F2F2] p-4 rounded-lg">
              <div className="w-full h-[175px] flex justify-center items-center bg-[#efefef] rounded-t-lg mb-4">
                <img src={product.thumbnail} alt={product.title} className="h-auto max-h-[155px] px-2" />
              </div>
              <h2 className="text-[16px] font-poppins font-normal text-[#000000] leading-[24px] tracking-[0.01em] text-left truncate mb-1">
                {product.title}
              </h2>
              <p className="text-[16px] font-poppins font-normal text-[#626262] leading-[24px] capitalize">
                {product.category}
              </p>
              <p className="text-[16px] font-poppins font-bold text-black leading-[24px] mt-2">${product.price}</p>
              <div className="flex items-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={star <= Math.round(product.rating) ? 'currentColor' : 'none'}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 text-black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 17.27l5.18 3.09-1.64-6.42 4.64-4.18-6.28-.54L12 2l-2.91 6.2-6.28.54 4.64 4.18-1.64 6.42L12 17.27z"
                    />
                  </svg>
                ))}
              </div>
              <Link href={`/products/${product.id}`} passHref>
              <button className="mt-4 w-full h-[44px] bg-[#00B500] text-white text-[14px] font-medium rounded-lg hover:bg-[#009A00] transition duration-200">
                Sepete Ekle
              </button>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-gray-500 disabled:opacity-50"
          >
            Prev
          </button>

          {renderPagination()}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-gray-500 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
