"use client";

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [user, setUser] = useState<{ firstName: string; lastName: string } | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) {
            setUser({
              firstName: data.firstName,
              lastName: data.lastName,
            });
          }
        })
        .catch(() => setUser(null));
    }
  }, []);

  return (
    <header className="flex justify-between items-center py-6 px-8 bg-white shadow-md border-b border-[#E2E8F0]">
      <div>
        <img src="/logo.png" alt="Logo" className="w-[170px] h-auto" />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-[15px]">
          <img src="/search-normal.svg" alt="Arama" className="w-6 h-6" />
          <img src="/icon_error.svg" alt="Hata" className="w-6 h-6" />
          <img src="/icon_notification.svg" alt="Bildirim" className="w-6 h-6" />
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#E6FFE6] text-[#00B500] text-[16px] font-[700] font-inter">
            {user ? `${user.firstName[0]}${user.lastName[0]}` : 'M'}
          </div>
          <div className="text-[#333] font-medium flex items-center">
            {user ? `${user.firstName} ${user.lastName}` : 'Misafir'}
            <img src="/icon_arrow-down.svg" alt="Açılır Menü" className="ml-2 w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
