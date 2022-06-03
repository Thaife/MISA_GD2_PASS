<template>
  <div class="view-popupDetailsVendor-wrap" v-show="isShowPopupDetailsVendor">
    <div id="popupDetailsVendor" class="view-popupDetailsVendor">
      <div class="details__vendor__header">
        <div class="details__vendor__header__title">
          <h2 class="">Thông tin nhà cung cấp</h2>
          <div class="vendor__type">
            <BaseRadio
              :isDisable="isDisable"
              :data="vendorTypes"
              v-model="vendorObj.VendorType"
              @handleClickRadio="handleClickRadio"
            />
          </div>
          <div class="is__customer">
            <BaseCheckbox
              :isDisable="isDisable"
              width="18px"
              height="18px"
              v-model="vendorObj.IsCustomer"
              label="Là khách hàng"
            />
          </div>
        </div>
        <div class="details__vendor__header__btn">
          <div class="details__btn__wrap__icon" title="Giúp">
            <div class="details__btn__help__icon"></div>
          </div>
          <div
            class="details__btn__wrap__icon"
            title="Đóng"
            @click="handleClosePopup"
          >
            <div class="details__btn__close__icon"></div>
          </div>
        </div>
      </div>
      <div class="details__vendor__content-wrap">
        <div class="details__vendor__content">
          <div class="details__vendor__content__up c-12">
            <div class="details__vendor__content__up__left c-6 padd-r-26">
              <div
                :class="[
                  `vendor__code__tax`,
                  `c-12`,
                  { persional: vendorObj.VendorType == 1 },
                ]"
              >
                <div
                  :class="[
                    `details__vendor__item`,
                    `c-5`,
                    { 'padd-r-12': vendorObj.VendorType == 0 },
                  ]"
                >
                  <div class="details__vendor__item__label">Mã số thuế</div>
                  <BaseInput
                    width="100%"
                    height="32px"
                    :focus="fieldFocus == 'VendorTaxCode'"
                    v-model="vendorObj.VendorTaxCode"
                    :isDisable="isDisable"
                    :tabindex="vendorObj.VendorType == 1 ? 2 : 1"
                  />
                </div>
                <div
                  :class="[
                    'details__vendor__item',
                    'c-7',
                    'validate__notnull',
                    { 'padd-r-12': vendorObj.VendorType == 1 },
                  ]"
                >
                  <div class="details__vendor__item__label">
                    Mã nhà cung cấp
                  </div>
                  <BaseInput
                    width="100%"
                    height="32px"
                    v-model="vendorObj.VendorCode"
                    :warring="validates.VendorCode"
                    :focus="fieldFocus == 'VendorCode'"
                    field="VendorCode"
                    :isDisable="isDisable"
                    :tabindex="vendorObj.VendorType == 1 ? 1 : 2"
                  />
                </div>
              </div>
              <div
                :class="[
                  'details__vendor__item',
                  'c-4',
                  { 'padd-r-12': vendorObj.VendorType == 1 },
                ]"
                v-show="vendorObj.VendorType == 1"
              >
                <div class="details__vendor__item__label">Tên nhà cung cấp</div>
                <BaseCombobox
                  width="100%"
                  height="32px"
                  placeholder="Xưng hô"
                  :data="contactPronouns"
                  fieldDisplay="ContactPronounName"
                  fieldValue="ContactPronounId"
                  v-model="vendorObj.ContactPronounId"
                  :isDisable="isDisable"
                  :tabindex="vendorObj.VendorType == 1 ? 3 : -1"
                />
              </div>
              <!-- zz -->

              <div
                :class="[
                  'details__vendor__item',
                  { validate__notnull: vendorObj.VendorType == 0 },
                  vendorObj.VendorType == 0 ? 'c-12' : 'c-8',
                ]"
              >
                <div
                  style="height: 21px"
                  v-show="vendorObj.VendorType == 1"
                ></div>
                <div
                  class="details__vendor__item__label"
                  v-show="vendorObj.VendorType == 0"
                >
                  Tên nhà cung cấp
                </div>
                <div
                  class="details__vendor__item__label"
                  v-show="vendorObj.VendorType == 1"
                ></div>
                <BaseInput
                  width="100%"
                  height="32px"
                  :warring="validates.VendorFullName"
                  field="VendorFullName"
                  v-model="vendorObj.VendorFullName"
                  :isDisable="isDisable"
                  :tabindex="vendorObj.VendorType == 1 ? 4 : 3"
                />
              </div>
              <div
                style="height: 77px"
                class="details__vendor__item c-12 details__vendor__item__address"
              >
                <div class="details__vendor__item__label">Địa chỉ</div>
                <textarea
                  :placeholder="isDisable ? '' : 'VD: Thanh Lâm Mê Linh Hà Nội'"
                  name=""
                  id=""
                  :disabled="isDisable"
                  v-model="vendorObj.ContactAddress"
                  :tabindex="vendorObj.VendorType == 1 ? 5 : 4"
                ></textarea>
              </div>
            </div>
            <div class="details__vendor__content__up__right c-6">
              <div
                :class="['details__vendor__item', 'c-5', 'padd-r-12']"
                v-show="vendorObj.VendorType == 0"
              >
                <div class="details__vendor__item__label">Điện thoại</div>
                <BaseInput
                  width="100%"
                  height="32px"
                  v-model="vendorObj.VendorPhoneNumber"
                  :warring="validates.VendorPhoneNumber"
                  field="VendorPhoneNumber"
                  :isDisable="isDisable"
                  :tabindex="5"
                />
              </div>
              <div
                class="details__vendor__item c-7"
                v-show="vendorObj.VendorType == 0"
              >
                <div class="details__vendor__item__label">Website</div>
                <BaseInput
                  width="100%"
                  height="32px"
                  v-model="vendorObj.Website"
                  :isDisable="isDisable"
                  :tabindex="6"
                />
              </div>

              <div class="details__vendor__item c-12">
                <div class="details__vendor__item__label">
                  Nhóm nhà cung cấp
                </div>
                <BaseMultiSelectTB
                  :data="vendorGroups"
                  :infor="vendorGroupsInfor"
                  fieldValue="VendorGroupId"
                  fieldDisplay="VendorGroupName"
                  v-model="vendorObj.VendorGroups"
                  minHeight="32"
                  width="100%"
                  :isDisable="isDisable"
                  :tabindex="vendorObj.VendorType == 1 ? 6 : 7"
                />
              </div>
              <div class="details__vendor__item c-12" style="height: 77px">
                <div class="details__vendor__item__label">
                  Nhân viên mua hàng
                </div>
                <BaseComboboxTB
                  :data="employeesCash"
                  :infor="employeesInfor"
                  fieldValue="EmployeeId"
                  fieldDisplay="EmployeeFullName"
                  v-model="vendorObj.PurchasingStaffId"
                  minHeight="32px"
                  :isDisable="isDisable"
                  :tabindex="vendorObj.VendorType == 1 ? 7 : 8"
                />
              </div>
              <div class="c-12"></div>
            </div>
          </div>
          <div class="details__vendor__content__down">
            <div class="details__vendor__content__tabs__controls">
              <div
                class="vendor__tabs__controls__item"
                @click="handleClickTabControl(`contact`)"
                :class="{ active: tabSelected == `contact` }"
              >
                Liên hệ
              </div>
              <div
                class="vendor__tabs__controls__item"
                @click="handleClickTabControl(`rules`)"
                :class="{ active: tabSelected == `rules` }"
              >
                Điều khoản thanh toán
              </div>
              <div
                class="vendor__tabs__controls__item"
                @click="handleClickTabControl(`banks`)"
                :class="{ active: tabSelected == `banks` }"
              >
                Tài khoản thanh toán
              </div>
              <div
                class="vendor__tabs__controls__item"
                @click="handleClickTabControl(`otherAddress`)"
                :class="{ active: tabSelected == `otherAddress` }"
              >
                Địa chỉ khác
              </div>
              <div
                class="vendor__tabs__controls__item"
                @click="handleClickTabControl(`notes`)"
                :class="{ active: tabSelected == `notes` }"
              >
                Ghi chú
              </div>
            </div>
            <div class="vendor__content__down__container">
              <div class="contact" v-show="tabSelected == 'contact'">
                <div class="left c-6 padd-r-26">
                  <div class="title c-12">Người liên hệ</div>
                  <div
                    class="vendor__content__down__container__item c-4 padd-r-7"
                    v-show="vendorObj.VendorType == 0"
                  >
                    <BaseCombobox
                      width="100%"
                      height="32px"
                      placeholder="Xưng hô"
                      :data="contactPronouns"
                      fieldDisplay="ContactPronounName"
                      fieldValue="ContactPronounId"
                      v-model="vendorObj.ContactPronounId"
                      :isDisable="isDisable"
                      :tabindex="9"
                      :focus="tabSelected == 'contact' ? true : false"
                    />
                  </div>
                  <div
                    class="vendor__content__down__container__item c-8"
                    v-show="vendorObj.VendorType == 0"
                  >
                    <BaseInput
                      width="100%"
                      height="32px"
                      placeholder="Họ và tên"
                      v-model="vendorObj.ContactName"
                      :isDisable="isDisable"
                      :tabindex="10"
                    />
                  </div>
                  <div class="vendor__content__down__container__item c-12">
                    <BaseInput
                      width="100%"
                      height="32px"
                      placeholder="Email"
                      :warring="validates.ContactEmail"
                      field="ContactEmail"
                      v-model="vendorObj.ContactEmail"
                      :isDisable="isDisable"
                      :tabindex="vendorObj.VendorType == 1 ? 8 : 11"
                    />
                  </div>
                  <div
                    class="vendor__content__down__container__item c-6"
                    v-show="vendorObj.VendorType == 0"
                  >
                    <BaseInput
                      width="100%"
                      height="32px"
                      placeholder="Số điện thoại"
                      :warring="validates.ContactPhoneNumber"
                      field="ContactPhoneNumber"
                      v-model="vendorObj.ContactPhoneNumber"
                      :isDisable="isDisable"
                      :tabindex="12"
                    />
                  </div>
                  <div
                    class="vendor__content__down__container__item c-6"
                    v-show="vendorObj.VendorType == 1"
                  >
                    <BaseInput
                      width="100%"
                      height="32px"
                      placeholder="Điện thoại di động"
                      :warring="validates.ContactPhoneNumber"
                      field="ContactPhoneNumber"
                      v-model="vendorObj.ContactPhoneNumber"
                      :isDisable="isDisable"
                      :tabindex="vendorObj.VendorType == 1 ? 9 : -1"
                    />
                  </div>
                  <div class="c-6"></div>
                  <div
                    class="vendor__content__down__container__item c-6"
                    v-show="vendorObj.VendorType == 1"
                  >
                    <BaseInput
                      width="100%"
                      height="32px"
                      placeholder="Điện thoại cố định"
                      :warring="validates.VendorPhoneNumber"
                      field="VendorPhoneNumber"
                      v-model="vendorObj.VendorPhoneNumber"
                      :isDisable="isDisable"
                      :tabindex="vendorObj.VendorType == 1 ? 10 : -1"
                    />
                  </div>
                  <div class="c-6" v-show="vendorObj.VendorType == 1"></div>
                  <div
                    class="title"
                    v-show="vendorObj.VendorType == 1 || vendorObj.IsCustomer"
                  >
                    Đại diện theo PL
                  </div>
                  <div
                    class="vendor__content__down__container__item c-12"
                    v-show="vendorObj.VendorType == 1 || vendorObj.IsCustomer"
                  >
                    <BaseInput
                      width="100%"
                      height="32px"
                      placeholder="Đại diện theo PL"
                      v-model="vendorObj.ContactLegalRep"
                      :isDisable="isDisable"
                    />
                  </div>
                </div>
                <div class="right c-6">
                  <!--  -->
                  <div
                    class="title"
                    v-show="vendorObj.VendorType == 0 && !vendorObj.IsCustomer"
                  >
                    Đại diện theo PL
                  </div>
                  <div
                    class="vendor__content__down__container__item c-12"
                    v-show="vendorObj.VendorType == 0 && !vendorObj.IsCustomer"
                  >
                    <BaseInput
                      width="100%"
                      height="32px"
                      placeholder="Đại diện theo PL"
                      v-model="vendorObj.ContactLegalRep"
                      :isDisable="isDisable"
                      :tabindex="vendorObj.VendorType == 1 ? 14 : 13"
                    />
                  </div>
                  <!-- CÁ NHÂN  -->
                  <div class="title c-12" v-show="vendorObj.VendorType == 1">
                    Thông tin CMND/Thẻ căn cước
                  </div>
                  <div
                    class="vendor__content__down__container__item c-6"
                    v-show="vendorObj.VendorType == 1"
                  >
                    <BaseInput
                      width="100%"
                      height="32px"
                      placeholder="Số CMND/Thẻ căn cước"
                      v-model="vendorObj.VendorIdentityNumber"
                      :isDisable="isDisable"
                      :tabindex="vendorObj.VendorType == 1 ? 11 : -1"
                      @handleTab="true ? () => {} : switchToDateOfIssue"
                    />
                  </div>
                  <div class="c-6" v-show="vendorObj.VendorType == 1"></div>
                  <div
                    :class="['vendor__content__down__container__item', 'c-6']"
                    v-show="vendorObj.VendorType == 1"
                  >
                    <DatePicker
                      :format="'DD/MM/YYYY'"
                      :lang="'vi'"
                      :clearable="false"
                      :disabled="isDisable"
                      :disabled-date="
                        (day) => (day > new Date() ? true : false)
                      "
                      title-format="DD/MM/YYYY"
                      v-model:value="vendorObj.DateOfIssue"
                      placeholder="Ngày cấp"
                      ref="date_of_issue"
                      :tabindex="vendorObj.VendorType == 1 ? 12 : -1"
                    />
                  </div>
                  <div class="c-6" v-show="vendorObj.VendorType == 1"></div>
                  <div
                    class="vendor__content__down__container__item c-12"
                    v-show="vendorObj.VendorType == 1"
                  >
                    <BaseInput
                      width="100%"
                      height="32px"
                      placeholder="Nơi cấp"
                      v-model="vendorObj.AddressOfIssue"
                      :isDisable="isDisable"
                      :tabindex="vendorObj.VendorType == 1 ? 13 : -1"
                    />
                  </div>
                  <!-- TỔ CHỨC + LÀ KHÁCH HÀNG -->
                  <div
                    class="title c-12"
                    v-show="vendorObj.VendorType == 0 && vendorObj.IsCustomer"
                  >
                    Người nhận hoá đơn điện tử
                  </div>
                  <div
                    class="vendor__content__down__container__item c-12"
                    v-show="vendorObj.VendorType == 0 && vendorObj.IsCustomer"
                  >
                    <BaseInput
                      width="100%"
                      height="32px"
                      placeholder="Họ và tên"
                      v-model="vendorObj.EinvoiceRecipient"
                      :isDisable="isDisable"
                    />
                  </div>
                  <div
                    class="vendor__content__down__container__item c-12"
                    v-show="vendorObj.VendorType == 0 && vendorObj.IsCustomer"
                  >
                    <BaseInput
                      width="100%"
                      height="32px"
                      placeholder='Email, ngăn cách nhiều email bởi dấu chấm phẩy ";"'
                      v-model="vendorObj.EinvoiceRecipientEmails"
                      :isDisable="isDisable"
                    />
                  </div>
                  <div
                    class="vendor__content__down__container__item c-6"
                    v-show="vendorObj.VendorType == 0 && vendorObj.IsCustomer"
                  >
                    <BaseInput
                      width="100%"
                      height="32px"
                      placeholder="Số điện thoại"
                      v-model="vendorObj.EinvoiceRecipientPhoneNumber"
                      :isDisable="isDisable"
                    />
                  </div>
                </div>
              </div>
              <div class="rules" v-show="tabSelected == 'rules'">
                <div
                  class="vendor__content__down__container__item c-3 padd-r-12"
                >
                  <div class="title">Điều khoản thanh toán</div>
                  <BaseComboboxTB
                    :data="rules"
                    :infor="rulesInfor"
                    fieldValue="ContractId"
                    fieldDisplay="RuleName"
                    v-model="vendorObj.ContractId"
                    minHeight="32px"
                    width="100%"
                    :isDisable="isDisable"
                    :focus="tabSelected == 'rules' ? true : false"
                  />
                </div>
                <div
                  class="vendor__content__down__container__item c-3 padd-r-12"
                >
                  <div class="title">Số ngày được nợ</div>
                  <BaseInput
                    width="100%"
                    height="32px"
                    type="number"
                    v-model="vendorObj.MaxDebitDateCount"
                    :isDisable="isDisable"
                  />
                </div>
                <div
                  class="vendor__content__down__container__item c-3 padd-r-12"
                >
                  <div class="title">Nợ tối đa</div>
                  <BaseInput
                    width="100%"
                    height="32px"
                    type="number"
                    v-model="vendorObj.MaxDebitAmount"
                    :isDisable="isDisable"
                  />
                </div>
                <div class="c-3"></div>
                <div
                  class="vendor__content__down__container__item c-3 padd-r-12"
                  v-show="vendorObj.IsCustomer"
                >
                  <div class="title">Tài khoản công nợ phải thu</div>
                  <BaseComboboxTB
                    :data="bankAccounts"
                    :infor="bankAccountsInfor"
                    fieldValue="BankId"
                    fieldDisplay="BankAccount"
                    v-model="vendorObj.DebitReceiptAccountId"
                    minHeight="32px"
                    width="100%"
                    :isDisable="isDisable"
                  />
                </div>
                <div
                  class="vendor__content__down__container__item c-3 padd-r-12"
                >
                  <div class="title">Tài khoản công nợ phải trả</div>
                  <BaseComboboxTB
                    :data="bankAccounts"
                    :infor="bankAccountsInfor"
                    fieldValue="BankId"
                    fieldDisplay="BankAccount"
                    v-model="vendorObj.DebitPaymentAccountId"
                    minHeight="32px"
                    width="100%"
                    :isDisable="isDisable"
                  />
                </div>
              </div>
              <div class="banks" v-show="tabSelected == 'banks'">
                <div class="banks__table">
                  <table>
                    <thead>
                      <tr>
                        <th style="min-width: 140px; text-align: left">
                          <div>SỐ TÀI KHOẢN</div>
                        </th>
                        <th style="min-width: 100px; text-align: left">
                          <div>TÊN NGÂN HÀNG</div>
                        </th>
                        <th style="min-width: 100px; text-align: left">
                          <div>CHI NHÁNH</div>
                        </th>
                        <th style="min-width: 165px; text-align: right">
                          <div>TỈNH/TP CỦA NGÂN HÀNG</div>
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(bank, index) in listBanks"
                        :key="index"
                        :class="{ active: bankActive == index }"
                        @click="handleClickRowBanks(index)"
                      >
                        <td>
                          <div v-if="bankActive != index">
                            {{ listBanks[index].BankNumber }}
                          </div>
                          <div v-else>
                            <BaseInput
                              v-model="listBanks[index].BankNumber"
                              field=""
                              width="100%"
                              height="32px"
                              placehoder=""
                              :search="false"
                              :focus="
                                tabSelected == 'banks' && index == 0
                                  ? true
                                  : false
                              "
                              :isDisable="isDisable"
                            />
                          </div>
                        </td>
                        <td>
                          <div v-if="bankActive != index">
                            {{ listBanks[index].BankName }}
                          </div>
                          <div v-else>
                            <BaseInput
                              v-model="listBanks[index].BankName"
                              field=""
                              width="100%"
                              height="32px"
                              placehoder=""
                              :search="false"
                              :tabIndex="2"
                              :isDisable="isDisable"
                            />
                          </div>
                        </td>
                        <td>
                          <div v-if="bankActive != index">
                            {{ listBanks[index].BankBranch }}
                          </div>
                          <div v-else>
                            <BaseInput
                              v-model="listBanks[index].BankBranch"
                              field=""
                              width="100%"
                              height="32px"
                              placehoder=""
                              :search="false"
                              :tabIndex="2"
                              :isDisable="isDisable"
                            />
                          </div>
                        </td>
                        <td>
                          <div
                            style="text-align: right"
                            v-if="bankActive != index"
                          >
                            {{ listBanks[index].CityOfBank }}
                          </div>
                          <div v-else>
                            <BaseInput
                              v-model="listBanks[index].CityOfBank"
                              field=""
                              type="text"
                              width="100%"
                              height="32px"
                              placehoder=""
                              align="left"
                              :search="false"
                              :tabIndex="2"
                              :isDisable="isDisable"
                            />
                          </div>
                        </td>
                        <td>
                          <div
                            class="remove__wrap"
                            title=""
                            @click="handleClickRemoveARow(index)"
                          >
                            <div class="remove__wrap__icon"></div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="details__vendor__controls">
                  <div class="btns__control">
                    <div
                      class="details__vendor__btn"
                      @click="handleClickAddOneRow"
                    >
                      Thêm dòng
                    </div>
                    <div
                      class="details__vendor__btn"
                      @click="handleClickRemoveAllRow"
                    >
                      Xoá hết dòng
                    </div>
                  </div>
                </div>
              </div>
              <div class="otherAddress" v-show="tabSelected == 'otherAddress'">
                <div class="left c-6">
                  <div class="title c-12">Vị trí địa lý</div>
                  <div
                    class="vendor__content__down__container__item c-6 padd-r-12"
                  >
                    <BaseCombobox
                      width="100%"
                      height="32px"
                      v-model="countryId"
                      placeholder="Quốc gia"
                      :data="countries"
                      fieldDisplay="name"
                      fieldValue="code"
                      :isDisable="isDisable"
                      :focus="tabSelected == 'otherAddress' ? true : false"
                    />
                  </div>
                  <div class="vendor__content__down__container__item c-6">
                    <BaseCombobox
                      width="100%"
                      height="32px"
                      v-model="provinceId"
                      placeholder="Tỉnh/Thành phố"
                      :data="provinces"
                      fieldDisplay="name"
                      fieldValue="code"
                      :isDisable="isDisable"
                    />
                  </div>
                  <div
                    class="vendor__content__down__container__item c-6 padd-r-12"
                  >
                    <BaseCombobox
                      width="100%"
                      height="32px"
                      v-model="districtId"
                      placeholder="Quận/Huyện"
                      :data="districts"
                      fieldDisplay="name"
                      fieldValue="code"
                      :isDisable="isDisable"
                    />
                  </div>
                  <div class="vendor__content__down__container__item c-6">
                    <BaseCombobox
                      width="100%"
                      height="32px"
                      v-model="wardId"
                      placeholder="Xã/Phường"
                      :data="wards"
                      fieldDisplay="name"
                      fieldValue="code"
                      :isDisable="isDisable"
                    />
                  </div>
                </div>
                <div class="right c-6">
                  <div class="other__address__header">
                    <div class="address__header__title">Địa chỉ giao hàng</div>
                    <div class="sameAddressVendor-checkbox">
                      <BaseCheckbox
                        width="18px"
                        height="18px"
                        label="Giống địa chỉ là cung cấp"
                        v-model="isSameVendorAddress"
                        :isDisable="isDisable"
                      />
                    </div>
                  </div>
                  <div class="other__address__table">
                    <table>
                      <tr
                        v-for="(address, index) in listOtherAddress"
                        :key="index"
                        @click="handleClickRowOtherAddress(index)"
                        :class="{
                          active: index == otherAddressActive,
                        }"
                      >
                        <td>
                          <div v-if="otherAddressActive != index">
                            {{ listOtherAddress[index] }}
                          </div>
                          <div v-else>
                            <BaseInput
                              width="100%"
                              height="32px"
                              v-model="listOtherAddress[index]"
                              :isDisable="isDisable"
                            />
                          </div>
                        </td>
                        <td style="width: 52px">
                          <div
                            class="remove__wrap"
                            title=""
                            @click="handleClickRemoveOtherAddress(index)"
                          >
                            <div class="remove__wrap__icon"></div>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="details__vendor__controls">
                    <div class="btns__control">
                      <div
                        class="details__vendor__btn"
                        @click="handleAddOneRowOtherAddress"
                      >
                        Thêm dòng
                      </div>
                      <div
                        class="details__vendor__btn"
                        @click="handleClickRemoveAllOtherAddress"
                      >
                        Xoá hết dòng
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="notes" v-show="tabSelected == 'notes'">
                <textarea
                  name=""
                  v-model="vendorObj.TextNote"
                  :disabled="isDisable"
                  ref="notes"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="details__vendor__footer">
        <div class="left">
          <div @click="SET_ISSHOW_POPUP_DETAILS_VENDOR(false)">
            <BaseButton
              text="Huỷ"
              height="32px"
              :tabIndex="18"
              @handleKeyDown="SET_ISSHOW_POPUP_DETAILS_VENDOR(false)"
            />
          </div>
        </div>
        <div class="right">
          <div style="margin-right: 10px" @click="handleStore">
            <BaseButton
              text="Cất"
              height="32px"
              :tabIndex="18"
              @handleKeyDown="handleStore"
            />
          </div>
          <div @click="handleStoreAndAdd">
            <BaseButton
              text="Cất và Thêm"
              height="32px"
              :tabIndex="18"
              @handleKeyDown="handleStoreAndAdd"
              :mainType="true"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import "vue-datepicker-next/locale/zh-cn";
