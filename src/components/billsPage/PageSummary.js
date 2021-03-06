import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import CardLayout from "./CardLayout";

const PageSummary = (props) => {
  //const dispatch = useDispatch();
  const monthBills = useSelector((state) => state.bills.clinicBills);
  const clinicBillsStats = getIncomeStats(monthBills);
  const dayBills = props.filterDayBills(monthBills);
  const dayBillsStats = getIncomeStats(dayBills);

  console.log(dayBills);

  return (
    <Fragment>
      <div className="row">
        <CardLayout
          class="card shadow border-left-primary"
          text={`Revenue Generated in ${props.selectedMonth}`}
          value={`₹ ${(
            clinicBillsStats.paid + clinicBillsStats.due
          ).toLocaleString()}`}
        />
        <CardLayout
          class="card shadow border-left-success"
          text={"Total Bill Generated"}
          on
          value={monthBills.length}
        />
      </div>
      <div className="row">
        <CardLayout
          class="card shadow border-left-primary"
          text={`Revenue on ${props.selectedDay} ${props.selectedMonth}`}
          value={`₹ ${(
            dayBillsStats.paid + dayBillsStats.due
          ).toLocaleString()}`}
        />
        <CardLayout
          class="card shadow border-left-success"
          text={"Total Bill Generated"}
          value={dayBills.length}
        />
      </div>
      <div className="card shadow border-left-primary">
        <div className="row">
          <CardLayout
            className=""
            text={`Revenue Generated in ${props.selectedMonth}`}
            value={`₹ ${(
              clinicBillsStats.paid + clinicBillsStats.due
            ).toLocaleString()}`}
          />
          <CardLayout
            className=""
            text={"Lab Tests"}
            value={`₹ ${clinicBillsStats.labTests.toLocaleString()}`}
          />
          <CardLayout
            className=""
            text={"Medicines"}
            value={`₹ ${clinicBillsStats.medicines.toLocaleString()}`}
          />
          <CardLayout
            className=""
            text={"Consultation"}
            value={`₹ ${clinicBillsStats.consultation.toLocaleString()}`}
          />
        </div>
      </div>
      <div className="card shadow border-left-primary">
        <div className="row">
          <CardLayout
            className=""
            text={`Revenue Generated in ${props.selectedMonth}`}
            value={`₹ ${(
              clinicBillsStats.paid + clinicBillsStats.due
            ).toLocaleString()}`}
          />
          <CardLayout
            className=""
            text={"Discount Amount"}
            value={`₹ ${clinicBillsStats.discount.toLocaleString()}`}
          />
          <CardLayout
            className=""
            text={"Amount Collected"}
            value={`₹ ${clinicBillsStats.paid.toLocaleString()}`}
          />
          <CardLayout
            className=""
            text={"Amount Due"}
            value={`₹ ${clinicBillsStats.due.toLocaleString()}`}
          />
        </div>
      </div>
      <div className="card shadow border-left-primary">
        <div className="row">
          <CardLayout
            className=""
            text={`Generated Revenue for ${props.selectedDay} ${props.selectedMonth}`}
            value={`₹ ${(
              dayBillsStats.paid + dayBillsStats.due
            ).toLocaleString()}`}
          />
          <CardLayout
            className=""
            text={"Discount"}
            value={`₹ ${dayBillsStats.discount.toLocaleString()}`}
          />
          <CardLayout
            className=""
            text={"Amount Collected"}
            value={`₹ ${dayBillsStats.paid.toLocaleString()}`}
          />
          <CardLayout
            className=""
            text={"Amount Due"}
            value={`₹ ${dayBillsStats.due.toLocaleString()}`}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default PageSummary;

const getIncomeStats = (data) => {
  const clinicStats = {
    total: 0,
    discount: 0,
    medicines: 0,
    services: 0,
    labTests: 0,
    consultation: 0,
    paid: 0,
    due: 0,
  };

  for (var i = 0; i < data.length; i++) {
    const bill = data[i].bill;
    clinicStats.total += bill.amount;
    clinicStats.discount += bill.discount;
    clinicStats.medicines += getListSum(bill.medicine_invoices);
    if (bill.service_invoices) {
      clinicStats.services += getListSum(bill.service_invoices);
    }
    if (bill.lab_invoices) {
      clinicStats.labTests += getListSum(bill.lab_invoices);
    }
    if (bill.consultation_invoices) {
      clinicStats.consultation += getListSum(bill.consultation_invoices);
    }

    if (bill.status === 2) {
      clinicStats.paid += bill.paid;
    } else if (bill.status === 3) {
      clinicStats.paid += bill.paid;
      clinicStats.due += bill.amount - bill.discount - bill.paid;
    } else {
      clinicStats.due += bill.amount - bill.discount;
    }
  }

  function getListSum(props) {
    if (props !== undefined) {
      return props.reduce((sum, x) => sum + x.amount, 0);
    } else {
      return 0;
    }
  }

  return clinicStats;
};
