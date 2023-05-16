import React, { useState } from "react";

interface uploadInterface {
  name: any;
  onSave: any;
  isUrl: any;
}

const UploadField: React.FC<uploadInterface> = ({ name, onSave, isUrl }) => {
  const [link, setLink] = useState<any>("");
  const [errors, setErrors] = useState<any>();
  const [loading, setLoading] = useState<any>(false);

  const MAX_FILE_SIZE = 2100000;

  const checkFileSize = (fileSize: any) => {
    if (fileSize > MAX_FILE_SIZE) {
      setErrors("Файл слишком большой");
      return true;
    }

    setErrors("");
    return false;
  };

  async function uploadFile(e: any, setPhotoUrl: any) {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "bushik123");
    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/drfjcq9hg/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    setPhotoUrl({ name: "photoUrl", value: file.secure_url });
  }

  const uploadImage = async (e: any) => {
    setLoading(true);
    const isBigFile = checkFileSize(e.target.files[0].size);
    if (!isBigFile) await uploadFile(e, onSave);
    setLoading(false);
  };

  const handleLink = (e: any) => {
    setLink(e);
  };

  const saveLink = () => {
    if (link) {
      uploadImage(link);
    }
  };

  const getInputClasses = () => {
    return "form-control" + (isUrl ? "" : " is-invalid");
  };
  return (
    <>
      <div className="input-group">
        <input
          name={name}
          type="file"
          accept=".png,.jpeg,.jpg,.heic,.raw"
          className={getInputClasses()}
          placeholder={"прикрепите фото"}
          onChange={handleLink}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={saveLink}
        >
          Прикрепить
        </button>
        {!isUrl && <p className="invalid-feedback text-danger">ошибка</p>}
      </div>
      {errors && <div className="text-danger">{errors}</div>}
      {loading && <div className="lds-dual-ring "></div>}
    </>
  );
};

export default UploadField;
