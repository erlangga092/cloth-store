import { SliderType } from "@/types/slider";
import React from "react";

export const Slider = ({ sliders }: { sliders: Array<SliderType> }) => {
  return (
    <div className="container" style={{ marginTop: "80px" }}>
      <div className="fade-in">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div
              className="carousel slide"
              id="carouselExampleControls"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {sliders?.map((slider: SliderType, index: number) => (
                  <div
                    key={index}
                    className={`${
                      index == 0 ? "active carousel-item" : "carousel-item"
                    }`}
                  >
                    <img
                      src={slider.image}
                      alt={slider.link}
                      className="d-block img-carousel rounded-3"
                    />
                  </div>
                ))}
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <i className="fa fa-long-arrow-alt-left carousel-custom text-dark shadow"></i>
                <span className="visually-hidden">Previous</span>
              </button>

              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <i className="fa fa-long-arrow-alt-right carousel-custom text-dark shadow"></i>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
