<template>
  <div class="popup__details__wrap" v-show="isShowPopupDetails">
    <div class="popup__details" id="popupDetails">
      <div class="help__close">
        <div class="help"></div>
        <div class="close" @click="handleClickClosePopup"></div>
      </div>
      <div class="header">
        <h3>Thông tin nhân viên</h3>
        <div class="customer-checkbox">
          <BaseCheckbox
            width="18px"
            height="18px"
            v-model="employee.Customer"
            :tabIndex="17"
          />
          <span>Là khách hàng</span>
        </div>
        <div class="producer-checkbox">
          <BaseCheckbox
            width="18px"
            height="18px"
            v-model="employee.Producer"
            :tabIndex="18"
          />
          <span>Là nhà cung cấp</span>
        </div>
      </div>
      <div class="popup__details__container">
        <div ref="firstFocus" tabindex="1"></div>
        <div
          :class="[
            'popup__details__input__wrap',
            'c-2',
            { warring: validates.EmployeeCode },
          ]"
        >
          <div class="popup__input__title">
            Mã
            <div class="notEmpty">*</div>
          </div>
          <BaseInput
            v-model="employee.EmployeeCode"
            field="EmployeeCode"
            width="100%"
            height="32px"
            placehoder=""
            :autofocus="true"
            :search="false"
            :tabIndex="2"
          />
        </div>

        <div
          :class="[
            'popup__details__input__wrap',
            'c-4',
            'padd-l-6',
            'padd-r-26',
            { warring: validates.FullName },
          ]"
        >
          <div class="popup__input__title">
            Tên
            <div class="notEmpty">*</div>
          </div>
          <BaseInput
            v-model="employee.FullName"
            field="FullName"
            type="text"
            width="100%"
            height="32px"
            placehoder=""
            :search="false"
            :tabIndex="2"
          />
        </div>
        <div
          :class="[
            'popup__details__input__wrap',
            'c-2_5',

            { warring: validates.DateOfBirth },
          ]"
        >
          <div class="popup__input__title">Ngày sinh</div>
          <BaseInput
            v-model="employee.DateOfBirth"
            field="DateOfBirth"
            type="date"
            width="100%"
            height="32px"
            placehoder=""
            :search="false"
            :tabIndex="3"
          />
        </div>
        <div class="popup__details__input__wrap c-3_5 padd-0-16-0-16">
          <div class="popup__input__title">Giới tính</div>
          <v-radio-group :row="true" mandatory v-model="gender">
            <v-radio
              label="Nam"
              value="1"
              color="green"
              :tabIndex="4"
            ></v-radio>
            <v-radio label="Nữ" value="0" color="green" :tabIndex="4"></v-radio>
            <v-radio
              label="Khác"
              value="2"
              color="green"
              :tabIndex="4"
            ></v-radio>
          </v-radio-group>
        </div>
        <div
          :class="[
            'popup__details__input__wrap',
            'c-6',
            'padd-r-26',
            { warring__unit: validates.Unit },
          ]"
          ref="unitCbb"
        >
          <div :class="['popup__input__title', { warring: validates.Unit }]">
            Đơn vị
            <div class="notEmpty">*</div>
          </div>
          <v-combobox
            :items="units"
            item-text="UnitName"
            v-model="un_selected"
            color="green"
            @focus="handleFocusUnitCombobox"
            return-object
            :tabIndex="5"
          ></v-combobox>
        </div>
        <div class="popup__details__input__wrap c-3_5 padd-r-6">
          <div class="popup__input__title" title="Số chứng minh nhân dân">
            Số CMND
          </div>
          <BaseInput
            v-model="employee.IdentityCard"
            type="text"
            width="100%"
            height="32px"
            placehoder=""
            :search="false"
            :tabIndex="6"
          />
        </div>
        <div
          :class="[
            'popup__details__input__wrap',
            'c-2_5',
            'padd-r-20',
            { warring: validates.DateOfIdentityCard },
          ]"
        >
          <div class="popup__input__title">Ngày cấp</div>
          <BaseInput
            v-model="employee.DateOfIdentityCard"
            field="DateOfIdentityCard"
            type="date"
            width="100%"
            height="32px"
            placehoder=""
            :search="false"
            :tabIndex="7"
          />
        </div>
        <div class="popup__details__input__wrap c-6 padd-r-26">
          <div class="popup__input__title">Chức danh</div>
          <BaseInput
            v-model="employee.Position"
            type="text"
            width="100%"
            height="32px"
            placehoder=""
            :search="false"
            :tabIndex="8"
          />
        </div>
        <div class="popup__details__input__wrap c-6 padd-r-20">
          <div class="popup__input__title">Nơi cấp</div>
          <BaseInput
            v-model="employee.PlaceOfIdentityCard"
            type="text"
            width="100%"
            height="32px"
            placehoder=""
            :search="false"
            :tabIndex="9"
          />
        </div>
        <div class="popup__details__input__wrap c-12 padd-r-20 padd-top-20">
          <div class="popup__input__title">Địa chỉ</div>
          <BaseInput
            v-model="employee.Address"
            type="text"
            width="100%"
            height="32px"
            placehoder=""
            :search="false"
            :tabIndex="10"
          />
        </div>
        <div
          :class="[
            'popup__details__input__wrap',
            'c-3',
            'padd-r-6',
            { warring: validates.PhoneNumber },
          ]"
        >
          <div class="popup__input__title">ĐT di động</div>
          <BaseInput
            v-model="employee.PhoneNumber"
            field="PhoneNumber"
            type="text"
            width="100%"
            height="32px"
            placehoder=""
            :search="false"
            :tabIndex="11"
          />
        </div>
        <div class="popup__details__input__wrap c-3 padd-r-6">
          <div class="popup__input__title">ĐT cố định</div>
          <BaseInput
            v-model="employee.Landline"
            field="Landline"
            type="text"
            width="100%"
            height="32px"
            placehoder=""
            :search="false"
            :tabIndex="12"
          />
        </div>
        <div
          :class="[
            'popup__details__input__wrap',
            'c-3',
            'padd-r-20',
            { warring: validates.Email },
          ]"
        >
          <div class="popup__input__title">Email</div>
          <BaseInput
            v-model="employee.Email"
            field="Email"
            type="text"
            width="100%"
            height="32px"
            placehoder=""
            :search="false"
            :tabIndex="13"
          />
        </div>
        <div class="c-3"></div>
        <div class="popup__details__input__wrap c-3 padd-r-6">
          <div class="popup__input__title">Tài khoản ngân hàng</div>
          <BaseInput
            v-model="employee.BankNumber"
            type="text"
            width="100%"
            height="32px"
            placehoder=""
            :search="false"
            :tabIndex="14"
          />
        </div>
        <div class="popup__details__input__wrap c-3 padd-r-6">
          <div class="popup__input__title">Tên ngân hàng</div>
          <BaseInput
            v-model="employee.BankName"
            type="text"
            width="100%"
            height="32px"
            placehoder=""
            :search="false"
            :tabIndex="15"
          />
        </div>
        <div class="popup__details__input__wrap c-3 padd-r-20">
          <div class="popup__input__title">Chi nhánh</div>
          <BaseInput
            v-model="employee.BankBranch"
            type="text"
            width="100%"
            height="32px"
            placehoder=""
            :search="false"
            :tabIndex="16"
          />
        </div>
        <div class="c-3"></div>
      </div>
      <div class="popup__details__bottom">
        <div class="left">
          <div @click="handleClickClosePopup">
            <BaseButton
              text="Huỷ"
              height="32px"
              :tabIndex="18"
              @handleKeyDown="handleClickClosePopup"
            />
          </div>
        </div>
        <div class="right">
          <div class="popup-btn-wrap" @click="handleStore">
            <BaseButton
              text="Cất"
              height="32px"
              :tabIndex="19"
              @handleKeyDown="handleStore"
            />
          </div>
          <div class="popup-btn-wrap" @click="handleStoreAndAdd">
            <BaseButton
              text="Cất và Thêm"
              height="32px"
              mainType="true"
              :tabIndex="20"
              @handleKeyDown="handleStoreAndAdd"
              @handlePrevFocus="handlePrevFocus"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCheckbox from "../components/base/BaseCheckbox.vue";
