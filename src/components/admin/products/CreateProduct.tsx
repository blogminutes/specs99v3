import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const CreateProduct = () => {
  type Inputs = {
    example: string;
    exampleRequired: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    console.log(data, touchedFields);

  return (
    <div className="p-4 px-8">
      <h3 className="mb-8 text-2xl font-medium text-[#495057]">
        Create Product
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-20">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            className="min-w-[18rem] rounded-lg bg-primary px-3 py-1.5 shadow-form-input-primary focus:outline-none"
            id="name"
            defaultValue="test"
            {...register("example")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            className="min-w-[18rem] rounded-lg bg-primary px-3 py-1.5 shadow-form-input-primary focus:outline-none"
            {...register("exampleRequired", { required: true })}
          />
        </div>
        <button className="w-[100%]" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
