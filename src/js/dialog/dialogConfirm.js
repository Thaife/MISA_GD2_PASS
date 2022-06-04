//Create by TVThai(25/4/2022)
//Source Dialog xác nhận xoá
const dialogConfirm = {
  remove: "Bạn có chắc muốn xoá những nhân viên này?",
  removes: (code) => {
    return `Bạn có thực sự muốn xoá nhân viên <${code}> không?`;
  },
};

export default dialogConfirm;
