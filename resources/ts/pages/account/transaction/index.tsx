import { Pagination } from "@/components/pagination";
import { Search } from "@/components/search";
import LayoutAccount from "@/layouts/account";
import { TransactionWithPaginationType } from "@/types/transaction";
import { hasAnyPermission } from "@/utils/has-permission";
import { Head, Link } from "@inertiajs/react";
import React from "react";

const AccountTransactionPage = ({
  transactions,
}: {
  transactions: TransactionWithPaginationType;
}) => {
  console.info(transactions);

  return (
    <>
      <Head>
        <title>Transactions</title>
      </Head>
      <LayoutAccount>
        <div className="row mt-5">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-9 col-12 mb-2">
                <Search URL={"/account/transactions"} />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2 mb-4">
          <div className="col-12">
            <div className="card border-0 rounded shadow-sm border-top-success">
              <div className="card-header">
                <span className="fw-bold">
                  <i className="fa fa-shopping-cart me-2"></i>Transaction
                </span>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-striped table-hovered">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: "5%" }}>
                          No
                        </th>
                        <th scope="col" style={{ width: "20%" }}>
                          Full Name
                        </th>
                        <th scope="col" style={{ width: "15%" }}>
                          Grand Total
                        </th>
                        <th scope="col" style={{ width: "20%" }}>
                          Status
                        </th>
                        <th scope="col" style={{ width: "15%" }}>
                          Created At
                        </th>
                        <th scope="col" style={{ width: "5%" }}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.data.length ? (
                        transactions.data.map((transaction, index) => (
                          <tr key={index}>
                            <td className="text-cenetr">
                              {++index +
                                (transactions.current_page - 1) *
                                  transactions.per_page}
                            </td>
                            <td>{transaction.user?.name}</td>
                            <td>{transaction.grand_total}</td>
                            <td>
                              {transaction.status == "UNPAID" && (
                                <button className="btn btn-sm btn-warning">
                                  <i className="fa fa-circle-notch fa-spin"></i>
                                  UNPAID
                                </button>
                              )}
                              {transaction.status == "PAID" && (
                                <button className="btn btn-sm btn-success">
                                  <i className="fa fa-check-circle"></i>PAID
                                </button>
                              )}
                              {transaction.status == "CANCELLED" && (
                                <button className="btn btn-sm btn-danger">
                                  <i className="fa fa-times"></i>CANCELLED
                                </button>
                              )}
                            </td>
                            <td>{transaction.created_at}</td>
                            <td className="text-center">
                              {hasAnyPermission(["transactions.show"]) && (
                                <Link
                                  href={`/account/transactions/${transaction.invoice}`}
                                  className="btn btn-dark btn-sm me-2"
                                >
                                  <i className="fa fa-list-ul"></i>
                                </Link>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="text-center" colSpan={6}>
                            No data found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <Pagination links={transactions.links} align={"end"} />
              </div>
            </div>
          </div>
        </div>
      </LayoutAccount>
    </>
  );
};

export default AccountTransactionPage;
