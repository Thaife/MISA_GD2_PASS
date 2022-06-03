<template>
  <BaseComboboxTB
    :data="data"
    :listFieldDisplay="listFieldDisplay"
    fieldDisplay="FullName"
    :listFieldName="listFieldName"
    :fieldValue="fieldValue"
    v-model="valueComboboxTB"
    minHeight="32px"
    width="300px"
    :style="{ marginLeft: '40px', marginBottom: '160px' }"
  />
  <BaseMultiSelectTB
    :data="data"
    :listFieldDisplay="listFieldDisplay"
    fieldDisplay="FullName"
    :listFieldName="listFieldName"
    :fieldValue="fieldValue"
    v-model="valueMultiSelectTB"
    minHeight="32px"
    width="300px"
    :style="{ marginLeft: '40px' }"
  />
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import BaseComboboxTB from "../components/base/BaseComboboxTB.vue";
import BaseMultiSelectTB from "../components/base/BaseMultiSelectTB.vue";
export default {
  name: "view-cash",
  components: {
    BaseComboboxTB,
    BaseMultiSelectTB,
  },
  data() {
    return {
      valueMultiSelectTB: [],
    };
  },
  mounted() {
    console.log("vue2");
    this.valueMultiSelectTB = ["id-01", "id-02"];
    //this.valueComboboxTB = "id-01";
  },
  setup() {
    const data = [
      {
        Id: "id-01",
        EmployeeCode: "code-01",
        FullName: "Nha CC 1",
      },
      {
        Id: "id-02",
        EmployeeCode: "code-02",
        FullName: "Nha CC 2",
      },
      {
        Id: "id-03",
        EmployeeCode: "code-03",
        FullName: "Nha CC 3",
      },
    ];

    const listFieldDisplay = reactive([
      "Id nhân viên",
      `Mã nhân viên`,
      `Tên nhân viên`,
    ]);
    const listFieldName = reactive(["Id", `EmployeeCode`, `FullName`]);
    const fieldValue = ref("Id");
    const valueComboboxTB = ref("");

    onMounted(() => {
      console.log("vue3");
      valueComboboxTB.value = "id-01";
    });

    return {
      data,
      listFieldDisplay,
      listFieldName,
      fieldValue,
      valueComboboxTB,
    };
  },
};
</script>

<style></style>
