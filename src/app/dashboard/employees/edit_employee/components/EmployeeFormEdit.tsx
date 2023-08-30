"use client";
import Button from "@/components/Button";
import useAxios from "axios-hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";

interface EmployeeProfileProps {
  employeeData: any;
}

const EmployeeFormEdit = ({ employeeData }: EmployeeProfileProps) => {
  // ! Hooks para el form
  const router = useRouter(); // NOTE: Para redirigir paginas
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(); // NOTE: Para hacer validaciones en el formulario

  const [{ loading: updateLoading, error: updateError }, updateEmployee] =
    useAxios(
      {
        method: "PATCH", // or 'PATCH' based on your API
        url: `http://localhost:3000/employee/${employeeData.id}`, // Replace with your API endpoint
      },
      { manual: true }
    );

  if (updateLoading) return <div>Loading...</div>;
  if (updateError) return <div>Error: {updateError.message}</div>;

  const onSubmitForm = async (data: any) => {
    if (isCancel) {
      try {
        await updateEmployee({
          data: {
            employeename: data.name,
            cargo: data.charge,
            numero: data.contact,
          },
        });
        router.push("/dashboard/employees?edited");
      } catch (error) {
        router.push("/dashboard/employees?error");
        console.error("Hubo un error al actualizar los datos:", error);
      }
    }
  };

  const [isCancel, setIsCancel] = useState(true);

  const registration = () => {
    setIsCancel(true);
  };

  const cancellation = () => {
    setIsCancel(false);
    router.back();
  };

  return (
    <div className="flex bg-[#DC6000] p-10 rounded-md">
      <form
        className="flex flex-col space-y-4 md:space-y-6 w-[400px]"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <div className="flex flex-col">
          <div className="mb-2 flex-col flex">
            <label className="text-white">Nombre Completo</label>
            <input
              className="bg-white text-gray-800 rounded-lg text-center h-10"
              placeholder="Panquesito del Castillo Vainilla"
              type="text"
              {...register("name", {
                required: true,
                minLength: 6,
                maxLength: 50,
                pattern: /^[A-Z][a-zA-Z\s]*$/,
                value: employeeData.employeename,
              })}
              id="employeename"
            />
            {errors.name?.type === "required" && (
              <p className=" text-red-700 font-light leading-relaxed">
                * Debes introducir un nombre
              </p>
            )}
            {errors.name?.type === "minLength" && (
              <p className=" text-red-700 font-light leading-relaxed">
                * El nombre debe ser tener 6 caracteres como mínimo
              </p>
            )}
            {errors.name?.type === "maxLength" && (
              <p className=" text-red-700 font-light leading-relaxed">
                * El nombre debe tener 50 caracteres como máximo
              </p>
            )}
            {errors.name?.type === "pattern" && (
              <p className=" text-red-700 font-light leading-relaxed">
                * Este no es un nombre válido, nombres con mayúsculas
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mb-2 flex flex-col">
            <label className="text-white">Cargo</label>
            <select
              className="bg-white text-gray-800 rounded-lg text-center h-10"
              placeholder="Cargo"
              {...register("charge", { value: employeeData.cargo })}
              id="cargo"
            >
              <option value="Entrenador">Entrenador</option>
              <option value="Conserje">Conserje</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mb-2 flex-col flex">
            <label className="text-white">Numero de Contacto</label>
            <input
              className="bg-white text-gray-800 rounded-lg text-center h-10"
              placeholder="66666666"
              type="text"
              {...register("contact", {
                required: true,
                pattern: /^[1-9][0-9]{7}$/,
                value: employeeData.numero,
              })}
              id="numero"
            />
            {errors.contact?.type === "required" && (
              <p className="text-red-700 font-light leading-relaxed">
                * Debes introducir un número de télefono
              </p>
            )}
            {errors.contact?.type === "pattern" && (
              <p className="text-red-700 font-light leading-relaxed">
                * Este no es un número de teléfono
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-1 mx-1">
            <button
              className="flex-1 bg-[#1AC317] p-2 text-white rounded-xl hover:bg-[#246623] "
              onClick={registration}
            >
              <h1 className="font-semibold">Registrar</h1>
            </button>
          </div>
          <div className="flex flex-1 mx-1">
            <button
              className="flex-1 bg-[#CE0A0B] p-2 text-white rounded-xl hover:bg-[#782828] "
              onClick={cancellation}
            >
              <h1 className="font-semibold">Cancelar</h1>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeFormEdit;
