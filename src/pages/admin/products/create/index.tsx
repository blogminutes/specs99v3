import React, { ChangeEvent, FormEvent, useState } from "react";
import * as validators from "~/utils/form-validation/form-validations";
import ButtonPrimary from "~/components/ui/buttons/ButtonPrimary";
import useInput from "~/hooks/useInput";
import FormInput from "~/components/ui/form/FormInput";
import FormInputList from "~/components/ui/form/FormInputList";

import {
  categories,
  frameBodyTypes,
  frameColors,
  lensColors,
  lensTypes,
  sizes,
} from "~/utils/productHelpers";
import Image from "next/image";
import AdminLayout from "~/components/admin/shared/AdminLayout";
import { supabaseClient } from "~/utils/supabase/supabase";

const CreateProductPage = () => {
  const brandInput = useInput<string>(validators.wordLengthValidator(2), "");
  const modleInput = useInput<string>(validators.wordLengthValidator(5), "");
  const descriptionInput = useInput<string>(
    validators.wordLengthValidator(20),
    ""
  );

  const mrpInput = useInput<string>(validators.numberValidator(1), "");
  const priceInput = useInput<string>(
    validators.minMaxValidator(1, Number(mrpInput.value)),
    ""
  );
  const sizeInput = useInput<string>(
    validators.wordLengthValidator(2),
    sizes[0]?.name || "Size"
  );
  const lensInput = useInput<string>(
    validators.wordLengthValidator(3),
    lensTypes[0]?.name || "Lens"
  );
  const lensColorInput = useInput(
    validators.wordLengthValidator(3),
    lensColors[0]?.name || "Lens Color"
  );
  const categoriesInput = useInput(validators.multipleValueValidator, [
    categories[0]?.name || "Category",
  ]);
  const frameBodyInput = useInput(
    validators.wordLengthValidator(3),
    frameBodyTypes[0]?.name || "Frame Body"
  );
  const frameColorInput = useInput(
    validators.wordLengthValidator(3),
    frameColors[0]?.name || "Frame Color"
  );

  const [selectedCoverImage, setSelectedCoverImage] = useState<File | null>(
    null
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedCoverImage(file);

    // Create a FileReader to read the image file
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Images

  const [selectedImages, setSelectedImages] = useState<File[] | null>(null);
  const [imagesPreviewUrls, setImagesPreviewUrls] = useState<string[] | null>(
    null
  );

  const handleImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const selectedFiles = Array.from(files);
    setSelectedImages(selectedFiles);
    if (files && files.length > 0) {
      const previews = selectedFiles.map((file) => URL.createObjectURL(file));
      setImagesPreviewUrls(previews);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedCoverImage) {
      const res = await supabaseClient.storage
        .from("specs-99-bucket")
        .upload(selectedCoverImage.name, selectedCoverImage);
      console.log(res);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 px-8 py-8">
        <h3 className="mb-8 text-2xl font-medium text-[#495057]">
          Create Product
        </h3>
        <form
          className="grid grid-cols-3 gap-[min(10vh,10vw)] gap-y-10"
          onSubmit={handleSubmit}
        >
          <FormInput
            lable="Brand"
            {...brandInput}
            errorMessage="Minimum 2 characters are required."
            type="text"
          />
          <FormInput
            lable="Model"
            {...modleInput}
            errorMessage="Minimum 5 characters are required."
            type="text"
          />
          <FormInput
            lable="Description"
            {...descriptionInput}
            errorMessage="Minimum 20 characters are required."
            type="text"
          />
          <FormInput
            lable="MRP"
            {...mrpInput}
            errorMessage="MRP must be greater than 0."
            type="number"
          />
          <FormInput
            lable="Price"
            {...priceInput}
            errorMessage="Must be greater than 0 and <= MRP."
            type="number"
          />
          <FormInputList
            {...categoriesInput}
            lable="Category"
            errorMessage="Please select lens type."
            options={categories}
            multiple={true}
            highlight={false}
          />
          <FormInputList
            {...sizeInput}
            lable="Size"
            errorMessage="Please select size."
            options={sizes}
            multiple={false}
            highlight={false}
          />
          <FormInputList
            {...lensInput}
            lable="Lens"
            errorMessage="Please select lens type."
            options={lensTypes}
            multiple={false}
            highlight={false}
          />
          <FormInputList
            {...lensColorInput}
            lable="Lens Color"
            errorMessage="Please select lens color."
            options={lensColors}
            multiple={false}
            highlight={false}
          />
          <FormInputList
            {...frameBodyInput}
            lable="Frame Body"
            errorMessage="Please select frame boduy."
            options={frameBodyTypes}
            highlight={false}
            multiple={false}
          />
          <FormInputList
            {...frameColorInput}
            lable="Frame Color"
            errorMessage="Please select frame color."
            options={frameColors}
            multiple={false}
            highlight={false}
          />
          <div className="flex flex-col gap-0">
            <label htmlFor="coverImage">Cover Image</label>
            <input
              id="coverImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="pointer-events-none h-0 w-0 opacity-0"
            />
            <label htmlFor="coverImage" className="w-full  bg-bg-primary  ">
              {previewUrl ? (
                <Image
                  className="h-14 w-14 overflow-hidden rounded-full object-scale-down shadow-md"
                  width={52}
                  height={52}
                  src={previewUrl}
                  alt="Selected Image"
                />
              ) : (
                <span className="mt-2 block w-full rounded-lg px-3 py-1.5 shadow-form-input-primary outline-0 outline-offset-2">
                  Select Image
                </span>
              )}
            </label>
          </div>
          <div className="flex flex-col gap-0">
            <label htmlFor="images">Images</label>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className="pointer-events-none h-0 w-0 opacity-0  focus:!outline-blue-700"
            />
            <label
              htmlFor="images"
              className="flex  w-full  gap-2 bg-bg-primary"
            >
              {imagesPreviewUrls ? (
                imagesPreviewUrls.map((url) => (
                  <Image
                    key={url}
                    className="h-14 w-14 overflow-hidden rounded-full object-scale-down shadow-md"
                    width={52}
                    height={52}
                    src={url}
                    alt="Selected Image"
                  />
                ))
              ) : (
                <span className="mt-2 block w-full rounded-lg px-3 py-1.5 shadow-form-input-primary outline-0 outline-offset-2">
                  Select Images
                </span>
              )}
            </label>
          </div>
          <div className="w-full">
            <ButtonPrimary
              text="Submit"
              className="mx-auto block w-fit flex-[0,0,fit-content]"
            />
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateProductPage;