// import BaseButtonIcon from "@/components/base/BaseButtonIcon.vue";
import BaseButton from "@/components/base/BaseButton.vue";
// import BaseSelect from "@/components/base/BaseSelect.vue";
import BaseComboboxTB from "@/components/base/BaseComboboxTB.vue";
import BaseCombobox from "@/components/base/BaseCombobox.vue";
import BaseMultiSelectTB from "@/components/base/BaseMultiSelectTB.vue";

import helper from "@/js/utils.js";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseRadio from "@/components/base/BaseRadio";
import BaseCheckbox from "@/components/base/BaseCheckbox";
//
import DialogError from "../../js/dialog/dialogError";
import DialogQuestion from "../../js/dialog/dialogQuestion";

import typeOfUpdateCash from "@/js/typeOfUpdateCash";

import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "view-popupDetailsVendor",
  components: {
    BaseRadio,
    BaseCheckbox,
    BaseInput,
    BaseCombobox,
    BaseComboboxTB,
    BaseMultiSelectTB,
    // BaseSelect,
    DatePicker,
    BaseButton,
    // BaseButtonIcon,
  },
  data() {
    return {
      isDisable: false,
      isSameVendorAddress: false,
      fieldFocus: "",
      vendorObj: {},
      vendorObjCompare: {},
      //biến trung gian các cbb
      countryId: null,
      provinceId: null,
      districtId: null,
      wardId: null,
      //
      vendorTypes: [
        { value: 0, label: "Tổ chức" },
        { value: 1, label: "Cá nhân" },
      ],
      //datePicker
      langObject: {
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: false,
      },
      langString: "zh-cn",
      listBanks: [
        {
          BankId: "1",
          BankNumber: "",
          BankName: "",
          BankBranch: "",
          CityOfBank: "",
        },
      ],
      listOtherAddress: [""],
      bankActive: 0,
      otherAddressActive: 0,
      tabSelected: "contact",
    };
  },
  computed: {
    ...mapGetters([
      "vendor",
      "newCodeVendor",
      "formDetailsVendorMode",
      "vendorIdSelected",
      "isHoldFormVendor",
      //
      "countries",
      "provinces",
      "districts",
      "wards",
      //
      "employeesCash",
      "employeesInfor",
      "vendorGroups",
      "vendorGroupsInfor",
      "contactPronouns",
      "rules",
      "rulesInfor",
      "isShowPopupDetailsVendor",
      "bankAccounts",
      "bankAccountsInfor",
      //
      "errMessage",
      "validates",
    ]),
  },
  watch: {
    tabSelected(value) {
      if (value == "banks") {
        this.bankActive = 0;
      } else if (value == "notes") {
        this.$nextTick(() => {
          this.$refs.notes.focus();
        });
      }
    },
    countries(value) {
      console.log(value);
    },
    isHoldFormVendor() {},
    async vendor(value) {
      if (this.isHoldFormVendor) {
        this.listBanks = [
          {
            BankId: "1",
            BankNumber: "",
            BankName: "",
            BankBranch: "",
            CityOfBank: "",
          },
        ];
        // this.vendorObjCompare = { ...this.vendorObj };
        this.vendorObjCompare = { ...value };
      }
      //lấy các giá trị từ vendor lấy dược theo id => gán vào các biến modelValue
      this.vendorObj = { ...value };
      if (value.DateOfIssue) {
        this.vendorObj.DateOfIssue = new Date(value.DateOfIssue);
      }
      if (value.DeliveryAddresses) {
        if (!value.DeliveryAddresses[0]) {
          this.listOtherAddress = JSON.parse('[""]');
        } else this.listOtherAddress = JSON.parse(value.DeliveryAddresses);
      }
      if (value.BankAccounts) this.listBanks = JSON.parse(value.BankAccounts);
      if (value.VendorGroups) {
        // eslint-disable-next-line valid-typeof
        if (typeof value.VendorGroups == "string") {
          this.vendorObj.VendorGroups = value.VendorGroups.split(",");
        }
      }
      //
      if (value.CountryId) {
        await this.getCountries();
        this.countryId = value.CountryId;
        if (value.ProvinceId) {
          await this.getProvincesByCountryId(value.CountryId);
          this.provinceId = value.ProvinceId;
          if (value.DistrictId) {
            await this.getDistrictsByProvinceId(value.ProvinceId);
            this.districtId = value.DistrictId;
            if (value.WardId) {
              await this.getWardsByDistrictId(value.DistrictId);
              this.wardId = value.WardId;
            }
          }
        }
      }

      //
    },

    //Bind mã mới vào input mã khi có mã mới(ngay sau khi call api)
    newCodeVendor(value) {
      this.vendorObj.VendorCode = value;
      if (this.isHoldFormVendor) {
        this.vendorObjCompare.VendorCode = value;
      }
    },

    isShowPopupDetailsVendor(value) {
      if (value) {
        //Add các phím tắt vào window khi mở form
        window.addEventListener("keydown", this.handleDocumentKeydown);
        //
        this.fieldFocus = "VendorTaxCode";
        if (this.formDetailsVendorMode == typeOfUpdateCash.addVendor) {
          this.vendorObj = {
            ProvinceId: null,
            ContactAddress: null,
            ContactEmail: null,
            ContactLegalRep: null,
            ContactName: null,
            ContactPhoneNumber: null,
            ContactPronounId: null,
            CountryId: null,
            DebitPaymentAccountId: null,
            DebitReceiptAccountId: null,
            DeliveryAddresses: [""],
            DistrictId: null,
            EinvoiceRecipient: null,
            EinvoiceRecipientEmails: null,
            EinvoiceRecipientPhoneNumber: null,
            VendorGroups: null,
            IsCustomer: 0,
            MaxDebitAmount: null,
            MaxDebitDateCount: null,
            PurchasingStaffId: null,
            RuleId: null,
            TextNote: null,
            VendorCode: null,
            VendorFullName: null,
            VendorPhoneNumber: null,
            VendorTaxCode: null,
            VendorType: 0,
            WardId: null,
            Website: null,
          };
          this.getNewCodeVendor();
          setTimeout(() => {
            this.vendorObj.VendorCode = this.newCodeVendor;
          }, 0);
          setTimeout(() => {
            this.vendorObjCompare = { ...this.vendorObj };
          }, 0);
        } else if (this.formDetailsVendorMode == typeOfUpdateCash.viewVendor) {
          this.isDisable = true;
          setTimeout(() => {
            this.vendorObjCompare = { ...this.vendor };
          }, 0);
        } else {
          setTimeout(() => {
            this.vendorObjCompare = { ...this.vendor };
          }, 0);
        }
      } else {
        window.removeEventListener("keydown", this.handleDocumentKeydown);
        this.SET_IS_HOLD_FORM_VENDOR(false);
        this.SET_VALIDATES({});
        this.SET_NEW_CODE_VENDOR(null);
        this.otherAddressActive = null;
        this.isDisable = false;
        this.bankActive = null;
        this.tabSelected = "contact";
        this.fieldFocus = "";
        this.listBanks = [
          {
            BankId: "1",
            BankNumber: "",
            BankName: "",
            BankBranch: "",
            CityOfBank: "",
          },
        ];
        this.listOtherAddress = [""];
        this.vendorObj = {
          VendorType: 0,
          IsCustomer: 0,
        };
        this.isSameVendorAddress = false;

        //
        this.countryId = null;
        this.provinceId = null;
        this.districtId = null;
        this.wardId = null;
      }
    },
    countryId(value) {
      this.vendorObj.CountryId = value + "";
      if (value) {
        this.getProvincesByCountryId(value);
      }
      this.provinceId = null;
      this.districtId = null;
      this.wardId = null;
    },
    provinceId(value) {
      this.vendorObj.ProvinceId = "" + value;
      if (value) {
        this.getDistrictsByProvinceId(value);
      }
      this.districtId = null;
      this.wardId = null;
    },
    districtId(value) {
      this.vendorObj.DistrictId = value + "";
      if (value) {
        this.getWardsByDistrictId(value);
      }
      this.wardId = null;
    },
    wardId(value) {
      this.vendorObj.WardId = value + "";
    },
    isSameVendorAddress(value) {
      if (value) {
        this.listOtherAddress = [this.vendorObj.ContactAddress];
      }
    },
  },

  created() {},

  mounted() {
    helper.draggable("#popupDetailsVendor");
  },

  methods: {
    ...mapActions([
      "getCountries",
      "getProvincesByCountryId",
      "getDistrictsByProvinceId",
      "getWardsByDistrictId",
      //
      "addVendor",
      "updateVendor",
      "getEmployeesCash",
      "getVendorGroups",
      "getRules",
      "getContactPronouns",
      "getBankAccounts",
      "getNewCodeVendor",
    ]),
    ...mapMutations([
      "SET_ISSHOW_POPUP_DETAILS_VENDOR",
      "SET_ISSHOW_DIALOG_QUESTION",
      "SET_ISSHOW_DIALOG_ERR",
      "SET_VALIDATES",
      "SET_ERR_MESSAGE",
      "SET_VENDOR",
      "SET_IS_HOLD_FORM_VENDOR",
      "SET_NEW_CODE_VENDOR",
    ]),
    handleDocumentKeydown(e) {
      if (e.keyCode == 27) {
        this.SET_ISSHOW_POPUP_DETAILS_VENDOR(false);
      } else if (e.keyCode == 83 && e.ctrlKey) {
        e.preventDefault();
        if (e.shiftKey) {
          this.handleStoreAndAdd();
        } else {
          this.handleStore();
        }
      }
    },
    switchToDateOfIssue() {
      this.$nextTick(() => {
        this.$refs.date_of_issue.querySelector("input").focus();
      });
    },
    handleClickRadio(value) {
      if (value == 1) {
        this.fieldFocus = "VendorCode";
      } else {
        this.fieldFocus = "VendorTaxCode";
      }
    },
    validate(vendor) {
      let isValidate = true;
      let valids = {};
      if (!vendor.VendorCode) {
        valids = {
          ...valids,
          VendorCode: true,
          VendorCodeTitle: DialogError.emptyCode,
        };
        // this.validates.vendorCode = true;
        // this.validates.vendorCodeTitle = "Mã nhân viên không được để trống.";
        if (isValidate) {
          this.SET_ERR_MESSAGE("Mã nhà cung cấp không được để trống");
        }
        isValidate = false;
      } else {
        const regex = /^((\bNCC-))\d[0-9]+$/;
        if (!regex.test(vendor.VendorCode)) {
          valids = {
            ...valids,
            VendorCode: true,
            VendorCodeTitle: DialogError.formatCode,
          };
          // this.validates.vendorCode = true;
          // this.validates.vendorCodeTitle = "Mã nhân viên không được để trống.";
          if (isValidate) {
            this.SET_ERR_MESSAGE(DialogError.vendorCode);
          }
          isValidate = false;
        }
      }
      //Kiểm tra tên không được trống và phải đúng định dạng
      if (!vendor.VendorFullName) {
        // this.validates.FullName = true;
        // this.validates.FullNameTitle = "Họ tên không được để trống.";
        valids = {
          ...valids,
          VendorFullName: true,
          VendorFullNameTile: DialogError.emptyName,
        };
        if (isValidate) {
          this.SET_ERR_MESSAGE(DialogError.vendorName);
        }
        isValidate = false;
      }
      //Kiểm tra ngày nghỉ việc có lớn hơn ngày hiện tại k
      if (vendor.DateOfIssue) {
        var DateOfIssue = new Date(vendor.DateOfIssue);
        if (DateOfIssue > new Date()) {
          // this.validates.DateOfBirth = true;
          // this.validates.DateOfBirthTitle =
          //   "Ngày sinh được lớn hơn ngày hiện tại.";
          valids = {
            ...valids,
            DateOfIssue: true,
            DateOfIssueTitle: DialogError.dateOfBirth,
          };
          if (isValidate) {
            this.SET_ERR_MESSAGE(DialogError.dateOfBirth);
          }
          isValidate = false;
        }
      }
      //Kiểm tra số điện thoại đúng định dạng của VietNam k
      if (vendor.VendorPhoneNumber) {
        const phoneNbRegex = /(84|0[3|5|7|8|9])+([0-9]{8})/;
        if (!phoneNbRegex.test(vendor.VendorPhoneNumber)) {
          // this.validates.Phone = true;
          // this.validates.PhoneTitle = "Số điện thoại sai định dạng.";
          valids = {
            ...valids,
            VendorPhoneNumber: true,
            VendorPhoneNumberTile: DialogError.formatPhoneNumber,
          };
          if (isValidate) {
            this.SET_ERR_MESSAGE(DialogError.formatPhoneNumber);
          }
          isValidate = false;
        }
      }
      //Kiểm tra Email đúng định dạng k
      if (vendor.ContactEmail) {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
        if (!emailRegex.test(vendor.ContactEmail)) {
          // this.validates.Email = true;
          // this.validates.EmailTitle = "Email sai định dạng.";
          valids = {
            ...valids,
            ContactEmail: true,
            ContactEmailTitle: DialogError.formatMail,
          };
          if (isValidate) {
            this.SET_ERR_MESSAGE(DialogError.formatMail);
          }
          isValidate = false;
        }
      }
      this.SET_VALIDATES(valids);
      //Trả về true nếu validate thành công
      return isValidate;
    },
    handleStore() {
      if (!this.isDisable) {
        this.SET_IS_HOLD_FORM_VENDOR(false);
        if (this.vendorObj.DateOfIssue) {
          this.vendorObj.DateOfIssue = new Date(
            this.vendorObj.DateOfIssue
          ).toDateString();
        }
        //dataSended là data sẽ được gửi đi
        const dataSended = {
          ...this.vendorObj,
          DeliveryAddresses: JSON.stringify(this.listOtherAddress),
          BankAccounts: JSON.stringify(this.listBanks),
        };
        //Nếu validate thành công
        //add hoặc update tuỳ theo trạng thái của form
        if (this.validate(dataSended)) {
          if (this.formDetailsVendorMode == typeOfUpdateCash.addVendor) {
            this.addVendor(dataSended);
          } else if (
            this.formDetailsVendorMode == typeOfUpdateCash.updateVendor
          ) {
            this.updateVendor({ id: this.vendorIdSelected, body: dataSended });
          }
        } else {
          this.SET_ISSHOW_DIALOG_ERR({ isShow: "true", mess: this.errMessage });
        }
      }
    },
    //Xử lý cất và thêm
    handleStoreAndAdd() {
      if (!this.isDisable) {
        //set trạng thái giữ form sau khi cất
        this.SET_IS_HOLD_FORM_VENDOR(true);
        if (this.vendorObj.DateOfIssue) {
          this.vendorObj.DateOfIssue =
            this.vendorObj.DateOfIssue.toDateString();
        }
        //dataSended là data sẽ được gửi đi
        const dataSended = {
          ...this.vendorObj,
          DeliveryAddresses: JSON.stringify(this.listOtherAddress),
          BankAccounts: JSON.stringify(this.listBanks),
        };
        //Nếu validate thành công
        //add hoặc update tuỳ theo trạng thái của form
        if (this.validate(dataSended)) {
          if (this.formDetailsVendorMode == typeOfUpdateCash.addVendor) {
            this.addVendor(dataSended);
          } else if (
            this.formDetailsVendorMode == typeOfUpdateCash.updateVendor
          ) {
            this.updateVendor({ id: this.vendorIdSelected, body: dataSended });
          }
        } else {
          this.SET_ISSHOW_DIALOG_ERR({ isShow: "true", mess: this.errMessage });
        }
      }
    },
    handleClickRowBanks(vlue) {
      if (!this.isDisable) {
        this.bankActive = vlue;
      }
    },
    handleClosePopup() {
      if (!this.isDisable) {
        ///
        //Convert data của form ở trạng thái đầu tiên(lúc mới mở form) và data của form trước khi click đóng sang json
        //Nếu khác nhau => hiển thị thông báo dữ liệu đã thay đổi
        ///
        const dataSended = {
          ...this.vendorObj,
          DeliveryAddresses: JSON.stringify(this.listOtherAddress),
          BankAccounts: JSON.stringify(this.listBanks),
        };
        if (dataSended.DateOfIssue) {
          dataSended.DateOfIssue = new Date(dataSended.DateOfIssue);
        }
        if (this.vendorObjCompare.DateOfIssue) {
          this.vendorObjCompare.DateOfIssue = new Date(
            this.vendorObjCompare.DateOfIssue
          );
        }
        // for (let i = 0; i < JSON.stringify(dataSended).length; i++) {
        //   if (
        //     JSON.stringify(dataSended)[i] !=
        //     JSON.stringify(this.vendorObjCompare)[i]
        //   )
        //     console.log(
        //       `${JSON.stringify(dataSended)[i]}${
        //         JSON.stringify(dataSended)[i + 1]
        //       }${JSON.stringify(dataSended)[i + 2]}`,
        //       `${JSON.stringify(this.vendorObjCompare)[i]}`
        //     );
        // }
        // console.log(JSON.stringify(this.vendorObj));
        // console.log(JSON.stringify(this.vendorObjCompare));
        if (
          JSON.stringify(this.vendorObj) ==
          JSON.stringify(this.vendorObjCompare)
        ) {
          this.SET_ISSHOW_POPUP_DETAILS_VENDOR(false);
        } else {
          this.SET_VENDOR(dataSended);
          this.SET_ISSHOW_DIALOG_QUESTION({
            isShow: true,
            mess: DialogQuestion.confirmChanged,
          });
        }
      } else {
        this.SET_ISSHOW_POPUP_DETAILS_VENDOR(false);
      }
    },
    handleClickTabControl(tabName) {
      this.tabSelected = tabName;
    },
    handleClickAddOneRow() {
      if (!this.isDisable) {
        this.listBanks = [
          ...this.listBanks,
          {
            BankId: ``,
            BankNumber: "",
            BankName: "",
            BankBranch: "",
            CityOfBank: "",
          },
        ];
      }
    },
    handleClickRemoveARow(index) {
      if (!this.isDisable) {
        if (this.listBanks.length > 1)
          this.listBanks = this.listBanks.filter((bank, idx) => {
            return idx != index;
          });
      }
    },
    handleClickRemoveAllRow() {
      if (!this.isDisable) {
        this.listBanks = [
          {
            BankId: "1",
            BankNumber: "",
            BankName: "",
            BankBranch: "",
            CityOfBank: "",
          },
        ];
      }
    },
    handleClickRowOtherAddress(vlue) {
      if (!this.isDisable) {
        this.otherAddressActive = vlue;
      }
    },
    handleAddOneRowOtherAddress() {
      if (!this.isDisable) {
        this.listOtherAddress = [...this.listOtherAddress, ""];
      }
    },
    handleClickRemoveOtherAddress(index) {
      if (!this.isDisable) {
        if (this.listOtherAddress.length > 1)
          this.listOtherAddress = this.listOtherAddress.filter(
            (address, idx) => {
              return idx != index;
            }
          );
      }
    },
    handleClickRemoveAllOtherAddress() {
      if (!this.isDisable) {
        this.listOtherAddress = [""];
      }
    },
  },
};
</script>

<style lang="scss">
@use "../../style/common/help.scss";
//datePicker
.transaction__infor__item {
  & .mx-datepicker {
    width: 100%;
  }
  & .mx-input {
    border-radius: 2px;
    height: 32px;
    border: 1px solid rgb(180, 180, 180);
    &:focus {
      border: 1px solid help.$main-color;
    }
    &:hover {
      // border: 1px solid rgb(180, 180, 180);
    }
    &:disabled {
      color: #545454;
      background: #edeef0;
    }
  }
}

@import "../../style/views/cash/popupDetailsVendor.scss";
</style>
