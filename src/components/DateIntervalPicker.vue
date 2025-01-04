<template>
  <div>
    <!-- 日期區間Dialog -->
    <b-modal
      id="dateIntervalPickerDialog"
      :title="dateIntervalPickerTitle"
      ok-title="儲存"
      cancel-title="取消"
      @ok="dateIntervalPickerDialogOK"
      ok-only
    > 
    <el-date-picker
        v-model="value2" 
        name="name"
        type="daterange" 
        align="right" 
        :nlink-panels="false"
        unlink-panels range-separator="至" 
        start-placeholder="開始日期"
        end-placeholder="結束日期" 
        :picker-options="pickerOptions">
      </el-date-picker>  
    </b-modal>
    <!-- 日期區間Dialog -->
  </div>
</template>
<script>
export default {
  name: "DateIntervalPicker",
  data() {
    return {
      items: [],
      value1: '',
      value2: '',
      pickerOptions: {
        disabledDate(time) {
            return time.getTime() > Date.now();
        },
        shortcuts: [{
            text: '最近一周',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近三个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
            }
        }]
      },
    };
  },
};
</script>