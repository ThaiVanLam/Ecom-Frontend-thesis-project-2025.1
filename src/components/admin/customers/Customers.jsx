import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { adminCustomerTableColumn } from "../../../components/helper/tableColumn";
import { useSelector } from "react-redux";
import { useDashboardCustomerFilter } from "../../../hooks/useCustomerFilter";
import Loader from "../../../components/shared/Loader";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { DeleteModal } from "../../../components/checkout/DeleteModal";
import { useDispatch } from "react-redux";
import { deleteCustomer } from "../../../store/action";
import toast from "react-hot-toast";

function Customers() {
  const { customers, pagination } = useSelector((state) => state.auth);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loader, setLoader] = useState(false);
  const emptyCustomer = !customers || customers?.length === 0;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1,
  );

  const tableRecords = customers?.map((item) => {
    return {
      id: item.userId,
      username: item.username,
      email: item.email,
    };
  });

  useDashboardCustomerFilter();

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  const handleDelete = (customer) => {
    setSelectedCustomer(customer);
    setOpenDeleteModal(true);
  };

  const deleteCustomerHandler = () => {
    dispatch(
      deleteCustomer(
        setLoader,
        selectedCustomer?.id,
        toast,
        setOpenDeleteModal,
      ),
    );
  };

  return (
    <div>
      {!emptyCustomer && (
        <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
          All Customers
        </h1>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {emptyCustomer ? (
            <div className="flex flex-col items-center justify-center text-gray-600 py-10">
              <FaUserFriends size={50} className="mb-3" />
              <h2 className="text-2xl font-semibold">No Customers Yet</h2>
            </div>
          ) : (
            <div className="max-w-full">
              <DataGrid
                className="w-full"
                rows={tableRecords}
                columns={adminCustomerTableColumn(handleDelete)}
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

      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        loader={loader}
        title="Delete Customer"
        onDeleteHandler={deleteCustomerHandler}
      />
    </div>
  );
}

export default Customers;
