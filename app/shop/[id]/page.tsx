import { V2_BASE_URL, isDev, response } from "@/utils/config";
import { cookies } from "next/headers";
import Link from "next/link";

const getData = async (classId: string) => {
  // req url
  const devReqUrl = `http://localhost:8000/v2/linter/linter_class/${classId}/`;
  const prodReqUrl = `${V2_BASE_URL}/linter/linter_class/${classId}/`;
  const reqUrl = isDev ? devReqUrl : prodReqUrl;
  
  // token
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  const upstream = await fetch(reqUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });
  
  if (!upstream.ok) {
    return response.json({ success: false }, { status: upstream.status });
  }

  const jsonData = await upstream.json();
  

  return response.json(jsonData);
};

const detailShopPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const data = await getData(id);
  
  if (data.status !== 200) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="flex flex-col gap-5 items-center">
          <p className="text-white">
            محصول یافت نشد
          </p>

          <Link href={"/shop"} className="text-white text-xl underline">
            بازگشت به فروشگاه 
          </Link>
        </div>
      </div>
    );
  }
};

export default detailShopPage;
