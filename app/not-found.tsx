import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background floating shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>

      {/* 404 Card */}
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-12 text-center space-y-6 relative z-10">
        {/* 404 Number */}
        <div className="space-y-2">
          <h1 className="text-8xl font-black bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            ۴۰۴
          </h1>
          <p className="text-2xl font-bold text-white">صفحه پیدا نشد</p>
        </div>

        {/* Message */}
        <p className="text-white/70 leading-relaxed">
          متاسفیم، صفحه‌ای که دنبالش می‌گردی وجود نداره یا منتقل شده.
        </p>

        {/* Action Button */}
        <Link
          href="/"
          className="inline-block w-full bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
