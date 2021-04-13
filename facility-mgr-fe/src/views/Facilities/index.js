import { defineComponent, ref,onMounted } from 'vue';
import AddOne from './AddOne/index.vue';
import { message } from 'ant-design-vue';
import { facility } from '@/service';
import { result,formatTimestamp } from '@/helpers/utils';
export default defineComponent({
  components: {
    AddOne,
  },
  setup() {
    const columns = [
      {
        title: '设备厂商',
        dataIndex: 'vendor',
      },
      {
        title: 'IMEI号',
        dataIndex: 'IMEI',
      },
      {
        title: 'ICCID串号',
        dataIndex: 'ICCID',
      },
      {
        title: 'SN号',
        dataIndex: 'SN',
      },
      {
        title: '客户名称',
        dataIndex: 'custom',
      },
      {
        title: '设备状态',
        dataIndex: 'state',
      },
      {
        title: '场景属性',
        dataIndex: 'scene',
      },
      {
        title: '安装行政区',
        dataIndex: 'area',
      },
      {
        title: '激活时间',
        dataIndex: 'activeTime',
        slots: {
          customRender:'activeTime',
        },
      },
      {
        title: '操作',
        slots: {
          customRender:'actions',
        },
      },
    ];
    
    const show = ref(false);//控制页面是否显示，用props

    const list = ref([]);
    const total = ref(0);
    const curPage = ref(1);
    const keyword = ref('');
    const isSearch = ref(false);

//获取设备列表
    const getList = async () => {
      const res = await facility.list({
        page: curPage.value,
        size: 10,
        keyword:keyword.value,
      });
      
      result(res)
        .success(({ data }) => {
          const { list: l, total: t } = data;
          list.value = l;
          total.value = t;
        });
    }

    onMounted(async() => {
      getList();
    });//生命周期的函数的钩子,当组件被挂载在页面上显示出的时候做什么事情
    //设置页码
    const setPage = (page) => {
      curPage.value = page;

      getList();
    };
//触发搜索
    const onSearch = () => {
      getList();
      isSearch.value = Boolean(keyword.value);
    };
//返回主页面   
    const backAll = () => {
      keyword.value = '';
      getList();
      isSearch.value = false;
    }
//删除一个设备
    const remove = async ({text:record}) => {

      const { _id } = record;

      const res = await facility.remove(_id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);

          // const idx = list.value.findIndex((item) => {
          //   return item._id === _id;
          // });

          // list.value.splice(idx, 1);
          getList();
        });
    };

    return {
      columns,
      show,
      list,
      formatTimestamp,
      curPage,
      total,
      setPage,
      keyword,
      onSearch,
      backAll,
      isSearch,
      remove,
    };
  },

});