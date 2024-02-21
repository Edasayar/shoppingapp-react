import { useState, useEffect, useRef } from 'react';
import './slider.css';

const Slider = ({ image }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [slideStyle, setSlideStyle] = useState({ opacity: 1 });
  const [isPaused, setIsPaused] = useState(false); // Fare sliderın üzerinde mi kontrolü
  const progressRef = useRef(null);
  const progressBarDuration = 5000; // Geçiş süresi: 5 saniye
  const slideDuration = 5000; // Resim geçiş süresi: 5 saniye

  const nextSlide = () => {
    setCurrentImage((prev) => (prev === image.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentImage((prev) => (prev === 0 ? image.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, slideDuration);

    return () => clearInterval(interval);
  }, [slideDuration, isPaused]);

  useEffect(() => {
    setSlideStyle({ opacity: 0 });
    progressRef.current.style.transition = 'width 0s linear';
    progressRef.current.style.width = '0';

    setTimeout(() => {
      setSlideStyle({ opacity: 1 });
      progressRef.current.style.transition = `width ${progressBarDuration / 1000}s linear`;
      progressRef.current.style.width = '100%';
    }, 100);

    const progressBarTimeout = setTimeout(() => {
      if (!isPaused) {
        progressRef.current.style.transition = 'none';
        progressRef.current.style.width = '0';
      }
    }, slideDuration); 

    return () => {
      clearTimeout(progressBarTimeout);
    };
  }, [currentImage, slideDuration, progressBarDuration, isPaused]);

  const handleSliderMouseEnter = () => {
    setIsPaused(true);
  };

  const handleSliderMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div 
      className="slider"
      onMouseEnter={handleSliderMouseEnter}
      onMouseLeave={handleSliderMouseLeave}
    >
      <button onClick={prevSlide}>Previous</button>
      <img
        src={image[currentImage]}
        alt={`Slide ${currentImage}`}
        style={slideStyle}
      />
      <button onClick={nextSlide}>Next</button>
      <div className="progress-bar-container">
        <div className="progress-bar" ref={progressRef}></div>
      </div>
    </div>
  );
};

export default Slider;
