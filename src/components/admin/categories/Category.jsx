import { useDispatch, useSelector } from "react-redux";
import { useDashboardCategoryFilter } from "../../../hooks/useCategoryFilter";
import React, { useState } from "react";
import { FaFolderOpen, FaThList } from "react-icons/fa";
import Loader from "../../../components/shared/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { adminCategoryTableColumn } from "../../../components/helper/tableColumn";
import Modal from "../../../components/shared/Modal";
import { DeleteModal } from "../../../components/checkout/DeleteModal";
import AddCategoryForm from "./AddCategoryForm";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { deleteCategory } from "../../../store/action";
import toast from "react-hot-toast";

function Category() {
  const { categories, pagination } = useSelector((state) => state.products);

  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  const [selectedCategory, setSelectedCategory] = useState("");

  useDashboardCategoryFilter();

  const tableRecords = categories?.map((item) => {
    return {
      id: item.categoryId,
      categoryName: item.categoryName,
    };
  });

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setOpenUpdateModal(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setOpenDeleteModal(true);
  };

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  const onDeleteHandler = () => {
    dispatch(
      deleteCategory(setLoader, selectedCategory?.id, toast, setOpenDeleteModal)
    );
  };

  const emptyCategory = !categories || categories?.length === 0;

  return (
    <div>
      <div className="pt-6 pb-10 flex justify-end">
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-custom-blue hover:bg-blue-800 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300"
        >
          <FaThList className="text-xl" />
          Add Category
        </button>
      </div>
      {!emptyCategory && (
        <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
          All Categories
        </h1>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {emptyCategory ? (
            <div className="flex flex-col items-center justify-center text-gray-600 py-10">
              <FaFolderOpen size={50} className="mb-3" />
              <h2 className="text-2xl font-semibold">
                No Categories Created Yet
              </h2>
            </div>
          ) : (
            <div className="max-w-full">
              <DataGrid
                className="w-full"
                rows={tableRecords}
                columns={adminCategoryTableColumn(handleEdit, handleDelete)}
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
        title={openUpdateModal ? "Update Category" : "Add Category"}
      >
        <AddCategoryForm
          setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
          category={selectedCategory}
          update={openUpdateModal}
        />
      </Modal>

      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        loader={loader}
        title="Delete Category"
        onDeleteHandler={onDeleteHandler}
      />
    </div>
  );
}

export default Category;
