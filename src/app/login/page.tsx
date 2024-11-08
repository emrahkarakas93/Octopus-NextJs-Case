"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false); // remember me state'i

    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('https://dummyjson.com/auth/login', {
                username,
                password,
            });

            // başarılı ise tokenları cookie'ye kaydet
            const tokenExpiration = rememberMe ? 7 : 1; // remember me seçiliyse 7 gün, değilse 1 gün tut
            Cookies.set('token', response.data.accessToken, { expires: tokenExpiration });
            Cookies.set('refreshToken', response.data.refreshToken, { expires: tokenExpiration });

            router.push('/dashboard'); // ana sayfaya yönlendir
        } catch (err) {
            console.error("Giriş hatası:", err);
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.message || 'Kullanıcı adı veya şifre hatalı.');
            } else {
                setError('Giriş başarısız');
            }
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            {/* Sol bölüm */}
            <div className="flex flex-col justify-center w-full lg:w-3/5 bg-gray-100 p-10">
                <img src="/logo-login.png" alt="Logo" className="w-[234px] h-auto mb-10 lg:absolute lg:top-10 lg:left-10 mx-auto" />
                <img src="/login-img.png" alt="Illustration" className="w-1/2 h-auto mb-6 mx-auto top-4 pt-12" />
                <h1 className="text-3xl font-bold text-[#1E293B] mb-2 text-left">Let Free Your Creativity with
                    Our Intuitive Content Creator
                </h1>
                <p className="text-[16px] leading-[19.36px] font-normal text-[#64748B] text-left decoration-skip-ink-none">
                    No design degree is required! Effortlessly craft and design stunning and captivating content using our user-friendly creative editor. With our drag-and-drop technology, anyone can create amazing marketing materials.
                </p>
            </div>

            {/* Sağ bölüm */}
            <div className="flex items-center justify-center w-full lg:w-2/5 bg-white p-6">
                <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
                    <h1 className="text-3xl font-bold text-[#1E293B] mb-2 text-center">Welcome Octopus!</h1>
                    <p className="text-[#94A3B8] font-normal text-[14px] leading-[17px] text-center">Manage your smart signage, watch your company grow.</p>

                    <div>
                        <label className="block text-[14px] font-medium leading-[20px] text-[#1E293B] mb-1">Username*</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 bg-[#F1F5F9] rounded-lg border border-transparent focus:border-[#00B500] hover:border-[#00B500] active:border-[#00B500] focus:outline-none focus:ring-0 transition duration-200"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[14px] font-medium leading-[20px] text-[#1E293B] mb-1">Password*</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-[#F1F5F9] rounded-lg border border-transparent focus:border-[#00B500] hover:border-[#00B500] active:border-[#00B500] focus:outline-none focus:ring-0 transition duration-200"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                {showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeOffIcon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            className="w-[20px] h-[20px] border border-[#CBD5E1] rounded-[4px] appearance-none checked:bg-[#00B500] checked:border-[#00B500] focus:outline-none focus:ring-0 transition duration-200 cursor-pointer"
                        />
                        <label htmlFor="rememberMe" className="text-[14px] font-normal leading-[14px] text-[#1E293B] cursor-pointer">
                            Remember me?
                        </label>
                    </div>

                    {/* hata mesajı */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-2 bg-[#00B500] text-white font-medium text-[14px] leading-[20px] text-center rounded-lg hover:bg-[#009A00] transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
