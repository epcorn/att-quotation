/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import {
  Button,
  Label,
  Select,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { GiCancel } from "react-icons/gi";
import { customAlphabet } from "nanoid";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";

const nanoid = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  21
);

function InputSupplyApplyAdv({ quote, setQuote }) {
  const [validInput, setValidInput] = useState(false);
  const [infoArray, setInfoArray] = useState(quote.quoteInfo);
  const [infoObj, setInfoObj] = useState({
    _id: nanoid(),
    workAreaType: "",
    workArea: "",
    workAreaUnit: "",
    chemicalRate: "2525",
    chemicalRateUnit: "",
    chemicalQuantity: "",
    applyRate: "",
    applyRateUnit: "",
    chemical: "",
    description: "",
  });

  useEffect(() => {
    setInfoArray(quote.quoteInfo);
  }, [quote.quoteInfo]);
  useEffect(() => {
    if (
      infoObj.workAreaType !== "" &&
      infoObj.workArea !== "" &&
      infoObj.chemicalRate !== "" &&
      infoObj.chemicalQuantity !== "" &&
      infoObj.applyRate !== "" &&
      infoObj.chemical !== ""
    ) {
      setValidInput(true);
    } else {
      setValidInput(false);
    }
  }, [
    infoObj.workAreaType,
    infoObj.workArea,
    infoObj.workAreaUnit,
    infoObj.chemicalRate,
    infoObj.chemicalRateUnit,
    infoObj.chemicalQuantity,
    infoObj.applyRate,
    infoObj.applyRateUnit,
    infoObj.chemical,
  ]);

  function handleInfoChange(e) {
    const { name, value } = e.target;
    setInfoObj((prev) => ({ ...prev, [name]: value }));
  }

  function deleteInfo(id) {
    setInfoArray((prev) => prev.filter((info) => info._id !== id));
  }

  function editInfo(id) {
    const info = infoArray.find((el) => el._id === id);
    setInfoObj(info);
    setInfoArray((prev) => prev.filter((info) => info._id !== id));
  }

  function moreInfo() {
    if (
      infoObj.workAreaType !== "" &&
      infoObj.workArea !== "" &&
      infoObj.chemicalRate !== "" &&
      infoObj.chemicalQuantity !== "" &&
      infoObj.applyRate !== "" &&
      infoObj.chemical !== ""
    ) {
      setInfoArray((prevArray) => [...prevArray, infoObj]);
      setInfoObj({
        _id: nanoid(),
        workAreaType: "",
        workArea: "",
        workAreaUnit: "",
        chemicalRate: "2525",
        chemicalRateUnit: "",
        chemicalQuantity: "",
        applyRate: "",
        applyRateUnit: "",
        chemical: "",
        description: "",
      });
    } else {
      return toast.error("This much info is not sufficient.");
    }
  }

  useEffect(() => {
    setQuote((prev) => ({
      ...prev,
      quoteInfo: infoArray,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoArray]);
  useEffect(() => {
    let newApplyRateUnit = "";

    switch (infoObj.workAreaUnit) {
      case "Sq.fts":
        newApplyRateUnit = "Per Sq.ft";
        break;
      case "Sq.mts":
        newApplyRateUnit = "Per Sq.mt";
        break;
      case "R.fts":
        newApplyRateUnit = "Per R.ft";
        break;
      case "R.mts":
        newApplyRateUnit = "Per R.mt";
        break;
      default:
        newApplyRateUnit = "";
    }

    setInfoObj((prevInfoObj) => ({
      ...prevInfoObj,
      applyRateUnit: newApplyRateUnit,
    }));
  }, [infoObj.workAreaUnit]);

  useEffect(() => {
    let newApplyRateUnit = "";
    switch (infoObj.chemicalRateUnit) {
      case "Lumpsum":
        newApplyRateUnit = "Lumpsum";
        break;
      default:
        newApplyRateUnit = infoObj.applyRateUnit;
    }
    setInfoObj((prevInfoObj) => ({
      ...prevInfoObj,
      applyRateUnit: newApplyRateUnit,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoObj.chemicalRateUnit]);

  return (
    <div className="bg-blue-200 p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        <div className="border border-blue-400 p-3 rounded bg-blue-100">
          <Label className="text-blue-700">Work Area Type: </Label>
          <Select
            name="workAreaType"
            onChange={handleInfoChange}
            value={infoObj.workAreaType}
            className="bg-blue-100 border-blue-400 focus:border-blue-600 focus:ring-blue-600"
          >
            <option value=""></option>
            <option>Basement Area</option>
            <option>Retaining Wall</option>
            <option>Raft</option>
            <option>Plinth</option>
            <option>Periphery</option>
            <option>Floor</option>
            <option>Basement Area (Horizontal)</option>
            <option>Basement Area (Vertical)</option>
          </Select>
        </div>
        <div className="border border-blue-400 p-3 rounded bg-blue-100">
          <Label className="text-blue-700">Work Area: </Label>
          <div className="flex gap-2">
            <TextInput
              name="workArea"
              value={infoObj.workArea}
              onChange={handleInfoChange}
              className="flex-1 bg-blue-100 border-blue-400 focus:border-blue-600 focus:ring-blue-600"
            />
            <Select
              name="workAreaUnit"
              onChange={handleInfoChange}
              value={infoObj.workAreaUnit}
              className="flex-1 bg-blue-100 border-blue-400 focus:border-blue-600 focus:ring-blue-600"
            >
              <option value=""></option>
              <option value="Sq.fts">Sq.fts</option>
              <option value="Sq.mts">Sq.mts</option>
              <option value="R.fts">R.fts</option>
              <option value="R.mts">R.mts</option>
            </Select>
          </div>
        </div>
        <div className="border border-blue-400 p-3 rounded bg-blue-100">
          <Label className="text-blue-700">Apply Rate: </Label>
          <div className="flex gap-2">
            <TextInput
              name="applyRate"
              value={infoObj.applyRate}
              onChange={handleInfoChange}
              className="flex-1 bg-blue-100 border-blue-400 focus:border-blue-600 focus:ring-blue-600"
            />
            <Select
              name="applyRateUnit"
              onChange={handleInfoChange}
              value={infoObj.applyRateUnit}
              className="flex-1 bg-blue-100 border-blue-400 focus:border-blue-600 focus:ring-blue-600"
            >
              <option value=""></option>
              <option value="Per Sq.ft">Per Sq.ft</option>
              <option value="Per Sq.mt">Per Sq.mt</option>
              <option value="Per R.ft">Per R.ft</option>
              <option value="Per R.mt">Per R.mt</option>
              <option value="Lumpsum">Lumpsum</option>
            </Select>
          </div>
        </div>
        <div className="border border-blue-400 p-3 rounded bg-blue-100">
          <Label className="text-blue-700">Chemical Quantity: </Label>
          <TextInput
            name="chemicalQuantity"
            value={infoObj.chemicalQuantity}
            onChange={handleInfoChange}
            className="bg-blue-100 border-blue-400 focus:border-blue-600 focus:ring-blue-600"
          />
        </div>
        <div className="border border-blue-400 p-3 rounded bg-blue-100">
          <Label className="text-blue-700">Chemical Rate: </Label>
          <div className="flex gap-2">
            <TextInput
              name="chemicalRate"
              value={infoObj.chemicalRate}
              onChange={handleInfoChange}
              className="flex-1 bg-blue-100 border-blue-400 focus:border-blue-600 focus:ring-blue-600"
            />
            <Select
              name="chemicalRateUnit"
              onChange={handleInfoChange}
              value={infoObj.chemicalRateUnit}
              className="flex-1 bg-blue-100 border-blue-400 focus:border-blue-600 focus:ring-blue-600"
            >
              <option value=""></option>
              <option value="Per Ltr.">Per Ltr.</option>
              <option value="Lumpsum">Lumpsum</option>
            </Select>
          </div>
        </div>
        <div className=" bg-blue-200 col-span-full md:col-span-3 grid grid-cols-12 gap-4 mb-4">
          <div className="border border-blue-400 p-3 rounded bg-blue-100 col-span-full md:col-span-8">
            <Label className="text-blue-700">Description: </Label>
            <div className="flex gap-2 items-center justify-center">
              <Textarea
                name="description"
                onChange={handleInfoChange}
                value={infoObj.description}
                className="flex-1 border-blue-400 focus:border-blue-600 focus:ring-blue-600 bg-white text-gray-900 focus:outline-none focus:ring-2 "
              ></Textarea>
            </div>
          </div>
          <div className="border border-blue-400 p-3 rounded bg-blue-100 col-span-full md:col-span-4">
            <Label className="text-blue-700">Chemical: </Label>
            <div className="flex gap-2 items-center justify-center">
              <Select
                name="chemical"
                onChange={handleInfoChange}
                value={infoObj.chemical}
                className="flex-1 bg-blue-100 border-blue-400 focus:border-blue-600 focus:ring-blue-600"
              >
                <option value=""></option>
                <option>Imidachloprid 30.5% SC</option>
                <option>Imidachloprid 30.5% SC 'Termida'</option>
                <option>Chloropyriphos 20% EC</option>
                <option>
                  Imidachloprid 30.5% SC ("PREMISE" - By Bayer India/ENVU)
                </option>
              </Select>
              <Button
                onClick={moreInfo}
                color={validInput ? "blue" : "failure"}
                className="border flex items-center justify-center w-7 h-7"
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table hoverable={true} className="w-full">
          <Table.Head className="bg-blue-200">
            <Table.HeadCell className="text-blue-700">Sr.No</Table.HeadCell>
            <Table.HeadCell className="text-blue-700">
              Work Area Type
            </Table.HeadCell>
            <Table.HeadCell className="text-blue-700">Work Area</Table.HeadCell>
            <Table.HeadCell className="text-blue-700">
              Work Area Unit
            </Table.HeadCell>
            <Table.HeadCell className="text-blue-700">
              Apply Rate
            </Table.HeadCell>
            <Table.HeadCell className="text-blue-700">
              Apply Rate Unit
            </Table.HeadCell>
            <Table.HeadCell className="text-blue-700">
              Chemical Quantity
            </Table.HeadCell>
            <Table.HeadCell className="text-blue-700">
              Chemical Rate
            </Table.HeadCell>
            <Table.HeadCell className="text-blue-700">
              Chemical Rate Unit
            </Table.HeadCell>
            <Table.HeadCell className="text-blue-700">Chemical</Table.HeadCell>
            <Table.HeadCell className="text-blue-700">Delete</Table.HeadCell>
            <Table.HeadCell className="text-blue-700">Edit</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-blue-200">
            {infoArray.length > 0 &&
              infoArray.map((info, idx) => (
                <Table.Row
                  key={info._id}
                  className="bg-blue-100 hover:bg-blue-200"
                >
                  <Table.Cell>{idx + 1}</Table.Cell>
                  <Table.Cell>{info.workAreaType}</Table.Cell>
                  <Table.Cell>{info.workArea}</Table.Cell>
                  <Table.Cell>{info.workAreaUnit}</Table.Cell>
                  <Table.Cell>{info.applyRate}</Table.Cell>
                  <Table.Cell>{info.applyRateUnit}</Table.Cell>
                  <Table.Cell>{info.chemicalQuantity}</Table.Cell>
                  <Table.Cell>{info.chemicalRate}</Table.Cell>
                  <Table.Cell>{info.chemicalRateUnit}</Table.Cell>
                  <Table.Cell>{info.chemical}</Table.Cell>
                  <Table.Cell>
                    <button
                      className="bg-red-500 rounded-full hover:bg-red-700 text-white p-1"
                      onClick={() => deleteInfo(info._id)}
                    >
                      <GiCancel className="w-5 h-5" />
                    </button>
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      className="bg-green-500 hover:bg-green-700 rounded-full text-white p-1"
                      onClick={() => editInfo(info._id)}
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default InputSupplyApplyAdv;
