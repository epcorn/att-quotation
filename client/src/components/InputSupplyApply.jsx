/* eslint-disable react/prop-types */

import { Button, Label, Select, TextInput } from "flowbite-react";

function InputSupplyApply({ type, infoObj, handleInfoChange, handleMoreInfo }) {
  return (
    <>
      <div className="col-span-3 border p-1">
        <Label>Work Area Type: </Label>
        <TextInput name="workAreaType" value={type}></TextInput>
      </div>
      <div className="col-span-3 border grid grid-cols-4 gap-1 p-1">
        <div className="col-span-2">
          <Label>Work Area: </Label>
          <TextInput
            name="workArea"
            value={infoObj.workArea}
            type="number"
            onChange={handleInfoChange}
          />
        </div>
        <div className="col-span-2">
          <Label>Work Area Unit: </Label>
          <Select
            name="workAreaUnit"
            onChange={handleInfoChange}
            value={infoObj.workAreaUnit}
          >
            <option></option>
            <option value="Sq.fts">Sq.fts</option>
            <option value="Sq.mts">Sq.mts</option>
            <option value="R.fts">R.fts</option>
            <option value="R.mts">R.mts</option>
          </Select>
        </div>
      </div>
      <div className="col-span-3 border grid grid-cols-2 gap-1 p-1">
        <div className="col-span-1">
          <Label>Chemical Rate: </Label>
          <TextInput
            name="chemicalRate"
            value={infoObj.chemicalRate}
            onChange={handleInfoChange}
          />
        </div>
        <div className="col-span-1">
          <Label>Unit: </Label>
          <Select
            name="chemicalRateUnit"
            onChange={handleInfoChange}
            value={infoObj.chemicalRateUnit}
          >
            <option></option>
            <option value="Per Ltr.">Per Ltr.</option>
            <option value="Lumpsum">Lumpsum</option>
          </Select>
        </div>
      </div>
      <div className="col-span-3 border p-1">
        <Label>Chemical Quantity: </Label>
        <TextInput
          name="chemicalQuantity"
          value={infoObj.chemicalQuantity}
          onChange={handleInfoChange}
        ></TextInput>
      </div>
      <div className="col-span-3 border grid grid-cols-4 gap-1 p-1">
        <div className="col-span-2">
          <Label>Apply Rate: </Label>
          <TextInput
            name="applyRate"
            value={infoObj.applyRate}
            type="number"
            onChange={handleInfoChange}
          />
        </div>
        <div className="col-span-2">
          <Label>Unit: </Label>
          <Select
            name="applyRateUnit"
            onChange={handleInfoChange}
            value={infoObj.applyRateUnit}
          >
            <option></option>
            <option value="Per Sq.ft">Per Sq.ft</option>
            <option value="Per Sq.mt">Per Sq.mt</option>
            <option value="Per R.ft">Per R.ft</option>
            <option value="Per R.mt">Per R.mt</option>
            <option value="Lumpsum">Lumpsum</option>
          </Select>
        </div>
      </div>
      <div className="col-span-3 border grid grid-cols-8 p-1">
        <div className="col-span-6">
          <Label>Chemical: </Label>
          <Select
            name="chemical"
            onChange={handleInfoChange}
            value={infoObj.chemical}
          >
            <option></option>
            <option>Imidachloprid 30.5% SC</option>
            <option>Imidachloprid 30.5% SC &apos;Termida&apos;</option>
            <option>Chloropyriphos 20% EC</option>
            <option>
              Imidachloprid 30.5% SC (&quot;PREMISE&quot; - By Bayer India/ENVU)
            </option>
          </Select>
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <Button
            gradientDuoTone="purpleToPink"
            className="rounded-full"
            onClick={() => handleMoreInfo(infoObj.workAreaType)}
          >
            <span className=" font-bold">Ok</span>
          </Button>
        </div>
      </div>
    </>
  );
}

export default InputSupplyApply;
