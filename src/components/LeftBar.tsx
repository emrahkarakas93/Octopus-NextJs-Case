import { useState, useEffect } from 'react';

type Category = {
  slug: string;
  name: string;
  url: string;
};

type LeftBarProps = {
  onFilter: (selectedCategories: string[]) => void;
};

const LeftBar = ({ onFilter }: LeftBarProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data.slice(0, 12))); // maksimum 12 kategori çekiyorum
  }, []);

  // Quick Search fonksiyonu
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleFilter = () => {
    console.log('Filtrele butonuna basıldı. Seçilen kategoriler:', selectedCategories);
    onFilter(selectedCategories); // Dashboarda seçilen kategorileri gönderiyorum
  };

  return (
    <div>
      {/* Quick Search */}
      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <img src="/search-normal.svg" alt="Arama İkonu" className="w-5 h-5" />
        </span>
        <input
          type="text"
          placeholder="Quick search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B500]"
        />
      </div>

      <h2 className="text-[18px] font-bold leading-[27px] tracking-[0.01em] text-[#000000] font-poppins">
        Kategoriler
      </h2>
      <div className="w-full h-[5px] bg-[#000000] my-4"></div>

      {/* filtrelenmiş kategoriler */}
      <div className="space-y-2">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div key={category.slug} className="flex items-center">
              <input
                type="checkbox"
                id={category.slug}
                checked={selectedCategories.includes(category.slug)}
                onChange={() => toggleCategory(category.slug)}
                className="w-[20px] h-[20px] border border-[#000000] rounded-[0px] appearance-none checked:bg-[#1E293B] checked:border-[#1E293B] focus:outline-none focus:ring-0 transition duration-200 cursor-pointer"
              />
              <label
                htmlFor={category.slug}
                className="ml-2 text-[#000000] text-[14px] leading-[21px] font-normal text-left font-poppins"
              >
                {category.name}
              </label>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Sonuç bulunamadı.</p>
        )}
      </div>

      <button
        onClick={handleFilter}
        className="mt-4 w-full py-[10px] px-[24px] bg-[#1E293B] text-white font-medium text-[14px] leading-[24px] text-center rounded-lg hover:bg-[#141A26] transition duration-200"
      >
        Filtrele
      </button>
    </div>
  );
};

export default LeftBar;