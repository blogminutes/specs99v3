import React, { ChangeEvent, FormEvent, useState } from "react";
import * as validators from "~/utils/form-validation/form-validations";
import ButtonPrimary from "~/components/ui/buttons/ButtonPrimary";
import useInput from "~/hooks/useInput";
import FormInput from "~/components/ui/form/FormInput";
import FormInputList from "~/components/ui/form/FormInputList";
import { v4 as uuidv4 } from "uuid";
import {
  categories,
  enumToArray,
  FrameBodyTypes,
  frameBodyTypes,
  FrameColors,
  FrameMaterial,
  FrameShapes,
  IdealFor,
  LensColors,
  lensTypes,
  sizes,
} from "~/utils/productHelpers";
import Image from "next/image";
import AdminLayout from "~/components/admin/shared/AdminLayout";
import { supabaseClient } from "~/utils/supabase/supabase";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import withAuth from "~/components/auth/withAuth";

const CreateProductPage = () => {
  const apiContext = api.useContext();

  const [isLoading, setIsLoading] = useState(false);

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

  const weightInput = useInput<string>(validators.numberValidator(1), "");

  const idealForInput = useInput<string>(
    validators.wordLengthValidator(2),
    enumToArray(IdealFor)[0]?.name || "Mens"
  );

  const shapeInput = useInput(validators.multipleValueValidator, [
    enumToArray(FrameShapes)[0]?.name || "Shape",
  ]);
  const lensInput = useInput<string>(
    validators.wordLengthValidator(3),
    lensTypes[0]?.name || "Lens"
  );
  const lensColorInput = useInput(validators.multipleValueValidator, [
    enumToArray(LensColors)[0]?.name || "Lens Color",
  ]);
  const categoriesInput = useInput(validators.multipleValueValidator, [
    categories[0]?.name || "Category",
  ]);
  const frameMaterialInput = useInput(
    validators.wordLengthValidator(3),
    enumToArray(FrameMaterial)[0]?.name || "Frame Material"
  );
  const frameTypeInput = useInput(
    validators.wordLengthValidator(3),
    frameBodyTypes[0]?.name || "Frame Body"
  );
  const frameColorInput = useInput(validators.multipleValueValidator, [
    enumToArray(FrameColors)[0]?.name || "Frame Color",
  ]);

  const [selectedCoverImage, setSelectedCoverImage] = useState<File | null>(
    null
  );

  const [showCoverImageError, setShowCoverImageError] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedCoverImage(file);
    setShowCoverImageError(false);

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

    if (
      brandInput.error ||
      modleInput.error ||
      descriptionInput.error ||
      mrpInput.error ||
      priceInput.error ||
      !selectedCoverImage ||
      weightInput.error
    ) {
      brandInput.showErrorHandler();
      modleInput.showErrorHandler();
      descriptionInput.showErrorHandler();
      mrpInput.showErrorHandler();
      priceInput.showErrorHandler();
      weightInput.showErrorHandler();
      !selectedCoverImage && setShowCoverImageError(true);
      return;
    }

    try {
      setIsLoading(true);
      const uniqueId = uuidv4();
      const coverImageName = selectedCoverImage.name + "-" + uniqueId;

      const images: string[] = [];

      const imagesPromises: (() => Promise<void>)[] = [];

      if (selectedImages && selectedImages.length > 0) {
        for (const file of selectedImages) {
          const fileName = file.name + "-" + uuidv4();
          const imagePromise = async () => {
            const { data, error } = await supabaseClient.storage
              .from("specs-99-bucket")
              .upload(fileName, file);

            if (error) {
              console.error("Error uploading file:", error);
            } else {
              console.log("File uploaded successfully:", data);
            }
          };
          imagesPromises.push(imagePromise);

          const imageURL =
            process.env.NEXT_PUBLIC_SUPABASE_URL +
            "storage/v1/object/public/specs-99-bucket/" +
            fileName;

          images.push(imageURL);
        }
      }

      await Promise.all([
        supabaseClient.storage
          .from("specs-99-bucket")
          .upload(coverImageName, selectedCoverImage),
        ...imagesPromises.map((f) => f()),
      ]);

      const coverImageUrl =
        process.env.NEXT_PUBLIC_SUPABASE_URL +
        "storage/v1/object/public/specs-99-bucket/" +
        coverImageName;

      await apiContext.admin.createProduct.fetch({
        brand: brandInput.value,
        categories: categoriesInput.value,
        coverImage: coverImageUrl,
        description: descriptionInput.value,
        frameMaterial: frameMaterialInput.value,
        frameColor: frameColorInput.value,
        lens: lensInput.value,
        lensColor: lensColorInput.value,
        model: modleInput.value,
        mrp: Number(mrpInput.value),
        price: Number(priceInput.value),
        size: sizeInput.value,
        shape: shapeInput.value,
        weight: Number(weightInput.value),
        images,
        idealFor: idealForInput.value as IdealFor,
        frameType: frameTypeInput.value,
      });

      toast.success("Product Created!");
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Something Went Wrong!");
      setIsLoading(false);
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
          <FormInput
            lable="Weight (in gms)"
            {...weightInput}
            errorMessage="Weight must be greater than 0."
            type="number"
          />
          <FormInputList
            {...shapeInput}
            lable="Shape"
            errorMessage="Please select shape."
            options={enumToArray(FrameShapes)}
            multiple={true}
            highlight={false}
          />
          <FormInputList
            {...idealForInput}
            lable="Ideal For"
            errorMessage="Please select gender."
            options={enumToArray(IdealFor)}
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
            options={enumToArray(LensColors)}
            multiple={true}
            highlight={false}
          />
          <FormInputList
            {...frameTypeInput}
            lable="Frame Type"
            errorMessage="Please select frame material."
            options={enumToArray(FrameBodyTypes)}
            highlight={false}
            multiple={false}
          />
          <FormInputList
            {...frameColorInput}
            lable="Frame Color"
            errorMessage="Please select frame color."
            options={enumToArray(FrameColors)}
            multiple={true}
            highlight={false}
          />
          <div className="flex flex-col gap-0 ">
            <div className="flex items-center">
              <label htmlFor="coverImage" className="text-grey-light">
                Cover Image
              </label>
              {showCoverImageError && (
                <span className="ml-auto text-xs text-red-400">
                  {"Please select cover image"}
                </span>
              )}
            </div>
            <input
              id="coverImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="pointer-events-none h-0 w-0 opacity-0"
            />
            <label
              htmlFor="coverImage"
              className="mt-2 w-full bg-bg-primary text-grey-light"
            >
              {previewUrl ? (
                <Image
                  className="h-14 w-14 overflow-hidden rounded-full object-scale-down shadow-md"
                  width={52}
                  height={52}
                  src={previewUrl}
                  alt="Selected Image"
                />
              ) : (
                <>
                  <span
                    className={`"mt-2 block w-full rounded-lg px-3 py-1.5 shadow-form-input-primary outline-0 outline-offset-2 ${
                      showCoverImageError && !selectedCoverImage
                        ? "outline !outline-1 outline-red-500"
                        : selectedCoverImage
                        ? "outline !outline-1 outline-secondary"
                        : ""
                    }`}
                  >
                    Select Image
                  </span>
                </>
              )}
            </label>
          </div>
          <div className="flex flex-col gap-0">
            <label htmlFor="images" className="text-grey-light">
              Images
            </label>
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
              className="flex  w-full  gap-2 bg-bg-primary text-grey-light"
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
          <div className="col-span-full w-full">
            <ButtonPrimary
              text="Submit"
              className="mx-auto block w-fit flex-[0,0,fit-content]"
              isLoading={isLoading}
            />
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default withAuth(CreateProductPage);
