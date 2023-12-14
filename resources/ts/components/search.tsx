import { useForm } from "@inertiajs/react";
import React, { FormEvent } from "react";

export function Search({ URL }: { URL: string }) {
  const { data, setData, processing, get } = useForm<{ q: string }>({
    q: "",
  });

  function searchHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    get(`${URL}?q=${data.q}`);
  }

  return (
    <>
      <form onSubmit={searchHandler}>
        <div className="input-group">
          <input
            type="text"
            value={data.q}
            onChange={(e) => setData("q", e.target.value)}
            className="form-control border-0 shadow-sm"
            placeholder="type keywords and enter"
          />
          <button
            type="submit"
            disabled={processing}
            className="input-group-text-search border-0 shadow-sm"
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
    </>
  );
}
