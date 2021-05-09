import { defineComponent, ref,onMounted } from 'vue';
import AddOne from './AddOne/index.vue';
import EditOne from './EditOne/index.vue';
import WarningLog from './WarningLog/index.vue';
import { message } from 'ant-design-vue';
import { warning } from '@/service';
import { result,formatTimestamp } from '@/helpers/utils';
export default defineComponent({
  components: {
    AddOne,
    EditOne,
    WarningLog,
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
        title: '预警类型',
        dataIndex: 'warntype',
      },
      {
        title: '处理状态',
        dataIndex: 'todo',
      },
      {
        title: '所属区局',
        dataIndex: 'area',
      },
      {
        title: '预警时间',
        slots: {
          customRender:'createdAt',//此处在出入库章节需要修改
        },
      },
      {
        title: '处理时间',
        slots: {
          customRender:'updatedAt',//此处在出入库章节需要修改
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
    const showedit = ref(false);
    const showwarnlog = ref(false);
    const list = ref([]);
    const total = ref(0);
    const curPage = ref(1);
    const keyword = ref('');
    const isSearch = ref(false);
    const curFacility = ref({});

//获取设备列表
    const getList = async () => {
      const res = await warning.list({
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
    };
//删除一个设备

    const remove = async ({text:record}) => {
      //拿到表格每一行的记录
      const { _id } = record;
      // 拿到这一行的id
      const res = await warning.remove(_id);
      //向服务端发送http请求，删除之后返回res数据
      //result方法处理返回的值
      result(res)
        .success(({ msg }) => {
          message.success(msg);
          getList();
        });
    };

    const update = async({record}) => {
     
      curFacility.value = record;

    };

    const warnlog = async({text:record}) => {
     
      showwarnlog.value = true;
      curFacility.value = record;

    };

    const updatecurFacility = (newData) => {
      Object.assign(curFacility.value, newData);
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
      showedit,
      update,
      curFacility,
      updatecurFacility,
      getList,

      warnlog,
      showwarnlog,
    };
  },

});