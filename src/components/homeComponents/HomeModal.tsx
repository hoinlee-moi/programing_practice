import React, { useEffect, useState } from "react";

import styles from "../../styles/home/homeModal.module.css";
import Login from "./Login";
import SignUp from "./SignUp";

type modalPorps = {
  content: string;
  modalClose: React.Dispatch<React.SetStateAction<boolean>>;
};

const HomeModal = ({ content, modalClose }: modalPorps) => {
  const mouseDownHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) modalClose(false);
  };

  return (
    <div className={styles.modalBackgorund} onMouseDown={mouseDownHandle}>
      <section
        className={styles.modalContent}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <span onClick={() => modalClose(false)} />
        {content === "signUp" ? <SignUp /> : <Login />}
      </section>
    </div>
  );
};

export default HomeModal;
