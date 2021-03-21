import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const columns = [
      {
        title: '名字',
        dataIndex:'name',
      },
      {
        title: '年龄',
        dataIndex:'age',
      },
    ];
    const dataSourse = [
      {
        name: 'xiaoh',
        age:2,
      },
    ];

    return {
      columns,
      dataSourse,
    };
  },
});