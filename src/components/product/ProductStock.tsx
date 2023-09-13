import React, { Fragment } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ProductBulbs from "./ProductBulbs";
import ProductChickens from "./ProductChickens";
import ProductFoods from "./ProductFoods";
import ProductGasCylinders from "./ProductGasCylinders";
import ProductMedicines from "./ProductMedicines";
import ProductStrawBales from "./ProductStrawBales";
import ProductTools from "./ProductTools";
import NotFound from "../NotFound";
import ProductSummary from "./ProductSummary";

const ProductStock = () => {
  const products = [
    {
      name: "All products",
      path: "",
      element: <ProductSummary />,
    },
    {
      name: "Bulbs",
      path: "bulbs",
      element: <ProductBulbs />,
    },
    {
      name: "Chickens",
      path: "chickens",
      element: <ProductChickens />,
    },
    {
      name: "Foods",
      path: "foods",
      element: <ProductFoods />,
    },
    {
      name: "Gas Cylinders",
      path: "gas-cylinders",
      element: <ProductGasCylinders />,
    },
    {
      name: "Medicines",
      path: "medicines",
      element: <ProductMedicines />,
    },
    {
      name: "Straw Bales",
      path: "strawBales",
      element: <ProductStrawBales />,
    },
    {
      name: "Tools",
      path: "tools",
      element: <ProductTools />,
    },
  ];

  return (
    <Fragment>
      <div className="content-wrapper">
        <div className="flex ml-4 ">
          <div className="flex bg-gray-200 rounded-lg transition p-1 dark:bg-gray-700 dark:hover:bg-gray-600 mt-4 ">
            <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
              <Link
                to=""
                className="hs-tab-active:bg-white hs-tab-active:text-gray-700 hs-tab-active:dark:bg-gray-800 hs-tab-active:dark:text-gray-400 dark:hs-tab-active:bg-gray-800 py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm text-gray-500 hover:bg-gray-900 font-medium rounded-md dark:text-gray-400 dark:hover:text-white active"
                role="tab"
              >
                All Products
              </Link>
              {products.map((product, index) => (
                <Link
                  key={index}
                  to={product.path}
                  type="button"
                  className="hs-tab-active:bg-white hs-tab-active:text-gray-700 hs-tab-active:dark:bg-gray-800 hs-tab-active:dark:text-gray-400 dark:hs-tab-active:bg-gray-800 py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 font-medium rounded-md hover:hover:text-blue-600 dark:text-gray-400 dark:hover:text-white dark:hover:text-gray-300"
                  role="tab"
                >
                  {product.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <Routes>
          {products.map((product, index) => (
            <Route key={index} path={product.path} element={product.element} />
          ))}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </Fragment>
  );
};

export default ProductStock;
