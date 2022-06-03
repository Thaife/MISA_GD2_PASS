import loading from "./modules/loading";
import employees from "./modules/employees";
// import popupDetails from "./modules/popupDetails";
import dialog from "./modules/dialog";
import toastMess from "./modules/toastMess";
import exportExc from "./modules/exportExc";
import transaction from "./modules/cash/transaction";
import modified from "./modules/cash/modified";
import displayFieldTransaction from "./modules/cash/displayFieldTransaction";
import displayFieldVendor from "./modules/cash/displayFieldVendor";
import entity from "./modules/cash/accountObject";
import bankAccount from "./modules/cash/bankAccount";
import currency from "./modules/cash/currency";
import contactPronoun from "./modules/cash/contactPronoun";
import rule from "./modules/cash/rule";
import employeeCash from "./modules/cash/employeeCash";
import vendor from "./modules/cash/vendor";
import vendorGroup from "./modules/cash/vendorGroup";
import paging from "./modules/paging";
import location from "./modules/location";
import validatePopup from "./modules/base/validatePopup";

import baseTitle from "./modules/base/baseTitle";

// import baseCbbDropDown from "./modules/cash/baseCbbDropDown";

import { createStore } from "vuex";

export default createStore({
  modules: {
    employees,
    // popupDetails,
    dialog,
    loading,
    toastMess,
    exportExc,
    transaction,
    modified,
    displayFieldTransaction,
    displayFieldVendor,
    entity,
    bankAccount,
    currency,
    employeeCash,
    vendor,
    vendorGroup,
    baseTitle,
    contactPronoun,
    rule,
    paging,
    location,
    validatePopup,
  },
});
