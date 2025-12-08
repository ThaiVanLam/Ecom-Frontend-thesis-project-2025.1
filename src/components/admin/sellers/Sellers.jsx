import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { MdPersonAdd } from "react-icons/md";
import AddSellerForm from "./AddSellerForm";
import { adminSellerTableColumn } from "../../../components/helper/tableColumn";
import { useSelector } from "react-redux";
import { useDashboardSellerFilter } from "../../../hooks/useSellerFilter";
import Modal from "../../../components/shared/Modal";
import Loader from "../../../components/shared/Loader";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function Sellers() {
  const { sellers, pagination } = useSelector((state) => state.auth);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState("");
  const emptySeller = !sellers || sellers?.length === 0;

  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  const tableRecords = sellers?.map((item) => {
    return {
      id: item.userId,
      username: item.username,
      email: item.email,
    };
  });

  useDashboardSellerFilter();

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  return (
    <div>
      <div className="pt-6 pb-10 flex justify-end">
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-custom-blue hover:bg-blue-800 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300"
        >
          <MdPersonAdd className="text-xl" />
          Add Seller
        </button>
      </div>
      {!emptySeller && (
        <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
          All Categories
        </h1>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {emptySeller ? (
            <div className="flex flex-col items-center justify-center text-gray-600 py-10">
              <h2 className="text-2xl font-semibold">No Sellers Created Yet</h2>
            </div>
          ) : (
            <div className="max-w-full">
              <DataGrid
                className="w-full"
                rows={tableRecords}
                columns={adminSellerTableColumn()}
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
        open={openAddModal}
        setOpen={setOpenAddModal}
        title="Add New Seller"
      >
        <AddSellerForm setOpen={setOpenAddModal} seller={selectedSeller} />
      </Modal>
    </div>
  );
}

export default Sellers;
