import { defineComponent, ref,onMounted } from 'vue';
import AddOne from './AddOne/index.vue';
import EditOne from './EditOne/index.vue';
import { message } from 'ant-design-vue';
import { state } from '@/service';
import { result,statekind,isusekind} from '@/helpers/utils';
export default defineComponent({
  components: {
    AddOne,
    EditOne,
  },
  setup() {
    const columns = [
      {
        title: '场景名称',
        dataIndex: 'statename',
      },
      {
        title: '场景类型',
        slots: {
          customRender:'statetype',
        },
      },
      {
        title: '是否布防',
        slots: {
          customRender:'isuse',
        },
      },
      {
        title: '门开时长（秒）',
        dataIndex: 'actiontime',
      },
      {
        title: '电量预警（%）',
        dataIndex: 'power',
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
    const list = ref([]);
    const total = ref(0);
    const curPage = ref(1);
    const keyword1 = ref('');
    const keyword2 = ref('');
    const isSearch = ref(false);
    const curFacility = ref({});

//获取设备列表
    const getList = async () => {
      const res = await state.list({
        page: curPage.value,
        size: 10,
        keyword1: keyword1.value,
        keyword2:keyword2.value,
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
      console.log(keyword1);
      console.log(keyword2);
      isSearch.value = Boolean(keyword1.value||keyword2.value);
    };
//返回主页面   
    const backAll = () => {
      keyword1.value = '';
      keyword2.value = '';
      getList();
      isSearch.value = false;
    };
//删除一个设备

    const remove = async ({text:record}) => {
      //拿到表格每一行的记录
      const { _id } = record;
      // 拿到这一行的id
      const res = await state.remove(_id);
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

    const updatecurFacility = (newData) => {
      Object.assign(curFacility.value, newData);
    };

    return {
      columns,
      show,
      list,
      statekind,
      isusekind,
      curPage,
      total,
      setPage,
      keyword1,
      keyword2,
      onSearch,
      backAll,
      isSearch,
      remove,
      showedit,
      update,
      curFacility,
      updatecurFacility,
      getList,
    };
  },

});