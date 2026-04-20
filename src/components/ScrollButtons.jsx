import { useEffect, useState } from "react";

export default function ScrollButtons() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300); // show after scrolling
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <div className="scroll-buttons">
      <button className="scroll-btn up" onClick={scrollToTop}>
        ↑
      </button>
      <button className="scroll-btn down" onClick={scrollToBottom}>
        ↓
      </button>
    </div>
  );
}