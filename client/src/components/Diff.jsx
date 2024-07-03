import { useDispatch } from "react-redux";
import { archiveData } from "../redux/quote/quoteSlice";
import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { diff } from "deep-object-diff";
import RevisionHistoryCard from "./RevisionHistoryCard";

// eslint-disable-next-line react/prop-types
function Diff({ quoteId }) {
  const dispatch = useDispatch();
  const [latest, setLatest] = useState({});
  const [archive, setArchive] = useState([]);
  useEffect(() => {
    (async () => {
      const resultAction = await dispatch(archiveData(quoteId));
      const result = unwrapResult(resultAction);
      const { archive, ...rest } = result.result;
      setLatest(rest);
      setArchive(archive?.revisions);
    })();
  }, [dispatch, quoteId]);

  useEffect(() => {
    if (archive?.length > 0) {
      const modifiedKeys = getModifiedKeys(archive[0].state, latest);
      console.log(modifiedKeys);
    }
  }, [latest, archive]);
  function getModifiedKeys(oldObj, newObj) {
    const difference = diff(oldObj, newObj);
    return Object.keys(difference);
  }
  return (
    <div className="container mx-auto p-4">
      {/* Quotation Header */}
      <div className="bg-gray-200 p-4 rounded-t-lg">
        <h1 className="text-xl font-bold">
          Quotation No: {latest?.quotationNo}
        </h1>
        <p className="text-gray-600">
          Date: {new Date(latest?.quotationDate).toLocaleDateString("en-GB")}
        </p>
        <p className="text-gray-600">Subject: {latest?.subject}</p>
      </div>

      {/* Company & Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-semibold">Bill To:</h2>
          <p>
            {latest?.billToAddress?.prefix} {latest?.billToAddress?.name}
          </p>
          <p>
            {latest?.billToAddress?.a1}, {latest?.billToAddress?.a2}
          </p>
          <p>
            {latest?.billToAddress?.a3}, {latest?.billToAddress?.a4}
          </p>
          <p>
            {latest?.billToAddress?.a5}, {latest?.billToAddress?.city},{" "}
            {latest?.billToAddress?.pincode}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Ship To:</h2>
          <p>{latest?.shipToAddress?.projectName}</p>
          <p>
            {latest?.shipToAddress?.a1}, {latest?.shipToAddress?.a2}
          </p>
          <p>
            {latest?.shipToAddress?.a3}, {latest?.shipToAddress?.a4}
          </p>
          <p>
            {latest?.shipToAddress?.a5}, {latest?.shipToAddress?.city},{" "}
            {latest?.shipToAddress?.pincode}
          </p>
        </div>
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold">Kind Attention:</h2>
          <p>
            {latest?.kindAttentionPrefix} {latest?.kindAttention}
          </p>
          <p>Reference: {latest?.reference}</p>
        </div>
      </div>

      {/* Treatment & Specification Details */}
      <div className="bg-white p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Treatment Type:</h2>
        <p>{latest?.treatmentType}</p>
        <h2 className="text-lg font-semibold mt-4">Specification:</h2>
        <p>{latest?.specification}</p>
        <h2 className="text-lg font-semibold mt-4">Equipments:</h2>
        <p>{latest?.equipments}</p>
      </div>

      {/* Payment & Taxation Information */}
      <div className="bg-white p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Payment Terms:</h2>
        <p>{latest?.paymentTerms}</p>
        <h2 className="text-lg font-semibold mt-4">Taxation:</h2>
        <p>{latest?.taxation}</p>
      </div>

      {/* Quotation Details Table */}
      <div className="bg-white p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Quotation Details:</h2>
        <table className="w-full table-auto mt-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Work Area Type</th>
              <th className="border px-4 py-2">Work Area</th>
              <th className="border px-4 py-2">Chemical Rate</th>
              <th className="border px-4 py-2">Service Rate</th>
              <th className="border px-4 py-2">Apply Rate</th>
              <th className="border px-4 py-2">Chemical</th>
              <th className="border px-4 py-2">Chemical Quantity</th>
            </tr>
          </thead>
          <tbody>
            {latest?.quoteInfo?.map((info, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{info.workAreaType}</td>
                <td className="border px-4 py-2">
                  {info.workArea} {info.workAreaUnit}
                </td>
                <td className="border px-4 py-2">
                  {info.chemicalRate
                    ? `${info.chemicalRate} ${info.chemicalRateUnit}`
                    : "-"}
                </td>
                <td className="border px-4 py-2">
                  {info.serviceRate
                    ? `${info.serviceRate} ${info.serviceRateUnit}`
                    : "-"}
                </td>
                <td className="border px-4 py-2">
                  {info.applyRate
                    ? `${info.applyRate} ${info.applyRateUnit}`
                    : "-"}
                </td>
                <td className="border px-4 py-2">{info.chemical}</td>
                <td className="border px-4 py-2">
                  {info.chemicalQuantity || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="bg-gray-200 p-4 rounded-b-lg flex justify-between items-center">
        <div>
          <p>
            Created By: {latest?.salesPerson?.prefix}{" "}
            {latest?.salesPerson?.username} ({latest?.salesPerson?.initials})
          </p>
        </div>
        <div>
          <p>Approved: {latest?.approved ? "✓" : "✗"}</p>
        </div>
      </div>

      {/* Revision History Section */}
      <div className="bg-white p-4 mt-4">
        <h2 className="text-lg font-semibold">Revision History:</h2>
        <div className="mt-2 flex items-center justify-center flex-wrap gap-4">
          {archive?.map((revision, index) => (
            <RevisionHistoryCard key={index} revision={revision} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Diff;
