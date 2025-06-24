"use client";

import { Shield, AlertTriangle } from "lucide-react";

export default function BlockedPage() {
  return (
    <main className="bg-[#0a0a0a] flex justify-center py-12">
      <div className="text-center text-white max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Shield className="h-24 w-24 text-red-500" />
              <AlertTriangle className="h-12 w-12 text-yellow-500 absolute -top-2 -right-2" />
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4 text-red-500">
            Доступ заблокирован
          </h1>

          <p className="text-lg text-gray-300 mb-6">
            Ваш аккаунт был заблокирован администратором.
          </p>

          <p className="text-sm text-gray-400 mb-8">
            Если вы считаете, что это произошло по ошибке, пожалуйста, свяжитесь
            с нами.
          </p>
        </div>

      </div>
    </main>
  );
}
