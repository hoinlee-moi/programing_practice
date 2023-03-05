import React, { useState, useRef, useEffect } from "react";
import { MakeModalUploadProps } from "../../etc/TypeColletion";
import usefileUpload from "../../hooks/usefileUpload";
import styles from "./FloatingMenu.module.css";
import MakeModalPreview from "./MakeModalPreview";

const MakeModalUpload = () => {
  const [uploadedImages, setUploadedImages] = usefileUpload({
    list: [],
    max: 5,
  });
  const [uploadAlert, setUploadAlert] = useState(false);
  const uploadBoxRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const alertTimeout = () => {
    setUploadAlert(true);
    setTimeout(() => {
      setUploadAlert(false);
    }, 5000);
  };
  useEffect(() => {
    const uploadBox = uploadBoxRef.current;
    const input = inputRef.current;

    const changeHandler = (e: any) => {
      const files = e.target.files;
      if (files.length > 5 || uploadedImages.length > 4) {
        alertTimeout();
        return;
      }
      setUploadedImages(files);
    };

    const dropHandler = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer !== null) {
        const files = e.dataTransfer.files;
        if (files.length > 5 || uploadedImages.length > 4) {
          alertTimeout();
          return;
        }
        setUploadedImages(files);
      }
    };

    const dragOverHandler = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    uploadBox?.addEventListener("drop", dropHandler);
    uploadBox?.addEventListener("dragover", dragOverHandler);
    input?.addEventListener("change", changeHandler);

    return () => {
      uploadBox?.removeEventListener("drop", dropHandler);
      uploadBox?.removeEventListener("dragover", dragOverHandler);
      input?.removeEventListener("change", changeHandler);
    };
  }, [uploadedImages]);

  return (
    <div
      className={
        uploadedImages.length < 1
          ? styles.imageUploadBox
          : styles.imagePreviewBox
      }
    >
      {uploadedImages.length > 0 ? (
        <MakeModalPreview />
      ) : (
        <label htmlFor="" className={styles.dragUploadBox} ref={uploadBoxRef}>
          <div className={styles.iconBox}>
            <img
              className={styles.uploadIcon}
              src={process.env.PUBLIC_URL + `/assets/uploadIcon.png`}
            />
          </div>
          <div className={styles.textBox}>
            <h3>사진을 이곳에 끌어다 놓으세요</h3>
            <span>최대 5장, 사진당 몇mb이하</span>
          </div>
        </label>
      )}
      <label htmlFor="fileUpload" className={styles.fileUploadlabel}>
        컴퓨터에서 선택
      </label>
      <input
        type="file"
        id="fileUpload"
        multiple
        accept="image/*"
        ref={inputRef}
      />
      <div
        className={`${styles.uploadAlert} ${
          uploadAlert && styles.uploadAlertOff
        }`}
      >
        <p>이미지는 최대 5장까지만 가능합니다</p>
      </div>
    </div>
  );
};

export default MakeModalUpload;
