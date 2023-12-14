import { useForm } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

export function DeleteAct({ URL, id }: { URL: string; id: number }) {
  const form = useForm();
  const DEFAULT_TIMER: number = 1500;

  async function destroy() {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        form.delete(`${URL}/${id}`, {
          onSuccess: function () {
            Swal.fire({
              title: "Success!",
              text: "Success delete data!",
              icon: "success",
              showConfirmButton: false,
              timer: DEFAULT_TIMER,
            });
          },
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        text: "Failed delete data!",
        icon: "error",
        showConfirmButton: false,
        timer: DEFAULT_TIMER,
      });
    }
  }

  return (
    <>
      <button onClick={() => destroy()} className="btn btn-danger btn-sm">
        <i className="fa fa-trash"></i>
      </button>
    </>
  );
}
