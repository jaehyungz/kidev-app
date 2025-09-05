"use client";

import { useIsPWA } from "@/hooks";
import { useAuthStore } from "@/store";
import { deleteCookie, getCookie, setCookie } from "cookies-next/client";
import { useEffect, useState } from "react";
import { useStore } from "zustand";

export default function Home() {
  const [state, setState] = useState({
    id: "",
    pw: "",
  });

  const [cookieValue, setCookieValue] = useState("");

  const { id, pw, setUser } = useStore(useAuthStore);

  const isPWA = useIsPWA();

  const handleSubmit = () => {
    setUser({
      id: state.id,
      pw: state.pw,
    });

    setCookie("user-id", state.id);
    setCookieValue(state.id);
  };

  const handleReset = () => {
    setUser({ id: "", pw: "" });
    deleteCookie("user-id");
    setCookieValue("");
  };

  useEffect(() => {
    const res = getCookie("user-id");
    setCookieValue(res ?? "");
  }, []);

  return (
    <div className="h-screen flex flex-col w-120 mx-auto">
      <p>
        id: {id} pw: {pw}
      </p>
      <p>cookie: {cookieValue}</p>
      <p>{isPWA === undefined ? "아직모름" : isPWA ? "pwa" : "web"}</p>
      <input
        type="text"
        className="border"
        placeholder="id"
        onChange={(e) => setState((prev) => ({ ...prev, id: e.target.value }))}
      />
      <input
        type="text"
        className="border"
        placeholder="password"
        onChange={(e) => setState((prev) => ({ ...prev, pw: e.target.value }))}
      />
      <button type="button" onClick={handleSubmit}>
        로그인
      </button>

      <button type="button" onClick={handleReset}>
        clear
      </button>
    </div>
  );
}
