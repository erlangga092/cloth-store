import { CategoryCard } from "@/components/category-card";
import { Slider } from "@/components/slider";
import { dummyCategories } from "@/dummies/category";
import { dummyliders } from "@/dummies/slider";
import LayoutWeb from "@/layouts/web";
import { CategoryType } from "@/types/category";
import { SliderType } from "@/types/slider";
import { Head, Link } from "@inertiajs/react";
import React from "react";

const WebHomePage = ({
  sliders,
  categories,
}: {
  sliders: Array<SliderType>;
  categories: Array<CategoryType>;
}) => {
  return (
    <>
      <Head>
        <title>Geek Store</title>
      </Head>
      <LayoutWeb>
        <Slider sliders={dummyliders} />
        <div className="container mt-4 mb-5 pb-5">
          <div className="fade-in">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="row justify-content-between mb-3">
                  <div className="col-md-6 col-6 text-start">
                    <strong>Categories</strong>
                  </div>
                  <div className="col-md-6 col-6 text-end">
                    <Link href="/categories" className="text-dark">
                      <strong>
                        See More <i className="fa fa-long-arrow-alt-right"></i>
                      </strong>
                    </Link>
                  </div>
                </div>

                <div className="row justify-content-center">
                  {dummyCategories?.map(
                    (category: CategoryType, index: number) => (
                      <CategoryCard key={index} category={category} />
                    )
                  )}
                </div>

                <div className="row justify-content-between mb-1 mt-4">
                  <div className="col-md-6 col-6 text-start">
                    <strong>All Product</strong>
                  </div>
                  <div className="col-md-6 col-6 text-end">
                    <Link href="/products" className="text-dark">
                      <strong>
                        See More
                        <i className="fa fa-long-arrow-alt-right"></i>
                      </strong>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutWeb>
    </>
  );
};

export default WebHomePage;