import BaseInput from "../components/base/BaseInput.vue";
import BaseButton from "../components/base/BaseButton.vue";
import helper from "@/js/utils.js";
import DialogError from "../js/dialog/dialogError";
import DialogQuestion from "../js/dialog/dialogQuestion";
import FormMode from "../js/formMode";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "popup-details",
  components: {
    BaseCheckbox,
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      employee: {},
      listUnits: [],
      unitName: "",
      un_selected: null,

      gender: 1,
    };
  },
  computed: {
    ...mapGetters([
      "isShowPopupDetails",
      "modeStore",
      "i_employee",
      "employeeIdUpdate",
      "errMessage",
      "validates",
      "newCode",
      "employeeCheckChanged",
    ]),
  },
  watch: {
    //theo dõi text ở input combobox thay đổi
    //Nếu text k math vs bất kỳ giá trị nào của option combobox thì đặt về null
    un_selected(value) {
      if (value && typeof value == "object") {
        this.employee.UnitId = value.UnitId;
        this.SET_UNIT_SELECTED(value);
      } else {
        this.employee.UnitId = null;
      }
    },
    //bind giá trị vào employee.Gender mỗi khi gender(trong data) thay đổi
    gender(value) {
      this.employee.Gender = value;
    },
    unitSelected(value) {
      this.un_selected = value;
    },

    //Mỗi khi object employee thay đổi => bind giá trị mặc định là nam(1) cho thuộc tính gender
    employee(value) {
      if (!value.Gender) {
        this.gender = "1";
      }
    },

    //employee(trong data) đang phụ thuộc vào i_employee trong store
    i_employee(value) {
      this.employee = { ...value };
      //chuyển kiểu dữ liệu gender(int) sang string
      this.gender = `${value.Gender}`;
    },

    //Xử lý khi hiện hoặc ẩn form nhân viên
    isShowPopupDetails(value) {
      if (value) {
        //Nếu không ở trạng thái update => get mã nhân viên mới
        if (!this.employeeIdUpdate) {
          this.getNewCode();
        } else {
          this.SET_EMPLOYEE_CHECK_CHANGED(this.employee);
        }
        //
        // if (this.modeStore == 2) {
        //   this.SET_EMPLOYEE_CHECK_CHANGED(this.employee);
        // }
        //Nếu popup bị tắt
      } else {
        //reset lại các giá trị dưới đây
        //combobox
        this.SET_UNIT_SELECTED(null);
        //các id được chọn để chỉnh sửa hoặc nhân bản
        this.SET_EMPLOYEEID_UPDATE(null);
        this.SET_EMPLOYEE_REPLICA(null);
        //giá trị mã tự sinh
        this.SET_NEW_CODE(null);
        //object chứa các thông tin lỗi khi validate
        this.SET_VALIDATES({});
        //object model với form
        this.employee = {};
        //gender model với form
        this.gender = null;

        //Đổi lại trạng thái về mặc định (Thêm)
        this.SET_MODE_STORE(FormMode.post);
      }
    },
  },
  created() {},
  mounted() {
    helper.draggable("#popupDetails");
  },
  methods: {
    ...mapActions(["getNewCode", "addEmployee", "addEmployeeAndGet"]),
    ...mapMutations([
      "SET_ISSHOW_POPUP_DETAILS",
      "SET_ISSHOW_DIALOG_ERR",
      "SET_ISSHOW_DIALOG_QUESTION",
      "SET_VALIDATES",
      "SET_EMPLOYEEID_UPDATE",
      "SET_EMPLOYEE_REPLICA",
      "SET_EMPLOYEE_CHECK_CHANGED",
      "SET_ERR_MESSAGE",
      "SET_NEW_CODE",
      "SET_UNIT_SELECTED",
      "SET_MODE_STORE",
      "SET_EMPLOYEE",
    ]),
    //hàm validate dữ liệu, đối số là object employee
    validate(employee) {
      //Định dạng giá trị giới tính
      employee.Gender = parseInt(employee.Gender);
      //Kiểm tra đơn vị không được trống
      if (!employee.EmployeeCode) {
        this.SET_VALIDATES({
          EmployeeCode: true,
          EmployeeCodeTitle: DialogError.emptyCode,
        });
        // this.validates.EmployeeCode = true;
        // this.validates.EmployeeCodeTitle = "Mã nhân viên không được để trống.";
        this.SET_ERR_MESSAGE(DialogError.emptyCode);
        return false;
      } else {
        const regex = /^((\bNV-))\d[0-9]+$/;
        if (!regex.test(employee.EmployeeCode)) {
          this.SET_VALIDATES({
            EmployeeCode: true,
            EmployeeCodeTitle: DialogError.formatCode,
          });
          // this.validates.EmployeeCode = true;
          // this.validates.EmployeeCodeTitle = "Mã nhân viên không được để trống.";
          this.SET_ERR_MESSAGE(DialogError.formatCode);
          return false;
        }
      }
      //Kiểm tra tên không được trống và phải đúng định dạng
      if (!employee.FullName) {
        // this.validates.FullName = true;
        // this.validates.FullNameTitle = "Họ tên không được để trống.";
        this.SET_VALIDATES({
          FullName: true,
          FullNameTile: DialogError.emptyName,
        });
        this.SET_ERR_MESSAGE(DialogError.emptyName);
        return false;
      } else {
        const nameRegex = /[0-9.-]/;
        if (nameRegex.test(employee.FullName)) {
          // this.validates.FullName = true;
          // this.validates.FullNameTitle = "Họ tên không hợp lệ.";
          this.SET_VALIDATES({
            FullName: true,
            FullNameTile: DialogError.formatName,
          });
          this.SET_ERR_MESSAGE(DialogError.formatName);
          return false;
        }
      }
      //Kiểm tra ngày nghỉ việc có lớn hơn ngày hiện tại k
      if (employee.DateOfBirth) {
        var dateOfBirth = new Date(employee.DateOfBirth);
        if (dateOfBirth > new Date()) {
          // this.validates.DateOfBirth = true;
          // this.validates.DateOfBirthTitle =
          //   "Ngày sinh được lớn hơn ngày hiện tại.";
          this.SET_VALIDATES({
            DateOfBirth: true,
            DateOfBirthTitle: DialogError.dateOfBirth,
          });
          this.SET_ERR_MESSAGE(DialogError.dateOfBirth);
          return false;
        }
      }
      //Kiểm tra đơn vị không được trống
      if (!employee.UnitId) {
        // this.validates.Unit = true;
        // this.validates.UnitTitle = "Đơn vị không được để trống.";
        this.SET_VALIDATES({
          Unit: true,
          UnitTile: DialogError.emptyUnit,
        });
        this.SET_ERR_MESSAGE(DialogError.emptyUnit);
        return false;
      }
      //Kiểm tra số điện thoại đúng định dạng của VietNam k
      if (employee.PhoneNumber) {
        const phoneNbRegex = /(84|0[3|5|7|8|9])+([0-9]{8})/;
        if (!phoneNbRegex.test(employee.PhoneNumber)) {
          // this.validates.Phone = true;
          // this.validates.PhoneTitle = "Số điện thoại sai định dạng.";
          this.SET_VALIDATES({
            PhoneNumber: true,
            PhoneNumberTile: DialogError.PhoneNumber,
          });
          this.SET_ERR_MESSAGE(DialogError.PhoneNumber);
          return false;
        }
      }
      //Kiểm tra Email đúng định dạng k
      if (employee.Email) {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
        if (!emailRegex.test(employee.Email)) {
          // this.validates.Email = true;
          // this.validates.EmailTitle = "Email sai định dạng.";
          this.SET_ERR_MESSAGE(DialogError.formatMail);
          this.SET_VALIDATES({
            Email: true,
            EmailTile: DialogError.formatMail,
          });
          return false;
        }
      }
      //Kiểm tra ngày nghỉ việc có lớn hơn ngày hiện tại k
      if (employee.DateOfIdentityCard) {
        var dateIdentityCard = new Date(employee.DateOfIdentityCard);
        if (dateIdentityCard > new Date()) {
          // this.validates.DateIdentityCard = true;
          // this.validates.DateIdentityCard =
          //   "Ngày cấp không được lớn hơn ngày hiện tại.";
          this.SET_VALIDATES({
            DateOfIdentityCard: true,
            DateOfIdentityCardTile: DialogError.dateOfIdentityCard,
          });
          this.SET_ERR_MESSAGE(DialogError.dateOfIdentityCard);
          return false;
        }
      }
      //Trả về true nếu validate thành công
      return true;
    },
    //hàm format lại date thành yy-mm-dd => execute sql
    formatDate(dateTime) {
      if (dateTime) {
        var date = new Date(dateTime);
        if (!isNaN(date.getTime())) {
          // Months use 0 index.
          return (
            date.getFullYear() +
            "-" +
            (date.getMonth() < 9
              ? "0" + (date.getMonth() + 1)
              : date.getMonth() + 1) +
            "-" +
            (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
          );
        }
      }
      return null;
    },
    //Xử lý cất
    handleStore() {
      //Nếu validate dữ liệu thành công => thêm và tắt form
      if (this.validate(this.employee)) {
        this.addEmployee(this.employee);
        //Hiển thị dialog lỗi nếu validate thất bại
      } else {
        //xử lý báo lỗi
        this.SET_ISSHOW_DIALOG_ERR({ isShow: "true", mess: this.errMessage });
      }
    },
    //Xử lý cất và thêm
    handleStoreAndAdd() {
      //Nếu validate dữ liệu thành công => thêm và lấy mã mới
      if (this.validate(this.employee)) {
        this.addEmployeeAndGet(this.employee);
        //Hiển thị dialog lỗi nếu validate thất bại
      } else {
        this.SET_ISSHOW_DIALOG_ERR({ isShow: "true", mess: this.errMessage });
      }
    },
    //bỏ trạng thái error khi focus vào combobox unit
    handleFocusUnitCombobox() {
      this.$refs.unitCbb.classList.remove("warring__unit");
      this.SET_VALIDATES({});
    },

    handlePrevFocus() {
      console.log(this.$refs.firstFocus);
      this.$refs.firstFocus.focus();
    },

    //Xử lý đóng popup
    handleClickClosePopup() {
      //Nếu ở trạng thái sửa, thay đổi dữ liệu => hiển thị thông báo
      //eles đóng form
      if (this.modeStore == 2) {
        this.employee.Gender = parseInt(this.employee.Gender);
        let { GenderName, UnitName, ...newEmployeeChecked } =
          this.employeeCheckChanged;
        let {
          GenderName: GenderName_employee,
          UnitName: UnitName_employee,
          ...newEmployee
        } = this.employee;

        //Không consolog
        const m_temp = 1;
        if (m_temp == 2) {
          console.log(
            GenderName,
            UnitName,
            GenderName_employee,
            UnitName_employee
          );
        }

        //Format lại dữ lại kiểu date để so sánh
        newEmployeeChecked.DateOfBirth = this.formatDate(
          newEmployeeChecked.DateOfBirth
        );
        newEmployeeChecked.DateOfIdentityCard = this.formatDate(
          newEmployeeChecked.DateOfIdentityCard
        );

        //chuyển 2 object thành array => lặp để kiểm tra thay đổi
        newEmployee = Object.values(newEmployee);
        newEmployeeChecked = Object.values(newEmployeeChecked);
        let isChanged = false;
        //Check thay đổi
        for (let i = 0; i < newEmployee.length; i++) {
          let variable_1 = newEmployee[i],
            variable_2 = newEmployeeChecked[i];
          if (typeof variable_1 == "string" || typeof variable_2 == "string") {
            variable_1 = variable_1 ? variable_1.trim() : "";
            variable_2 = variable_2 ? variable_2.trim() : "";
          }
          if (variable_1 !== variable_2) {
            isChanged = true;
          }
        }
        if (isChanged) {
          //bind vào i_employee vuex để xử lý bên dialog
          this.SET_EMPLOYEE(this.employee);
          this.SET_ISSHOW_DIALOG_QUESTION({
            isShow: true,
            mess: DialogQuestion.confirmChanged,
          });
        } else {
          this.SET_ISSHOW_POPUP_DETAILS(false);
        }
      } else {
        // this.addEmployeeAndGet(this.employee);
        this.SET_ISSHOW_POPUP_DETAILS(false);
      }
    },
  },
};
</script>

<style lang="scss">
@import "../style/views/popupDetails.scss";
</style>
