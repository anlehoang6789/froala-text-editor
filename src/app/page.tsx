import dynamic from "next/dynamic";

const FroalaEditorCustom = dynamic(() => import("@/app/froala-editor-custom"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      {/* Trang Home này render với Server Side */}
      {/* ========================================================================================== */}

      {/* 
        FloaraEditorCustom chỉ render được client side nên phải dùng dynamic và tắt ssr đi nó mới không có lỗi 
      ReferenceError: window is not defined
      at __webpack_require__ (E:\NextJS\froala-text-editor\.next\server\webpack-runtime.js:33:43)
      at eval (./src/app/page.tsx:9:78)
      at (ssr)/./src/app/page.tsx (E:\NextJS\froala-text-editor\.next\server\app\page.js:129:1)
      at Object.__webpack_require__ [as require] (E:\NextJS\froala-text-editor\.next\server\webpack-runtime.js:33:43)
      */}
      <FroalaEditorCustom />
    </div>
  );
}
