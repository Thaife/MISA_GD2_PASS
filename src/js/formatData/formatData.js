class FormatData {
  static formatDateFrom_DateTimePicker_to_YYMMDDDD(date) {
    if (date) {
      const tzOffset = date.getTimezoneOffset() * 60 * 1000;
      let dae = new Date(date - tzOffset).toISOString().split("T")[0];
      dae = dae.split(/\D/g);
      return [dae[2], dae[1], dae[0]].join("/");
    } else {
      return "";
    }
  }
  static formatMoney(money, p, ts, dp) {
    if (money) {
      var t = [];
      // Get arguments, set defaults
      if (typeof p == "undefined") p = 1;
      if (typeof ts == "undefined") ts = ".";
      if (typeof dp == "undefined") dp = ",";

      // Get number and decimal part of n
      money = Number(money).toFixed(p).split(".");
      // Add thousands separator and decimal point (if requied):
      for (
        var iLen = money[0].length, i = iLen ? iLen % 3 || 3 : 0, j = 0;
        i <= iLen;
        i += 3
      ) {
        t.push(money[0].substring(j, i));
        j = i;
      }
      // Insert separators and return result
      return t.join(ts) + (money[1] ? dp + money[1] : "");
    } else {
      return "0,0";
    }
  }
}

export default FormatData;
