import { FaBoxOpen } from "react-icons/fa";
import Loader from "../../../components/shared/Loader";
import React, { useState } from "react";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { adminProductTableColumn } from "../../../components/helper/tableColumn";
import { useDashboardProductFilter } from "../../../hooks/useProductFilter";
import Modal from "../../../components/shared/Modal";
import AddProductForm from "./AddProductForm";
import DeleteModal from "../../../components/shared/DeleteModal";
import { deleteProduct } from "../../../store/action";
import toast from "react-hot-toast";
import ImageUploadForm from "./ImageUploadForm";
import ProductViewModal from "../../../components/shared/ProductViewModal";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function AdminProducts() {
  // const products = [
  //   {
  //     productId: 10,
  //     productName: "HP ZBook Fury 16 G10",
  //     image:
  //       "http://localhost:8080/product-manager/images/ebb64a8c-71c8-497b-9dfd-c7018d9dc311.svg",
  //     description:
  //       "The HP ZBook Fury 16 G10 is a professional workstation designed for engineers and 3D creators, featuring advanced graphics, robust cooling, and unmatched reliability.",
  //     quantity: 4,
  //     price: 6800.0,
  //     discount: 10.0,
  //     specialPrice: 6120.0,
  //   },
  //   {
  //     productId: 9,
  //     productName: "Lenovo ThinkPad P16",
  //     image:
  //       "http://localhost:8080/product-manager/images/3ff9b35d-2fac-4f60-976e-cb2f2349a59e.svg",
  //     description:
  //       "Engineered for performance, the Lenovo ThinkPad P16 delivers workstation-grade power with Intel Core i9, NVIDIA RTX A2000, and military-grade durability for professional creators.",
  //     quantity: 5,
  //     price: 6500.0,
  //     discount: 12.0,
  //     specialPrice: 5720.0,
  //   },
  //   {
  //     productId: 7,
  //     productName: "Dell XPS 13 Plus",
  //     image:
  //       "http://localhost:8080/product-manager/images/549a5b08-eec1-48b9-a2df-c9722dcc59e5.svg",
  //     description:
  //       "The Dell XPS 13 Plus redefines ultrabook excellence with its InfinityEdge display, minimalist design, and Intel Core Ultra 7 processor for professionals seeking both form and function.",
  //     quantity: 7,
  //     price: 5200.0,
  //     discount: 10.0,
  //     specialPrice: 4680.0,
  //   },
  // ];

  // const pagination = {
  //   pageNumber: 0,
  //   pageSize: 50,
  //   totalElements: 11,
  //   totalPages: 1,
  //   lastPage: true,
  // };

  const { products, pagination } = useSelector((state) => state.products);

  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

  const dispatch = useDispatch();

  const [selectedProduct, setSelectedProduct] = useState("");

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [openProductViewModal, setOpenProductViewModal] = useState(false);

  const [openImageUploadModal, setOpenImageUploadModal] = useState(false);

  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  useDashboardProductFilter();

  const tableRecords = products?.map((item) => {
    return {
      id: item.productId,
      productName: item.productName,
      description: item.description,
      discount: item.discount,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      specialPrice: item.specialPrice,
    };
  });

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenUpdateModal(true);
  };
  const handleDelete = (product) => {
    setSelectedProduct(product);
    setOpenDeleteModal(true);
  };
  const handleImageUpload = (product) => {
    setSelectedProduct(product);
    setOpenImageUploadModal(true);
  };
  const handleProductView = (product) => {
    setSelectedProduct(product);
    setOpenProductViewModal(true);
  };
  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };
  const onDeleteHandler = () => {
    dispatch(
      deleteProduct(setLoader, selectedProduct?.id, toast, setOpenDeleteModal)
    );
  };

  const emptyProduct = !products || products?.length === 0;

  return (
    <div>
      <div className="pt-6 pb-10 flex justify-end">
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-custom-blue hover:bg-blue-800 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300"
        >
          <MdAddShoppingCart className="text-xl" />
          Add Product
        </button>
      </div>
      {!emptyProduct && (
        <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
          All Products
        </h1>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {emptyProduct ? (
            <div className="flex flex-col items-center justify-center text-gray-600 py-10">
              <FaBoxOpen size={50} className="mb-3" />
              <h2 className="text-2xl font-semibold">
                No products created yet
              </h2>
            </div>
          ) : (
            <div className="max-w-full">
              <DataGrid
                className="w-full"
                rows={tableRecords}
                columns={adminProductTableColumn(
                  handleEdit,
                  handleDelete,
                  handleImageUpload,
                  handleProductView
                )}
                paginationMode="server"
                rowCount={pagination?.totalElements || 0}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: pagination?.pageSize || 10,
                      page: currentPage - 1,
                    },
                  },
                }}
                onPaginationModelChange={handlePaginationChange}
                disableRowSelectionOnClick
                disableColumnResize
                pageSizeOptions={[pagination?.pageSize || 10]}
                pagination
                paginationOptions={{
                  showFirstButton: true,
                  showLastButton: true,
                  hideNextButton: currentPage === pagination?.totalPages,
                }}
              />
            </div>
          )}
        </>
      )}

      <Modal
        open={openUpdateModal || openAddModal}
        setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
        title={openUpdateModal ? "Update Product" : "Add Product"}
      >
        <AddProductForm
          setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
          product={selectedProduct}
          update={openUpdateModal}
        />
      </Modal>

      <Modal
        open={openImageUploadModal}
        setOpen={setOpenImageUploadModal}
        title="Add Product Image"
      >
        <ImageUploadForm
          setOpen={setOpenImageUploadModal}
          product={selectedProduct}
        />
      </Modal>

      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        loader={loader}
        title="Delete Product"
        onDeleteHandler={onDeleteHandler}
      />

      <ProductViewModal
        open={openProductViewModal}
        setOpen={setOpenProductViewModal}
        product={selectedProduct}
      />
    </div>
  );
}

export default AdminProducts;
